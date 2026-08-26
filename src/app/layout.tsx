import type { Metadata } from 'next';
import { QueryProvider } from '@/shared/api/query-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Adan - Portfolio',
  description: 'Personal portfolio showcasing web development projects and professional experience',
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
