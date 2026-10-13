import { Link } from 'react-router-dom'
import '../styles/legal.css'

export default function CancellationRefund() {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>Cancellation and Refund Policy</h1>
          <p className="last-updated">Last Updated: January 2024</p>
        </header>

        <div className="legal-content">
          <section>
            <h2>1. Overview</h2>
            <p>
              This policy outlines the cancellation and refund terms for tournament registrations at Hit Box Cricket. Please read carefully before making a registration payment.
            </p>
          </section>

          <section>
            <h2>2. Cancellation by Team</h2>
            
            <h3>2.1 Full Refund (100%)</h3>
            <p>Teams are eligible for a full refund if:</p>
            <ul>
              <li>Cancellation is made <strong>7 days or more</strong> before the tournament start date</li>
              <li>Cancellation request is submitted through our <Link to="/contact">Contact Us</Link> page</li>
              <li>Refund will be processed within 7-10 business days</li>
            </ul>

            <h3>2.2 Partial Refund (50%)</h3>
            <p>Teams are eligible for a 50% refund if:</p>
            <ul>
              <li>Cancellation is made <strong>3-6 days</strong> before the tournament start date</li>
              <li>Processing fee of 50% will be deducted</li>
              <li>Refund will be processed within 7-10 business days</li>
            </ul>

            <h3>2.3 No Refund</h3>
            <p>No refund will be provided if:</p>
            <ul>
              <li>Cancellation is made <strong>less than 3 days</strong> before the tournament</li>
              <li>Team fails to show up on tournament day (no-show)</li>
              <li>Team is disqualified due to violation of rules or code of conduct</li>
              <li>Team provides false or misleading information during registration</li>
            </ul>
          </section>

          <section>
            <h2>3. Cancellation by Hit Box Cricket</h2>
            
            <h3>3.1 Full Refund</h3>
            <p>If we cancel a tournament due to:</p>
            <ul>
              <li>Insufficient team registrations</li>
              <li>Venue unavailability</li>
              <li>Unforeseen circumstances</li>
            </ul>
            <p>You will receive a <strong>100% refund</strong> within 7-10 business days or credit towards a future tournament.</p>

            <h3>3.2 Force Majeure</h3>
            <p>
              In case of cancellation due to force majeure events (natural disasters, government restrictions, extreme weather, pandemic, etc.):
            </p>
            <ul>
              <li>Teams will receive a <strong>full credit</strong> for future tournaments</li>
              <li>OR a <strong>75% refund</strong> (25% administrative costs)</li>
              <li>Teams must choose their preferred option</li>
            </ul>
          </section>

          <section>
            <h2>4. Tournament Postponement</h2>
            <p>
              If a tournament is postponed to a new date:
            </p>
            <ul>
              <li>Registration remains valid for the new date</li>
              <li>Teams unable to participate on the new date can request a full refund</li>
              <li>Refund requests must be made within 48 hours of postponement announcement</li>
            </ul>
          </section>

          <section>
            <h2>5. Payment Verification Issues</h2>
            
            <h3>5.1 Payment Not Received</h3>
            <p>If we don't receive your payment:</p>
            <ul>
              <li>Registration will be cancelled automatically</li>
              <li>No refund applicable as payment wasn't completed</li>
            </ul>

            <h3>5.2 Payment Verification Failed</h3>
            <p>If payment verification fails due to invalid screenshot or transaction ID:</p>
            <ul>
              <li>You have 24 hours to provide correct information</li>
              <li>After 24 hours, registration will be cancelled</li>
              <li>Refund will be processed if payment was actually made</li>
            </ul>

            <h3>5.3 Duplicate Payments</h3>
            <p>
              If you accidentally make duplicate payments, the extra amount will be refunded within 7-10 business days after verification.
            </p>
          </section>

          <section>
            <h2>6. Refund Process</h2>
            
            <h3>6.1 How to Request</h3>
            <p>To request a cancellation and refund:</p>
            <ol>
              <li>Visit our <Link to="/contact">Contact Us</Link> page</li>
              <li>Provide your registration ID and team name</li>
              <li>State reason for cancellation</li>
              <li>Provide UPI ID or bank details for refund</li>
            </ol>

            <h3>6.2 Processing Time</h3>
            <ul>
              <li><strong>Refund Approval:</strong> 2-3 business days</li>
              <li><strong>Refund Processing:</strong> 7-10 business days</li>
              <li><strong>Bank Credit:</strong> Additional 3-5 days (depends on your bank)</li>
            </ul>

            <h3>6.3 Refund Method</h3>
            <p>
              Refunds will be processed through:
            </p>
            <ul>
              <li>UPI transfer (preferred - fastest method)</li>
              <li>Bank transfer (NEFT/IMPS)</li>
            </ul>
            <p>Refunds will be made to the same UPI ID or bank account used for original payment wherever possible.</p>
          </section>

          <section>
            <h2>7. Non-Refundable Scenarios</h2>
            <p>
              Entry fees are <strong>non-refundable</strong> in the following cases:
            </p>
            <ul>
              <li>Team is disqualified for misconduct or violence</li>
              <li>Team provides false information or fraudulent documents</li>
              <li>Team abandons match midway without valid reason</li>
              <li>Team fails to meet minimum player requirements on match day</li>
              <li>Cancellation made less than 3 days before tournament</li>
              <li>No-show on tournament day</li>
            </ul>
          </section>

          <section>
            <h2>8. Partial Tournament Cancellation</h2>
            <p>
              If a tournament is partially completed before being cancelled:
            </p>
            <ul>
              <li>Refund amount will be calculated pro-rata based on matches played</li>
              <li>Minimum 25% of entry fee will be retained for administrative costs</li>
              <li>Refund decision will be communicated within 48 hours</li>
            </ul>
          </section>

          <section>
            <h2>9. Match Abandonment</h2>
            <p>
              If a single match is abandoned due to weather or other factors:
            </p>
            <ul>
              <li>Match will be rescheduled if possible</li>
              <li>No partial refunds for abandoned matches</li>
              <li>Tournament completion takes priority</li>
            </ul>
          </section>

          <section>
            <h2>10. Transfer Policy</h2>
            
            <h3>10.1 Registration Transfer</h3>
            <p>
              Teams can transfer their registration to another team:
            </p>
            <ul>
              <li>Transfer fee: ₹500</li>
              <li>Must be done at least 5 days before tournament</li>
              <li>New team must meet all eligibility criteria</li>
              <li>Transfer request via <Link to="/contact">Contact Us</Link></li>
            </ul>

            <h3>10.2 Player Substitution</h3>
            <p>
              Player substitutions are allowed:
            </p>
            <ul>
              <li>Up to 48 hours before tournament start</li>
              <li>No additional fee</li>
              <li>Maximum 3 player changes per team</li>
              <li>Update via admin or contact us</li>
            </ul>
          </section>

          <section>
            <h2>11. Refund Exceptions</h2>
            <p>
              We reserve the right to make exceptions to this policy in extraordinary circumstances. Each case will be evaluated individually.
            </p>
          </section>

          <section>
            <h2>12. Dispute Resolution</h2>
            <p>
              If you disagree with a refund decision:
            </p>
            <ol>
              <li>Contact us through <Link to="/contact">Contact Us</Link> page</li>
              <li>Provide detailed explanation and supporting documents</li>
              <li>We will review and respond within 5 business days</li>
              <li>Final decision rests with Hit Box Cricket management</li>
            </ol>
          </section>

          <section>
            <h2>13. Contact for Cancellations</h2>
            <p>
              For all cancellation and refund inquiries:
            </p>
            <ul>
              <li>Visit: <Link to="/contact">Contact Us</Link> page</li>
              <li>Provide: Registration ID, Team Name, Contact Details</li>
              <li>Response Time: Within 24-48 hours</li>
            </ul>
          </section>

          <section>
            <h2>14. Policy Updates</h2>
            <p>
              This policy may be updated from time to time. Changes will not affect registrations made before the update date. Check this page regularly for updates.
            </p>
          </section>
        </div>

        <div className="legal-footer">
          <div className="refund-summary">
            <h3>Quick Refund Reference</h3>
            <table className="refund-table">
              <thead>
                <tr>
                  <th>Cancellation Time</th>
                  <th>Refund Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>7+ days before tournament</td>
                  <td>100% refund</td>
                </tr>
                <tr>
                  <td>3-6 days before tournament</td>
                  <td>50% refund</td>
                </tr>
                <tr>
                  <td>Less than 3 days</td>
                  <td>No refund</td>
                </tr>
                <tr>
                  <td>Tournament cancelled by us</td>
                  <td>100% refund or credit</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="legal-links">
            <Link to="/terms">Terms & Conditions</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
