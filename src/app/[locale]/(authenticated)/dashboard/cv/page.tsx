'use client';
import { use } from 'react';
import { CVEditorPage } from '@/features/cv/components/CVEditorPage';

interface Props {
  params: Promise<{ locale: string }>;
}

export default function DashboardCVPage({ params }: Props) {
  const { locale } = use(params);
  return <CVEditorPage locale={locale} />;
}
