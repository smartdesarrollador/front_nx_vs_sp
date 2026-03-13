'use client';
import { use } from 'react';
import { LandingEditorPage } from '@/features/landing/components/LandingEditorPage';

interface Props {
  params: Promise<{ locale: string }>;
}

export default function DashboardLandingPage({ params }: Props) {
  const { locale } = use(params);
  return <LandingEditorPage locale={locale} />;
}
