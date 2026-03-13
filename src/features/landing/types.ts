import type { LandingSection, LandingSectionType, LandingTemplateType } from '@/types/digital';
import type { Plan } from '@/data/featureGates';

// Tipos de contenido por sección
export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  alignment: 'left' | 'center' | 'right';
}
export interface AboutContent {
  title: string;
  text: string;
  imageUrl: string;
  layout: 'image-left' | 'image-right';
}
export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
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

// Estado local de trabajo (copia mutable antes de guardar)
export interface LandingFormState {
  template_type: LandingTemplateType;
  sections: LandingSection[];
  contact_email: string;
  enable_contact_form: boolean;
  custom_css: string;
  ga_tracking_id: string;
  is_public: boolean;
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
  },
  about: {
    title: 'Sobre mí',
    text: 'Cuéntale al mundo quién eres...',
    imageUrl: '',
    layout: 'image-right',
  },
  services: {
    title: 'Mis Servicios',
    items: [{ icon: 'star', title: 'Servicio 1', description: 'Descripción breve' }],
  },
  testimonials: {
    title: 'Testimonios',
    items: [{ name: 'Cliente', role: 'Cargo', text: '¡Gran trabajo!', rating: 5 }],
  },
  stats: {
    title: 'Logros',
    items: [{ icon: 'briefcase', value: '10+', label: 'Proyectos' }],
  },
  contact: { title: 'Contacto', email: '', phone: '', address: '', showForm: false },
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

export const DEFAULT_FORM_STATE: LandingFormState = {
  template_type: 'basic',
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
};
