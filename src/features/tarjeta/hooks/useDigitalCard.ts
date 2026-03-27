'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiClient } from '@/lib/api';
import type { CardData } from '../types';
import type { PublicProfile, DigitalCard } from '@/types/digital';

export function useDigitalCard() {
  return useQuery<CardData | null>({
    queryKey: ['digital-card'],
    queryFn: async () => {
      // 1. Obtener perfil — si no existe el usuario no tiene nada configurado
      let profile: PublicProfile;
      try {
        const { data } = await apiClient.get<{ profile: PublicProfile }>('/app/digital/profile/');
        profile = data.profile;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) return null;
        throw err;
      }

      // 2. Obtener tarjeta — puede no existir aún (404 = null)
      let digital_card: DigitalCard | null = null;
      try {
        const { data } = await apiClient.get<{ card: DigitalCard }>('/app/digital/tarjeta/');
        digital_card = data.card;
      } catch (err) {
        if (!axios.isAxiosError(err) || err.response?.status !== 404) throw err;
      }

      return { profile, digital_card };
    },
    staleTime: 60_000,
  });
}
