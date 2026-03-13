'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import type { PortfolioItem, PortfolioPayload } from '../types';

export function useCreateItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: PortfolioPayload) =>
      apiClient.post<PortfolioItem>('/app/digital/portafolio/', payload).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['portfolio-items'] });
      qc.invalidateQueries({ queryKey: ['digital-profile'] });
    },
  });
}
