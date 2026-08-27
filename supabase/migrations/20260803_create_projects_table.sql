-- Migration: Create projects table
-- Version: 001
-- Date: 2026-08-03

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  content TEXT,
  excerpt VARCHAR(500),
  featured_image_url TEXT,
  demo_url TEXT,
  github_url TEXT,
  tags TEXT[] DEFAULT '{}',
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for fast lookup
CREATE INDEX idx_projects_slug ON public.projects(slug);

-- Create index on status for filtering
CREATE INDEX idx_projects_status ON public.projects(status);

-- Create index on published_at for sorting
CREATE INDEX idx_projects_published_at ON public.projects(published_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Public read access untuk published projects
CREATE POLICY "Public read access for published projects"
  ON public.projects
  FOR SELECT
  USING (status = 'published');

-- RLS Policy: Authenticated users (owner) full access
-- Note: Single-user portfolio - all authenticated users have full access
-- For multi-user scenarios, add user_id column and ownership checks
CREATE POLICY "Authenticated users full access"
  ON public.projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
