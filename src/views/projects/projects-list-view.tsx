import type { Project } from '@/entities/project';
import { ProjectCard } from '@/entities/project';

interface ProjectsListViewProps {
  projects: Project[];
}

/**
 * ProjectsListView - View untuk menampilkan list projects
 */
export function ProjectsListView({ projects }: ProjectsListViewProps) {
  if (projects.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold">No projects found</h3>
          <p className="mt-2 text-sm text-muted-foreground">Check back later for new projects.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
