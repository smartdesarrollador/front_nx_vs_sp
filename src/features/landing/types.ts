import type { LandingSection, LandingSectionType, LandingSocialLinks, LandingTemplateType, LandingThemeColors, LandingStylePreset } from '@/types/digital';
import type { Plan } from '@/data/featureGates';
export type { LandingThemeColors, LandingStylePreset };

// Tipos de contenido por sección
export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  alignment: 'left' | 'center' | 'right';
  badge?: string;
}
export interface AboutContent {
  title: string;
  text: string;
  imageUrl: string;
  layout: 'image-left' | 'image-right';
  highlights?: string[];
  skills?: string[];
}
export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  link?: string;
}
export interface ServicesContent {
  title: string;
  items: ServiceItem[];
}
export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatarUrl?: string;
  company?: string;
}
export interface TestimonialsContent {
  title: string;
  items: TestimonialItem[];
}
export interface StatItem {
  icon: string;
  value: string;
  label: string;
}
export interface StatsContent {
  title: string;
  items: StatItem[];
}
export interface ContactContent {
  title: string;
  email: string;
  phone: string;
  address: string;
  showForm: boolean;
}
export interface FAQItem {
  question: string;
  answer: string;
}
export interface FAQContent {
  title?: string;
  items: FAQItem[];
}
export interface FeatureItem {
  icon?: string;
  title: string;
  description: string;
  highlight?: string;
}
export interface FeaturesContent {
  title?: string;
  subtitle?: string;
  items: FeatureItem[];
}

// Estado local de trabajo (copia mutable antes de guardar)
export interface LandingFormState {
  template_type: LandingTemplateType;
  style_preset: LandingStylePreset;
  sections: LandingSection[];
  contact_email: string;
  enable_contact_form: boolean;
  custom_css: string;
  ga_tracking_id: string;
  is_public: boolean;
  social_links: LandingSocialLinks;
  accent_color: string;
  theme_colors: LandingThemeColors;
}

// Respuesta GET /app/digital/landing/
export interface LandingData {
  profile: { username: string; display_name: string; is_public: boolean };
  landing: LandingFormState | null;
}

// Contenido por defecto al añadir una sección nueva
export const DEFAULT_SECTION_CONTENT: Record<LandingSectionType, Record<string, unknown>> = {
  hero: {
    title: 'Bienvenido',
    subtitle: 'Tu propuesta de valor',
    ctaText: 'Contáctame',
    ctaUrl: '',
    alignment: 'center',
    badge: '',
  },
  about: {
    title: 'Sobre mí',
    text: 'Cuéntale al mundo quién eres...',
    imageUrl: '',
    layout: 'image-right',
    highlights: [],
    skills: [],
  },
  services: {
    title: 'Mis Servicios',
    items: [{ icon: 'star', title: 'Servicio 1', description: 'Descripción breve', link: '' }],
  },
  testimonials: {
    title: 'Testimonios',
    items: [{ name: 'Cliente', role: 'Cargo', company: '', text: '¡Gran trabajo!', rating: 5, avatarUrl: '' }],
  },
  stats: {
    title: 'Logros',
    items: [{ icon: 'briefcase', value: '10+', label: 'Proyectos' }],
  },
  contact: { title: 'Contacto', email: '', phone: '', address: '', showForm: false },
  faq: {
    title: 'Preguntas frecuentes',
    items: [
      { question: '¿Cuál es tu especialidad?', answer: 'Escribe aquí tu respuesta...' },
    ],
  },
  features: {
    title: '¿Por qué elegirnos?',
    subtitle: 'Lo que nos hace diferentes',
    items: [
      { icon: 'zap', title: 'Rápido y eficiente', description: 'Entregamos resultados en tiempo récord sin sacrificar calidad.', highlight: '' },
      { icon: 'star', title: 'Alta calidad', description: 'Cada proyecto recibe nuestra atención total y estándares exigentes.', highlight: 'Popular' },
      { icon: 'users', title: 'Equipo dedicado', description: 'Profesionales comprometidos con el éxito de tu proyecto.', highlight: '' },
    ],
  },
};

