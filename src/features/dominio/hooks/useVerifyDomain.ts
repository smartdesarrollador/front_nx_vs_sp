'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export function useVerifyDomain() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () =>
      apiClient.post('/app/digital/custom-domain/verify/').then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['custom-domain'] });
    },
  });
}
