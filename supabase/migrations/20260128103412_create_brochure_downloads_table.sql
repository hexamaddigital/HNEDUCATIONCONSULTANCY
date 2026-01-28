/*
  # Create brochure_downloads table

  1. New Tables
    - `brochure_downloads`
      - `id` (uuid, primary key) - Unique identifier for each download request
      - `name` (text) - Full name of the person
      - `email` (text) - Email address
      - `phone` (text) - Phone number
      - `country` (text) - Country for which brochure was requested
      - `created_at` (timestamptz) - Timestamp of the request

  2. Security
    - Enable RLS on `brochure_downloads` table
    - Add policy for authenticated admin users to view all download requests
    - Add policy for anyone to insert their download request (public access needed for form submission)
*/

CREATE TABLE IF NOT EXISTS brochure_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  country text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE brochure_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit brochure download requests"
  ON brochure_downloads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all brochure downloads"
  ON brochure_downloads
  FOR SELECT
  TO authenticated
  USING (true);
