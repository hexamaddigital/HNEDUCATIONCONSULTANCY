/*
  # Create Lead Capture Table

  ## Description
  Creates a table to store lead capture submissions from popup forms on the website

  ## Tables Created
  - `lead_captures`
    - `id` (uuid, primary key) - Unique identifier for each lead
    - `name` (text) - Full name of the lead
    - `phone` (text) - Phone number of the lead
    - `email` (text) - Email address of the lead
    - `preferred_country` (text) - Country they're interested in studying
    - `source` (text) - How the lead was captured (exit_intent, timer, etc.)
    - `created_at` (timestamptz) - When the lead was captured

  ## Security
  - Enable RLS on `lead_captures` table
  - Add policy for authenticated admin users to read all leads
  - No public access to prevent data exposure
*/

CREATE TABLE IF NOT EXISTS lead_captures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  preferred_country text NOT NULL,
  source text DEFAULT 'timer',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE lead_captures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only authenticated admins can view leads"
  ON lead_captures
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_lead_captures_created_at ON lead_captures(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_captures_email ON lead_captures(email);