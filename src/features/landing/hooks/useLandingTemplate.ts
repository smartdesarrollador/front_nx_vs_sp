'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiClient } from '@/lib/api';
import type { LandingData } from '../types';

export function useLandingTemplate() {
  return useQuery<LandingData | null>({
    queryKey: ['landing-template'],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<LandingData>('/app/digital/landing/');
        return data;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) return null;
        throw err;
      }
    },
    staleTime: 60_000,
  });
}
