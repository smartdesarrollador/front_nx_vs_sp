'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { publicClient } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import type { SSOValidateResponse } from '@/types/auth';

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL ?? 'http://localhost:3003';

export default function SSOPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ssoToken = searchParams.get('sso_token');

    if (!ssoToken) {
      setError('Token SSO no encontrado en la URL.');
      return;
    }

    publicClient
      .post<SSOValidateResponse>('/auth/sso/validate/', { sso_token: ssoToken })
      .then(({ data }) => {
        setAuth({ access_token: data.access_token, refresh_token: data.refresh_token }, data.user);
        // Persist accessToken in cookie so middleware can read it
        document.cookie = `accessToken=${data.access_token}; path=/; max-age=3600`;
        router.replace('/dashboard');
      })
      .catch(() => {
        setError('El token SSO es inválido o ha expirado. Por favor, inicia sesión de nuevo.');
      });
  }, [searchParams, setAuth, router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-md w-full rounded-xl border border-red-200 bg-white dark:bg-gray-800 p-8 shadow-sm text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Error de autenticación
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <a
            href={HUB_URL}
            className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            Volver al Hub
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Iniciando sesión...</p>
      </div>
    </div>
  );
}
