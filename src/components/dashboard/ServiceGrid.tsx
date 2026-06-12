'use client';

import { useState } from 'react';
import { CreditCard, Globe, Briefcase, FileText } from 'lucide-react';
import { useFeatureGate } from '@/hooks/useFeatureGate';
import { useServiceStatus } from '@/hooks/useServiceStatus';
import { getPlanDisplayName } from '@/data/featureGates';
import type { FeatureKey } from '@/data/featureGates';
import { UpgradePrompt } from '@/components/shared/UpgradePrompt';
import { ServiceCard } from './ServiceCard';
import { QuickStats } from './QuickStats';

interface ServiceDefinition {
  id: string;
  featureKey: FeatureKey;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: (locale: string) => string;
  hasConfigured: (profile: import('@/types/digital').DigitalProfile | null) => boolean;
  isPublished: (profile: import('@/types/digital').DigitalProfile | null) => boolean;
}

const SERVICES: ServiceDefinition[] = [
  {
    id: 'tarjeta',
    featureKey: 'digitalCard',
    icon: CreditCard,
    title: 'Tarjeta Digital',
    description: 'Comparte tu información de contacto de forma profesional con un solo enlace.',
    href: (locale) => `/${locale}/dashboard/tarjeta`,
    hasConfigured: (p) => p?.has_digital_card ?? false,
    isPublished: (p) => p?.digital_card_published ?? false,
  },
  {
    id: 'landing',
    featureKey: 'landingPage',
    icon: Globe,
    title: 'Landing Page',
    description: 'Crea una página de aterrizaje profesional para captar clientes.',
    href: (locale) => `/${locale}/dashboard/landing`,
    hasConfigured: (p) => p?.has_landing ?? false,
    isPublished: (p) => p?.landing_published ?? false,
  },
  {
    id: 'portafolio',
    featureKey: 'portfolio',
    icon: Briefcase,
    title: 'Portafolio Digital',
    description: 'Muestra tus proyectos con galerías de imágenes y categorías personalizadas.',
    href: (locale) => `/${locale}/dashboard/portfolio`,
    hasConfigured: (p) => p?.has_portfolio ?? false,
    isPublished: (p) => p?.portfolio_published ?? false,
  },
  {
    id: 'cv',
    featureKey: 'cv',
    icon: FileText,
    title: 'CV Digital',
    description: 'Genera un currículum online con múltiples plantillas profesionales.',
    href: (locale) => `/${locale}/dashboard/cv`,
    hasConfigured: (p) => p?.has_cv ?? false,
    isPublished: (p) => p?.cv_published ?? false,
  },
];

interface ServiceGridProps {
  locale: string;
}

function ServiceRow({ service, locale, profile, onUpgrade }: {
  service: ServiceDefinition;
  locale: string;
  profile: import('@/types/digital').DigitalProfile | null;
  onUpgrade: (key: FeatureKey) => void;
}) {
  const { canAccess, requiredPlan } = useFeatureGate(service.featureKey);
  const isConfigured = service.hasConfigured(profile);
  const isPublished = service.isPublished(profile);

  return (
    <ServiceCard
      icon={service.icon}
      title={service.title}
      description={service.description}
      href={service.href(locale)}
      isLocked={!canAccess}
      isConfigured={isConfigured}
      isPublished={isPublished}
      requiredPlan={getPlanDisplayName(requiredPlan)}
      featureKey={service.featureKey}
      onUpgrade={() => onUpgrade(service.featureKey)}
    />
  );
}

export function ServiceGrid({ locale }: ServiceGridProps) {
  const { profile, isLoading } = useServiceStatus();
  const [upgradeFeatureKey, setUpgradeFeatureKey] = useState<FeatureKey | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="h-20 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-700" />
          <div className="h-20 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-700" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-700" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ActiveCountWrapper profile={profile} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SERVICES.map((service) => (
          <ServiceRow
            key={service.id}
            service={service}
            locale={locale}
            profile={profile}
            onUpgrade={setUpgradeFeatureKey}
          />
        ))}
      </div>

      {upgradeFeatureKey && (
        <UpgradePrompt
          isOpen={true}
          onClose={() => setUpgradeFeatureKey(null)}
          featureKey={upgradeFeatureKey}
        />
      )}
    </div>
  );
}

// Separate component so each ServiceRow can call useFeatureGate independently
function ActiveCountWrapper({ profile }: { profile: import('@/types/digital').DigitalProfile | null }) {
  const card = useFeatureGate('digitalCard');
  const landing = useFeatureGate('landingPage');
  const portfolio = useFeatureGate('portfolio');
  const cv = useFeatureGate('cv');

  const activeCount = [
    card.canAccess && (profile?.has_digital_card ?? false),
    landing.canAccess && (profile?.has_landing ?? false),
    portfolio.canAccess && (profile?.has_portfolio ?? false),
    cv.canAccess && (profile?.has_cv ?? false),
  ].filter(Boolean).length;

  return <QuickStats activeCount={activeCount} isLoading={false} />;
}
