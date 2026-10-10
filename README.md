# Hit Box Cricket - Team Registration & Payment System

A complete Box Cricket team registration system with Razorpay payment integration built with React, Vite, and Supabase.

## Features

- 🏏 **Team Registration**: Complete team registration flow with captain and player details
- 👥 **Player Management**: Add, edit, and remove players (11-15 players per team)
- 🏆 **Tournament Selection**: Choose from available tournaments
- 💳 **Secure Payments**: Razorpay integration with server-side verification
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- 👨‍💼 **Admin Dashboard**: Manage registrations, view payments, and oversee tournaments
- 🔒 **Security**: Row Level Security (RLS) with Supabase, server-side payment verification

## Tech Stack

- **Frontend**: React 19, Vite, React Router
- **Backend**: Supabase (Database + Edge Functions)
- **Payments**: Razorpay
- **Styling**: Custom CSS with CSS Variables

## Prerequisites

- Node.js (v18 or higher)
- Supabase account
- Razorpay account

## Setup Instructions

### 1. Clone and Install

```bash
npm install
```

### 2. Supabase Setup

1. Create a new project on [Supabase](https://supabase.com)
2. Run the migration file to create tables:
   - Go to SQL Editor in Supabase Dashboard
   - Copy and paste the contents of `supabase/migrations/001_create_teams_and_payments.sql`
   - Execute the SQL

3. Set up Edge Functions:
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Login to Supabase
   supabase login
   
   # Link your project
   supabase link --project-ref your-project-ref
   
   # Deploy Edge Functions
   supabase functions deploy create-razorpay-order
   supabase functions deploy verify-razorpay-payment
   ```

4. Set Edge Function secrets:
   ```bash
   supabase secrets set RAZORPAY_KEY_ID=your_razorpay_key_id
   supabase secrets set RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

### 3. Razorpay Setup

1. Create an account on [Razorpay](https://razorpay.com)
2. Get your API keys from Dashboard > Settings > API Keys
3. Use Test Mode keys for development

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

**Important**: 
- Never expose `RAZORPAY_KEY_SECRET` in frontend code
- The secret key is only used in Supabase Edge Functions

### 5. Add Sample Tournament Data

Run this in Supabase SQL Editor to add a sample tournament:

```sql
INSERT INTO tournaments (name, description, entry_fee, start_date, venue, max_teams, status)
VALUES (
  'Summer Box Cricket League 2024',
  'Annual summer tournament with exciting prizes',
  2500.00,
  '2024-06-01 09:00:00+00',
  'City Sports Complex',
  16,
  'upcoming'
);
```

### 6. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## Project Structure

```
hitboxcricket/
├── src/
│   ├── components/
│   │   └── TeamRegistration/
│   │       ├── TeamDetailsForm.jsx
│   │       ├── PlayersForm.jsx
│   │       ├── TournamentSelection.jsx
│   │       ├── ReviewAndPay.jsx
│   │       └── RegistrationSuccess.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── TeamRegistrationPage.jsx
│   │   ├── RegistrationDetailsPage.jsx
│   │   └── AdminDashboard.jsx
│   ├── lib/
│   │   └── supabase.js
│   ├── config/
│   │   └── registration.js
│   └── styles/
│       ├── registration.css
│       ├── admin.css
│       └── home.css
├── supabase/
│   ├── functions/
│   │   ├── create-razorpay-order/
│   │   └── verify-razorpay-payment/
│   └── migrations/
│       └── 001_create_teams_and_payments.sql
└── .env.local
```

## Payment Flow

1. User completes registration form
2. Team and players are saved to Supabase
3. Frontend calls Edge Function to create Razorpay order
4. Razorpay Checkout modal opens
5. User completes payment
6. Payment response sent to Edge Function for signature verification
7. On successful verification, registration status updated to "confirmed"

## Admin Features

Access the admin dashboard at `/admin`:

- View all registrations
- Filter by tournament, payment status, registration status
- Search by team name, captain name, mobile, or registration ID
- View complete registration and payment details
- Confirm or cancel registrations

## Security Features

- Razorpay secret key never exposed to frontend
- Server-side payment signature verification
- Supabase Row Level Security (RLS) policies
- Environment variables for sensitive data
- Duplicate payment prevention

## Configuration

Edit `src/config/registration.js` to change:

- Minimum/maximum players per team
- Player roles
- Registration states
- Payment statuses

## Testing

Use Razorpay Test Mode for development:

**Test Cards**:
- Success: 4111 1111 1111 1111
- Failure: 4111 1111 1111 1112

Any CVV, any future expiry date, any name.

## Build for Production

```bash
npm run build
npm run preview
```

## Support

For issues and questions, please check:
- [Supabase Documentation](https://supabase.com/docs)
- [Razorpay Documentation](https://razorpay.com/docs/)
- [React Router Documentation](https://reactrouter.com/)

## License

MIT
