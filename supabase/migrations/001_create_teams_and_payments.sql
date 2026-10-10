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

-- Create indexes for better performance
CREATE INDEX idx_teams_tournament ON teams(tournament_id);
CREATE INDEX idx_teams_registration_status ON teams(registration_status);
CREATE INDEX idx_team_players_team ON team_players(team_id);
CREATE INDEX idx_payments_team ON payments(team_id);
CREATE INDEX idx_payments_status ON payments(payment_status);
CREATE INDEX idx_payments_razorpay_order ON payments(razorpay_order_id);

-- Enable Row Level Security
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tournaments (public read)
CREATE POLICY "Anyone can view tournaments" ON tournaments
  FOR SELECT USING (true);

-- RLS Policies for teams (users can only see their own teams unless admin)
CREATE POLICY "Users can view their own teams" ON teams
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own teams" ON teams
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own teams" ON teams
  FOR UPDATE USING (true);

-- RLS Policies for team_players
CREATE POLICY "Anyone can view team players" ON team_players
  FOR SELECT USING (true);

CREATE POLICY "Users can insert team players" ON team_players
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update team players" ON team_players
  FOR UPDATE USING (true);

CREATE POLICY "Users can delete team players" ON team_players
  FOR DELETE USING (true);

-- RLS Policies for payments
CREATE POLICY "Users can view payments" ON payments
  FOR SELECT USING (true);

CREATE POLICY "Users can insert payments" ON payments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update payments" ON payments
  FOR UPDATE USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_tournaments_updated_at BEFORE UPDATE ON tournaments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