// Metadatos de cada tipo de sección
export const SECTION_META: Record<
  LandingSectionType,
  { label: string; icon: string; description: string }
> = {
  hero: { label: 'Hero', icon: 'layout', description: 'Cabecera principal con CTA' },
  about: {
    label: 'Sobre mí',
    icon: 'user',
    description: 'Texto e imagen de presentación',
  },
  services: {
    label: 'Servicios',
    icon: 'briefcase',
    description: 'Grid de servicios o habilidades',
  },
  testimonials: {
    label: 'Testimonios',
    icon: 'quote',
    description: 'Opiniones de clientes',
  },
  stats: {
    label: 'Estadísticas',
    icon: 'bar-chart',
    description: 'Números y logros destacados',
  },
  contact: {
    label: 'Contacto',
    icon: 'mail',
    description: 'Información de contacto o formulario',
  },
  faq: {
    label: 'FAQ',
    icon: 'help-circle',
    description: 'Preguntas y respuestas frecuentes',
  },
  features: {
    label: 'Características',
    icon: 'zap',
    description: 'Destaca tus ventajas diferenciales',
  },
};

// Plan requerido por plantilla
export const TEMPLATE_PLAN_REQUIRED: Record<LandingTemplateType, Plan> = {
  basic: 'starter',
  corporate: 'starter',
  creative: 'starter',
  minimal: 'professional',
};

export const TEMPLATE_META: Record<
  LandingTemplateType,
  { name: string; description: string; previewClass: string }
> = {
  basic: {
    name: 'Básico',
    description: 'Limpio y profesional.',
    previewClass: 'bg-gradient-to-br from-blue-600 to-blue-800',
  },
  corporate: {
    name: 'Corporate',
    description: 'Oscuro y elegante.',
    previewClass: 'bg-gray-900',
  },
  creative: {
    name: 'Creativo',
    description: 'Gradientes vibrantes.',
    previewClass: 'bg-gradient-to-br from-purple-600 to-pink-600',
  },
  minimal: {
    name: 'Minimal',
    description: 'Blanco y minimalista.',
    previewClass: 'bg-white border-2 border-gray-200',
  },
};

export const TEMPLATE_PALETTES: Record<LandingTemplateType, LandingThemeColors & { accent: string }> = {
  basic:     { hero_bg: '#1d4ed8', hero_text: '#ffffff', button_bg: '#3b82f6', nav_bg: '#1e3a8a', accent: '#3b82f6' },
  corporate: { hero_bg: '#111827', hero_text: '#f9fafb', button_bg: '#4b5563', nav_bg: '#030712', accent: '#6b7280' },
  creative:  { hero_bg: '#7c3aed', hero_text: '#ffffff', button_bg: '#a855f7', nav_bg: '#4c1d95', accent: '#ec4899' },
  minimal:   { hero_bg: '#ffffff', hero_text: '#111827', button_bg: '#2563eb', nav_bg: '#f8fafc', accent: '#2563eb' },
};

// Tokens de forma (bordes, sombras, espaciado) por estilo — independiente de la paleta de color
export interface StyleTokens {
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
  heroShape: 'blobs' | 'none' | 'diagonal';
}

