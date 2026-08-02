'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

/**
 * TanStack Query provider
 * Wrap app dengan ini untuk enable React Query hooks
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Stale time: data dianggap fresh untuk 1 menit
            staleTime: 60 * 1000,
            // Cache time: simpan unused data di cache untuk 5 menit
            gcTime: 5 * 60 * 1000,
            // Retry: 1x saja untuk menghindari spam
            retry: 1,
            // Refetch on window focus di-disable (bisa enable per-query kalau perlu)
            refetchOnWindowFocus: false,
          },
          mutations: {
            // Retry: tidak retry mutation secara default (destructive operations)
            retry: false,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
