/*
  # Add email column to students table

  ## Changes
  - Add nullable `email` text column to `students` table
  - This allows the admin panel to display student emails without needing
    to join against auth.users (which is not accessible from the client)
  - Existing rows will have NULL email until they next update their profile
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'students' AND column_name = 'email'
  ) THEN
    ALTER TABLE students ADD COLUMN email text;
  END IF;
END $$;