export const STYLE_PRESET_TOKENS: Record<LandingStylePreset, StyleTokens> = {
  modern: {
    radiusCard: 'rounded-2xl',
    radiusButton: 'rounded-full',
    radiusInput: 'rounded-lg',
    shadowCard: 'shadow-sm',
    shadowCardHover: 'hover:shadow-lg',
    shadowButton: 'shadow-lg',
    shadowButtonHover: 'hover:shadow-xl',
    cardHover: 'hover:-translate-y-1',
    buttonHover: 'hover:-translate-y-0.5',
    spacingHero: 'py-32',
    spacingSection: 'py-16',
    spacingFooter: 'py-10',
    headingFont: 'font-sans',
    headingWeight: 'font-bold',
    headingTracking: 'tracking-tight',
    bodyLeading: 'leading-relaxed',
    heroShape: 'blobs',
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
    spacingHero: 'py-28',
    spacingSection: 'py-20',
    spacingFooter: 'py-12',
    headingFont: 'font-sans',
    headingWeight: 'font-semibold',
    headingTracking: 'tracking-normal',
    bodyLeading: 'leading-relaxed',
    heroShape: 'none',
  },
  soft: {
    radiusCard: 'rounded-3xl',
    radiusButton: 'rounded-full',
    radiusInput: 'rounded-2xl',
    shadowCard: 'shadow-md',
    shadowCardHover: 'hover:shadow-2xl',
    shadowButton: 'shadow-xl',
    shadowButtonHover: 'hover:shadow-2xl',
    cardHover: 'hover:-translate-y-1.5',
    buttonHover: 'hover:-translate-y-1',
    spacingHero: 'py-36',
    spacingSection: 'py-24',
    spacingFooter: 'py-14',
    headingFont: 'font-sans',
    headingWeight: 'font-bold',
    headingTracking: 'tracking-tight',
    bodyLeading: 'leading-loose',
    heroShape: 'blobs',
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
    spacingHero: 'py-40',
    spacingSection: 'py-24',
    spacingFooter: 'py-12',
    headingFont: 'font-editorial',
    headingWeight: 'font-semibold',
    headingTracking: 'tracking-normal',
    bodyLeading: 'leading-loose',
    heroShape: 'none',
  },
  bold: {
    radiusCard: 'rounded-none',
    radiusButton: 'rounded-none',
    radiusInput: 'rounded-none',
    shadowCard: 'shadow-[6px_6px_0_0_rgba(0,0,0,0.9)]',
    shadowCardHover: 'hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.9)]',
    shadowButton: 'shadow-[6px_6px_0_0_rgba(0,0,0,0.9)]',
    shadowButtonHover: 'hover:shadow-[8px_8px_0_0_rgba(0,0,0,0.9)]',
    cardHover: 'hover:-translate-y-0.5',
    buttonHover: 'hover:-translate-y-0.5',
    spacingHero: 'py-28',
    spacingSection: 'py-16',
    spacingFooter: 'py-10',
    headingFont: 'font-sans',
    headingWeight: 'font-black',
    headingTracking: 'uppercase tracking-tight',
    bodyLeading: 'leading-relaxed',
    heroShape: 'diagonal',
  },
};

export const STYLE_PRESET_META: Record<LandingStylePreset, { name: string; description: string }> = {
  modern: { name: 'Moderno', description: 'Bordes redondeados, sombras suaves, botones tipo píldora.' },
  classic: { name: 'Clásico', description: 'Bordes rectos, planos y formales, espaciado generoso.' },
  soft: { name: 'Suave', description: 'Muy redondeado, sombras difusas, sensación acogedora.' },
  editorial: { name: 'Editorial', description: 'Tipografía serif, minimalista y sin decoración, estilo revista.' },
  bold: { name: 'Audaz', description: 'Títulos extra gruesos en mayúsculas, sombras marcadas, look llamativo.' },
};

export const DEFAULT_FORM_STATE: LandingFormState = {
  template_type: 'basic',
  style_preset: 'modern',
  sections: [
    { type: 'hero', content: DEFAULT_SECTION_CONTENT.hero },
    { type: 'about', content: DEFAULT_SECTION_CONTENT.about },
    { type: 'contact', content: DEFAULT_SECTION_CONTENT.contact },
  ],
  contact_email: '',
  enable_contact_form: false,
  custom_css: '',
  ga_tracking_id: '',
  is_public: false,
  social_links: {},
  accent_color: '',
  theme_colors: {},
};
