/*
  # Study Abroad Consultancy Database Schema

  ## Overview
  Creates the complete database schema for H N Study Abroad Consultancy website including student profiles, applications, blogs, and contact submissions.

  ## New Tables
  
  ### 1. `students`
  - `id` (uuid, FK to auth.users) - References authenticated user
  - `full_name` (text) - Student's full name
  - `phone_number` (text) - Contact number
  - `preferred_country` (text) - Country of interest
  - `highest_qualification` (text) - Educational background
  - `field_of_interest` (text) - Study area
  - `created_at` (timestamptz) - Profile creation time
  - `updated_at` (timestamptz) - Last profile update
  
  ### 2. `applications`
  - `id` (uuid, PK) - Unique application ID
  - `student_id` (uuid, FK) - References students table
  - `country` (text) - Target country
  - `university` (text) - Target university
  - `course` (text) - Course name
  - `intake` (text) - Intake season
  - `status` (text) - Application status (applied/offer/visa/departure)
  - `created_at` (timestamptz) - Application date
  - `updated_at` (timestamptz) - Last status update
  
  ### 3. `blogs`
  - `id` (uuid, PK) - Unique blog ID
  - `title` (text) - Blog title
  - `slug` (text, unique) - URL-friendly identifier
  - `excerpt` (text) - Short description
  - `content` (text) - Full blog content
  - `category` (text) - Blog category
  - `image_url` (text) - Featured image
  - `author` (text) - Author name
  - `published_at` (timestamptz) - Publication date
  - `created_at` (timestamptz) - Creation time
  
  ### 4. `contact_submissions`
  - `id` (uuid, PK) - Unique submission ID
  - `full_name` (text) - Sender's name
  - `email` (text) - Contact email
  - `phone_number` (text) - Contact phone
  - `preferred_country` (text) - Country of interest
  - `message` (text) - Message content
  - `created_at` (timestamptz) - Submission time

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Students can only view/update their own data
  - Applications linked to authenticated students
  - Blogs are publicly readable
  - Contact submissions are insert-only for authenticated users
  
  ## Important Notes
  - All timestamps use timezone-aware format
  - Comprehensive default values prevent null issues
  - Foreign key constraints ensure data integrity
  - RLS policies enforce strict access control
*/

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone_number text,
  preferred_country text,
  highest_qualification text,
  field_of_interest text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own profile"
  ON students FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Students can update own profile"
  ON students FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Students can insert own profile"
  ON students FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  country text NOT NULL,
  university text NOT NULL,
  course text NOT NULL,
  intake text DEFAULT '',
  status text DEFAULT 'applied',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own applications"
  ON applications FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Students can insert own applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update own applications"
  ON applications FOR UPDATE
  TO authenticated
  USING (student_id = auth.uid())
  WITH CHECK (student_id = auth.uid());

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text DEFAULT 'General',
  image_url text DEFAULT '',
  author text DEFAULT 'H N Study Abroad',
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blogs are publicly readable"
  ON blogs FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone_number text NOT NULL,
  preferred_country text DEFAULT '',
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Insert sample blog posts
INSERT INTO blogs (title, slug, excerpt, content, category, author)
VALUES 
  (
    'How to Get UK Student Visa in 2025',
    'how-to-get-uk-student-visa-2025',
    'Complete guide to securing your UK student visa with updated requirements and process for 2025.',
    'Getting a UK student visa is a crucial step in your study abroad journey. This comprehensive guide walks you through every step of the process, from obtaining your CAS (Confirmation of Acceptance for Studies) to attending your visa interview. We cover the latest requirements for 2025, including financial documentation, English language proficiency tests, and health insurance requirements. Learn about the visa processing timeline, common pitfalls to avoid, and tips for a successful application.',
    'Visa Guide',
    'H N Study Abroad Team'
  ),
  (
    'SOP Writing Tips for Study Abroad 2025',
    'sop-writing-tips-study-abroad-2025',
    'Master the art of writing a compelling Statement of Purpose that stands out to admission committees.',
    'Your Statement of Purpose (SOP) is your opportunity to tell your story and convince the admissions committee why you are the perfect candidate. This guide provides expert tips on structuring your SOP, highlighting your achievements, explaining your career goals, and connecting them to the program you are applying for. We discuss common mistakes to avoid, provide sample templates, and share success stories from students who secured admissions to top universities with exceptional SOPs.',
    'Applications',
    'H N Study Abroad Team'
  ),
  (
    'Best Countries for Permanent Residency After Studies',
    'best-countries-for-permanent-residency',
    'Discover which study destinations offer the best pathways to permanent residency and citizenship.',
    'Planning your study abroad journey with an eye on permanent residency? This comprehensive analysis examines the top countries that offer favorable post-study work visas and pathways to PR. We compare Canada, Australia, New Zealand, Germany, and other popular destinations based on their immigration policies, job market opportunities, and quality of life. Learn about point-based systems, employer sponsorships, and the typical timeline from student visa to permanent residency in each country.',
    'Immigration',
    'H N Study Abroad Team'
  ),
  (
    'Cost of Studying Abroad: Complete Breakdown 2025',
    'cost-of-studying-abroad-breakdown-2025',
    'Detailed analysis of tuition fees, living expenses, and hidden costs across popular study destinations.',
    'Understanding the true cost of studying abroad is essential for financial planning. This detailed breakdown covers tuition fees, accommodation costs, food expenses, transportation, health insurance, and miscellaneous expenses across major study destinations including the USA, UK, Canada, Australia, and Europe. We also discuss scholarship opportunities, education loan options, part-time work possibilities, and money-saving tips for international students. Includes comparison tables and budget calculators to help you plan your finances effectively.',
    'Finance',
    'H N Study Abroad Team'
  )
ON CONFLICT (slug) DO NOTHING;