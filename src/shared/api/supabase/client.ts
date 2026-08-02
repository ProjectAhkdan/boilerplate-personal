import { createBrowserClient } from '@supabase/ssr';
import { env } from '@/shared/config/env';

/**
 * Supabase client untuk Client Components
 * Browser-only, tidak bisa dipakai di Server Components
 *
 * @example
 * 'use client'
 * const supabase = createClient();
 * const { data } = await supabase.from('projects').select('*');
 */
export function createClient() {
  return createBrowserClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
