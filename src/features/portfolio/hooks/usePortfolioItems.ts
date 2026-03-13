'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiClient } from '@/lib/api';
import type { PublicProfile } from '@/types/digital';
import type { PortfolioItem } from '../types';

interface PortfolioResponse {
  profile: PublicProfile;
  items: PortfolioItem[];
}

export function usePortfolioItems() {
  return useQuery<PortfolioResponse | null>({
    queryKey: ['portfolio-items'],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<PortfolioResponse>('/app/digital/portafolio/');
        return data;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) return null;
        throw err;
      }
    },
    staleTime: 60_000,
  });
}
