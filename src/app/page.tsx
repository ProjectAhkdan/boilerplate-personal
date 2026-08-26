import Link from 'next/link';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Portfolio Boilerplate</CardTitle>
          <CardDescription>
            Next.js 16 + Supabase + FSD Architecture — Tahap 3 Complete
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Domain referensi <strong>Project</strong> end-to-end selesai: migration + RLS, entities,
            repository, views, routes. Siap sebagai pola untuk entity lain.
          </p>
          <div className="flex gap-2">
            <Link href="/projects">
              <Button variant="primary">View Projects</Button>
            </Link>
            <Link href="/projects/portfolio-boilerplate">
              <Button variant="outline">Sample Project</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
