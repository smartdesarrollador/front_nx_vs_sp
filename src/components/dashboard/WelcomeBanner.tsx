'use client';

import { useAuth } from '@/hooks/useAuth';
import { PlanBadge } from '@/components/shared/PlanBadge';
import type { Plan } from '@/data/featureGates';

export function WelcomeBanner() {
  const { user, currentPlan } = useAuth();

  return (
    <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-750 border border-blue-100 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          {user ? (
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Bienvenido de nuevo,{' '}
              <span className="text-blue-600 dark:text-blue-400">{user.first_name}</span>
            </h1>
          ) : (
            <div className="h-7 w-48 animate-pulse rounded-md bg-gray-200 dark:bg-gray-600" />
          )}
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Gestiona tus servicios digitales desde aquí
          </p>
        </div>
        <div className="shrink-0">
          <PlanBadge plan={currentPlan as Plan} />
        </div>
      </div>
    </div>
  );
}
