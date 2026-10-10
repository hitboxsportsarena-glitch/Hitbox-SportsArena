import { Link } from 'react-router-dom'
import '../styles/home.css'

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="hero-section">
        <h1>Hit Box Cricket</h1>
        <p className="tagline">Your Gateway to Box Cricket Tournaments</p>
      </header>

      <section className="cta-section">
        <div className="cta-grid">
          <Link to="/register" className="cta-card primary">
            <div className="cta-icon">🏏</div>
            <h2>Register Your Team</h2>
            <p>Join upcoming box cricket tournaments and compete with the best teams</p>
            <span className="cta-button">Register Now →</span>
          </Link>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Quick Registration</h3>
            <p>Simple and fast team registration process with instant confirmation</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Secure Payments</h3>
            <p>Safe and secure UPI payment with instant confirmation</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Multiple Tournaments</h3>
            <p>Choose from various tournaments happening throughout the year</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Register and manage your team from any device</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Enter Team Details</h3>
            <p>Provide your team name and captain information</p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Add Players</h3>
            <p>Add 2-15 players with their roles</p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Select Tournament</h3>
            <p>Choose your preferred tournament</p>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <h3>Make Payment</h3>
            <p>Complete registration with secure payment</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 Hit Box Cricket. All rights reserved.</p>
      </footer>
    </div>
  )
}
