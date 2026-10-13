# Razorpay Integration Setup Guide

## ✅ What's Been Done

The Razorpay payment gateway has been **fully integrated** into your Hit Box Cricket registration system, replacing the UPI screenshot upload method.

### Changes Made:
1. ✅ Updated `.env.local` - Added Razorpay API key placeholders
2. ✅ Updated `registration.js` - Changed payment method to 'razorpay'
3. ✅ Updated `TeamRegistrationPage.jsx` - Now uses ReviewAndPay component
4. ✅ Razorpay Edge Functions - Already implemented and ready
5. ✅ Payment flow - Automatic verification, no manual screenshot upload

---

## 🔑 Step 1: Get Your Razorpay API Keys

### 1. Login to Razorpay Dashboard
Go to: https://dashboard.razorpay.com/

### 2. Get Live API Keys
1. Navigate to **Settings → API Keys**
2. Under **Live Mode**, click **Generate Key**
3. You'll get two keys:
   - **Key ID** (starts with `rzp_live_`)
   - **Key Secret** (keep this secret!)

### 3. Copy Your Keys
- **Key ID**: `rzp_live_XXXXXXXXXXXX`
- **Key Secret**: `XXXXXXXXXXXXXXXXXXXXXXXX`

---

## ⚙️ Step 2: Configure Frontend (.env.local)

Open `.env.local` and replace the placeholders:

```bash
# Razorpay Configuration (LIVE MODE)
VITE_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXX
VITE_RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
```

**Important**: 
- Only the **Key ID** is used in the frontend
- The **Key Secret** is used in Supabase Edge Functions (backend)
- Never expose your Key Secret in the frontend code

---

## 🚀 Step 3: Configure Supabase Edge Functions

### Option 1: Using Supabase CLI (Recommended)

```bash
# Set Razorpay Key ID
supabase secrets set RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXX

# Set Razorpay Key Secret
supabase secrets set RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
```

### Option 2: Using Supabase Dashboard

1. Go to: https://supabase.com/dashboard/project/bbehffcrbrcnzeypfxjf/settings/functions
2. Click on **Edge Functions** → **Secrets**
3. Add two secrets:
   - Key: `RAZORPAY_KEY_ID`, Value: Your Key ID
   - Key: `RAZORPAY_KEY_SECRET`, Value: Your Key Secret

---

## 🔒 Step 4: Deploy Supabase Edge Functions

### Deploy the Functions:

```bash
# Deploy create-razorpay-order function
supabase functions deploy create-razorpay-order

# Deploy verify-razorpay-payment function
supabase functions deploy verify-razorpay-payment
```

### Verify Deployment:
Go to: https://supabase.com/dashboard/project/bbehffcrbrcnzeypfxjf/functions

You should see both functions listed.

---

## 🧪 Step 5: Testing

### Test Mode (Optional)
If you want to test without live payments first:

1. Open `src/config/registration.js`
2. Change `TESTING_MODE: false` to `TESTING_MODE: true`
3. This will simulate payments without calling Razorpay

### Live Testing Checklist:

1. ✅ Start the dev server: `npm run dev`
2. ✅ Go to registration page
3. ✅ Fill in team details
4. ✅ Add players
5. ✅ Select tournament
6. ✅ Click "Pay ₹XXX"
7. ✅ Razorpay checkout should open
8. ✅ Complete test payment (use test cards)
9. ✅ Verify payment is recorded in database

### Razorpay Test Cards:

**Success:**
- Card: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

**Failure:**
- Card: `4000 0000 0000 0002`

More test cards: https://razorpay.com/docs/payments/payments/test-card-upi-details/

---

## 📊 How Payment Flow Works

### User Journey:
1. **User fills registration form**
2. **Clicks "Pay" button**
3. **Razorpay checkout modal opens**
4. **User completes payment** (Card/UPI/Net Banking/Wallet)
5. **Payment is verified automatically**
6. **Registration status set to "confirmed"**
7. **User sees success page**
8. **Email notification sent** (if EmailJS configured)

### Backend Flow:
1. `create-razorpay-order` Edge Function creates order
2. Frontend opens Razorpay checkout with order ID
3. User completes payment in Razorpay
4. `verify-razorpay-payment` Edge Function verifies signature
5. Database updated with payment details
6. Team status changed to "confirmed"

---

## 🎛️ Admin Panel Features

### Payment Verification:
- ✅ Automatic payment verification (no manual checking)
- ✅ View payment ID and status
- ✅ See transaction details
- ✅ Confirm/Cancel registrations if needed

### Payment Statuses:
- **Pending**: Order created, payment not completed
- **Paid**: Payment successful and verified
- **Failed**: Payment failed or verification failed

---

## 🔐 Security Features

✅ **Server-side signature verification** - Prevents payment tampering  
✅ **Environment variables** - Keys not exposed in code  
✅ **HTTPS only** - Razorpay requires secure connection  
✅ **Webhook support** - Can add webhooks for additional verification  

---

## 🚨 Troubleshooting

### Problem: "Failed to load Razorpay"
**Solution**: Check internet connection, try refreshing the page

### Problem: "Payment verification failed"
**Solution**: 
- Verify Razorpay Key Secret is set in Supabase
- Check Edge Function logs
- Ensure functions are deployed

### Problem: "Order creation failed"
**Solution**:
- Check Razorpay API keys are correct
- Verify Edge Function has correct environment variables
- Check Razorpay dashboard for API issues

### Check Edge Function Logs:
```bash
supabase functions logs create-razorpay-order
supabase functions logs verify-razorpay-payment
```

Or in dashboard: https://supabase.com/dashboard/project/bbehffcrbrcnzeypfxjf/logs/edge-functions

---

## 📋 Configuration Checklist

Before going live, ensure:

- [ ] Live Razorpay API keys added to `.env.local`
- [ ] Razorpay secrets set in Supabase Edge Functions
- [ ] Both Edge Functions deployed
- [ ] `TESTING_MODE: false` in `registration.js`
- [ ] Test payment completed successfully
- [ ] Email notifications working (EmailJS configured)
- [ ] Admin panel shows payments correctly
- [ ] Legal pages reviewed (terms, privacy, refund policy)

---

## 💰 Payment Methods Supported

Via Razorpay, you support:
- ✅ **Credit/Debit Cards** (Visa, Mastercard, RuPay, Amex)
- ✅ **UPI** (GPay, PhonePe, Paytm, etc.)
- ✅ **Net Banking** (All major banks)
- ✅ **Wallets** (Paytm, PhonePe, Mobikwik, etc.)
- ✅ **EMI** (if enabled in Razorpay)

---

## 📞 Support

### Razorpay Support:
- Email: support@razorpay.com
- Docs: https://razorpay.com/docs/

### Your Implementation:
- Edge Functions: `supabase/functions/create-razorpay-order/` & `verify-razorpay-payment/`
- Frontend: `src/components/TeamRegistration/ReviewAndPay.jsx`
- Config: `src/config/registration.js`

---

## 🎉 You're All Set!

Once you add your Razorpay API keys and deploy the Edge Functions, your payment system is production-ready!

**Next Steps:**
1. Add your Razorpay API keys
2. Deploy Edge Functions
3. Test the payment flow
4. Go live! 🚀
