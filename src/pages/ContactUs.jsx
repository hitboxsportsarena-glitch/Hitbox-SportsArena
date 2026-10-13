import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/legal.css'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, send this data to your backend or email service
    console.log('Contact form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>Contact Us</h1>
          <p className="last-updated">We'd love to hear from you!</p>
        </header>

        <div className="legal-content">
          <section className="contact-intro">
            <p>
              Have questions about tournaments, registrations, or payments? We're here to help! 
              Reach out to us using any of the methods below.
            </p>
          </section>

          <div className="contact-grid">
            <div className="contact-info-section">
              <h2>Get in Touch</h2>
              
              <div className="contact-method">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h3>Phone</h3>
                  <p><a href="tel:+918499963878">+91 84999 63878</a></p>
                  <p className="contact-hours">Mon-Sat: 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p><a href="mailto:info@hitboxcricket.com">info@hitboxcricket.com</a></p>
                  <p className="contact-hours">Response within 24 hours</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h3>Address</h3>
                  <p>Hit Box Cricket Sports Arena</p>
                  <p>[Your Address Line 1]</p>
                  <p>[City, State - PIN]</p>
                  <p>India</p>
                </div>
              </div>

              <div className="contact-method">
                <div className="contact-icon">🕐</div>
                <div className="contact-details">
                  <h3>Business Hours</h3>
                  <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p>Sunday: 10:00 AM - 4:00 PM</p>
                  <p className="contact-note">Closed on public holidays</p>
                </div>
              </div>

              <div className="social-links">
                <h3>Follow Us</h3>
                <div className="social-icons">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <span>📘</span> Facebook
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <span>📷</span> Instagram
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <span>🐦</span> Twitter
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <span>📹</span> YouTube
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-section">
              <h2>Send Us a Message</h2>
              
              {submitted && (
                <div className="success-message">
                  ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="registration">Registration Query</option>
                    <option value="payment">Payment Issue</option>
                    <option value="refund">Refund Request</option>
                    <option value="tournament">Tournament Information</option>
                    <option value="technical">Technical Support</option>
                    <option value="feedback">Feedback/Suggestions</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            
            <div className="faq-item">
              <h3>How long does it take to confirm my registration?</h3>
              <p>Registration is typically confirmed within 24 hours after payment verification.</p>
            </div>

            <div className="faq-item">
              <h3>Can I get a refund if I cancel?</h3>
              <p>Yes, refunds are available based on our <Link to="/cancellation-refund">Cancellation & Refund Policy</Link>. Full refunds are provided for cancellations made 7+ days before the tournament.</p>
            </div>

            <div className="faq-item">
              <h3>How do I check my registration status?</h3>
              <p>You will receive an email confirmation once your payment is verified and registration is confirmed.</p>
            </div>

            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>We currently accept UPI payments only. After payment, upload a screenshot and transaction ID for verification.</p>
            </div>

            <div className="faq-item">
              <h3>Can I change my team players after registration?</h3>
              <p>Yes, player substitutions are allowed up to 48 hours before the tournament. Contact us with the updated player information.</p>
            </div>

            <div className="faq-item">
              <h3>What if the tournament is postponed?</h3>
              <p>If postponed, your registration remains valid for the new date. If you cannot attend, you may request a full refund within 48 hours of the announcement.</p>
            </div>
          </section>
        </div>

        <div className="legal-footer">
          <p>Still have questions? Don't hesitate to reach out!</p>
          <div className="legal-links">
            <Link to="/terms-and-conditions">Terms & Conditions</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/cancellation-refund">Cancellation & Refund</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
