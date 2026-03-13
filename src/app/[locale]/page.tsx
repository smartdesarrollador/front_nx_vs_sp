import { useTranslations } from 'next-intl';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <nav className="border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
        <span className="text-xl font-bold text-primary-600 dark:text-primary-400">Vista</span>
        <ThemeToggle />
      </nav>

      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
          {t('title')}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-10">
          {t('subtitle')}
        </p>
        <a
          href="#services"
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          {t('cta')}
        </a>
      </section>
    </main>
  );
}
