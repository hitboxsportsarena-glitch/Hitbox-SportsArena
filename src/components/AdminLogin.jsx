import { useState } from 'react'
import '../styles/admin-login.css'

export default function AdminLogin({ onSuccess }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const ADMIN_PIN = '8499963878'

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate checking (add small delay for better UX)
    setTimeout(() => {
      if (pin === ADMIN_PIN) {
        localStorage.setItem('admin_authenticated', 'true')
        onSuccess()
      } else {
        setError('Invalid PIN. Access Denied.')
        setPin('')
      }
      setLoading(false)
    }, 500)
  }

  const handlePinChange = (e) => {
    const value = e.target.value.replace(/\D/g, '') // Only numbers
    if (value.length <= 10) {
      setPin(value)
      setError('')
    }
  }

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="lock-icon">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1>Admin Access</h1>
            <p>Enter PIN to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="pin-input-group">
              <input
                type="password"
                value={pin}
                onChange={handlePinChange}
                placeholder="Enter 10-digit PIN"
                maxLength="10"
                className={`pin-input ${error ? 'error' : ''}`}
                autoFocus
                disabled={loading}
              />
              {pin.length > 0 && (
                <div className="pin-dots">
                  {pin.split('').map((_, index) => (
                    <span key={index} className="dot"></span>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <div className="error-message">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="16" r="1" fill="currentColor"/>
                </svg>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading || pin.length !== 10}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Verifying...
                </>
              ) : (
                'Unlock Dashboard'
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <p>🔒 Secure Access Only</p>
          </div>
        </div>
      </div>
    </div>
  )
}
