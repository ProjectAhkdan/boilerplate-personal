import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/shared/api/supabase/middleware';

/**
 * Middleware untuk:
 * 1. Refresh Supabase session otomatis
 * 2. Proteksi route admin (hanya authenticated user)
 */
export async function middleware(request: NextRequest) {
  // Refresh session
  const { supabaseResponse, user } = await updateSession(request);

  // Protected routes: /admin/*
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  if (isAdminRoute && !user) {
    // Redirect ke login kalau belum authenticated
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
