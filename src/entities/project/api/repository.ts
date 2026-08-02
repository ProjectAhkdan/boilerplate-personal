import type { SupabaseClient } from '@supabase/supabase-js';
import { DatabaseError, NotFoundError } from '@/shared/lib';
import type { CreateProjectDto, Project, ProjectFilter, UpdateProjectDto } from '../model';

/**
 * Project Repository
 * Data access layer untuk entity Project
 */
export class ProjectRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  /**
   * Get all projects dengan filter
   */
  async findMany(filter?: ProjectFilter): Promise<Project[]> {
    try {
      let query = this.supabase.from('projects').select('*').order('published_at', {
        ascending: false,
        nullsFirst: false,
      });

      // Apply filters
      if (filter?.status) {
        query = query.eq('status', filter.status);
      }

      if (filter?.tags && filter.tags.length > 0) {
        query = query.contains('tags', filter.tags);
      }

      if (filter?.search) {
        query = query.or(
          `title.ilike.%${filter.search}%,description.ilike.%${filter.search}%,content.ilike.%${filter.search}%`,
        );
      }

      const { data, error } = await query;

      if (error) {
        throw new DatabaseError('Failed to fetch projects', error);
      }

      return data as Project[];
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError('Unexpected error fetching projects', error);
    }
  }

  /**
   * Get project by slug
   */
  async findBySlug(slug: string): Promise<Project> {
    try {
      const { data, error } = await this.supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new NotFoundError('Project');
        }
        throw new DatabaseError('Failed to fetch project', error);
      }

      return data as Project;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof DatabaseError) throw error;
      throw new DatabaseError('Unexpected error fetching project', error);
    }
  }

  /**
   * Get project by ID
   */
  async findById(id: string): Promise<Project> {
    try {
      const { data, error } = await this.supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new NotFoundError('Project');
        }
        throw new DatabaseError('Failed to fetch project', error);
      }

      return data as Project;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof DatabaseError) throw error;
      throw new DatabaseError('Unexpected error fetching project', error);
    }
  }

  /**
   * Create new project
   */
  async create(dto: CreateProjectDto): Promise<Project> {
    try {
      const { data, error } = await this.supabase
        .from('projects')
        .insert({
          ...dto,
          // Auto-set published_at jika status published tapi published_at kosong
          published_at:
            dto.status === 'published' && !dto.published_at
              ? new Date().toISOString()
              : dto.published_at,
        })
        .select()
        .single();

      if (error) {
        throw new DatabaseError('Failed to create project', error);
      }

      return data as Project;
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError('Unexpected error creating project', error);
    }
  }

  /**
   * Update existing project
   */
  async update(dto: UpdateProjectDto): Promise<Project> {
    try {
      const { id, ...updateData } = dto;

      const { data, error } = await this.supabase
        .from('projects')
        .update({
          ...updateData,
          // Auto-set published_at jika status berubah ke published
          ...(updateData.status === 'published' && !updateData.published_at
            ? { published_at: new Date().toISOString() }
            : {}),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          throw new NotFoundError('Project');
        }
        throw new DatabaseError('Failed to update project', error);
      }

      return data as Project;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof DatabaseError) throw error;
      throw new DatabaseError('Unexpected error updating project', error);
    }
  }

  /**
   * Delete project
   */
  async delete(id: string): Promise<void> {
    try {
      const { error } = await this.supabase.from('projects').delete().eq('id', id);

      if (error) {
        throw new DatabaseError('Failed to delete project', error);
      }
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError('Unexpected error deleting project', error);
    }
  }

  /**
   * Get all unique tags dari projects yang published
   */
  async getAllTags(): Promise<string[]> {
    try {
      const { data, error } = await this.supabase
        .from('projects')
        .select('tags')
        .eq('status', 'published');

      if (error) {
        throw new DatabaseError('Failed to fetch tags', error);
      }

      // Flatten dan deduplicate tags
      const allTags = data.flatMap((project) => project.tags || []);
      return [...new Set(allTags)].sort();
    } catch (error) {
      if (error instanceof DatabaseError) throw error;
      throw new DatabaseError('Unexpected error fetching tags', error);
    }
  }
}
