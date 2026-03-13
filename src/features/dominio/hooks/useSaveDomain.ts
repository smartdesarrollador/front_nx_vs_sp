'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import type { DomainFormData, CustomDomainData } from '../types';

export function useSaveDomain() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: DomainFormData) =>
      apiClient.post<CustomDomainData>('/app/digital/custom-domain/', payload).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['custom-domain'] });
    },
  });
}
