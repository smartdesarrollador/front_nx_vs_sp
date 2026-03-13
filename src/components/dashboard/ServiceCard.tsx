'use client';

import { Lock } from 'lucide-react';
import { getPlanDisplayName } from '@/data/featureGates';
import type { FeatureKey } from '@/data/featureGates';

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
  isLocked: boolean;
  isConfigured: boolean;
  isPublished: boolean;
  requiredPlan: string;
  featureKey: FeatureKey;
  onUpgrade: () => void;
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
  isLocked,
  isConfigured,
  isPublished,
  requiredPlan,
  onUpgrade,
}: ServiceCardProps) {
  if (isLocked) {
    return (
      <div
        onClick={onUpgrade}
        className="group relative flex cursor-pointer flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 opacity-60 shadow-sm transition-all hover:opacity-80 dark:border-gray-700 dark:bg-gray-800"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onUpgrade()}
        aria-label={`${title} — requiere plan ${requiredPlan}`}
      >
        {/* Lock icon */}
        <div className="absolute right-4 top-4">
          <Lock size={16} className="text-gray-400" />
        </div>

        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-700">
            <Icon className="h-7 w-7 text-gray-400" />
          </div>
          <span className="mr-6 inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
            Requiere {getPlanDisplayName(requiredPlan as Parameters<typeof getPlanDisplayName>[0])}
          </span>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); onUpgrade(); }}
          className="mt-auto w-full rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400"
          tabIndex={-1}
        >
          Actualizar plan →
        </button>
      </div>
    );
  }

  return (
    <div className="group flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600">
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 transition-transform group-hover:scale-105 dark:bg-gray-700">
          <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
        </div>
        {isConfigured && (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isPublished
                ? 'border border-green-200 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'border border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400'
            }`}
          >
            {isPublished ? 'Publicado' : 'Borrador'}
          </span>
        )}
      </div>

      <div>
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>

      <a
        href={href}
        className={`mt-auto block w-full rounded-lg px-4 py-2 text-center text-sm font-medium text-white transition-opacity hover:opacity-90 ${
          isConfigured ? 'bg-green-600' : 'bg-blue-600'
        }`}
      >
        {isConfigured ? 'Editar →' : 'Configurar →'}
      </a>
    </div>
  );
}
