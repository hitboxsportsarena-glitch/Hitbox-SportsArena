# 📋 Razorpay Setup - TODO Checklist

## ✅ What's Already Done (By Me)

- [x] Removed UPI screenshot upload system
- [x] Integrated Razorpay checkout component
- [x] Created payment order Edge Function
- [x] Created payment verification Edge Function
- [x] Updated configuration to use Razorpay
- [x] Updated registration flow
- [x] Created comprehensive documentation
- [x] Tested code structure

---

## 📝 What YOU Need to Do

### 1. Get Razorpay API Keys ⏱️ 5 minutes

- [ ] Go to https://dashboard.razorpay.com/
- [ ] Login to your Razorpay account
- [ ] Navigate to **Settings → API Keys**
- [ ] Click **Generate Live Keys** (if not already generated)
- [ ] Copy **Key ID** (starts with `rzp_live_`)
- [ ] Copy **Key Secret** (keep it secret!)

---

### 2. Update .env.local File ⏱️ 2 minutes

- [ ] Open `c:\Users\saile\Desktop\hitboxcricket\.env.local`
- [ ] Find these lines:
  ```bash
  VITE_RAZORPAY_KEY_ID=your_live_key_id_here
  VITE_RAZORPAY_KEY_SECRET=your_live_key_secret_here
  ```
- [ ] Replace with your actual keys:
  ```bash
  VITE_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXX
  VITE_RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
  ```
- [ ] Save the file
- [ ] Restart dev server: Stop and run `npm run dev` again

---

### 3. Configure Supabase Secrets ⏱️ 3 minutes

Open PowerShell in your project directory and run:

- [ ] Set Razorpay Key ID:
  ```bash
  supabase secrets set RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXX
  ```

- [ ] Set Razorpay Key Secret:
  ```bash
  supabase secrets set RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXXXXXXXX
  ```

- [ ] Verify secrets are set:
  ```bash
  supabase secrets list
  ```

---

### 4. Deploy Edge Functions ⏱️ 5 minutes

- [ ] Deploy create-razorpay-order function:
  ```bash
  supabase functions deploy create-razorpay-order
  ```

- [ ] Deploy verify-razorpay-payment function:
  ```bash
  supabase functions deploy verify-razorpay-payment
  ```

- [ ] Verify deployment in Supabase Dashboard:
  - Go to: https://supabase.com/dashboard/project/bbehffcrbrcnzeypfxjf/functions
  - Check both functions are listed and deployed

---

### 5. Test the Payment Flow ⏱️ 10 minutes

#### Option A: Test Mode First (Recommended)
- [ ] Open `src/config/registration.js`
- [ ] Set `TESTING_MODE: true`
- [ ] Run through registration
- [ ] Payment should simulate without calling Razorpay
- [ ] Verify success page appears
- [ ] Check database for registration

#### Option B: Use Razorpay Test Cards
- [ ] Set `TESTING_MODE: false`
- [ ] Go through registration flow
- [ ] Use test card: `4111 1111 1111 1111`
- [ ] CVV: Any 3 digits
- [ ] Expiry: Any future date
- [ ] Complete payment
- [ ] Verify registration confirmed

---

### 6. Verify Admin Panel ⏱️ 3 minutes

- [ ] Go to `/admin` (enter PIN: 8499963878)
- [ ] Check if payment details show correctly
- [ ] Verify payment ID is displayed
- [ ] Verify payment status shows as "paid"
- [ ] Check if email was sent (if EmailJS configured)

---

### 7. Production Checklist ⏱️ 5 minutes

Before going live:

- [ ] Verify `.env.local` has LIVE Razorpay keys (not test keys)
- [ ] Set `TESTING_MODE: false` in `src/config/registration.js`
- [ ] Test with small real payment
- [ ] Verify payment appears in Razorpay dashboard
- [ ] Verify database updated correctly
- [ ] Verify email notification sent
- [ ] Test on mobile device
- [ ] Test different payment methods (UPI, Card, Wallet)

---

### 8. Razorpay Dashboard Setup ⏱️ 10 minutes

- [ ] Complete KYC verification (if not done)
- [ ] Add bank account for settlements
- [ ] Set up payment methods (enable/disable as needed)
- [ ] Configure webhook (optional):
  - URL: `https://bbehffcrbrcnzeypfxjf.supabase.co/functions/v1/razorpay-webhook`
  - Events: `payment.authorized`, `payment.failed`
- [ ] Set up brand colors/logo in Razorpay dashboard
- [ ] Test payment on Razorpay test mode

---

### 9. Final Deployment ⏱️ 5 minutes

- [ ] Commit changes to Git:
  ```bash
  git add .
  git commit -m "Integrate Razorpay payment gateway"
  git push
  ```

- [ ] Deploy to Vercel (if using):
  - Vercel will auto-deploy from GitHub
  - OR manually: `vercel --prod`

- [ ] Add environment variables to Vercel:
  - Go to Vercel project settings
  - Add `VITE_RAZORPAY_KEY_ID`
  - Add `VITE_RAZORPAY_KEY_SECRET`
  - Redeploy

---

### 10. Post-Deployment Verification ⏱️ 10 minutes

- [ ] Visit live site
- [ ] Test complete registration flow
- [ ] Make test payment
- [ ] Verify payment in Razorpay dashboard
- [ ] Check database for registration
- [ ] Verify email sent
- [ ] Test on mobile
- [ ] Share with a friend to test

---

## ⏰ Total Estimated Time: ~60 minutes

---

## 🚨 Troubleshooting

### "Failed to load Razorpay"
- Check `.env.local` has correct Key ID
- Refresh browser
- Check console for errors

### "Order creation failed"
- Verify Edge Functions deployed
- Check Supabase secrets are set correctly
- View Edge Function logs: `supabase functions logs create-razorpay-order`

### "Payment verification failed"
- Check Key Secret is correct in Supabase
- View logs: `supabase functions logs verify-razorpay-payment`
- Verify signature validation logic

### Payment successful but not showing in database
- Check Edge Function logs
- Verify database permissions (RLS policies)
- Check Supabase project connection

---

## 📚 Documentation Reference

- **Setup Guide**: `RAZORPAY_SETUP_GUIDE.md` - Detailed instructions
- **Quick Start**: `RAZORPAY_QUICK_START.md` - Quick reference
- **Integration Summary**: `RAZORPAY_INTEGRATION_SUMMARY.md` - Overview
- **Migration Details**: `PAYMENT_MIGRATION_COMPLETE.md` - What changed

---

## 📞 Support Resources

- **Razorpay Docs**: https://razorpay.com/docs/
- **Razorpay Support**: support@razorpay.com
- **Razorpay Test Cards**: https://razorpay.com/docs/payments/payments/test-card-upi-details/
- **Supabase Functions**: https://supabase.com/docs/guides/functions

---

## ✅ Mark Your Progress

As you complete each section, check it off! You're almost there! 🚀

**Current Status**: Configuration & Testing Required
**Next Step**: Add your Razorpay API keys to `.env.local`

---

**Let's get your payment system live! Start with Step 1 above.** 🎉
