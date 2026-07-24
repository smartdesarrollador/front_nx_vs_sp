'use client';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export type AssetSlot = 'avatar' | 'og_image' | 'portfolio_cover' | 'portfolio_gallery';

export interface UploadedAsset {
  id: string;
  url: string;
  size: number;
  slot: AssetSlot;
  original_name: string;
}

/**
 * Sube una imagen gestionada de Vista al backend (cuenta hacia la cuota storage_gb del tenant).
 * Devuelve la URL interna a guardar en el campo correspondiente (avatar_url, cover_image_url, ...).
 *
 * No se fija Content-Type a mano: axios pone el boundary multipart automáticamente para FormData.
 * Forzar 'application/json' rompería la subida (gotcha conocido del proyecto).
 */
export function useUploadImage() {
  return useMutation({
    mutationFn: async ({ file, slot }: { file: File; slot: AssetSlot }): Promise<UploadedAsset> => {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('slot', slot);
      const { data } = await apiClient.post<UploadedAsset>('/app/digital/assets/', fd);
      return data;
    },
  });
}
