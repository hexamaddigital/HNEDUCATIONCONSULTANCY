/*
  # Create Tourist Visa Applications Table

  1. New Tables
    - `tourist_visa_applications`
      - `id` (uuid, primary key)
      - `name` (text, applicant's full name)
      - `email` (text, applicant's email)
      - `phone` (text, applicant's phone number)
      - `country` (text, destination country)
      - `travel_date` (date, expected travel date)
      - `message` (text, additional information)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `tourist_visa_applications` table
    - Add policy for public inserts (anyone can submit)
    - Add policy for authenticated admin reads
*/

CREATE TABLE IF NOT EXISTS tourist_visa_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  country text NOT NULL,
  travel_date date,
  message text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tourist_visa_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit tourist visa application"
  ON tourist_visa_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view tourist visa applications"
  ON tourist_visa_applications
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_tourist_visa_applications_created_at 
  ON tourist_visa_applications(created_at DESC);
