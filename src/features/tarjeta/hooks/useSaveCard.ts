'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import type { CardFormData, CardData } from '../types';
import type { PublicProfile, DigitalCard } from '@/types/digital';

export function useSaveCard() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CardFormData): Promise<CardData> => {
      // 1. Guardar perfil (crea si no existe, actualiza parcialmente si existe)
      const profilePayload = {
        username: payload.username,
        display_name: payload.display_name,
        title: payload.title,
        bio: payload.bio,
        avatar_url: payload.avatar_url,
        is_public: payload.is_public,
      };
      const { data: pData } = await apiClient.post<{ profile: PublicProfile }>(
        '/app/digital/profile/',
        profilePayload,
      );

      // 2. Guardar tarjeta (requiere perfil existente)
      const cardPayload = {
        email: payload.email,
        phone: payload.phone,
        location: payload.location,
        linkedin_url: payload.linkedin_url,
        twitter_url: payload.twitter_url,
        github_url: payload.github_url,
        instagram_url: payload.instagram_url,
        facebook_url: payload.facebook_url,
        website_url: payload.website_url,
        primary_color: payload.primary_color,
        background_color: payload.background_color,
        specialties: payload.specialties,
        years_experience: payload.years_experience,
        custom_links: payload.custom_links,
      };
      const { data: cData } = await apiClient.post<{ card: DigitalCard }>(
        '/app/digital/tarjeta/',
        cardPayload,
      );

      return { profile: pData.profile, digital_card: cData.card };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['digital-card'] });
      qc.invalidateQueries({ queryKey: ['digital-profile'] });
    },
  });
}
