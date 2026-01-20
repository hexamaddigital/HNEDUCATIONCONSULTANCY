/*
  # Create Trending Courses Table

  1. New Tables
    - `trending_courses`
      - `id` (uuid, primary key) - Unique identifier for each course
      - `name` (text) - Course name
      - `description` (text) - Detailed course description
      - `icon_name` (text) - Name of the Lucide icon to use
      - `average_salary` (text) - Salary range for the course
      - `duration` (text) - Course duration
      - `skills` (jsonb) - Array of skills taught in the course
      - `created_at` (timestamptz) - Timestamp of creation
      - `updated_at` (timestamptz) - Timestamp of last update
    
    - `course_countries`
      - `id` (uuid, primary key) - Unique identifier
      - `course_id` (uuid, foreign key) - Reference to trending_courses
      - `country_code` (text) - Country code (e.g., 'USA', 'UK', 'Canada')
      - `country_name` (text) - Full country name
      - `display_order` (int) - Order to display the course for this country
      - `created_at` (timestamptz) - Timestamp of creation
  
  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (courses are public information)
    - Only authenticated admins can modify (for future admin panel)

  3. Indexes
    - Add index on country_code for fast filtering
    - Add index on course_id for fast joins
*/

-- Create trending_courses table
CREATE TABLE IF NOT EXISTS trending_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon_name text NOT NULL DEFAULT 'GraduationCap',
  average_salary text NOT NULL,
  duration text NOT NULL,
  skills jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create course_countries junction table
CREATE TABLE IF NOT EXISTS course_countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES trending_courses(id) ON DELETE CASCADE,
  country_code text NOT NULL,
  country_name text NOT NULL,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(course_id, country_code)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_course_countries_country_code ON course_countries(country_code);
CREATE INDEX IF NOT EXISTS idx_course_countries_course_id ON course_countries(course_id);
CREATE INDEX IF NOT EXISTS idx_course_countries_display_order ON course_countries(country_code, display_order);

-- Enable RLS
ALTER TABLE trending_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_countries ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view trending courses"
  ON trending_courses FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view course countries"
  ON course_countries FOR SELECT
  TO anon, authenticated
  USING (true);

-- Future admin policies (currently no one can insert/update/delete)
CREATE POLICY "Only authenticated users can manage courses"
  ON trending_courses FOR ALL
  TO authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Only authenticated users can manage course countries"
  ON course_countries FOR ALL
  TO authenticated
  USING (false)
  WITH CHECK (false);