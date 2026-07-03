import type { PublicCardResponse, CustomLink } from '@/types/digital';

export type CardData = PublicCardResponse;
export type { CustomLink };

export interface CardFormData {
  username: string;
  display_name: string;
  title: string;
  bio: string;
  avatar_url: string;
  is_public: boolean;
  email: string;
  phone: string;
  location: string;
  linkedin_url: string;
  twitter_url: string;
  github_url: string;
  instagram_url: string;
  facebook_url: string;
  website_url: string;
  primary_color: string;
  background_color: string;
  specialties: string[];
  years_experience: number | null;
  custom_links: CustomLink[];
}

export interface QRResponse {
  qr_code_url: string;
}
