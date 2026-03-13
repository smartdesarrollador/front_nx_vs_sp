import { getTranslations } from 'next-intl/server';
import { CreditCard, Globe, Briefcase, FileText } from 'lucide-react';

interface ServiceCard {
  key: string;
  href: string;
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
  requiredPlan?: string;
}

const SERVICES: ServiceCard[] = [
  {
    key: 'tarjeta',
    href: '/dashboard/tarjeta',
    icon: <CreditCard size={28} className="text-blue-600" />,
    titleKey: 'tarjeta',
    descKey: 'tarjetaDesc',
  },
  {
    key: 'landing',
    href: '/dashboard/landing',
    icon: <Globe size={28} className="text-green-600" />,
    titleKey: 'landing',
    descKey: 'landingDesc',
    requiredPlan: 'Starter',
  },
  {
    key: 'portfolio',
    href: '/dashboard/portfolio',
    icon: <Briefcase size={28} className="text-purple-600" />,
    titleKey: 'portfolio',
    descKey: 'portfolioDesc',
    requiredPlan: 'Professional',
  },
  {
    key: 'cv',
    href: '/dashboard/cv',
    icon: <FileText size={28} className="text-orange-600" />,
    titleKey: 'cv',
    descKey: 'cvDesc',
  },
];

export default async function DashboardPage() {
  const t = await getTranslations('dashboard');
  const nav = await getTranslations('nav');

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SERVICES.map((service) => (
          <a
            key={service.key}
            href={service.href}
            className="group flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-700 group-hover:scale-105 transition-transform">
                {service.icon}
              </div>
              {service.requiredPlan && (
                <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-700">
                  Requiere {service.requiredPlan}
                </span>
              )}
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                {nav(service.titleKey)}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {t(service.descKey)}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
