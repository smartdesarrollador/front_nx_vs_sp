'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiClient } from '@/lib/api';
import type { PublicCVResponse } from '@/types/digital';

export function useCVDocument() {
  return useQuery<PublicCVResponse | null>({
    queryKey: ['cv-document'],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<PublicCVResponse>('/app/digital/cv/');
        return data;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) return null;
        throw err;
      }
    },
    staleTime: 60_000,
  });
}
