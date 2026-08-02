import type { Metadata } from 'next';
import { QueryProvider } from '@/shared/api/query-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio Boilerplate',
  description: 'Production-ready Next.js 16 + Supabase portfolio starter',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
