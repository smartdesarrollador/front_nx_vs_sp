'use client';
import { useServiceAnalytics } from '../hooks/useServiceAnalytics';
import { AnalyticsOverview } from './AnalyticsOverview';
import { ViewsChart } from './ViewsChart';
import { TopReferrers } from './TopReferrers';
import type { AnalyticsService } from '../types';

interface Props {
  service: AnalyticsService;
  days: number;
}

export function ServiceAnalyticsView({ service, days }: Props) {
  const { data: analytics, isLoading } = useServiceAnalytics(service, days);

  return (
    <div className="space-y-6">
      <AnalyticsOverview data={analytics} isLoading={isLoading} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ViewsChart data={analytics?.data} days={days} isLoading={isLoading} />
        <TopReferrers referrers={analytics?.referrers} isLoading={isLoading} />
      </div>
    </div>
  );
}
