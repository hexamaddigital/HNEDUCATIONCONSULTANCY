/*
  # Create Job Openings Table

  1. New Tables
    - `job_openings`
      - `id` (uuid, primary key) - Unique identifier for each job
      - `title` (text) - Job position title (e.g., "CNC Operators/Programmers")
      - `salary_min` (integer) - Minimum salary in GBP
      - `salary_max` (integer) - Maximum salary in GBP
      - `location` (text) - Job location (e.g., "United Kingdom")
      - `qualification` (text) - Required qualifications
      - `experience_years` (integer) - Minimum years of experience required
      - `criteria` (text[]) - Array of applicant criteria
      - `package_charge` (integer) - Service charge in INR lakhs
      - `registration_fee` (integer) - Initial registration fee in INR
      - `image_url` (text) - URL to job opening image
      - `is_active` (boolean) - Whether the job is currently active
      - `created_at` (timestamptz) - When the job was created
      - `updated_at` (timestamptz) - When the job was last updated
      - `display_order` (integer) - Order in which to display jobs

  2. Security
    - Enable RLS on `job_openings` table
    - Add policy for public read access to active jobs
    - Add policy for authenticated admins to manage jobs
*/

CREATE TABLE IF NOT EXISTS job_openings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  salary_min integer NOT NULL,
  salary_max integer NOT NULL,
  location text NOT NULL DEFAULT 'United Kingdom',
  qualification text NOT NULL,
  experience_years integer NOT NULL DEFAULT 3,
  criteria text[] NOT NULL,
  package_charge integer NOT NULL DEFAULT 15,
  registration_fee integer NOT NULL DEFAULT 25000,
  image_url text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  display_order integer DEFAULT 0
);

ALTER TABLE job_openings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active job openings"
  ON job_openings
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all job openings"
  ON job_openings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert job openings"
  ON job_openings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update job openings"
  ON job_openings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete job openings"
  ON job_openings
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_job_openings_active ON job_openings(is_active);
CREATE INDEX IF NOT EXISTS idx_job_openings_display_order ON job_openings(display_order);
