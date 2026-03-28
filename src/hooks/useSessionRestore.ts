'use client';

import { useEffect } from 'react';
import { publicClient, apiClient } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import type { User } from '@/types/auth';

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL ?? 'http://localhost:5175';

export function useSessionRestore(): void {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    if (isAuthenticated) return;

    const refresh = localStorage.getItem('refreshToken');
    if (!refresh) {
      window.location.href = `${HUB_URL}/login?next=vista`;
      return;
    }

    publicClient
      .post<{ access_token: string; refresh_token: string }>('/auth/refresh-token', {
        refresh_token: refresh,
      })
      .then(({ data }) => {
        setAccessToken(data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        document.cookie = `accessToken=${data.access_token}; path=/; max-age=3600`;

        return apiClient.get<{ user: User }>('/auth/profile/').then(({ data }) => {
          setUser(data.user);
        });
      })
      .catch(() => {
        clearAuth();
        window.location.href = `${HUB_URL}/login?next=vista`;
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
