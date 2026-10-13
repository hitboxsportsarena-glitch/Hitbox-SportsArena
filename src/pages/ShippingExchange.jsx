import { Link } from 'react-router-dom'
import '../styles/legal.css'

export default function ShippingExchange() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>Shipping and Exchange Policy</h1>
          <p className="last-updated">Last Updated: January 2024</p>
        </header>

        <div className="legal-content">
          <section>
            <h2>Important Notice</h2>
            <div className="notice-box">
              <p>
                <strong>Hit Box Cricket is a tournament registration and sports event management platform.</strong> 
                We do not sell or ship physical products. This page clarifies our service delivery model.
              </p>
            </div>
          </section>

          <section>
            <h2>1. Nature of Our Services</h2>
            <p>
              Hit Box Cricket provides digital services for cricket tournament registration and event management. Our services include:
            </p>
            <ul>
              <li>Online team registration</li>
              <li>Payment processing for tournament entry fees</li>
              <li>Tournament scheduling and management</li>
              <li>Match coordination and updates</li>
              <li>Results and standings tracking</li>
            </ul>
            <p>
              <strong>No physical goods are shipped</strong> as part of our core services.
            </p>
          </section>

          <section>
            <h2>2. Tournament Registration "Delivery"</h2>
            
            <h3>2.1 Service Delivery Timeline</h3>
            <p>Upon successful registration and payment verification:</p>
            <ul>
              <li><strong>Immediate:</strong> Registration confirmation displayed on-screen</li>
              <li><strong>Within 24 hours:</strong> Email confirmation sent to captain's email</li>
              <li><strong>Within 48 hours:</strong> Team added to official tournament roster</li>
              <li><strong>Before tournament:</strong> Schedule and venue details shared via email</li>
            </ul>

            <h3>2.2 Digital Deliverables</h3>
            <p>Teams will receive the following digitally:</p>
            <ul>
              <li>Registration confirmation email</li>
              <li>Payment receipt (via email)</li>
              <li>Tournament schedule</li>
              <li>Match fixtures and timings</li>
              <li>Venue information and directions</li>
              <li>Rules and regulations document</li>
            </ul>
          </section>

          <section>
            <h2>3. Merchandise and Physical Products (If Applicable)</h2>
            
            <h3>3.1 Tournament Merchandise</h3>
            <p>
              If tournament-specific merchandise is offered (jerseys, trophies, certificates):
            </p>
            <ul>
              <li>Items will be distributed on tournament day at the venue</li>
              <li>No home delivery for tournament merchandise</li>
              <li>Items must be collected in person by team captain or designated representative</li>
            </ul>

            <h3>3.2 Certificates and Trophies</h3>
            <p>
              Winning teams will receive:
            </p>
            <ul>
              <li><strong>Trophies:</strong> Awarded at tournament closing ceremony</li>
              <li><strong>Certificates:</strong> Distributed at venue or via email (digital)</li>
              <li><strong>Medals:</strong> Handed out on match day (if applicable)</li>
            </ul>
            <p>
              Uncollected items will be held for 30 days, after which they must be collected from our office or may be forfeited.
            </p>
          </section>

          <section>
            <h2>4. No Exchange Policy</h2>
            
            <h3>4.1 Tournament Registration</h3>
            <p>
              Tournament registrations are non-transferable and non-exchangeable, except as follows:
            </p>
            <ul>
              <li><strong>Team transfer:</strong> Allowed with ₹500 transfer fee (minimum 5 days notice)</li>
              <li><strong>Player substitution:</strong> Free of charge (up to 48 hours before tournament)</li>
              <li><strong>Tournament date change:</strong> Subject to availability and approval</li>
            </ul>
            <p>
              See our <Link to="/cancellation-refund">Cancellation & Refund Policy</Link> for cancellation terms.
            </p>

            <h3>4.2 Physical Items (If Any)</h3>
            <p>
              Tournament merchandise (if provided) cannot be exchanged for:
            </p>
            <ul>
              <li>Different sizes (ensure correct size selection)</li>
              <li>Different colors</li>
              <li>Cash or credit</li>
            </ul>
            <p>
              Defective or damaged items will be replaced at no cost if reported within 24 hours of collection.
            </p>
          </section>

          <section>
            <h2>5. Service Modifications</h2>
            
            <h3>5.1 Tournament Changes</h3>
            <p>
              We reserve the right to modify tournament details:
            </p>
            <ul>
              <li><strong>Venue changes:</strong> Notified at least 72 hours in advance</li>
              <li><strong>Schedule changes:</strong> Notified at least 48 hours in advance</li>
              <li><strong>Format changes:</strong> Communicated before registration closes</li>
            </ul>
            <p>
              Significant changes entitle teams to full refund if they choose not to participate.
            </p>

            <h3>5.2 Player Modifications</h3>
            <p>
              Teams can modify player rosters:
            </p>
            <ul>
              <li>Up to 48 hours before tournament start</li>
              <li>Maximum 3 player changes per team</li>
              <li>No fee for player substitutions</li>
              <li>Changes must be submitted through <Link to="/contact">Contact Us</Link></li>
            </ul>
          </section>

          <section>
            <h2>6. Collection and Attendance</h2>
            
            <h3>6.1 Tournament Day Collection</h3>
            <p>
              On tournament day, team captains must:
            </p>
            <ul>
              <li>Report to registration desk 30 minutes before first match</li>
              <li>Present valid ID and registration confirmation</li>
              <li>Collect team kit/merchandise (if provided)</li>
              <li>Sign attendance sheet</li>
              <li>Attend team briefing</li>
            </ul>

            <h3>6.2 Non-Collection</h3>
            <p>
              If team fails to collect items or attend:
            </p>
            <ul>
              <li>Team will be marked as no-show</li>
              <li>No refund will be provided</li>
              <li>Tournament slot may be given to waiting list team</li>
              <li>Future registrations may be affected</li>
            </ul>
          </section>

          <section>
            <h2>7. Digital Content Delivery</h2>
            
            <h3>7.1 Email Communications</h3>
            <p>
              All tournament information will be sent to:
            </p>
            <ul>
              <li>Captain's email address (provided during registration)</li>
              <li>Alternative email (if provided)</li>
            </ul>
            <p>
              It is the team's responsibility to:
            </p>
            <ul>
              <li>Provide correct email addresses</li>
              <li>Check email regularly (including spam folder)</li>
              <li>Inform us of email address changes</li>
              <li>Respond to important communications</li>
            </ul>

            <h3>7.2 SMS Notifications</h3>
            <p>
              Critical updates may be sent via SMS to captain's mobile number:
            </p>
            <ul>
              <li>Venue changes</li>
              <li>Match time changes</li>
              <li>Weather-related updates</li>
              <li>Important announcements</li>
            </ul>
          </section>

          <section>
            <h2>8. Lost or Damaged Items</h2>
            
            <h3>8.1 Merchandise Damage</h3>
            <p>
              If tournament merchandise is damaged during distribution:
            </p>
            <ul>
              <li>Report immediately at collection point</li>
              <li>Replacement will be provided if available</li>
              <li>No replacement after leaving collection point</li>
            </ul>

            <h3>8.2 Registration Documents</h3>
            <p>
              If you lose your registration confirmation:
            </p>
            <ul>
              <li>Check your email inbox and spam folder</li>
              <li>Contact us with team name and captain mobile number</li>
              <li>We can resend confirmation within 24 hours</li>
              <li>Bring valid ID as alternative proof</li>
            </ul>
          </section>

          <section>
            <h2>9. Third-Party Services</h2>
            <p>
              We may partner with third-party vendors for:
            </p>
            <ul>
              <li>Photography and videography services</li>
              <li>Food and beverage at venue</li>
              <li>Equipment rental</li>
              <li>Merchandise customization</li>
            </ul>
            <p>
              These services are subject to the vendor's own shipping and exchange policies. We are not responsible for third-party service delivery.
            </p>
          </section>

          <section>
            <h2>10. International Teams</h2>
            <p>
              While we primarily serve local teams:
            </p>
            <ul>
              <li>International teams are welcome to register</li>
              <li>All communications will be via email</li>
              <li>No international shipping of physical items</li>
              <li>Items must be collected at tournament venue</li>
              <li>Team responsible for travel and accommodation arrangements</li>
            </ul>
          </section>

          <section>
            <h2>11. Contact for Issues</h2>
            <p>
              For any service delivery or collection issues:
            </p>
            <ul>
              <li>Visit: <Link to="/contact">Contact Us</Link> page</li>
              <li>Call: +91 84999 63878</li>
              <li>Email: info@hitboxcricket.com</li>
              <li>Response time: Within 24 hours</li>
            </ul>
          </section>

          <section>
            <h2>12. Policy Updates</h2>
            <p>
              This policy may be updated to reflect changes in our services. Check this page regularly for updates. Material changes will be communicated to registered teams.
            </p>
          </section>
        </div>

        <div className="legal-footer">
          <div className="summary-box">
            <h3>Quick Summary</h3>
            <ul>
              <li>✅ Digital service - no physical shipping</li>
              <li>✅ Confirmation emails sent within 24 hours</li>
              <li>✅ Merchandise collected at venue on tournament day</li>
              <li>❌ No exchanges for tournament registrations</li>
              <li>❌ No home delivery of physical items</li>
              <li>✅ Refunds available per cancellation policy</li>
            </ul>
          </div>
          <div className="legal-links">
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/cancellation-refund">Cancellation & Refund</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
