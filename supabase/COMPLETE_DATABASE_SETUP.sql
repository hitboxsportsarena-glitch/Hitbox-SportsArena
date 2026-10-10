-- =====================================================
-- HIT BOX CRICKET - COMPLETE DATABASE SETUP
-- Run this entire file in a new Supabase project
-- =====================================================

-- =====================================================
-- 1. CREATE TABLES
-- =====================================================

-- Create tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  entry_fee DECIMAL(10, 2) NOT NULL,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  venue TEXT,
  max_teams INTEGER,
  status TEXT DEFAULT 'upcoming',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name TEXT NOT NULL,
  captain_name TEXT NOT NULL,
  captain_mobile TEXT NOT NULL,
  captain_email TEXT NOT NULL,
  alternate_mobile TEXT,
  city TEXT,
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE,
  registration_status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create team_players table
CREATE TABLE IF NOT EXISTS team_players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  player_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  role TEXT,
  jersey_number INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  razorpay_order_id TEXT UNIQUE,
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_status TEXT DEFAULT 'pending',
  registration_status TEXT DEFAULT 'pending_payment',
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 2. CREATE INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_teams_tournament ON teams(tournament_id);
CREATE INDEX IF NOT EXISTS idx_teams_registration_status ON teams(registration_status);
CREATE INDEX IF NOT EXISTS idx_team_players_team ON team_players(team_id);
CREATE INDEX IF NOT EXISTS idx_payments_team ON payments(team_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_payments_razorpay_order ON payments(razorpay_order_id);

-- =====================================================
-- 3. CREATE FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 4. CREATE TRIGGERS
-- =====================================================

CREATE TRIGGER update_tournaments_updated_at BEFORE UPDATE ON tournaments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 5. ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 6. CREATE RLS POLICIES (OPEN FOR TESTING)
-- =====================================================
-- NOTE: In production, restrict these to authenticated users/admin only

-- Tournaments policies
CREATE POLICY "Anyone can view tournaments" ON tournaments
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert tournaments" ON tournaments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update tournaments" ON tournaments
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete tournaments" ON tournaments
  FOR DELETE USING (true);

-- Teams policies
CREATE POLICY "Anyone can view teams" ON teams
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert teams" ON teams
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update teams" ON teams
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete teams" ON teams
  FOR DELETE USING (true);

-- Team players policies
CREATE POLICY "Anyone can view team players" ON team_players
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert team players" ON team_players
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update team players" ON team_players
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete team players" ON team_players
  FOR DELETE USING (true);

-- Payments policies
CREATE POLICY "Anyone can view payments" ON payments
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert payments" ON payments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update payments" ON payments
  FOR UPDATE USING (true);

CREATE POLICY "Anyone can delete payments" ON payments
  FOR DELETE USING (true);

-- =====================================================
-- 7. CREATE STORAGE BUCKET FOR PAYMENT SCREENSHOTS
-- =====================================================

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

-- =====================================================
-- 8. INSERT SAMPLE DATA (OPTIONAL)
-- =====================================================

-- Insert sample tournament
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

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
-- Next steps:
-- 1. Update your .env.local with new Supabase credentials
-- 2. Deploy edge functions if using Razorpay
-- 3. Test the registration flow
-- =====================================================
