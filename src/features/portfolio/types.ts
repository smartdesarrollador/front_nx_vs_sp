import type { PortfolioItem as BasePortfolioItem } from '@/types/digital';

export interface PortfolioItem extends BasePortfolioItem {
  is_published: boolean;
}

export type { BasePortfolioItem };
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
};
