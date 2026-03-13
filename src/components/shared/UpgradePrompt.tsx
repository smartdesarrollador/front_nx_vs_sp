'use client';

import { X, Zap } from 'lucide-react';
import { getPlanDisplayName, UPGRADE_MESSAGES, type FeatureKey, type UpgradableFeatureKey } from '@/data/featureGates';

interface UpgradePromptProps {
  isOpen: boolean;
  onClose: () => void;
  featureKey: FeatureKey;
}

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL ?? '';

export function UpgradePrompt({ isOpen, onClose, featureKey }: UpgradePromptProps) {
  if (!isOpen) return null;

  const info = UPGRADE_MESSAGES[featureKey as UpgradableFeatureKey] ?? {
    title: 'Función Premium',
    message: 'Esta función está disponible en planes superiores.',
    requiredPlan: 'professional' as const,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Cerrar"
        >
          <X size={18} />
        </button>

        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
          <Zap size={24} className="text-white" />
        </div>

        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          {info.title}
        </h3>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">{info.message}</p>

        <p className="mb-5 text-xs text-gray-500 dark:text-gray-500">
          Disponible en el plan{' '}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {getPlanDisplayName(info.requiredPlan)}
          </span>{' '}
          o superior.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
          <a
            href={`${HUB_URL}/subscription`}
            className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-center text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            Actualizar Plan →
          </a>
        </div>
      </div>
    </div>
  );
}
