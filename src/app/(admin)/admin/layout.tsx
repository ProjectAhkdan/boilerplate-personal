import Link from 'next/link';
import { getCurrentUser, logoutAction } from '@/features/auth';
import { Button } from '@/shared/ui';

/**
 * Admin Layout
 * Wrapper untuk semua halaman admin dengan nav & logout
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Admin Nav */}
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-lg font-semibold">
              Admin Dashboard
            </Link>
            <nav className="flex gap-4">
              <Link
                href="/admin/projects"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Projects
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <form action={logoutAction}>
              <Button type="submit" variant="outline" size="sm">
                Logout
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
