'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import type { PortfolioItem, PortfolioPayload } from '../types';

interface UpdateItemInput {
  uuid: string;
  payload: PortfolioPayload;
}

export function useUpdateItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ uuid, payload }: UpdateItemInput) =>
      apiClient
        .patch<PortfolioItem>(`/app/digital/portafolio/${uuid}/`, payload)
        .then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['portfolio-items'] });
    },
  });
}
