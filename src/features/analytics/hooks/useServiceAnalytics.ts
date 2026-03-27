import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { apiClient } from '@/lib/api';
import type { ServiceAnalytics, AnalyticsService } from '../types';
import type { Plan } from '@/data/featureGates';

export function getPlanDays(plan: Plan): number {
  if (plan === 'enterprise') return 365;
  if (plan === 'professional') return 30;
  return 7;
}

export function useServiceAnalytics(service: AnalyticsService, days: number) {
  return useQuery<ServiceAnalytics | null>({
    queryKey: ['analytics', service, days],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get<{ analytics: ServiceAnalytics }>(
          `/app/digital/analytics/${service}/`,
          { params: { days } }
        );
        return data.analytics;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) return null;
        throw err;
      }
    },
    staleTime: 5 * 60_000,
  });
}
