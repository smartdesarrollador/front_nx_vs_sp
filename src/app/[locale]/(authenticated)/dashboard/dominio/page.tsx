'use client';
import { use } from 'react';
import { DomainPage } from '@/features/dominio/components/DomainPage';

interface Props {
  params: Promise<{ locale: string }>;
}

export default function DashboardDominioPage({ params }: Props) {
  const { locale } = use(params);
  return <DomainPage locale={locale} />;
}
