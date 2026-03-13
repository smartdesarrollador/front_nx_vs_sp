export type AnalyticsService = 'tarjeta' | 'landing' | 'portafolio' | 'cv';

export interface AnalyticsDataPoint {
  date: string; // "YYYY-MM-DD"
  views: number;
  unique_views: number;
}

export interface TopReferrer {
  source: string;
  visits: number;
}

export interface ServiceAnalytics {
  service: AnalyticsService;
  total_views: number;
  unique_views: number;
  shares: number;
  change_percent: number | null;
  data: AnalyticsDataPoint[];
  referrers: TopReferrer[];
}
