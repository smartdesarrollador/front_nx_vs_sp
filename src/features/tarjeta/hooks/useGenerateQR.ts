'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import type { QRResponse } from '../types';

export function useGenerateQR() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () =>
      apiClient.post<QRResponse>('/app/digital/tarjeta/qr/').then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['digital-card'] }),
  });
}
