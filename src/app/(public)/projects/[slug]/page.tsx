import { notFound } from 'next/navigation';
import { ProjectRepository } from '@/entities/project';
import { createServerClient } from '@/shared/api/supabase';
import { NotFoundError } from '@/shared/lib';
import { ProjectDetailWidget } from '@/widgets/projects';

// Force dynamic rendering (skip static generation untuk template)
export const dynamic = 'force-dynamic';

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * Project Detail Page
 * Route: /projects/[slug]
 * Dynamic rendering (no static generation untuk template boilerplate)
 */
export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const supabase = await createServerClient();
  const repository = new ProjectRepository(supabase);

  try {
    const project = await repository.findBySlug(slug);

    // Kalau project draft dan user bukan owner, 404
    // (RLS sudah handle ini, tapi buat explicit check)
    if (project.status !== 'published') {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-12">
        <ProjectDetailWidget project={project} />
      </div>
    );
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    }
    throw error;
  }
}

// TODO: Uncomment setelah Supabase configured
// export async function generateStaticParams() { ... }
// export async function generateMetadata({ params }: ProjectDetailPageProps) { ... }
