/*
  # Create videos table

  ## Summary
  Stores HN Study Abroad video content (Instagram Reels, YouTube videos)
  for display on the public Videos page and Home page section.

  ## New Tables
  - `videos`
    - `id` (uuid, primary key)
    - `title` (text) — display title shown on the card
    - `description` (text, nullable) — optional short caption
    - `platform` (text) — 'instagram' | 'youtube'
    - `video_id` (text) — the reel/video ID extracted from the URL
      - Instagram: e.g. DVbQDaKjdXo  (from /reel/DVbQDaKjdXo/)
      - YouTube:   e.g. dQw4w9WgXcQ  (from /watch?v=dQw4w9WgXcQ)
    - `original_url` (text) — full original URL for reference and fallback linking
    - `thumbnail_url` (text, nullable) — optional custom thumbnail override
    - `is_active` (boolean, default true) — controls visibility on the site
    - `display_order` (integer, default 0) — manual sort order (lower = first)
    - `created_at` (timestamptz)

  ## Security
  - RLS enabled
  - Public SELECT only for active videos
  - Authenticated users can manage (insert/update/delete)
*/

CREATE TABLE IF NOT EXISTS videos (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title          text NOT NULL DEFAULT '',
  description    text,
  platform       text NOT NULL DEFAULT 'instagram' CHECK (platform IN ('instagram', 'youtube')),
  video_id       text NOT NULL,
  original_url   text NOT NULL DEFAULT '',
  thumbnail_url  text,
  is_active      boolean NOT NULL DEFAULT true,
  display_order  integer NOT NULL DEFAULT 0,
  created_at     timestamptz DEFAULT now()
);

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Anyone can view active videos
CREATE POLICY "Public can view active videos"
  ON videos FOR SELECT
  USING (is_active = true);

-- Authenticated users (admins) can view all videos
CREATE POLICY "Authenticated users can view all videos"
  ON videos FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert videos
CREATE POLICY "Authenticated users can insert videos"
  ON videos FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update videos
CREATE POLICY "Authenticated users can update videos"
  ON videos FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete videos
CREATE POLICY "Authenticated users can delete videos"
  ON videos FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_videos_active_order ON videos (is_active, display_order ASC);
