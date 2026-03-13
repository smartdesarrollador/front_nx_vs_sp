'use client';
import { useState } from 'react';
import { useFeatureGate } from '@/hooks/useFeatureGate';
import { useAuthStore } from '@/store/authStore';
import { UpgradePrompt } from '@/components/shared/UpgradePrompt';
import { ServiceAnalyticsView } from './ServiceAnalyticsView';
import { getPlanDays } from '../hooks/useServiceAnalytics';
import type { AnalyticsService } from '../types';
import type { Plan } from '@/data/featureGates';

const SERVICE_LABELS: Record<AnalyticsService, string> = {
  tarjeta: 'Tarjeta',
  landing: 'Landing',
  portafolio: 'Portafolio',
  cv: 'CV',
};

const SERVICES: AnalyticsService[] = ['tarjeta', 'landing', 'portafolio', 'cv'];

function TimeBadge({ days }: { days: number }) {
  const config =
    days >= 365
      ? { label: 'Últimos 365 días', className: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' }
      : days >= 30
      ? { label: 'Últimos 30 días', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' }
      : { label: 'Últimos 7 días', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' };

  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${config.className}`}>
      {config.label}
    </span>
  );
}

interface Props {
  locale: string;
}

export function AnalyticsPage({ locale: _locale }: Props) {
  const [activeService, setActiveService] = useState<AnalyticsService>('tarjeta');
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { canAccess } = useFeatureGate('digitalCardAnalytics');
  const currentPlan = useAuthStore((s) => s.currentPlan) as Plan;
  const days = getPlanDays(currentPlan);

  if (!canAccess) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Analytics</h1>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Las estadísticas están disponibles en el plan Starter y superiores.
          </p>
          <button
            onClick={() => setShowUpgrade(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Ver planes
          </button>
        </div>
        <UpgradePrompt
          isOpen={showUpgrade}
          onClose={() => setShowUpgrade(false)}
          featureKey="digitalCardAnalytics"
        />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <TimeBadge days={days} />
      </div>

      {/* Service tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {SERVICES.map((service) => (
          <button
            key={service}
            onClick={() => setActiveService(service)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeService === service
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {SERVICE_LABELS[service]}
          </button>
        ))}
      </div>

      {/* Active service view */}
      <ServiceAnalyticsView service={activeService} days={days} />
    </div>
  );
}
