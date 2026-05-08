/*
  # Fix Admin Panel RLS Policies

  ## Problems Fixed
  1. contact_submissions - No SELECT policy existed, so admin could never read submissions
  2. students - SELECT policy only allowed own row, admin couldn't see all students
  3. lead_captures - No INSERT policy, so lead capture forms couldn't save data
  4. contact_submissions - No DELETE policy, so admin couldn't delete entries

  ## Changes
  - Add SELECT policy on contact_submissions for authenticated users
  - Add DELETE policy on contact_submissions for authenticated users
  - Add admin SELECT policy on students (reads all rows when authenticated)
  - Add INSERT policy on lead_captures for anyone (public form submission)
  - Add DELETE policy on lead_captures for authenticated users
*/

-- contact_submissions: add SELECT for authenticated users (admin reads)
CREATE POLICY "Authenticated users can view contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

-- contact_submissions: add DELETE for authenticated users (admin deletes)
CREATE POLICY "Authenticated users can delete contact submissions"
  ON contact_submissions FOR DELETE
  TO authenticated
  USING (true);

-- students: add SELECT for authenticated users so admin can see all students
-- (existing policy only allows users to see their own row)
CREATE POLICY "Authenticated users can view all students"
  ON students FOR SELECT
  TO authenticated
  USING (true);

-- students: add DELETE for authenticated users (admin deletes)
CREATE POLICY "Authenticated users can delete students"
  ON students FOR DELETE
  TO authenticated
  USING (true);

-- lead_captures: add INSERT for anonymous users (public form submission)
CREATE POLICY "Anyone can submit lead capture form"
  ON lead_captures FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- lead_captures: add DELETE for authenticated users (admin deletes)
CREATE POLICY "Authenticated users can delete leads"
  ON lead_captures FOR DELETE
  TO authenticated
  USING (true);
