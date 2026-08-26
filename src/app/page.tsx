import Link from 'next/link';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to My Portfolio</CardTitle>
          <CardDescription>Explore my projects and professional experience</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            A collection of my work showcasing modern web development with Next.js, TypeScript, and
            clean architecture principles.
          </p>
          <div className="flex gap-2">
            <Link href="/projects">
              <Button variant="primary">View Projects</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
