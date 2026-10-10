import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function UPIPayment({ teamData, players, tournament, onBack, onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [upiLink, setUpiLink] = useState('')
  const [transactionId, setTransactionId] = useState('')
  const [paymentScreenshot, setPaymentScreenshot] = useState(null)
  const [teamId, setTeamId] = useState(null)

  const upiId = import.meta.env.VITE_UPI_ID
  const paymentName = import.meta.env.VITE_PAYMENT_NAME || 'Hit Box Cricket'

  useEffect(() => {
    generateUPIQR()
  }, [])

  const generateUPIQR = () => {
    const amount = tournament.entry_fee
    const note = `Registration for ${tournament.name}`
    
    // UPI payment link
    const upi = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(paymentName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`
    setUpiLink(upi)
    
    // Generate QR code using API
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upi)}`
    setQrCodeUrl(qrUrl)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB')
        return
      }
      setPaymentScreenshot(file)
      setError(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!transactionId.trim()) {
      setError('Please enter transaction ID / UTR number')
      return
    }

    if (!paymentScreenshot) {
      setError('Please upload payment screenshot')
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Step 1: Create team
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert({
          team_name: teamData.team_name,
          captain_name: teamData.captain_name,
          captain_mobile: teamData.captain_mobile,
          captain_email: teamData.captain_email,
          alternate_mobile: teamData.alternate_mobile || null,
          city: teamData.city,
          tournament_id: tournament.id,
          registration_status: 'pending_payment'
        })
        .select()
        .single()

      if (teamError) throw new Error(`Failed to create team: ${teamError.message}`)

      setTeamId(team.id)

      // Step 2: Add players
      const playersData = players.map(player => ({
        team_id: team.id,
        player_name: player.player_name,
        mobile: player.mobile,
        email: player.email || null,
        role: player.role,
        jersey_number: player.jersey_number ? parseInt(player.jersey_number) : null
      }))

      const { error: playersError } = await supabase
        .from('team_players')
        .insert(playersData)

      if (playersError) {
        await supabase.from('teams').delete().eq('id', team.id)
        throw new Error(`Failed to add players: ${playersError.message}`)
      }

      // Step 3: Upload payment screenshot
      const fileExt = paymentScreenshot.name.split('.').pop()
      const fileName = `${team.id}_${Date.now()}.${fileExt}`
      const filePath = `payment-screenshots/${fileName}`

      console.log('📤 Uploading screenshot to:', filePath)
      const { error: uploadError } = await supabase.storage
        .from('payments')
        .upload(filePath, paymentScreenshot)

      if (uploadError) {
        console.error('❌ Upload error:', uploadError)
        alert(`Screenshot upload failed: ${uploadError.message}. Registration will continue but admin won't see the screenshot.`)
        // Continue even if upload fails
      } else {
        console.log('✅ Screenshot uploaded successfully to:', filePath)
      }

      // Step 4: Create payment record
      console.log('💾 Saving payment record with screenshot path:', uploadError ? null : filePath)
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert({
          team_id: team.id,
          razorpay_order_id: transactionId, // Store UPI transaction ID here
          razorpay_payment_id: transactionId,
          razorpay_signature: uploadError ? null : filePath,
          amount: parseFloat(tournament.entry_fee),
          currency: 'INR',
          payment_status: 'pending', // Admin will verify
          registration_status: 'pending_payment'
        })
        .select()
        .single()

      if (paymentError) throw new Error(`Failed to create payment: ${paymentError.message}`)
      
      console.log('✅ Payment record created:', payment)

      // Step 5: Fetch complete registration
      const { data: registration } = await supabase
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

      onSuccess(registration || { ...team, tournaments: tournament, team_players: playersData, payments: [payment] })

    } catch (err) {
      console.error('Registration error:', err)
      setError(err.message || 'An error occurred during registration')
      setLoading(false)
    }
  }

  return (
    <div className="upi-payment">
      <h2>UPI Payment</h2>
      <p className="info-text">Scan the QR code or use UPI ID to make payment</p>

      <div className="payment-sections">
        {/* Tournament Summary */}
        <div className="payment-section summary">
          <h3>Payment Summary</h3>
          <div className="summary-item">
            <span className="label">Team:</span>
            <span className="value">{teamData.team_name}</span>
          </div>
          <div className="summary-item">
            <span className="label">Tournament:</span>
            <span className="value">{tournament.name}</span>
          </div>
          <div className="summary-item">
            <span className="label">Players:</span>
            <span className="value">{players.length}</span>
          </div>
          <div className="summary-item total">
            <span className="label">Amount to Pay:</span>
            <span className="value">₹{tournament.entry_fee}</span>
          </div>
        </div>

        {/* QR Code */}
        <div className="payment-section qr-section">
          <h3>Scan QR Code</h3>
          <div className="qr-code-container">
            {qrCodeUrl && (
              <img src={qrCodeUrl} alt="UPI QR Code" className="qr-code" />
            )}
          </div>
          <p className="qr-instruction">Open any UPI app and scan this QR code</p>
        </div>

        {/* UPI ID */}
        <div className="payment-section upi-id-section">
          <h3>Or Pay Using UPI ID</h3>
          <div className="upi-id-box">
            <code>{upiId}</code>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(upiId)}
              className="btn-copy"
            >
              Copy
            </button>
          </div>
          <a href={upiLink} className="btn btn-primary btn-upi-app" target="_blank" rel="noopener noreferrer">
            Open UPI App
          </a>
        </div>

        {/* Payment Confirmation Form */}
        <div className="payment-section confirmation-section">
          <h3>After Payment, Submit Details</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="transactionId">Transaction ID / UTR Number *</label>
              <input
                type="text"
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter 12-digit transaction ID"
                required
                disabled={loading}
              />
              <small>You'll find this in your UPI app after successful payment</small>
            </div>

            <div className="form-group">
              <label htmlFor="screenshot">Upload Payment Screenshot *</label>
              <input
                type="file"
                id="screenshot"
                accept="image/*"
                onChange={handleFileChange}
                required
                disabled={loading}
              />
              <small>Upload screenshot of successful payment (Max 5MB)</small>
            </div>

            {paymentScreenshot && (
              <div className="file-preview">
                ✓ File selected: {paymentScreenshot.name}
              </div>
            )}

            {error && (
              <div className="error-box">
                {error}
              </div>
            )}

            <div className="form-actions">
              <button 
                type="button" 
                onClick={onBack} 
                className="btn btn-secondary"
                disabled={loading}
              >
                Back
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Payment Details'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="payment-note">
        <strong>Note:</strong> Your registration will be confirmed after admin verifies your payment. You'll receive a confirmation email within 24 hours.
      </div>
    </div>
  )
}
