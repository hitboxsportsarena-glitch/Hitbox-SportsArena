import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { REGISTRATION_CONFIG } from '../../config/registration'

export default function ReviewAndPay({ teamData, players, tournament, onBack, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Helper function to format player data for database insertion
  const formatPlayersForDB = (players, teamId) => {
    return players.map(player => ({
      team_id: teamId,
      player_name: player.player_name,
      mobile: player.mobile,
      email: player.email || null,
      role: player.role || null,
      jersey_number: player.jersey_number ? parseInt(player.jersey_number) : null
    }))
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleTestingModePayment = async () => {
    try {
      setLoading(true)
      setError(null)

      // Step 1: Create team record in database
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert({
          team_name: teamData.team_name,
          captain_name: teamData.captain_name,
          captain_mobile: teamData.captain_mobile,
          captain_email: teamData.captain_email,
          alternate_mobile: teamData.alternate_mobile,
          city: teamData.city,
          tournament_id: tournament.id,
          registration_status: 'confirmed' // Directly set as confirmed in testing mode
        })
        .select()
        .single()

      if (teamError) throw new Error('Failed to create team registration')

      // Step 2: Add all players
      const playersWithTeamId = formatPlayersForDB(players, team.id)

      const { error: playersError } = await supabase
        .from('team_players')
        .insert(playersWithTeamId)

      if (playersError) {
        // Rollback: delete team if players insertion fails
        await supabase.from('teams').delete().eq('id', team.id)
        throw new Error('Failed to add players')
      }

      // Step 3: Create a fake payment record for testing
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert({
          team_id: team.id,
          razorpay_order_id: `test_order_${Date.now()}`,
          razorpay_payment_id: `test_pay_${Date.now()}`,
          razorpay_signature: 'test_signature',
          amount: tournament.entry_fee,
          currency: 'INR',
          payment_status: 'paid',
          registration_status: 'confirmed'
        })
        .select()
        .single()

      if (paymentError) throw new Error('Failed to create payment record')

      // Step 4: Fetch complete registration details
      const { data: registrationDetails } = await supabase
        .from('teams')
        .select(`
          *,
          tournaments (
            name,
            venue,
            start_date
          ),
          team_players (
            player_name,
            role
          ),
          payments (
            id,
            amount,
            razorpay_payment_id,
            payment_status,
            registration_status
          )
        `)
        .eq('id', team.id)
        .single()

      // Success!
      onSuccess(registrationDetails)
    } catch (err) {
      console.error('Testing payment error:', err)
      setError(err.message || 'An error occurred during registration')
      setLoading(false)
    }
  }

  const handlePayment = async () => {
    // If testing mode is enabled, skip Razorpay
    if (REGISTRATION_CONFIG.TESTING_MODE) {
      await handleTestingModePayment()
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript()
      if (!isScriptLoaded) {
        throw new Error('Failed to load Razorpay. Please check your internet connection.')
      }

      // Step 1: Create team record in database
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert({
          team_name: teamData.team_name,
          captain_name: teamData.captain_name,
          captain_mobile: teamData.captain_mobile,
          captain_email: teamData.captain_email,
          alternate_mobile: teamData.alternate_mobile,
          city: teamData.city,
          tournament_id: tournament.id,
          registration_status: 'draft'
        })
        .select()
        .single()

      if (teamError) throw new Error('Failed to create team registration')

      // Step 2: Add all players
      const playersWithTeamId = formatPlayersForDB(players, team.id)

      const { error: playersError } = await supabase
        .from('team_players')
        .insert(playersWithTeamId)

      if (playersError) {
        // Rollback: delete team if players insertion fails
        await supabase.from('teams').delete().eq('id', team.id)
        throw new Error('Failed to add players')
      }

      // Step 3: Create Razorpay order via Edge Function
      const { data: orderData, error: orderError } = await supabase.functions.invoke(
        'create-razorpay-order',
        {
          body: {
            teamId: team.id,
            amount: tournament.entry_fee
          }
        }
      )

      if (orderError || !orderData.orderId) {
        throw new Error(orderData?.error || 'Failed to create payment order')
      }

      // Step 4: Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Hit Box Cricket',
        description: `Registration for ${tournament.name}`,
        order_id: orderData.orderId,
        prefill: {
          name: teamData.captain_name,
          email: teamData.captain_email,
          contact: teamData.captain_mobile
        },
        notes: {
          team_name: teamData.team_name,
          tournament_name: tournament.name
        },
        theme: {
          color: '#aa3bff'
        },
        handler: async function (response) {
          // Step 5: Verify payment on server
          await verifyPayment(response, team.id)
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
            setError('Payment cancelled. You can retry payment anytime.')
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', function (response) {
        setLoading(false)
        setError(`Payment failed: ${response.error.description}`)
      })
      
      razorpay.open()

    } catch (err) {
      console.error('Payment error:', err)
      setError(err.message || 'An error occurred during payment')
      setLoading(false)
    }
  }

  const verifyPayment = async (paymentResponse, teamId) => {
    try {
      console.log('🔍 Verifying payment:', {
        order_id: paymentResponse.razorpay_order_id,
        payment_id: paymentResponse.razorpay_payment_id,
        signature: paymentResponse.razorpay_signature
      })

      const { data, error } = await supabase.functions.invoke(
        'verify-razorpay-payment',
        {
          body: {
            razorpay_order_id: paymentResponse.razorpay_order_id,
            razorpay_payment_id: paymentResponse.razorpay_payment_id,
            razorpay_signature: paymentResponse.razorpay_signature
          }
        }
      )

      console.log('📥 Verification response:', { data, error })

      if (error) {
        console.error('❌ Supabase function error:', error)
        throw new Error(error.message || 'Payment verification failed')
      }

      if (!data.success) {
        console.error('❌ Verification failed:', data)
        throw new Error(data?.error || 'Payment verification failed')
      }

      // Payment successful
      console.log('✅ Payment verified successfully!')
      onSuccess(data.registration)
    } catch (err) {
      console.error('Verification error:', err)
      setError('Payment verification failed. Please contact support with your payment ID: ' + 
        paymentResponse.razorpay_payment_id)
      setLoading(false)
    }
  }

  return (
    <div className="review-and-pay">
      <h2>Review & Pay</h2>
      {REGISTRATION_CONFIG.TESTING_MODE && (
        <div className="testing-banner">
          🧪 Testing Mode Active - Payment will be simulated
        </div>
      )}
      <p className="info-text">Please review your registration details before proceeding to payment</p>

      <div className="review-sections">
        {/* Team Details */}
        <div className="review-section">
          <h3>Team Details</h3>
          <div className="review-item">
            <span className="label">Team Name:</span>
            <span className="value">{teamData.team_name}</span>
          </div>
          <div className="review-item">
            <span className="label">Captain:</span>
            <span className="value">{teamData.captain_name}</span>
          </div>
          <div className="review-item">
            <span className="label">Mobile:</span>
            <span className="value">{teamData.captain_mobile}</span>
          </div>
          <div className="review-item">
            <span className="label">Email:</span>
            <span className="value">{teamData.captain_email}</span>
          </div>
          {teamData.alternate_mobile && (
            <div className="review-item">
              <span className="label">Alternate Mobile:</span>
              <span className="value">{teamData.alternate_mobile}</span>
            </div>
          )}
          <div className="review-item">
            <span className="label">City:</span>
            <span className="value">{teamData.city}</span>
          </div>
        </div>

        {/* Players */}
        <div className="review-section">
          <h3>Players ({players.length})</h3>
          <div className="players-summary">
            {players.map((player, index) => (
              <div key={index} className="player-item">
                <span className="player-name">{player.player_name}</span>
                <span className="player-role">{player.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tournament */}
        <div className="review-section">
          <h3>Tournament Details</h3>
          <div className="review-item">
            <span className="label">Tournament:</span>
            <span className="value">{tournament.name}</span>
          </div>
          {tournament.venue && (
            <div className="review-item">
              <span className="label">Venue:</span>
              <span className="value">{tournament.venue}</span>
            </div>
          )}
          {tournament.start_date && (
            <div className="review-item">
              <span className="label">Start Date:</span>
              <span className="value">
                {new Date(tournament.start_date).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
          )}
        </div>

        {/* Payment Summary */}
        <div className="review-section payment-summary">
          <h3>Payment Summary</h3>
          <div className="review-item">
            <span className="label">Entry Fee:</span>
            <span className="value">₹{tournament.entry_fee}</span>
          </div>
          <div className="review-item total">
            <span className="label">Total Amount:</span>
            <span className="value">₹{tournament.entry_fee}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      <div className="form-navigation">
        <button 
          type="button" 
          onClick={onBack} 
          className="btn btn-secondary"
          disabled={loading}
        >
          Back
        </button>
        <button 
          type="button" 
          onClick={handlePayment} 
          className="btn btn-primary btn-pay"
          disabled={loading}
        >
          {loading ? 'Processing...' : REGISTRATION_CONFIG.TESTING_MODE ? `Test Register - ₹${tournament.entry_fee}` : `Pay ₹${tournament.entry_fee}`}
        </button>
      </div>
    </div>
  )
}
