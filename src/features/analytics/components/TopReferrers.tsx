'use client';
import type { TopReferrer } from '../types';

interface Props {
  referrers: TopReferrer[] | undefined;
  isLoading: boolean;
}

export function TopReferrers({ referrers, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4 animate-pulse" />
        <div className="space-y-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-8 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const items = (referrers ?? []).slice(0, 10);
  const maxVisits = items.length > 0 ? Math.max(...items.map((r) => r.visits)) : 1;

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Principales Referrers
      </h3>
      {items.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 py-6 text-center">
          No hay datos de referrers.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((referrer, index) => {
            const width = Math.round((referrer.visits / maxVisits) * 100);
            return (
              <div key={referrer.source}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[160px]">
                      {referrer.source}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {referrer.visits.toLocaleString('es-ES')}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
