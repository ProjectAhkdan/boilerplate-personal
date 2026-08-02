import type { EntityStatus } from '@/shared/types';

/**
 * Project entity - domain model
 * Representasi proyek di portofolio
 */
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  excerpt: string | null;
  featured_image_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  tags: string[];
  status: EntityStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Project DTO untuk create/update
 */
export interface CreateProjectDto {
  title: string;
  slug: string;
  description?: string;
  content?: string;
  excerpt?: string;
  featured_image_url?: string;
  demo_url?: string;
  github_url?: string;
  tags?: string[];
  status?: EntityStatus;
  published_at?: string;
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {
  id: string;
}

/**
 * Project filter untuk query
 */
export interface ProjectFilter {
  status?: EntityStatus;
  tags?: string[];
  search?: string;
}
