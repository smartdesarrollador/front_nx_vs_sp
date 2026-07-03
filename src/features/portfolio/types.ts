import type {
  PortfolioItem as BasePortfolioItem,
  PortfolioCategory,
  PortfolioStatus,
  PortfolioThemeColors,
  PortfolioHeroContent,
  PortfolioContactContent,
  PortfolioAboutContent,
  PortfolioSkillsContent,
  PortfolioServiceItem,
  PortfolioServicesContent,
  PortfolioTestimonialItem,
  PortfolioTestimonialsContent,
  PortfolioStylePreset,
} from '@/types/digital';

export type {
  PortfolioThemeColors,
  PortfolioHeroContent,
  PortfolioContactContent,
  PortfolioAboutContent,
  PortfolioSkillsContent,
  PortfolioServiceItem,
  PortfolioServicesContent,
  PortfolioTestimonialItem,
  PortfolioTestimonialsContent,
  PortfolioStylePreset,
};

export interface PortfolioStyleTokens {
  radiusCard: string;
  radiusButton: string;
  radiusInput: string;
  shadowCard: string;
  shadowCardHover: string;
  shadowButton: string;
  shadowButtonHover: string;
  cardHover: string;
  buttonHover: string;
  spacingHero: string;
  spacingSection: string;
  spacingFooter: string;
  headingFont: string;
  headingWeight: string;
  headingTracking: string;
  bodyLeading: string;
}

export const PORTFOLIO_STYLE_PRESET_TOKENS: Record<PortfolioStylePreset, PortfolioStyleTokens> = {
  modern: {
    radiusCard: 'rounded-xl',
    radiusButton: 'rounded-lg',
    radiusInput: 'rounded-lg',
    shadowCard: 'shadow-sm',
    shadowCardHover: 'hover:shadow-md',
    shadowButton: '',
    shadowButtonHover: '',
    cardHover: '',
    buttonHover: '',
    spacingHero: 'py-12',
    spacingSection: 'py-12',
    spacingFooter: 'py-6',
    headingFont: 'font-sans',
    headingWeight: 'font-bold',
    headingTracking: 'tracking-tight',
    bodyLeading: 'leading-relaxed',
  },
  classic: {
    radiusCard: 'rounded-md',
    radiusButton: 'rounded-md',
    radiusInput: 'rounded-md',
    shadowCard: 'shadow-none',
    shadowCardHover: 'hover:shadow-sm',
    shadowButton: 'shadow-none',
    shadowButtonHover: 'hover:shadow-sm',
    cardHover: '',
    buttonHover: '',
    spacingHero: 'py-16',
    spacingSection: 'py-16',
    spacingFooter: 'py-8',
    headingFont: 'font-sans',
    headingWeight: 'font-semibold',
    headingTracking: 'tracking-normal',
    bodyLeading: 'leading-relaxed',
  },
  soft: {
    radiusCard: 'rounded-3xl',
    radiusButton: 'rounded-full',
    radiusInput: 'rounded-2xl',
    shadowCard: 'shadow-md',
    shadowCardHover: 'hover:shadow-xl',
    shadowButton: 'shadow-lg',
    shadowButtonHover: 'hover:shadow-xl',
    cardHover: 'hover:-translate-y-1',
    buttonHover: 'hover:-translate-y-0.5',
    spacingHero: 'py-16',
    spacingSection: 'py-20',
    spacingFooter: 'py-10',
    headingFont: 'font-sans',
    headingWeight: 'font-bold',
    headingTracking: 'tracking-tight',
    bodyLeading: 'leading-loose',
  },
  editorial: {
    radiusCard: 'rounded-sm',
    radiusButton: 'rounded-none',
    radiusInput: 'rounded-sm',
    shadowCard: 'shadow-none',
    shadowCardHover: 'hover:shadow-none',
    shadowButton: 'shadow-none',
    shadowButtonHover: 'hover:shadow-none',
    cardHover: '',
    buttonHover: '',
    spacingHero: 'py-20',
    spacingSection: 'py-16',
    spacingFooter: 'py-8',
    headingFont: 'font-editorial',
    headingWeight: 'font-semibold',
    headingTracking: 'tracking-normal',
    bodyLeading: 'leading-loose',
  },
  bold: {
    radiusCard: 'rounded-none',
    radiusButton: 'rounded-none',
    radiusInput: 'rounded-none',
    shadowCard: 'shadow-[6px_6px_0_0_rgba(148,163,184,0.5)]',
    shadowCardHover: 'hover:shadow-[8px_8px_0_0_rgba(148,163,184,0.55)]',
    shadowButton: 'shadow-[6px_6px_0_0_rgba(148,163,184,0.5)]',
    shadowButtonHover: 'hover:shadow-[8px_8px_0_0_rgba(148,163,184,0.55)]',
    cardHover: 'hover:-translate-y-0.5',
    buttonHover: 'hover:-translate-y-0.5',
    spacingHero: 'py-16',
    spacingSection: 'py-16',
    spacingFooter: 'py-8',
    headingFont: 'font-sans',
    headingWeight: 'font-black',
    headingTracking: 'uppercase tracking-tight',
    bodyLeading: 'leading-relaxed',
  },
};

export const PORTFOLIO_STYLE_PRESET_META: Record<PortfolioStylePreset, { name: string; description: string }> = {
  modern: { name: 'Moderno', description: 'Bordes suaves, sombra sutil, look actual.' },
  classic: { name: 'Clásico', description: 'Bordes rectos y planos, espaciado generoso.' },
  soft: { name: 'Suave', description: 'Muy redondeado, sombras difusas, look acogedor.' },
  editorial: { name: 'Editorial', description: 'Tipografía serif, minimalista y sin decoración.' },
  bold: { name: 'Audaz', description: 'Títulos extra gruesos en mayúsculas, sombras marcadas, look llamativo.' },
};

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
