import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Portfolio Boilerplate</CardTitle>
          <CardDescription>
            Next.js 16 + Supabase + FSD Architecture — Tahap 2 Complete
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Shared foundation siap: design tokens, UI primitives, env helper, Supabase client, error
            classes, logger, dan utilities.
          </p>
          <div className="flex gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
