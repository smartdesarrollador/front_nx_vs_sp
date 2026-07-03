'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import type {
  PortfolioThemeColors,
  PortfolioHeroContent,
  PortfolioContactContent,
  PortfolioAboutContent,
  PortfolioSkillsContent,
  PortfolioServicesContent,
  PortfolioTestimonialsContent,
  PortfolioStylePreset,
} from '../types';

const QK = ['portfolio-settings'];

export function usePortfolioSettings() {
  return useQuery<{
    id: string;
    style_preset: PortfolioStylePreset;
    theme_colors: PortfolioThemeColors;
    hero_content: PortfolioHeroContent;
    contact_content: PortfolioContactContent;
    about_content: PortfolioAboutContent;
    skills_content: PortfolioSkillsContent;
    services_content: PortfolioServicesContent;
    testimonials_content: PortfolioTestimonialsContent;
  }>({
    queryKey: QK,
    queryFn: () => apiClient.get('/app/digital/portfolio-settings/').then((r) => r.data),
    staleTime: 60_000,
  });
}

export function useSavePortfolioSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      style_preset?: PortfolioStylePreset;
      theme_colors?: PortfolioThemeColors;
      hero_content?: PortfolioHeroContent;
      contact_content?: PortfolioContactContent;
      about_content?: PortfolioAboutContent;
      skills_content?: PortfolioSkillsContent;
      services_content?: PortfolioServicesContent;
      testimonials_content?: PortfolioTestimonialsContent;
    }) => apiClient.post('/app/digital/portfolio-settings/', payload).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK }),
  });
}
