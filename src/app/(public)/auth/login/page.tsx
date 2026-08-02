import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/features/auth';
import { LoginForm } from '@/features/auth/ui';

/**
 * Login Page
 * Route: /auth/login
 */
export default async function LoginPage() {
  // Kalau sudah login, redirect ke admin
  const user = await getCurrentUser();
  if (user) {
    redirect('/admin');
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}

export const metadata = {
  title: 'Login',
  description: 'Admin login',
};
