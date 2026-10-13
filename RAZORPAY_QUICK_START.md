# Razorpay Integration - Quick Start

## ⚡ Quick Setup (3 Steps)

### Step 1: Add API Keys to .env.local

```bash
VITE_RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_ID
VITE_RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET
```

### Step 2: Set Supabase Secrets

```bash
supabase secrets set RAZORPAY_KEY_ID=rzp_live_YOUR_KEY_ID
supabase secrets set RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET
```

### Step 3: Deploy Edge Functions

```bash
supabase functions deploy create-razorpay-order
supabase functions deploy verify-razorpay-payment
```

---

## ✅ What Changed

| Before | After |
|--------|-------|
| UPI QR code + screenshot upload | Razorpay payment gateway |
| Manual payment verification | Automatic verification |
| Pending status until admin checks | Instant confirmation |
| Screenshot storage needed | No file uploads |

---

## 🔑 Get Your Razorpay Keys

1. Go to: https://dashboard.razorpay.com/app/keys
2. Click "Generate Live Keys"
3. Copy **Key ID** and **Key Secret**

---

## 🧪 Test Mode

Want to test first? In `src/config/registration.js`:

```javascript
TESTING_MODE: true  // Simulates payments without Razorpay
```

Set to `false` for production.

---

## 📱 Payment Methods Now Supported

✅ Credit/Debit Cards  
✅ UPI (GPay, PhonePe, Paytm)  
✅ Net Banking  
✅ Wallets (Paytm, Mobikwik)  

---

## 🎯 User Flow

1. User registers team → Adds players → Selects tournament
2. Clicks "Pay ₹XXX"
3. Razorpay modal opens
4. User completes payment
5. **Instant confirmation** ✅
6. Email sent automatically

---

## 📁 Files Modified

- ✅ `.env.local` - Added Razorpay keys
- ✅ `src/config/registration.js` - Changed to razorpay
- ✅ `src/pages/TeamRegistrationPage.jsx` - Uses ReviewAndPay
- ✅ Edge functions already implemented

---

## 🚀 Ready to Go Live?

1. ✅ Add live API keys
2. ✅ Deploy Edge Functions
3. ✅ Set TESTING_MODE to false
4. ✅ Test payment flow
5. ✅ Launch! 🎉

---

See **RAZORPAY_SETUP_GUIDE.md** for detailed instructions.
