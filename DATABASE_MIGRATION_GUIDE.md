# Database Migration Guide

## How to Move to a New Supabase Database

### Step 1: Create New Supabase Project
1. Go to https://supabase.com/dashboard
2. Click **"New Project"**
3. Fill in:
   - **Name**: hitboxcricket (or any name)
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users
4. Click **"Create new project"**
5. Wait 2-3 minutes for setup to complete

### Step 2: Run the Complete SQL Setup
1. In your new project, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Open the file: `supabase/COMPLETE_DATABASE_SETUP.sql`
4. Copy ALL the SQL code from that file
5. Paste it into the Supabase SQL Editor
6. Click **"Run"** (or press Ctrl+Enter)
7. Wait for success message: "Success. No rows returned"

### Step 3: Get New Credentials
1. In your Supabase project, click **"Settings"** (gear icon in sidebar)
2. Click **"API"**
3. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (the `anon` key under "Project API keys")

### Step 4: Update Your .env.local File
Replace the values in your `.env.local`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=YOUR_NEW_PROJECT_URL
VITE_SUPABASE_ANON_KEY=YOUR_NEW_ANON_KEY

# UPI Payment Configuration
VITE_UPI_ID=ch.sudharaghavi@okicici
VITE_PAYMENT_NAME=Hit Box Cricket
```

### Step 5: Restart Your Dev Server
1. Stop the current server (Ctrl+C)
2. Run: `npm run dev`
3. App will now connect to the new database

### Step 6: Test Everything
1. Go to http://localhost:5175/tournaments
2. Create a new tournament
3. Go to http://localhost:5175/register
4. Test the registration flow
5. Check http://localhost:5175/admin

---

## What Gets Migrated:

✅ All table structures (tournaments, teams, team_players, payments)
✅ All indexes for performance
✅ All triggers (auto-update timestamps)
✅ Row Level Security policies
✅ Storage bucket for payment screenshots
✅ Sample tournament data

---

## Files You Need:

**Main SQL File:**
- `supabase/COMPLETE_DATABASE_SETUP.sql` - Run this in new database

**Edge Functions (if using Razorpay):**
- `supabase/functions/create-razorpay-order/index.ts`
- `supabase/functions/verify-razorpay-payment/index.ts`

**Environment Variables:**
- `.env.local` - Update with new credentials

---

## If You Need to Export Existing Data:

1. In your OLD Supabase project dashboard
2. Go to **Database** → **Backups**
3. Download a backup
4. Or use SQL to export specific data:

```sql
-- Export tournaments
SELECT * FROM tournaments;

-- Export teams
SELECT * FROM teams;

-- Export players
SELECT * FROM team_players;

-- Export payments
SELECT * FROM payments;
```

Then INSERT this data into your new database.

---

## Troubleshooting:

**Issue**: "relation already exists"
- **Solution**: Drop existing tables first, then run the setup

**Issue**: RLS errors when inserting data
- **Solution**: Run these commands:
```sql
ALTER TABLE teams DISABLE ROW LEVEL SECURITY;
ALTER TABLE team_players DISABLE ROW LEVEL SECURITY;
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE tournaments DISABLE ROW LEVEL SECURITY;
```

**Issue**: Storage bucket errors
- **Solution**: Manually create bucket in Supabase dashboard:
  - Go to Storage
  - Create new bucket: "payments"
  - Set public: false

---

## Quick Migration Checklist:

- [ ] Create new Supabase project
- [ ] Run COMPLETE_DATABASE_SETUP.sql
- [ ] Get new project URL and anon key
- [ ] Update .env.local
- [ ] Restart dev server
- [ ] Create test tournament
- [ ] Test registration flow
- [ ] Test admin dashboard
- [ ] Test payment flow

Done! 🎉
