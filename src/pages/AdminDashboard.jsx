import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { sendConfirmationEmail, sendCancellationEmail } from '../lib/emailService'
import AdminLogin from '../components/AdminLogin'
import '../styles/admin.css'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [registrations, setRegistrations] = useState([])
  const [tournaments, setTournaments] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRegistration, setSelectedRegistration] = useState(null)
  const [filters, setFilters] = useState({
    tournament: '',
    paymentStatus: '',
    registrationStatus: '',
    searchQuery: ''
  })

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch all registrations with related data
      const { data: regsData, error: regsError } = await supabase
        .from('teams')
        .select(`
          *,
          tournaments (
            id,
            name,
            venue,
            start_date,
            entry_fee
          ),
          team_players (
            id,
            player_name,
            role
          ),
          payments (
            id,
            amount,
            payment_status,
            registration_status,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            created_at,
            updated_at
          )
        `)
        .order('created_at', { ascending: false })

      if (regsError) throw regsError

      setRegistrations(regsData || [])

      // Fetch tournaments for filter
      const { data: tournsData, error: tournsError } = await supabase
        .from('tournaments')
        .select('id, name')
        .order('created_at', { ascending: false })

      if (tournsError) throw tournsError

      setTournaments(tournsData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Check if already authenticated
    const isAuth = localStorage.getItem('admin_authenticated') === 'true'
    setIsAuthenticated(isAuth)
    
    if (isAuth) {
      fetchData()
    } else {
      setLoading(false)
    }
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    fetchData()
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    setIsAuthenticated(false)
  }

  // If not authenticated, show login
  if (!isAuthenticated) {
    return <AdminLogin onSuccess={handleLoginSuccess} />
  }

  const filteredRegistrations = registrations.filter(reg => {
    const payment = reg.payments?.[0]

    // Tournament filter
    if (filters.tournament && reg.tournament_id !== filters.tournament) {
      return false
    }

    // Payment status filter
    if (filters.paymentStatus && payment?.payment_status !== filters.paymentStatus) {
      return false
    }

    // Registration status filter
    if (filters.registrationStatus && reg.registration_status !== filters.registrationStatus) {
      return false
    }

    // Search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      return (
        reg.team_name.toLowerCase().includes(query) ||
        reg.captain_name.toLowerCase().includes(query) ||
        reg.captain_mobile.includes(query) ||
        reg.id.toLowerCase().includes(query)
      )
    }

    return true
  })

  const handleViewDetails = (registration) => {
    setSelectedRegistration(registration)
  }

  const handleCloseModal = () => {
    setSelectedRegistration(null)
  }

  const handleUpdateStatus = async (teamId, newStatus) => {
    try {
      // Update status in database
      const { error } = await supabase
        .from('teams')
        .update({ registration_status: newStatus })
        .eq('id', teamId)

      if (error) throw error

      // Find the registration data for email
      const registration = registrations.find(reg => reg.id === teamId)
      
      if (!registration) {
        console.error('Registration not found for email')
        alert('Status updated but email could not be sent (registration data not found)')
        await fetchData()
        return
      }

      // Send email based on status
      try {
        if (newStatus === 'confirmed') {
          console.log('📧 Sending confirmation email...')
          await sendConfirmationEmail(registration)
          alert('✅ Registration confirmed and confirmation email sent successfully!')
        } else {
          // No email for other statuses (cancelled, etc.)
          alert('Status updated successfully')
        }
      } catch (emailError) {
        console.error('Email sending failed:', emailError)
        alert(`⚠️ Status updated successfully, but email failed to send: ${emailError.message}\n\nPlease check your EmailJS configuration.`)
      }

      // Refresh data
      await fetchData()

    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status: ' + error.message)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
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
      'cancelled': 'danger',
      'draft': 'info'
    }
    return statusMap[status] || 'info'
  }

  const stats = {
    total: registrations.length,
    confirmed: registrations.filter(r => r.registration_status === 'confirmed').length,
    pending: registrations.filter(r => r.registration_status === 'pending_payment').length,
    failed: registrations.filter(r => r.registration_status === 'payment_failed').length
  }

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage team registrations and payments</p>
          </div>
          <button onClick={handleLogout} className="btn-logout">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Registrations</div>
        </div>
        <div className="stat-card success">
          <div className="stat-value">{stats.confirmed}</div>
          <div className="stat-label">Confirmed</div>
        </div>
        <div className="stat-card warning">
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-label">Pending Payment</div>
        </div>
        <div className="stat-card danger">
          <div className="stat-value">{stats.failed}</div>
          <div className="stat-label">Failed</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Team name, captain, mobile, or ID"
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
          />
        </div>

        <div className="filter-group">
          <label>Tournament:</label>
          <select
            value={filters.tournament}
            onChange={(e) => setFilters({ ...filters, tournament: e.target.value })}
          >
            <option value="">All Tournaments</option>
            {tournaments.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Payment Status:</label>
          <select
            value={filters.paymentStatus}
            onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
          >
            <option value="">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Registration Status:</label>
          <select
            value={filters.registrationStatus}
            onChange={(e) => setFilters({ ...filters, registrationStatus: e.target.value })}
          >
            <option value="">All</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending_payment">Pending Payment</option>
            <option value="payment_failed">Payment Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <button
          className="btn btn-secondary"
          onClick={() => setFilters({ tournament: '', paymentStatus: '', registrationStatus: '', searchQuery: '' })}
        >
          Clear Filters
        </button>
      </div>

      {/* Registrations Table */}
      <div className="registrations-table-wrapper">
        <table className="registrations-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Team Name</th>
              <th>Captain</th>
              <th>Mobile</th>
              <th>Tournament</th>
              <th>Players</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Reg. Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.length === 0 ? (
              <tr>
                <td colSpan="10" className="empty-message">
                  No registrations found
                </td>
              </tr>
            ) : (
              filteredRegistrations.map(reg => {
                const payment = reg.payments?.[0]
                return (
                  <tr key={reg.id}>
                    <td>{formatDate(reg.created_at)}</td>
                    <td>{reg.team_name}</td>
                    <td>{reg.captain_name}</td>
                    <td>{reg.captain_mobile}</td>
                    <td>{reg.tournaments?.name || 'N/A'}</td>
                    <td>{reg.team_players?.length || 0}</td>
                    <td>₹{payment?.amount || 0}</td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(payment?.payment_status)}`}>
                        {payment?.payment_status || 'N/A'}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(reg.registration_status)}`}>
                        {reg.registration_status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleViewDetails(reg)}
                        className="btn-small btn-primary"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedRegistration && (
        <RegistrationModal
          registration={selectedRegistration}
          onClose={handleCloseModal}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  )
}

function RegistrationModal({ registration, onClose, onUpdateStatus }) {
  const [screenshotUrl, setScreenshotUrl] = useState(null)
  const [loadingScreenshot, setLoadingScreenshot] = useState(false)
  
  const payment = registration.payments?.[0]
  const tournament = registration.tournaments
  const players = registration.team_players || []

  useEffect(() => {
    console.log('🔍 Payment data:', payment)
    console.log('📸 Screenshot path:', payment?.razorpay_signature)
    if (payment?.razorpay_signature) {
      console.log('✅ Fetching screenshot from:', payment.razorpay_signature)
      fetchScreenshot(payment.razorpay_signature)
    } else {
      console.log('❌ No screenshot path found in payment.razorpay_signature')
    }
  }, [payment])

  const fetchScreenshot = async (filePath) => {
    try {
      setLoadingScreenshot(true)
      const { data, error } = await supabase.storage
        .from('payments')
        .download(filePath)

      if (error) {
        console.error('Error fetching screenshot:', error)
        return
      }

      const url = URL.createObjectURL(data)
      setScreenshotUrl(url)
    } catch (err) {
      console.error('Error loading screenshot:', err)
    } finally {
      setLoadingScreenshot(false)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Registration Details</h2>
          <button onClick={onClose} className="modal-close">&times;</button>
        </div>

        <div className="modal-body">
          <div className="detail-section">
            <h3>Team Information</h3>
            <div className="detail-item">
              <span className="label">Registration ID:</span>
              <span className="value">{registration.id}</span>
            </div>
            <div className="detail-item">
              <span className="label">Team Name:</span>
              <span className="value">{registration.team_name}</span>
            </div>
            <div className="detail-item">
              <span className="label">Captain:</span>
              <span className="value">{registration.captain_name}</span>
            </div>
            <div className="detail-item">
              <span className="label">Mobile:</span>
              <span className="value">{registration.captain_mobile}</span>
            </div>
            <div className="detail-item">
              <span className="label">Email:</span>
              <span className="value">{registration.captain_email}</span>
            </div>
            <div className="detail-item">
              <span className="label">City:</span>
              <span className="value">{registration.city}</span>
            </div>
          </div>

          {tournament && (
            <div className="detail-section">
              <h3>Tournament</h3>
              <div className="detail-item">
                <span className="label">Name:</span>
                <span className="value">{tournament.name}</span>
              </div>
              <div className="detail-item">
                <span className="label">Venue:</span>
                <span className="value">{tournament.venue || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="label">Start Date:</span>
                <span className="value">{formatDate(tournament.start_date)}</span>
              </div>
            </div>
          )}

          {payment && (
            <div className="detail-section">
              <h3>Payment Details</h3>
              <div className="detail-item">
                <span className="label">Amount:</span>
                <span className="value">₹{payment.amount}</span>
              </div>
              <div className="detail-item">
                <span className="label">Transaction ID:</span>
                <span className="value">{payment.razorpay_payment_id || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="label">Status:</span>
                <span className="value">{payment.payment_status}</span>
              </div>
              
              {screenshotUrl && (
                <div className="screenshot-container">
                  <h4>Payment Screenshot:</h4>
                  <img 
                    src={screenshotUrl} 
                    alt="Payment Screenshot" 
                    className="payment-screenshot"
                    onClick={() => window.open(screenshotUrl, '_blank')}
                  />
                  <p className="screenshot-hint">Click image to view full size</p>
                </div>
              )}
              
              {loadingScreenshot && (
                <div className="loading-screenshot">Loading screenshot...</div>
              )}
              
              {!screenshotUrl && !loadingScreenshot && payment.razorpay_signature && (
                <div className="no-screenshot">Screenshot not available</div>
              )}
            </div>
          )}

          <div className="detail-section">
            <h3>Players ({players.length})</h3>
            <table className="modal-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {players.map(player => (
                  <tr key={player.id}>
                    <td>{player.player_name}</td>
                    <td>{player.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="detail-section">
            <h3>Actions</h3>
            <div className="action-buttons">
              <button
                onClick={() => onUpdateStatus(registration.id, 'confirmed')}
                className="btn btn-success"
                disabled={registration.registration_status === 'confirmed'}
              >
                Confirm Registration
              </button>
              <button
                onClick={() => onUpdateStatus(registration.id, 'cancelled')}
                className="btn btn-danger"
                disabled={registration.registration_status === 'cancelled'}
              >
                Cancel Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
