import { z } from 'zod';

/**
 * Project validation schemas
 */

export const projectStatusSchema = z.enum(['draft', 'published', 'archived']);

export const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(255, 'Slug too long')
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().max(1000, 'Description too long').optional(),
  content: z.string().optional(),
  excerpt: z.string().max(500, 'Excerpt too long').optional(),
  featured_image_url: z.string().url('Invalid image URL').optional().or(z.literal('')),
  demo_url: z.string().url('Invalid demo URL').optional().or(z.literal('')),
  github_url: z.string().url('Invalid GitHub URL').optional().or(z.literal('')),
  tags: z.array(z.string().min(1)).default([]),
  status: projectStatusSchema.default('draft'),
  published_at: z.string().datetime().optional(),
});

export const updateProjectSchema = createProjectSchema.partial().extend({
  id: z.string().uuid('Invalid project ID'),
});

export const projectFilterSchema = z.object({
  status: projectStatusSchema.optional(),
  tags: z.array(z.string()).optional(),
  search: z.string().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectFilterInput = z.infer<typeof projectFilterSchema>;
