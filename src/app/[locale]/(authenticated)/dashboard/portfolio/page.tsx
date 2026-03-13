'use client';
import { use } from 'react';
import { PortfolioPage } from '@/features/portfolio/components/PortfolioPage';

interface Props {
  params: Promise<{ locale: string }>;
}

export default function DashboardPortfolioPage({ params }: Props) {
  const { locale } = use(params);
  return <PortfolioPage locale={locale} />;
}
