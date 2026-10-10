import emailjs from '@emailjs/browser'

// Initialize EmailJS with your public key
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

/**
 * Send confirmation email to team captain when registration is confirmed
 * @param {Object} registrationData - The registration data
 * @returns {Promise} - Promise that resolves when email is sent
 */
export const sendConfirmationEmail = async (registrationData) => {
  try {
    // Validate EmailJS configuration
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS not configured. Please add credentials to .env.local')
      throw new Error('EmailJS configuration missing')
    }

    // Extract data
    const {
      captain_email,
      captain_name,
      team_name,
      captain_mobile,
      tournaments,
      team_players,
      payments
    } = registrationData

    // Prepare email parameters
    const templateParams = {
      email: captain_email,  // EmailJS expects "email" not "to_email"
      to_email: captain_email,
      to_name: captain_name,
      team_name: team_name,
      captain_name: captain_name,
      captain_mobile: captain_mobile,
      tournament_name: tournaments?.name || 'N/A',
      tournament_venue: tournaments?.venue || 'N/A',
      tournament_date: tournaments?.start_date 
        ? new Date(tournaments.start_date).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })
        : 'N/A',
      player_count: team_players?.length || 0,
      amount_paid: payments?.[0]?.amount || 0,
      registration_id: registrationData.id,
      status: 'Confirmed',
      message: `Your team "${team_name}" has been successfully confirmed for ${tournaments?.name || 'the tournament'}!`
    }

    console.log('📧 Sending confirmation email to:', captain_email)
    console.log('📋 Email parameters:', templateParams)

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )

    console.log('✅ Email sent successfully:', response)
    return { success: true, response }

  } catch (error) {
    console.error('❌ Failed to send email:', error)
    throw error
  }
}

/**
 * Send rejection/cancellation email
 * @param {Object} registrationData - The registration data
 * @returns {Promise} - Promise that resolves when email is sent
 */
export const sendCancellationEmail = async (registrationData) => {
  try {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS not configured')
      throw new Error('EmailJS configuration missing')
    }

    const {
      captain_email,
      captain_name,
      team_name,
      tournaments
    } = registrationData

    const templateParams = {
      email: captain_email,  // EmailJS expects "email" not "to_email"
      to_email: captain_email,
      to_name: captain_name,
      team_name: team_name,
      captain_name: captain_name,
      tournament_name: tournaments?.name || 'N/A',
      status: 'Cancelled',
      message: `We regret to inform you that your team "${team_name}" registration has been cancelled. If you believe this is a mistake, please contact us.`
    }

    console.log('📧 Sending cancellation email to:', captain_email)

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    )

    console.log('✅ Cancellation email sent:', response)
    return { success: true, response }

  } catch (error) {
    console.error('❌ Failed to send cancellation email:', error)
    throw error
  }
}
