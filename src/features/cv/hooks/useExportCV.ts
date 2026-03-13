'use client';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export function useExportCV() {
  return useMutation({
    mutationFn: async () => {
      const { data } = await apiClient.get<Blob>('/app/digital/cv/export/', {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cv.pdf';
      a.click();
      URL.revokeObjectURL(url);
    },
  });
}
