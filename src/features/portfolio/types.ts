import type { PortfolioItem as BasePortfolioItem, PortfolioCategory, PortfolioStatus } from '@/types/digital';

// PortfolioItem now inherits is_published, category, client_name, technologies,
// duration, status, accent_color directly from BasePortfolioItem
export type PortfolioItem = BasePortfolioItem;

export type { BasePortfolioItem, PortfolioCategory, PortfolioStatus };
export { type PublicProfile } from '@/types/digital';

export interface PortfolioForm {
  title: string;
  description_short: string;
  description_full: string;
  cover_image_url: string;
  gallery_images: string[];
  demo_url: string;
  repo_url: string;
  case_study_url: string;
  tags: string[];
  is_featured: boolean;
  is_published: boolean;
  project_date: string;
  category: string;
  client_name: string;
  technologies: string[];
  duration: string;
  status: string;
  accent_color: string;
}

export type PortfolioPayload = PortfolioForm;

export const DEFAULT_PORTFOLIO_FORM: PortfolioForm = {
  title: '',
  description_short: '',
  description_full: '',
  cover_image_url: '',
  gallery_images: [],
  demo_url: '',
  repo_url: '',
  case_study_url: '',
  tags: [],
  is_featured: false,
  is_published: true,
  project_date: new Date().toISOString().slice(0, 10),
  category: '',
  client_name: '',
  technologies: [],
  duration: '',
  status: 'completed',
  accent_color: '',
};
