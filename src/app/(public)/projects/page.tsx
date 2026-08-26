import { ProjectRepository } from '@/entities/project';
import { createServerClient } from '@/shared/api/supabase';
import { ProjectsListWidget } from '@/widgets/projects';

/**
 * Projects List Page
 * Route: /projects
 */
export default async function ProjectsPage() {
  const supabase = await createServerClient();
  const repository = new ProjectRepository(supabase);

  // Fetch published projects only (RLS akan filter otomatis untuk guest)
  const projects = await repository.findMany({ status: 'published' });

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold">Projects</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore my latest work and side projects
        </p>
      </header>

      <ProjectsListWidget projects={projects} />
    </div>
  );
}

export const metadata = {
  title: 'Projects',
  description: 'Explore my latest work and side projects',
};
