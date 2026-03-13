export type Locale = 'es' | 'en';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  pagination?: {
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
  };
}

export type { Plan, FeatureKey, UpgradableFeatureKey } from '@/data/featureGates';
