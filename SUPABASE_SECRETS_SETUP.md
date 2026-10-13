# Supabase Secrets Setup - Manual Method

## ⚠️ CLI Not Working - Use Dashboard Instead

Since the Supabase CLI doesn't have the necessary permissions, you'll set up the secrets manually through the Supabase Dashboard.

---

## 📝 Your Razorpay Keys (Ready to Use)

**Key ID**: `rzp_live_TnOaxmBWyYb0je`  
**Key Secret**: `kwbd6NtB4gpRyfVFYwsAk4pF`

---

## 🔧 Step-by-Step: Set Secrets in Supabase Dashboard

### Step 1: Go to Edge Functions Settings

1. Open this URL: https://supabase.com/dashboard/project/bbehffcrbrcnzeypfxjf/settings/functions
2. Or navigate manually:
   - Go to https://supabase.com/dashboard
   - Select your project: **bbehffcrbrcnzeypfxjf**
   - Click **Edge Functions** in the left sidebar
   - Click **Settings** or **Secrets** tab

### Step 2: Add RAZORPAY_KEY_ID Secret

1. Click **"Add new secret"** or **"New secret"** button
2. Enter the following:
   - **Name**: `RAZORPAY_KEY_ID`
   - **Value**: `rzp_live_TnOaxmBWyYb0je`
3. Click **"Save"** or **"Add"**

### Step 3: Add RAZORPAY_KEY_SECRET Secret

1. Click **"Add new secret"** or **"New secret"** button again
2. Enter the following:
   - **Name**: `RAZORPAY_KEY_SECRET`
   - **Value**: `kwbd6NtB4gpRyfVFYwsAk4pF`
3. Click **"Save"** or **"Add"**

### Step 4: Verify Secrets

You should now see two secrets listed:
- ✅ `RAZORPAY_KEY_ID`
- ✅ `RAZORPAY_KEY_SECRET`

---

## 🚀 Next: Deploy Edge Functions

After adding the secrets, you need to deploy the Edge Functions. You can do this via the dashboard too:

### Option 1: Deploy via Dashboard (Easier)

1. Go to: https://supabase.com/dashboard/project/bbehffcrbrcnzeypfxjf/functions
2. You should see two functions:
   - `create-razorpay-order`
   - `verify-razorpay-payment`
3. If they're not deployed, you can deploy them from the dashboard

### Option 2: Deploy via CLI (If you have access)

If you have deployment access via CLI, run:

```bash
supabase functions deploy create-razorpay-order --project-ref bbehffcrbrcnzeypfxjf
supabase functions deploy verify-razorpay-payment --project-ref bbehffcrbrcnzeypfxjf
```

---

## ✅ What's Already Done

- [x] Frontend `.env.local` configured with Razorpay keys
- [x] Payment flow updated to use Razorpay
- [x] Edge Functions code ready in `supabase/functions/`
- [ ] **YOU: Add secrets in Supabase Dashboard** ⬅️ Do this now
- [ ] **YOU: Deploy Edge Functions** ⬅️ Do this next

---

## 🧪 Testing Without Edge Functions (Temporary)

If you want to test the frontend UI immediately without waiting for Edge Functions:

1. Open `src/config/registration.js`
2. Change `TESTING_MODE: false` to `TESTING_MODE: true`
3. This will simulate payments without calling Razorpay
4. You can test the complete flow

**Remember to set it back to `false` for production!**

---

## 📞 Need Help?

If you can't access the Supabase Dashboard or don't have permissions:
1. Contact your Supabase project owner
2. Or share access with your team member who can set secrets

---

## 🎯 Summary

**Right now, to complete setup:**

1. **Go to**: https://supabase.com/dashboard/project/bbehffcrbrcnzeypfxjf/settings/functions
2. **Add two secrets**:
   - `RAZORPAY_KEY_ID` = `rzp_live_TnOaxmBWyYb0je`
   - `RAZORPAY_KEY_SECRET` = `kwbd6NtB4gpRyfVFYwsAk4pF`
3. **Deploy the two Edge Functions**
4. **Test the payment flow**

That's it! 🚀
