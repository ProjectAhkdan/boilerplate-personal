import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/entities/project';
import { formatDate } from '@/shared/lib';
import { Button } from '@/shared/ui';

interface ProjectDetailViewProps {
  project: Project;
}

/**
 * ProjectDetailView - View untuk menampilkan detail project
 */
export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  return (
    <article className="mx-auto max-w-4xl">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold">{project.title}</h1>
        {project.published_at && (
          <p className="mt-2 text-sm text-muted-foreground">
            Published on {formatDate(project.published_at)}
          </p>
        )}
        {project.description && (
          <p className="mt-4 text-lg text-muted-foreground">{project.description}</p>
        )}
      </header>

      {/* Featured Image */}
      {project.featured_image_url && (
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={project.featured_image_url}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      )}

      {/* Links */}
      {(project.demo_url || project.github_url) && (
        <div className="mb-8 flex gap-4">
          {project.demo_url && (
            <Button asChild variant="primary">
              <Link href={project.demo_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Link>
            </Button>
          )}
          {project.github_url && (
            <Button asChild variant="outline">
              <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                GitHub
              </Link>
            </Button>
          )}
        </div>
      )}

      {/* Tags */}
      {project.tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      {project.content && (
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {/* TODO: Render markdown di Tahap lanjutan, untuk sekarang plain text */}
          <div className="whitespace-pre-wrap">{project.content}</div>
        </div>
      )}
    </article>
  );
}
