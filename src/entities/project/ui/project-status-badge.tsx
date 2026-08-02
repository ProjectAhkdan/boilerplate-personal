import { cn } from '@/shared/lib';
import type { EntityStatus } from '@/shared/types';

interface ProjectStatusBadgeProps {
  status: EntityStatus;
  className?: string;
}

const statusConfig: Record<EntityStatus, { label: string; className: string }> = {
  draft: {
    label: 'Draft',
    className: 'bg-muted text-muted-foreground',
  },
  published: {
    label: 'Published',
    className: 'bg-success text-success-foreground',
  },
  archived: {
    label: 'Archived',
    className: 'bg-warning text-warning-foreground',
  },
};

/**
 * ProjectStatusBadge - Status indicator badge
 */
export function ProjectStatusBadge({ status, className }: ProjectStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
