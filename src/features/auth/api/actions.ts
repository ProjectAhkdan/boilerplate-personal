'use server';

import { redirect } from 'next/navigation';
import { createServerClient } from '@/shared/api/supabase';
import { AuthenticationError, ValidationError } from '@/shared/lib';
import { type LoginInput, loginSchema } from '../model';

/**
 * Login action
 * Server Action untuk authenticate user dengan Supabase Auth
 */
export async function loginAction(input: LoginInput) {
  // Validate input
  const validation = loginSchema.safeParse(input);
  if (!validation.success) {
    throw new ValidationError('Invalid input', validation.error.flatten().fieldErrors);
  }

  const { email, password } = validation.data;
  const supabase = await createServerClient();

  // Sign in dengan Supabase Auth
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new AuthenticationError(error.message);
  }

  // Redirect ke admin dashboard setelah login
  redirect('/admin');
}

/**
 * Logout action
 * Server Action untuk sign out user
 */
export async function logoutAction() {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect('/auth/login');
}

/**
 * Get current user
 * Server Action untuk cek session
 */
export async function getCurrentUser() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
