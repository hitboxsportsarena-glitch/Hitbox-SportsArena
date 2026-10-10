# UPI Payment System Setup Complete! 🎉

## What Changed:

✅ **Removed Razorpay** - No more complex gateway integration
✅ **Added UPI QR Code** - Users can scan and pay directly
✅ **Added Manual Verification** - Admin reviews payments before confirming
✅ **Payment Screenshots** - Users upload proof of payment

## How It Works:

### User Flow:
1. User fills team registration (team details + players + tournament)
2. User reaches payment page with:
   - **QR Code** to scan with any UPI app
   - **UPI ID** to copy/paste: `ch.sudharaghavi@okicici`
   - **Open UPI App** button for mobile users
3. After payment, user enters:
   - Transaction ID / UTR number
   - Uploads payment screenshot
4. Registration status: **"Pending Payment Verification"**
5. Admin verifies payment → Confirms registration
6. User receives confirmation email

### Admin Flow:
1. Go to `/admin` dashboard
2. See all registrations with payment status
3. View payment screenshot and transaction ID
4. Verify payment in bank/UPI app
5. Click **"Confirm Registration"** button
6. Status changes to "Confirmed"

## Setup Steps:

### 1. Run SQL in Supabase (REQUIRED)
Go to Supabase SQL Editor and run:

```sql
-- Create storage bucket for payment screenshots
INSERT INTO storage.buckets (id, name, public)
VALUES ('payments', 'payments', false)
ON CONFLICT (id) DO NOTHING;

-- Allow uploads
CREATE POLICY "Anyone can upload payment screenshots"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'payments');

-- Allow viewing
CREATE POLICY "Anyone can view payment screenshots"
ON storage.objects FOR SELECT
USING (bucket_id = 'payments');
```

### 2. Test the Flow
1. Go to http://localhost:5175/register
2. Fill in team details
3. Add 2+ players
4. Select tournament
5. You'll see UPI payment page with QR code
6. Enter any transaction ID (for testing)
7. Upload any image (for testing)
8. Submit - Registration created with "Pending" status

### 3. Admin Verification
1. Go to http://localhost:5175/admin
2. Find the registration
3. Click "View" to see payment details
4. See transaction ID and screenshot
5. Confirm or reject the payment

## UPI Details:
- **UPI ID**: ch.sudharaghavi@okicici
- **Name**: Hit Box Cricket
- Users can scan QR or use UPI ID directly

## Benefits:
- ✅ No Razorpay fees
- ✅ Instant QR code generation
- ✅ Works with ALL UPI apps (GPay, PhonePe, Paytm, etc.)
- ✅ Admin has full control
- ✅ Payment proof stored in database

## Notes:
- Payments need manual verification (24 hours)
- Users get confirmation email after admin approval
- Transaction IDs are stored for reference
- Screenshots stored in Supabase storage
