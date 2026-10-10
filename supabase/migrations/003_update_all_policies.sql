-- Update RLS policies for all tables to allow operations
-- Note: In production, these should be restricted to authenticated users/admin only

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can view their own teams" ON teams;
DROP POLICY IF EXISTS "Users can insert their own teams" ON teams;
DROP POLICY IF EXISTS "Users can update their own teams" ON teams;

DROP POLICY IF EXISTS "Anyone can view team players" ON team_players;
DROP POLICY IF EXISTS "Users can insert team players" ON team_players;
DROP POLICY IF EXISTS "Users can update team players" ON team_players;
DROP POLICY IF EXISTS "Users can delete team players" ON team_players;

DROP POLICY IF EXISTS "Users can view payments" ON payments;
DROP POLICY IF EXISTS "Users can insert payments" ON payments;
DROP POLICY IF EXISTS "Users can update payments" ON payments;

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
