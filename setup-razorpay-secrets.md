# Setup Razorpay Secrets

Run these commands in your terminal (replace with your actual Razorpay secret key):

```bash
supabase secrets set RAZORPAY_KEY_ID=rzp_test_Td4ZIJRNa0i5p3
supabase secrets set RAZORPAY_KEY_SECRET=your_razorpay_secret_key_here
```

To get your Razorpay Secret Key:
1. Go to https://dashboard.razorpay.com/
2. Make sure you're in Test Mode (toggle in top-left)
3. Go to Settings → API Keys
4. Copy the "Key Secret"
5. Paste it in the command above

After running these commands, your Razorpay integration will be fully functional!
