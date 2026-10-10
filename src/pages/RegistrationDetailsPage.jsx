import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function RegistrationDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [registration, setRegistration] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRegistration()
  }, [id])

  const fetchRegistration = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('teams')
        .select(`
          *,
          tournaments (
            name,
            venue,
            start_date,
            end_date,
            entry_fee
          ),
          team_players (
            id,
            player_name,
            mobile,
            email,
            role,
            jersey_number
          ),
          payments (
            id,
            amount,
            currency,
            payment_status,
            registration_status,
            razorpay_order_id,
            razorpay_payment_id,
            created_at,
            updated_at
          )
        `)
        .eq('id', id)
        .single()

      if (error) throw error

      setRegistration(data)
    } catch (err) {
      console.error('Error fetching registration:', err)
      setError('Registration not found or you do not have permission to view it.')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'TBD'
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      'confirmed': 'success',
      'paid': 'success',
      'pending_payment': 'warning',
      'pending': 'warning',
      'payment_failed': 'danger',
      'failed': 'danger',
      'cancelled': 'danger'
    }
    return statusMap[status] || 'info'
  }

  if (loading) {
    return (
      <div className="registration-details-page">
        <div className="loading">Loading registration details...</div>
      </div>
    )
  }

  if (error || !registration) {
    return (
      <div className="registration-details-page">
        <div className="error-box">{error || 'Registration not found'}</div>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Go to Home
        </button>
      </div>
    )
  }

  const payment = registration.payments?.[0]
  const tournament = registration.tournaments
  const players = registration.team_players || []

  return (
    <div className="registration-details-page">
      <div className="registration-details-container">
        <header className="details-header">
          <h1>Registration Details</h1>
          <button onClick={() => navigate('/')} className="btn btn-secondary">
            Back to Home
          </button>
        </header>

        <div className="status-banner">
          <div className="status-item">
            <span className="label">Registration Status:</span>
            <span className={`status-badge ${getStatusBadgeClass(registration.registration_status)}`}>
              {registration.registration_status?.replace('_', ' ').toUpperCase()}
            </span>
          </div>
          {payment && (
            <div className="status-item">
              <span className="label">Payment Status:</span>
              <span className={`status-badge ${getStatusBadgeClass(payment.payment_status)}`}>
                {payment.payment_status?.toUpperCase()}
              </span>
            </div>
          )}
        </div>

        <div className="details-grid">
          {/* Team Information */}
          <div className="detail-section">
            <h2>Team Information</h2>
            <div className="detail-item">
              <span className="label">Registration ID:</span>
              <span className="value">{registration.id}</span>
            </div>
            <div className="detail-item">
              <span className="label">Team Name:</span>
              <span className="value">{registration.team_name}</span>
            </div>
            <div className="detail-item">
              <span className="label">Captain Name:</span>
              <span className="value">{registration.captain_name}</span>
            </div>
            <div className="detail-item">
              <span className="label">Captain Mobile:</span>
              <span className="value">{registration.captain_mobile}</span>
            </div>
            <div className="detail-item">
              <span className="label">Captain Email:</span>
              <span className="value">{registration.captain_email}</span>
            </div>
            {registration.alternate_mobile && (
              <div className="detail-item">
                <span className="label">Alternate Mobile:</span>
                <span className="value">{registration.alternate_mobile}</span>
              </div>
            )}
            <div className="detail-item">
              <span className="label">City:</span>
              <span className="value">{registration.city}</span>
            </div>
            <div className="detail-item">
              <span className="label">Registered On:</span>
              <span className="value">{formatDate(registration.created_at)}</span>
            </div>
          </div>

          {/* Tournament Information */}
          {tournament && (
            <div className="detail-section">
              <h2>Tournament Information</h2>
              <div className="detail-item">
                <span className="label">Tournament Name:</span>
                <span className="value">{tournament.name}</span>
              </div>
              {tournament.venue && (
                <div className="detail-item">
                  <span className="label">Venue:</span>
                  <span className="value">{tournament.venue}</span>
                </div>
              )}
              <div className="detail-item">
                <span className="label">Start Date:</span>
                <span className="value">{formatDate(tournament.start_date)}</span>
              </div>
              {tournament.end_date && (
                <div className="detail-item">
                  <span className="label">End Date:</span>
                  <span className="value">{formatDate(tournament.end_date)}</span>
                </div>
              )}
              <div className="detail-item">
                <span className="label">Entry Fee:</span>
                <span className="value">₹{tournament.entry_fee}</span>
              </div>
            </div>
          )}

          {/* Payment Information */}
          {payment && (
            <div className="detail-section">
              <h2>Payment Information</h2>
              <div className="detail-item">
                <span className="label">Amount:</span>
                <span className="value">₹{payment.amount}</span>
              </div>
              <div className="detail-item">
                <span className="label">Currency:</span>
                <span className="value">{payment.currency}</span>
              </div>
              {payment.razorpay_order_id && (
                <div className="detail-item">
                  <span className="label">Order ID:</span>
                  <span className="value">{payment.razorpay_order_id}</span>
                </div>
              )}
              {payment.razorpay_payment_id && (
                <div className="detail-item">
                  <span className="label">Payment ID:</span>
                  <span className="value">{payment.razorpay_payment_id}</span>
                </div>
              )}
              <div className="detail-item">
                <span className="label">Payment Date:</span>
                <span className="value">{formatDate(payment.updated_at)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Players List */}
        <div className="detail-section players-section">
          <h2>Team Players ({players.length})</h2>
          <div className="players-table-wrapper">
            <table className="players-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Player Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Jersey No.</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => (
                  <tr key={player.id}>
                    <td>{index + 1}</td>
                    <td>{player.player_name}</td>
                    <td>{player.mobile}</td>
                    <td>{player.email || '-'}</td>
                    <td>{player.role}</td>
                    <td>{player.jersey_number || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="details-actions">
          <button onClick={() => window.print()} className="btn btn-primary">
            Print Registration
          </button>
          <button onClick={() => navigate('/register')} className="btn btn-secondary">
            Register Another Team
          </button>
        </div>
      </div>
    </div>
  )
}
