/*
  # Portfolio Website Database Schema

  1. New Tables
    - `profile`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `title` (text)
      - `bio` (text)
      - `value_statement` (text)
      - `email` (text)
      - `linkedin_url` (text)
      - `github_url` (text)
      - `profile_image_url` (text)
      - `resume_pdf_url` (text)
      - `updated_at` (timestamptz)
      
    - `skills`
      - `id` (uuid, primary key)
      - `name` (text)
      - `category` (text) - e.g., "Frontend", "Backend", "Tools"
      - `proficiency` (integer) - 1-5 rating
      - `display_order` (integer)
      - `created_at` (timestamptz)
      
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `tech_stack` (text array)
      - `image_url` (text)
      - `project_url` (text, optional)
      - `github_url` (text, optional)
      - `featured` (boolean)
      - `display_order` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
    - `achievements`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `date_earned` (date)
      - `display_order` (integer)
      - `created_at` (timestamptz)
      
    - `resume_sections`
      - `id` (uuid, primary key)
      - `section_type` (text) - e.g., "education", "experience", "certifications"
      - `title` (text)
      - `organization` (text)
      - `location` (text)
      - `start_date` (text)
      - `end_date` (text)
      - `description` (text)
      - `display_order` (integer)
      - `created_at` (timestamptz)
      
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `read` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for portfolio content
    - Authenticated write access for admin only
    - Contact messages can be inserted by anyone, read by admin only
*/

-- Create profile table
CREATE TABLE IF NOT EXISTS profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  value_statement text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  linkedin_url text DEFAULT '',
  github_url text DEFAULT '',
  profile_image_url text DEFAULT '',
  resume_pdf_url text DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  proficiency integer DEFAULT 3 CHECK (proficiency >= 1 AND proficiency <= 5),
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  tech_stack text[] DEFAULT '{}',
  image_url text DEFAULT '',
  project_url text DEFAULT '',
  github_url text DEFAULT '',
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text DEFAULT '',
  date_earned date DEFAULT CURRENT_DATE,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create resume_sections table
CREATE TABLE IF NOT EXISTS resume_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_type text NOT NULL,
  title text NOT NULL,
  organization text DEFAULT '',
  location text DEFAULT '',
  start_date text DEFAULT '',
  end_date text DEFAULT '',
  description text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Profile policies (public read, authenticated write)
CREATE POLICY "Anyone can view profile"
  ON profile FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can update profile"
  ON profile FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Skills policies (public read, authenticated write)
CREATE POLICY "Anyone can view skills"
  ON skills FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert skills"
  ON skills FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update skills"
  ON skills FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete skills"
  ON skills FOR DELETE
  TO authenticated
  USING (true);

-- Projects policies (public read, authenticated write)
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Achievements policies (public read, authenticated write)
CREATE POLICY "Anyone can view achievements"
  ON achievements FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert achievements"
  ON achievements FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update achievements"
  ON achievements FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete achievements"
  ON achievements FOR DELETE
  TO authenticated
  USING (true);

-- Resume sections policies (public read, authenticated write)
CREATE POLICY "Anyone can view resume sections"
  ON resume_sections FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert resume sections"
  ON resume_sections FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update resume sections"
  ON resume_sections FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete resume sections"
  ON resume_sections FOR DELETE
  TO authenticated
  USING (true);

-- Contact messages policies (anyone can insert, only authenticated can read)
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contact messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);