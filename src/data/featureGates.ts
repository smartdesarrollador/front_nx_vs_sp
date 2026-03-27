export type Plan = 'free' | 'starter' | 'professional' | 'enterprise';

export type FeatureKey =
  | 'digitalCard'
  | 'digitalCardQR'
  | 'digitalCardCustomColors'
  | 'digitalCardVCard'
  | 'digitalCardAnalytics'
  | 'landingPage'
  | 'landingTemplates'
  | 'landingContactForm'
  | 'landingCustomCSS'
  | 'landingSEO'
  | 'landingGoogleAnalytics'
  | 'portfolio'
  | 'maxProjects'
  | 'portfolioGalleryImages'
  | 'portfolioFeaturedProjects'
  | 'cv'
  | 'cvTemplates'
  | 'cvPDFExport'
  | 'cvMultipleVersions'
  | 'customDomain'
  | 'whiteLabel'
  | 'prioritySupport';

export type UpgradableFeatureKey =
  | 'digitalCardQR'
  | 'digitalCardVCard'
  | 'digitalCardAnalytics'
  | 'landingPage'
  | 'landingCustomCSS'
  | 'landingSEO'
  | 'portfolio'
  | 'cvPDFExport'
  | 'cvMultipleVersions'
  | 'customDomain'
  | 'whiteLabel';

export const FEATURES_BY_PLAN: Record<Plan, Record<FeatureKey, boolean | number>> = {
  free: {
    digitalCard: true,
    digitalCardQR: false,
    digitalCardCustomColors: true,
    digitalCardVCard: false,
    digitalCardAnalytics: false,
    landingPage: false,
    landingTemplates: 0,
    landingContactForm: false,
    landingCustomCSS: false,
    landingSEO: false,
    landingGoogleAnalytics: false,
    portfolio: false,
    maxProjects: 0,
    portfolioGalleryImages: 0,
    portfolioFeaturedProjects: 0,
    cv: true,
    cvTemplates: 1,
    cvPDFExport: false,
    cvMultipleVersions: false,
    customDomain: false,
    whiteLabel: false,
    prioritySupport: false,
  },
  starter: {
    digitalCard: true,
    digitalCardQR: true,
    digitalCardCustomColors: true,
    digitalCardVCard: true,
    digitalCardAnalytics: true,
    landingPage: true,
    landingTemplates: 3,
    landingContactForm: true,
    landingCustomCSS: false,
    landingSEO: false,
    landingGoogleAnalytics: false,
    portfolio: false,
    maxProjects: 0,
    portfolioGalleryImages: 0,
    portfolioFeaturedProjects: 0,
    cv: true,
    cvTemplates: 2,
    cvPDFExport: true,
    cvMultipleVersions: false,
    customDomain: false,
    whiteLabel: false,
    prioritySupport: false,
  },
  professional: {
    digitalCard: true,
    digitalCardQR: true,
    digitalCardCustomColors: true,
    digitalCardVCard: true,
    digitalCardAnalytics: true,
    landingPage: true,
    landingTemplates: Infinity,
    landingContactForm: true,
    landingCustomCSS: true,
    landingSEO: true,
    landingGoogleAnalytics: true,
    portfolio: true,
    maxProjects: Infinity,
    portfolioGalleryImages: 10,
    portfolioFeaturedProjects: 3,
    cv: true,
    cvTemplates: 3,
    cvPDFExport: true,
    cvMultipleVersions: true,
    customDomain: true,
    whiteLabel: false,
    prioritySupport: false,
  },
  enterprise: {
    digitalCard: true,
    digitalCardQR: true,
    digitalCardCustomColors: true,
    digitalCardVCard: true,
    digitalCardAnalytics: true,
    landingPage: true,
    landingTemplates: Infinity,
    landingContactForm: true,
    landingCustomCSS: true,
    landingSEO: true,
    landingGoogleAnalytics: true,
    portfolio: true,
    maxProjects: Infinity,
    portfolioGalleryImages: Infinity,
    portfolioFeaturedProjects: Infinity,
    cv: true,
    cvTemplates: 3,
    cvPDFExport: true,
    cvMultipleVersions: true,
    customDomain: true,
    whiteLabel: true,
    prioritySupport: true,
  },
};

export const UPGRADE_MESSAGES: Record<
  UpgradableFeatureKey,
  { title: string; message: string; requiredPlan: Plan }
> = {
  digitalCardQR: {
    title: 'Código QR',
    message: 'Genera un código QR para tu tarjeta digital y permite que cualquiera te escanee.',
    requiredPlan: 'starter',
  },
  digitalCardVCard: {
    title: 'Exportar Contacto',
    message:
      'Permite a tus visitantes guardar tu contacto directamente en su teléfono con formato vCard.',
    requiredPlan: 'starter',
  },
  digitalCardAnalytics: {
    title: 'Estadísticas Avanzadas',
    message: 'Visualiza quién ve tu tarjeta digital, desde dónde y cuántas veces.',
    requiredPlan: 'starter',
  },
  landingPage: {
    title: 'Landing Page Profesional',
    message:
      'Crea una página de aterrizaje completa con múltiples secciones y formulario de contacto.',
    requiredPlan: 'starter',
  },
  landingCustomCSS: {
    title: 'CSS Personalizado',
    message: 'Aplica estilos personalizados para que tu landing page sea 100% única.',
    requiredPlan: 'professional',
  },
  landingSEO: {
    title: 'Optimización SEO',
    message:
      'Configura meta tags, Open Graph y optimiza tu landing para motores de búsqueda.',
    requiredPlan: 'professional',
  },
  portfolio: {
    title: 'Portafolio Digital',
    message: 'Muestra tus proyectos con galerías de imágenes y categorías personalizadas.',
    requiredPlan: 'professional',
  },
  cvPDFExport: {
    title: 'Exportar PDF',
    message: 'Descarga tu CV en formato PDF profesional listo para compartir.',
    requiredPlan: 'starter',
  },
  cvMultipleVersions: {
    title: 'Múltiples Versiones',
    message: 'Crea diferentes versiones de tu CV para distintos tipos de trabajo.',
    requiredPlan: 'professional',
  },
  customDomain: {
    title: 'Dominio Personalizado',
    message: 'Conecta tu propio dominio para mayor profesionalismo.',
    requiredPlan: 'professional',
  },
  whiteLabel: {
    title: 'Marca Blanca',
    message: 'Elimina todas las referencias a nuestra plataforma.',
    requiredPlan: 'enterprise',
  },
};

const PLAN_HIERARCHY: Plan[] = ['free', 'starter', 'professional', 'enterprise'];

export function getPlanDisplayName(plan: Plan): string {
  const map: Record<Plan, string> = {
    free: 'Free',
    starter: 'Starter',
    professional: 'Professional',
    enterprise: 'Enterprise',
  };
  return map[plan] ?? 'Free';
}

export function getRequiredPlan(feature: FeatureKey): Plan {
  for (const plan of PLAN_HIERARCHY) {
    if (FEATURES_BY_PLAN[plan][feature] === true) {
      return plan;
    }
  }
  return 'enterprise';
}

export function isPlanHigherThan(currentPlan: Plan, requiredPlan: Plan): boolean {
  return PLAN_HIERARCHY.indexOf(currentPlan) >= PLAN_HIERARCHY.indexOf(requiredPlan);
}
