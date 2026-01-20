/*
  # Fix Security Issues - RLS Performance & Indexes

  ## Security Improvements

  ### 1. Add Missing Index
  - Add index on `applications.student_id` foreign key for optimal query performance
  - Improves JOIN performance and foreign key constraint checking

  ### 2. Optimize RLS Policies (Auth Function Caching)
  All RLS policies updated to use `(select auth.uid())` instead of `auth.uid()` 
  to cache the authentication check once per query instead of per row.

  **Tables Updated:**
  - `students` - 3 policies optimized
  - `applications` - 3 policies optimized

  ### 3. Contact Form Policy Review
  The `contact_submissions` policy allows unrestricted INSERT access, which is 
  intentional for public contact forms. This is acceptable for this use case as:
  - Contact forms need to be publicly accessible
  - No sensitive data is exposed
  - Consider implementing rate limiting at the application level

  ## Performance Impact
  - Queries will execute significantly faster at scale
  - Auth function called once per query instead of once per row
  - Index improves JOIN operations and foreign key lookups

  ## Important Notes
  - Auth DB Connection Strategy: Consider switching to percentage-based connection 
    allocation in Supabase dashboard for better scalability
  - These changes are backward compatible
  - No data loss or downtime expected
*/

-- Add index on applications.student_id for optimal performance
CREATE INDEX IF NOT EXISTS idx_applications_student_id 
  ON applications(student_id);

-- Drop existing policies for students table
DROP POLICY IF EXISTS "Students can view own profile" ON students;
DROP POLICY IF EXISTS "Students can update own profile" ON students;
DROP POLICY IF EXISTS "Students can insert own profile" ON students;

-- Recreate students policies with optimized auth function calls
CREATE POLICY "Students can view own profile"
  ON students FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Students can update own profile"
  ON students FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

CREATE POLICY "Students can insert own profile"
  ON students FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = id);

-- Drop existing policies for applications table
DROP POLICY IF EXISTS "Students can view own applications" ON applications;
DROP POLICY IF EXISTS "Students can insert own applications" ON applications;
DROP POLICY IF EXISTS "Students can update own applications" ON applications;

-- Recreate applications policies with optimized auth function calls
CREATE POLICY "Students can view own applications"
  ON applications FOR SELECT
  TO authenticated
  USING (student_id = (select auth.uid()));

CREATE POLICY "Students can insert own applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (student_id = (select auth.uid()));

CREATE POLICY "Students can update own applications"
  ON applications FOR UPDATE
  TO authenticated
  USING (student_id = (select auth.uid()))
  WITH CHECK (student_id = (select auth.uid()));

-- Note: contact_submissions policy allows public access by design
-- This is acceptable for contact forms but consider implementing:
-- 1. Rate limiting at application level
-- 2. CAPTCHA verification
-- 3. Input validation and sanitization
