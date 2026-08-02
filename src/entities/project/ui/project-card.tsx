import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/shared/lib';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui';
import type { Project } from '../model';

interface ProjectCardProps {
  project: Project;
}

/**
 * ProjectCard - UI component untuk preview project
 * Dipakai di list/grid view
 */
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="group">
      <Card className="h-full transition-shadow hover:shadow-lg">
        {project.featured_image_url && (
          <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
            <Image
              src={project.featured_image_url}
              alt={project.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="group-hover:text-primary">{project.title}</CardTitle>
          {project.excerpt && (
            <CardDescription className="line-clamp-2">{project.excerpt}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                +{project.tags.length - 3} more
              </span>
            )}
          </div>
          {project.published_at && (
            <p className="mt-4 text-xs text-muted-foreground">{formatDate(project.published_at)}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
