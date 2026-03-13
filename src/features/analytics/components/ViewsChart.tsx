'use client';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import type { AnalyticsDataPoint } from '../types';

interface Props {
  data: AnalyticsDataPoint[] | undefined;
  days: number;
  isLoading: boolean;
}

function formatDateLabel(dateStr: string): string {
  const [, month, day] = dateStr.split('-');
  return `${day}/${month}`;
}

export function ViewsChart({ data, days, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4 animate-pulse" />
        <div className="h-48 bg-gray-100 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    );
  }

  const chartData = (data ?? []).map((point) => ({
    ...point,
    label: formatDateLabel(point.date),
  }));

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
        Tendencia ({days} días)
      </h3>
      {chartData.length === 0 ? (
        <div className="h-48 flex items-center justify-center text-sm text-gray-400 dark:text-gray-500">
          Sin datos para el período seleccionado.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={192}>
          <LineChart data={chartData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip
              formatter={(value: number, name: string) => [
                value.toLocaleString('es-ES'),
                name === 'views' ? 'Vistas' : 'Vistas Únicas',
              ]}
              labelFormatter={(label) => `Fecha: ${label}`}
            />
            <Legend
              formatter={(value) => (value === 'views' ? 'Vistas' : 'Vistas Únicas')}
            />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="unique_views"
              stroke="#7c3aed"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
