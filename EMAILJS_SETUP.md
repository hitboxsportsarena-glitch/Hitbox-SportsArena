# EmailJS Setup Guide

## 📧 Email Notification System

When admin confirms or cancels a registration, an automatic email is sent to the team captain's email address.

---

## 🚀 Setup Instructions

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (It's FREE!)
3. Create your account with email/Google

---

### Step 2: Create Email Service

1. After login, go to **Email Services** tab
2. Click **"Add New Service"**
3. Choose your email provider (Gmail recommended):
   - **Gmail**: Easy setup, works great
   - **Outlook**: Also supported
   - **Other**: SMTP configuration available
4. Click **"Connect Account"**
5. Follow the prompts to authorize
6. Copy the **Service ID** (looks like: `service_abc123`)

---

### Step 3: Create Email Template

1. Go to **Email Templates** tab
2. Click **"Create New Template"**
3. **Template Name**: `Team Registration Confirmation`
4. **Template Content** (use these variables):

```
Subject: Team Registration {{status}} - {{team_name}}

Hello {{to_name}},

{{message}}

Registration Details:
- Team Name: {{team_name}}
- Captain: {{captain_name}}
- Mobile: {{captain_mobile}}
- Tournament: {{tournament_name}}
- Venue: {{tournament_venue}}
- Date: {{tournament_date}}
- Total Players: {{player_count}}
- Amount Paid: ₹{{amount_paid}}
- Registration ID: {{registration_id}}

Thank you for registering with Hit Box Cricket!

Best regards,
Hit Box Cricket Team
```

5. **Test the template** with sample data
6. Click **"Save"**
7. Copy the **Template ID** (looks like: `template_xyz789`)

---

### Step 4: Get Public Key

1. Go to **Account** > **General**
2. Find **"Public Key"** section
3. Copy your **Public Key** (looks like: `AbCdEf123XyZ`)

---

### Step 5: Update .env.local

1. Open `.env.local` file in your project
2. Replace the placeholder values:

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc123     # From Step 2
VITE_EMAILJS_TEMPLATE_ID=template_xyz789   # From Step 3
VITE_EMAILJS_PUBLIC_KEY=AbCdEf123XyZ       # From Step 4
```

3. **Save the file**
4. **Restart the dev server** (Ctrl+C, then `npm run dev`)

---

## 📋 Email Template Variables

These variables are automatically populated when sending emails:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{to_email}}` | Recipient email | captain@example.com |
| `{{to_name}}` | Captain name | John Doe |
| `{{team_name}}` | Team name | Warriors XI |
| `{{captain_name}}` | Captain name | John Doe |
| `{{captain_mobile}}` | Mobile number | 9876543210 |
| `{{tournament_name}}` | Tournament name | Summer Cricket League 2024 |
| `{{tournament_venue}}` | Venue | City Sports Complex |
| `{{tournament_date}}` | Start date | 1 June 2024 |
| `{{player_count}}` | Number of players | 12 |
| `{{amount_paid}}` | Entry fee paid | 5000 |
| `{{registration_id}}` | Unique ID | abc-123-xyz |
| `{{status}}` | Confirmed/Cancelled | Confirmed |
| `{{message}}` | Custom message | Your team has been confirmed! |

---

## 🧪 Testing

### Test Email Sending:

1. **Create a test registration** on your website
2. Go to **Admin Dashboard** (`/admin`, PIN: 8499963878)
3. Find the test registration
4. Click **"View"**
5. Click **"Confirm Registration"**
6. Check the captain's email inbox

**Expected Result:**
- ✅ Status updates to "confirmed"
- ✅ Email is sent to captain's email
- ✅ Success message appears
- ✅ Email contains all registration details

---

## 🎨 Customize Email Template (Optional)

### Add Logo:
```html
<img src="YOUR_LOGO_URL" alt="Logo" style="width: 150px; margin-bottom: 20px;">
```

### Add Colors:
```html
<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; color: white; border-radius: 10px;">
  <h1>Registration {{status}}!</h1>
  <p>{{message}}</p>
</div>
```

### Add Footer:
```html
<hr>
<p style="color: #888; font-size: 12px;">
  This is an automated email from Hit Box Cricket. Please do not reply.
  Visit our website: hitboxcricket.com
</p>
```

---

## 📊 EmailJS Free Tier Limits

| Feature | Free Plan |
|---------|-----------|
| Emails per month | 200 |
| Rate limit | 1 email/second |
| Email templates | Unlimited |
| Email services | 2 services |

**Note**: For high-volume tournaments, consider upgrading to a paid plan.

---

## ⚠️ Troubleshooting

### Email Not Sending?

**1. Check Console Errors:**
- Open browser console (F12)
- Look for email-related errors
- Check if EmailJS credentials are loaded

**2. Verify Configuration:**
```javascript
console.log('Service ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID)
console.log('Template ID:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID)
console.log('Public Key:', import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
```

**3. Check EmailJS Dashboard:**
- Go to EmailJS > History
- See if email was received by EmailJS
- Check delivery status

**4. Email Service Connected?**
- Verify Gmail/Outlook is connected
- Re-authorize if needed
- Check spam folder

**5. Template Variables Match?**
- Ensure template uses exact variable names
- Test template in EmailJS dashboard
- Check for typos in variable names

---

## 🔒 Security Notes

**EmailJS Public Key:**
- ✅ Safe to expose in frontend code
- ✅ Used only for sending emails
- ✅ Cannot read your inbox
- ✅ Rate limited by EmailJS

**Best Practices:**
- Don't store sensitive data in emails
- Use EmailJS dashboard to monitor usage
- Enable CAPTCHA if needed (EmailJS feature)
- Set up domain restrictions in EmailJS settings

---

## 📧 Email Triggers

| Action | Email Sent | Recipient |
|--------|------------|-----------|
| Admin clicks "Confirm Registration" | ✅ Confirmation email | Captain's email |
| Admin clicks "Cancel Registration" | ✅ Cancellation email | Captain's email |
| User submits payment | ❌ No email (pending) | - |

**Future Enhancement:**
- Send "Payment Received" email on submission
- Send reminder emails before tournament
- Send updates when tournament details change

---

## ✅ Checklist

Before going live, verify:

- [ ] EmailJS account created
- [ ] Email service connected (Gmail/Outlook)
- [ ] Email template created and tested
- [ ] Service ID added to .env.local
- [ ] Template ID added to .env.local
- [ ] Public Key added to .env.local
- [ ] Dev server restarted
- [ ] Test email sent successfully
- [ ] Email received in inbox (not spam)
- [ ] Email content looks good
- [ ] All variables populated correctly

---

## 🎉 You're All Set!

Once configured, emails will be sent automatically when admin confirms or cancels registrations.

**Need Help?**
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: support@emailjs.com

---

*Last Updated: Current Session*  
*Status: ✅ Ready to configure*
