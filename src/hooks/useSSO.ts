'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { publicClient } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import type { SSOValidateResponse } from '@/types/auth';

export function useSSO(locale: string): { error: string | null } {
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
        document.cookie = `accessToken=${data.access_token}; path=/; max-age=3600`;
        router.replace(`/${locale}/dashboard`);
      })
      .catch(() => {
        setError('El token SSO es inválido o ha expirado. Por favor, inicia sesión de nuevo.');
      });
  }, [searchParams, setAuth, router, locale]);

  return { error };
}
