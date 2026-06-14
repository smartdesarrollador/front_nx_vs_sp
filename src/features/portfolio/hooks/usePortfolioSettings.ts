'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import type { PortfolioThemeColors } from '../types';

const QK = ['portfolio-settings'];

export function usePortfolioSettings() {
  return useQuery<{ id: string; theme_colors: PortfolioThemeColors }>({
    queryKey: QK,
    queryFn: () => apiClient.get('/app/digital/portfolio-settings/').then((r) => r.data),
    staleTime: 60_000,
  });
}

export function useSavePortfolioSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { theme_colors: PortfolioThemeColors }) =>
      apiClient.post('/app/digital/portfolio-settings/', payload).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  });
}
