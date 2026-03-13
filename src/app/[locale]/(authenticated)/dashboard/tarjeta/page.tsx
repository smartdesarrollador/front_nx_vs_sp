'use client';
import { use } from 'react';
import { TarjetaPage } from '@/features/tarjeta/components/TarjetaPage';

interface Props {
  params: Promise<{ locale: string }>;
}

export default function DashboardTarjetaPage({ params }: Props) {
  const { locale } = use(params);
  return <TarjetaPage locale={locale} />;
}
