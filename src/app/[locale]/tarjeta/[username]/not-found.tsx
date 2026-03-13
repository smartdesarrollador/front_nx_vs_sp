'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CreditCard } from 'lucide-react';

export default function TarjetaNotFound() {
  const t = useTranslations('tarjeta');
  const tCommon = useTranslations('common');
  const params = useParams();
  const locale = (params.locale as string) ?? 'es';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <CreditCard className="w-10 h-10 text-gray-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          {t('notFound')}
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mb-8">
          {t('notFoundDesc')}
        </p>

        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
        >
          {tCommon('backHome')}
        </Link>
      </div>
    </div>
  );
}
