'use client';

import { use } from 'react';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { ServiceGrid } from '@/components/dashboard/ServiceGrid';

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = use(params);
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <WelcomeBanner />
      <ServiceGrid locale={locale} />
    </div>
  );
}
