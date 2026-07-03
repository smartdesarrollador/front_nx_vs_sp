'use client';

import Link from 'next/link';
import { CheckCircle2, BarChart2, Lock } from 'lucide-react';

interface QuickStatsProps {
  activeCount: number;
  isLoading: boolean;
  hasAnalyticsAccess: boolean;
  analyticsLoading: boolean;
  totalViews: number;
  analyticsHref: string;
}

export function QuickStats({
  activeCount,
  isLoading,
  hasAnalyticsAccess,
  analyticsLoading,
  totalViews,
  analyticsHref,
}: QuickStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="h-20 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-700" />
        <div className="h-20 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-700" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-4 shadow-sm">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
          <CheckCircle2 size={20} className="text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeCount}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Servicios activos</p>
        </div>
      </div>

      {!hasAnalyticsAccess ? (
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-4 shadow-sm opacity-60">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
            <Lock size={20} className="text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">Analíticas</p>
            <p className="text-xs text-gray-400">Plan Starter o superior</p>
          </div>
        </div>
      ) : analyticsLoading ? (
        <div className="h-20 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-700" />
      ) : (
        <Link
          href={analyticsHref}
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 p-4 shadow-sm hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <BarChart2 size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalViews}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Vistas totales</p>
          </div>
        </Link>
      )}
    </div>
  );
}
