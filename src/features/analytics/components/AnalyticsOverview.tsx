'use client';
import { Eye, Users, Share2 } from 'lucide-react';
import type { ServiceAnalytics } from '../types';

interface Props {
  data: ServiceAnalytics | null | undefined;
  isLoading: boolean;
}

function ChangePercent({ value }: { value: number | null }) {
  if (value === null) return null;
  const isPositive = value >= 0;
  return (
    <span className={`text-xs font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
      {isPositive ? '+' : ''}{value.toFixed(1)}%
    </span>
  );
}

export function AnalyticsOverview({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3" />
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: 'Vistas Totales',
      value: data?.total_views ?? 0,
      icon: <Eye size={18} className="text-blue-600 dark:text-blue-400" />,
      color: 'text-blue-600 dark:text-blue-400',
      change: data?.change_percent ?? null,
    },
    {
      label: 'Vistas Únicas',
      value: data?.unique_views ?? 0,
      icon: <Users size={18} className="text-purple-600 dark:text-purple-400" />,
      color: 'text-purple-600 dark:text-purple-400',
      change: null,
    },
    {
      label: 'Compartidos',
      value: data?.shares ?? 0,
      icon: <Share2 size={18} className="text-green-600 dark:text-green-400" />,
      color: 'text-green-600 dark:text-green-400',
      change: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">{card.label}</span>
            {card.icon}
          </div>
          <div className="flex items-end gap-2">
            <span className={`text-2xl font-bold ${card.color}`}>
              {card.value.toLocaleString('es-ES')}
            </span>
            <ChangePercent value={card.change} />
          </div>
        </div>
      ))}
    </div>
  );
}
