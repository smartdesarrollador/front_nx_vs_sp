'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiClient } from '@/lib/api';
import type { CardData } from '../types';

export function useDigitalCard() {
  return useQuery<CardData | null>({
    queryKey: ['digital-card'],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<CardData>('/app/digital/tarjeta/');
        return data;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) return null;
        throw err;
      }
    },
    staleTime: 60_000,
  });
}
