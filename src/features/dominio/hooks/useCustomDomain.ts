'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiClient } from '@/lib/api';
import type { CustomDomainData } from '../types';

export function useCustomDomain() {
  return useQuery<CustomDomainData | null>({
    queryKey: ['custom-domain'],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<CustomDomainData>('/app/digital/custom-domain/');
        return data;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) return null;
        throw err;
      }
    },
    staleTime: 60_000,
  });
}
