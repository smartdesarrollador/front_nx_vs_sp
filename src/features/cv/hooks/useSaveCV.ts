'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import type { CVDocument } from '@/types/digital';

export function useSaveCV() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CVDocument) =>
      apiClient.post<CVDocument>('/app/digital/cv/', payload).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cv-document'] });
      qc.invalidateQueries({ queryKey: ['digital-profile'] });
    },
  });
}
