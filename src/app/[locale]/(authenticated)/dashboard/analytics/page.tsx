'use client';
import { use } from 'react';
import { AnalyticsPage } from '@/features/analytics/components/AnalyticsPage';

interface Props {
  params: Promise<{ locale: string }>;
}

export default function DashboardAnalyticsPage({ params }: Props) {
  const { locale } = use(params);
  return <AnalyticsPage locale={locale} />;
}
