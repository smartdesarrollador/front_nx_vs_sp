import type { PortfolioItem as BasePortfolioItem, PortfolioCategory, PortfolioStatus, PortfolioThemeColors } from '@/types/digital';

export type { PortfolioThemeColors };

export type PortfolioTemplateType = 'light' | 'dark' | 'creative' | 'minimal';

export const PORTFOLIO_PALETTES: Record<PortfolioTemplateType, PortfolioThemeColors> = {
  light:    { header_bg: '#ffffff', header_text: '#111827', accent: '#2563eb', nav_bg: '#ffffff' },
  dark:     { header_bg: '#0f172a', header_text: '#f1f5f9', accent: '#818cf8', nav_bg: '#0f172a' },
  creative: { header_bg: '#7c3aed', header_text: '#ffffff', accent: '#ec4899', nav_bg: '#4c1d95' },
  minimal:  { header_bg: '#f8fafc', header_text: '#374151', accent: '#10b981', nav_bg: '#f8fafc' },
};

export const PORTFOLIO_TEMPLATE_META: Record<
  PortfolioTemplateType,
  { name: string; description: string; previewBg: string }
> = {
  light:    { name: 'Claro',    description: 'Limpio y profesional.',  previewBg: 'bg-white border-2 border-gray-200' },
  dark:     { name: 'Oscuro',   description: 'Moderno y elegante.',    previewBg: 'bg-slate-900' },
  creative: { name: 'Creativo', description: 'Colorido y llamativo.',  previewBg: 'bg-gradient-to-br from-purple-600 to-pink-600' },
  minimal:  { name: 'Minimal',  description: 'Simple y minimalista.',  previewBg: 'bg-slate-50 border-2 border-slate-200' },
};

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
