import { Link } from 'react-router-dom'
import '../styles/legal.css'

export default function TermsAndConditions() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>Terms and Conditions</h1>
          <p className="last-updated">Last Updated: January 2024</p>
        </header>

        <div className="legal-content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Hit Box Cricket registration platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2>2. Tournament Registration</h2>
            <h3>2.1 Eligibility</h3>
            <p>Teams must meet the following criteria:</p>
            <ul>
              <li>Minimum 2 players, maximum 15 players per team</li>
              <li>Captain must be 18 years or older</li>
              <li>All players must provide accurate information</li>
              <li>Teams must comply with tournament-specific requirements</li>
            </ul>

            <h3>2.2 Registration Process</h3>
            <p>
              Registration is complete only after payment confirmation. Incomplete registrations will not be considered for tournament participation.
            </p>

            <h3>2.3 Team Information</h3>
            <p>
              All information provided during registration must be accurate and truthful. Hit Box Cricket reserves the right to verify information and reject registrations with false or misleading details.
            </p>
          </section>

          <section>
            <h2>3. Payment Terms</h2>
            <h3>3.1 Entry Fees</h3>
            <p>
              Tournament entry fees are specified during registration and must be paid via UPI. All fees are in Indian Rupees (INR).
            </p>

            <h3>3.2 Payment Methods</h3>
            <p>
              We accept payments through UPI only. After payment, teams must upload a payment screenshot and provide transaction ID for verification.
            </p>

            <h3>3.3 Payment Verification</h3>
            <p>
              All payments are manually verified by our admin team. Registration will be confirmed within 24 hours of successful payment verification.
            </p>
          </section>

          <section>
            <h2>4. Cancellation and Refund Policy</h2>
            <p>Please refer to our <Link to="/cancellation-refund">Cancellation and Refund Policy</Link> for detailed information.</p>
          </section>

          <section>
            <h2>5. User Responsibilities</h2>
            <ul>
              <li>Maintain confidentiality of registration details</li>
              <li>Provide accurate and complete information</li>
              <li>Comply with all tournament rules and regulations</li>
              <li>Respect other participants and officials</li>
              <li>Arrive on time for scheduled matches</li>
              <li>Follow ground rules and safety protocols</li>
            </ul>
          </section>

          <section>
            <h2>6. Tournament Rules</h2>
            <h3>6.1 Participation</h3>
            <p>
              Only confirmed and paid teams will be allowed to participate. Teams must have minimum required players present on match day.
            </p>

            <h3>6.2 Code of Conduct</h3>
            <p>
              All participants must maintain sportsmanship and respect. Misbehavior, abuse, or violence will result in immediate disqualification without refund.
            </p>

            <h3>6.3 Modifications</h3>
            <p>
              Hit Box Cricket reserves the right to modify tournament schedules, venues, or rules due to unforeseen circumstances.
            </p>
          </section>

          <section>
            <h2>7. Liability and Disclaimers</h2>
            <h3>7.1 Injuries</h3>
            <p>
              Participants engage in cricket activities at their own risk. Hit Box Cricket is not liable for any injuries, accidents, or damages occurring during tournaments.
            </p>

            <h3>7.2 Personal Belongings</h3>
            <p>
              Hit Box Cricket is not responsible for loss or damage to personal belongings during tournaments.
            </p>

            <h3>7.3 Weather and Force Majeure</h3>
            <p>
              Tournaments may be postponed or cancelled due to weather, natural disasters, or other uncontrollable events. Refer to our refund policy for such scenarios.
            </p>
          </section>

          <section>
            <h2>8. Privacy and Data Protection</h2>
            <p>
              Your personal information is protected as per our <Link to="/privacy-policy">Privacy Policy</Link>. We collect and use data only for registration and tournament management purposes.
            </p>
          </section>

          <section>
            <h2>9. Intellectual Property</h2>
            <p>
              All content on this platform, including logos, designs, and text, is the property of Hit Box Cricket and protected by copyright laws.
            </p>
          </section>

          <section>
            <h2>10. Termination</h2>
            <p>
              We reserve the right to refuse service, terminate registrations, or ban teams/players for violations of these terms or inappropriate conduct.
            </p>
          </section>

          <section>
            <h2>11. Dispute Resolution</h2>
            <p>
              Any disputes arising from tournament participation or platform use will be resolved through good faith negotiations. If unresolved, disputes will be subject to the jurisdiction of courts in [Your City], India.
            </p>
          </section>

          <section>
            <h2>12. Amendments</h2>
            <p>
              Hit Box Cricket reserves the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of modified terms.
            </p>
          </section>

          <section>
            <h2>13. Contact Information</h2>
            <p>
              For questions about these terms, please contact us through our <Link to="/contact">Contact Us</Link> page.
            </p>
          </section>

          <section>
            <h2>14. Governing Law</h2>
            <p>
              These terms are governed by the laws of India. By using our services, you agree to submit to the jurisdiction of Indian courts.
            </p>
          </section>
        </div>

        <div className="legal-footer">
          <p>By registering for tournaments, you acknowledge that you have read, understood, and agree to these Terms and Conditions.</p>
          <div className="legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/cancellation-refund">Cancellation & Refund</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
