import { Link } from 'react-router-dom'
import '../styles/legal.css'

export default function PrivacyPolicy() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last Updated: January 2024</p>
        </header>

        <div className="legal-content">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Hit Box Cricket ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our tournament registration platform.
            </p>
            <p>
              By using our services, you consent to the data practices described in this policy.
            </p>
          </section>

          <section>
            <h2>2. Information We Collect</h2>
            
            <h3>2.1 Personal Information</h3>
            <p>When you register for a tournament, we collect:</p>
            <ul>
              <li><strong>Team Captain Information:</strong> Name, email address, mobile number, city</li>
              <li><strong>Player Information:</strong> Names, mobile numbers, email addresses (optional), roles, jersey numbers</li>
              <li><strong>Payment Information:</strong> UPI transaction IDs, payment screenshots, transaction timestamps</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>We may automatically collect:</p>
            <ul>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>IP address</li>
              <li>Access times and dates</li>
              <li>Pages viewed</li>
              <li>Referring website addresses</li>
            </ul>

            <h3>2.3 Cookies and Tracking</h3>
            <p>
              We use local storage to maintain admin sessions. We do not use third-party tracking cookies for advertising purposes.
            </p>
          </section>

          <section>
            <h2>3. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Process tournament registrations</li>
              <li>Verify payment transactions</li>
              <li>Send confirmation emails and updates</li>
              <li>Manage tournament schedules and communications</li>
              <li>Improve our services and user experience</li>
              <li>Respond to inquiries and provide customer support</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>4. Information Sharing and Disclosure</h2>
            
            <h3>4.1 We Do Not Sell Your Information</h3>
            <p>We do not sell, trade, or rent your personal information to third parties.</p>

            <h3>4.2 Third-Party Service Providers</h3>
            <p>We may share information with:</p>
            <ul>
              <li><strong>Supabase:</strong> Database and storage hosting</li>
              <li><strong>EmailJS:</strong> Email notification services</li>
              <li><strong>Vercel:</strong> Website hosting</li>
            </ul>
            <p>These providers are contractually obligated to protect your data and use it only for specified purposes.</p>

            <h3>4.3 Legal Requirements</h3>
            <p>We may disclose information if required by law or to:</p>
            <ul>
              <li>Comply with legal processes</li>
              <li>Enforce our terms and conditions</li>
              <li>Protect rights, property, or safety</li>
              <li>Prevent fraud or security threats</li>
            </ul>
          </section>

          <section>
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <ul>
              <li>Encrypted data transmission (HTTPS/SSL)</li>
              <li>Secure database storage with Supabase</li>
              <li>Access controls and authentication</li>
              <li>Regular security assessments</li>
              <li>Limited employee access to personal data</li>
            </ul>
            <p>
              However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to:
            </p>
            <ul>
              <li>Fulfill the purposes outlined in this policy</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce agreements</li>
            </ul>
            <p>
              Tournament registration data is typically retained for a minimum of 2 years for record-keeping and tax purposes.
            </p>
          </section>

          <section>
            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request copies of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
              <li><strong>Objection:</strong> Object to processing of your data</li>
              <li><strong>Portability:</strong> Request transfer of your data</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing</li>
            </ul>
            <p>
              To exercise these rights, contact us at <Link to="/contact">Contact Us</Link>.
            </p>
          </section>

          <section>
            <h2>8. Children's Privacy</h2>
            <p>
              Our services are intended for users 18 years and older. We do not knowingly collect information from children under 18. Team captains must be 18+ and are responsible for ensuring all players meet age requirements.
            </p>
          </section>

          <section>
            <h2>9. Email Communications</h2>
            <p>
              We may send you:
            </p>
            <ul>
              <li>Registration confirmations</li>
              <li>Payment receipts</li>
              <li>Tournament updates and schedules</li>
              <li>Important announcements</li>
            </ul>
            <p>
              You can opt out of promotional emails by contacting us, but you will still receive essential transaction-related communications.
            </p>
          </section>

          <section>
            <h2>10. Payment Screenshot Privacy</h2>
            <p>
              Payment screenshots uploaded for verification are:
            </p>
            <ul>
              <li>Stored securely in encrypted storage</li>
              <li>Accessible only to authorized admin personnel</li>
              <li>Used solely for payment verification purposes</li>
              <li>Not shared with third parties</li>
              <li>Retained for record-keeping as per legal requirements</li>
            </ul>
          </section>

          <section>
            <h2>11. Third-Party Links</h2>
            <p>
              Our platform may contain links to third-party websites (e.g., UPI payment apps). We are not responsible for the privacy practices of these external sites. Please review their privacy policies.
            </p>
          </section>

          <section>
            <h2>12. Changes to Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Changes will be posted on this page with an updated "Last Updated" date. Continued use after changes constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2>13. Data Protection Officer</h2>
            <p>
              For privacy-related inquiries, contact our Data Protection Officer through our <Link to="/contact">Contact Us</Link> page.
            </p>
          </section>

          <section>
            <h2>14. Governing Law</h2>
            <p>
              This Privacy Policy is governed by the laws of India and complies with the Information Technology Act, 2000 and applicable data protection regulations.
            </p>
          </section>

          <section>
            <h2>15. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or how we handle your data, please <Link to="/contact">Contact Us</Link>.
            </p>
          </section>
        </div>

        <div className="legal-footer">
          <p>Your privacy is important to us. We are committed to protecting your personal information.</p>
          <div className="legal-links">
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/cancellation-refund">Cancellation & Refund</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
