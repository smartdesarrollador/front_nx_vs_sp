'use client';

import { use } from 'react';
import { useSSO } from '@/hooks/useSSO';
import { AuthError } from '@/components/auth/AuthError';
import { SSOCallbackPage } from '@/components/auth/SSOCallbackPage';

interface SSOPageProps {
  params: Promise<{ locale: string }>;
}

export default function SSOPage({ params }: SSOPageProps) {
  const { locale } = use(params);
  const { error } = useSSO(locale);

  if (error) return <AuthError message={error} />;
  return <SSOCallbackPage />;
}
