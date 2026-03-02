/*
  # Add source_page column to contact_submissions table

  1. Changes
    - Add `source_page` column to `contact_submissions` table to track which page the inquiry came from
    - Add `job_title` column to store the job position user is applying for (if applicable)
    - Add index on source_page for better query performance
  
  2. Purpose
    - Track whether inquiries come from Work Abroad page, Contact page, or other sources
    - Store job title when user applies for a job
    - Help admin understand inquiry sources better
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'source_page'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN source_page text DEFAULT 'contact';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'job_title'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN job_title text;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_contact_submissions_source_page ON contact_submissions(source_page);