import { useNavigate } from 'react-router-dom'

export default function RegistrationSuccess({ registration }) {
  const navigate = useNavigate()

  const payment = registration.payments?.[0]
  const tournament = registration.tournaments
  const playerCount = registration.team_players?.length || 0
  const isPending = payment?.payment_status === 'pending'

  const handleViewRegistration = () => {
    navigate(`/registration/${registration.id}`)
  }

  const handleNewRegistration = () => {
    navigate('/register')
    window.location.reload()
  }

  return (
    <div className="registration-success">
      <div className={`success-icon ${isPending ? 'pending' : ''}`}>
        {isPending ? '⏳' : '✓'}
      </div>
      <h2>{isPending ? 'Registration Submitted!' : 'Payment Successful!'}</h2>
      <p className="success-message">
        {isPending 
          ? `Your registration has been submitted. We'll verify your payment and confirm your registration within 24 hours. Confirmation will be sent to ${registration.captain_email}`
          : `Your team registration has been confirmed. We've sent a confirmation email to ${registration.captain_email}`
        }
      </p>

      <div className="success-details">
        <div className="detail-card">
          <h3>Registration Details</h3>
          
          <div className="detail-item">
            <span className="label">Team Name:</span>
            <span className="value">{registration.team_name}</span>
          </div>

          <div className="detail-item">
            <span className="label">Registration ID:</span>
            <span className="value registration-id">{registration.id}</span>
          </div>

          <div className="detail-item">
            <span className="label">Captain:</span>
            <span className="value">{registration.captain_name}</span>
          </div>

          <div className="detail-item">
            <span className="label">Number of Players:</span>
            <span className="value">{playerCount}</span>
          </div>

          <div className="detail-item">
            <span className="label">Tournament:</span>
            <span className="value">{tournament?.name || 'N/A'}</span>
          </div>

          {tournament?.venue && (
            <div className="detail-item">
              <span className="label">Venue:</span>
              <span className="value">{tournament.venue}</span>
            </div>
          )}
        </div>

        <div className="detail-card">
          <h3>Payment Details</h3>
          
          <div className="detail-item">
            <span className="label">Amount Paid:</span>
            <span className="value">₹{payment?.amount || 0}</span>
          </div>

          <div className="detail-item">
            <span className="label">Transaction ID:</span>
            <span className="value payment-id">{payment?.razorpay_payment_id || 'N/A'}</span>
          </div>

          <div className="detail-item">
            <span className="label">Payment Status:</span>
            <span className={`value status-badge ${isPending ? 'warning' : 'success'}`}>
              {isPending ? 'Pending Verification' : (payment?.payment_status || 'N/A')}
            </span>
          </div>

          <div className="detail-item">
            <span className="label">Registration Status:</span>
            <span className={`value status-badge ${isPending ? 'warning' : 'confirmed'}`}>
              {isPending ? 'Pending' : registration.registration_status}
            </span>
          </div>
        </div>
      </div>

      <div className="success-actions">
        <button onClick={handleViewRegistration} className="btn btn-primary">
          View Registration
        </button>
        <button onClick={handleNewRegistration} className="btn btn-secondary">
          Register Another Team
        </button>
        {!isPending && (
          <button onClick={() => window.print()} className="btn btn-secondary">
            Print Registration
          </button>
        )}
      </div>

      <div className="next-steps">
        <h3>What's Next?</h3>
        <ul>
          {isPending ? (
            <>
              <li>Admin will verify your payment within 24 hours</li>
              <li>You'll receive a confirmation email once verified</li>
              <li>Keep your transaction ID safe for reference</li>
              <li>Check your email regularly for updates</li>
            </>
          ) : (
            <>
              <li>You will receive a confirmation email with all details</li>
              <li>Tournament schedule will be shared 3 days before the start date</li>
              <li>Please arrive 30 minutes before your match time</li>
              <li>Carry your team ID cards and the registration confirmation</li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
