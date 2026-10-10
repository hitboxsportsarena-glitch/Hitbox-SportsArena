-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Anyone can view tournaments" ON tournaments;

-- Create more permissive policies for tournaments
-- Note: In production, you should add authentication and restrict these to admin users only

-- Allow anyone to view tournaments
CREATE POLICY "Anyone can view tournaments" ON tournaments
  FOR SELECT USING (true);

-- Allow anyone to insert tournaments (in production, restrict to admin only)
CREATE POLICY "Anyone can insert tournaments" ON tournaments
  FOR INSERT WITH CHECK (true);

-- Allow anyone to update tournaments (in production, restrict to admin only)
CREATE POLICY "Anyone can update tournaments" ON tournaments
  FOR UPDATE USING (true);

-- Allow anyone to delete tournaments (in production, restrict to admin only)
CREATE POLICY "Anyone can delete tournaments" ON tournaments
  FOR DELETE USING (true);
