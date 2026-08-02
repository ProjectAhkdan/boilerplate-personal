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
-- Note: Untuk boilerplate ini, semua authenticated user = owner
-- Di production, tambahkan user_id column dan check ownership
CREATE POLICY "Authenticated users full access"
  ON public.projects
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert sample placeholder data
INSERT INTO public.projects (title, slug, description, content, excerpt, featured_image_url, tags, status, published_at)
VALUES
  (
    'Portfolio Boilerplate',
    'portfolio-boilerplate',
    'A production-ready Next.js 16 + Supabase starter template with Feature-Sliced Design architecture.',
    '# Portfolio Boilerplate\n\nThis is a sample project demonstrating the boilerplate capabilities.\n\n## Features\n\n- Next.js 16 with App Router\n- Supabase for backend\n- TypeScript strict mode\n- Tailwind CSS v4\n- FSD architecture\n\n## Getting Started\n\nClone the repository and follow the setup instructions in README.md.',
    'A production-ready Next.js 16 + Supabase starter template with Feature-Sliced Design architecture.',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop',
    ARRAY['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    'published',
    NOW()
  ),
  (
    'E-Commerce Platform',
    'ecommerce-platform',
    'A modern e-commerce solution built with cutting-edge technologies.',
    '# E-Commerce Platform\n\nFull-featured e-commerce platform with payment integration.\n\n## Tech Stack\n\n- React 19\n- Node.js\n- PostgreSQL\n- Stripe',
    'A modern e-commerce solution built with cutting-edge technologies.',
    'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&auto=format&fit=crop',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    'published',
    NOW() - INTERVAL '7 days'
  ),
  (
    'Task Management App',
    'task-management-app',
    'Collaborative task management tool for remote teams.',
    '# Task Management App\n\nStreamline your team''s workflow with this intuitive task manager.\n\n## Features\n\n- Real-time collaboration\n- Kanban boards\n- Time tracking\n- Reporting',
    'Collaborative task management tool for remote teams.',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop',
    ARRAY['React', 'WebSocket', 'MongoDB'],
    'draft',
    NULL
  );
