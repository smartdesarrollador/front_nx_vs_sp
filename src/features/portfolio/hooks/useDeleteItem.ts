'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export function useDeleteItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (uuid: string) =>
      apiClient.delete(`/app/digital/portafolio/${uuid}/`).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['portfolio-items'] });
    },
  });
}
