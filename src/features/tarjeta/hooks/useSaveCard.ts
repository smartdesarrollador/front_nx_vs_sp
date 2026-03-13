'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import type { CardFormData, CardData } from '../types';

export function useSaveCard() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CardFormData) =>
      apiClient.post<CardData>('/app/digital/tarjeta/', payload).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['digital-card'] });
      qc.invalidateQueries({ queryKey: ['digital-profile'] });
    },
  });
}
