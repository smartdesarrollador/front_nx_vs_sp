'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiClient } from '@/lib/api';
import type { DigitalProfile } from '@/types/digital';

export function useServiceStatus() {
  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ['digital-profile'],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<DigitalProfile>('/app/digital/profile/');
        return data;
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 404) return null;
        throw err;
      }
    },
    staleTime: 60_000,
  });

  return { profile: profile ?? null, isLoading, isError };
}
