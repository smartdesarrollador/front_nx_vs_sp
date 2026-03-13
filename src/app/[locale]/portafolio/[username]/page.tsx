import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getPublicPortfolio } from '@/lib/publicApi';
import { buildItemListJsonLd } from '@/lib/seo';
import { PortfolioNav } from '@/components/portfolio/PortfolioNav';
import { ProfileHero } from '@/components/portfolio/ProfileHero';
import { PublicPortfolioGrid } from '@/components/portfolio/PublicPortfolioGrid';

interface Props {
  params: Promise<{ locale: string; username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const data = await getPublicPortfolio(username);
  if (!data) return { title: 'Portfolio no encontrado' };
  const { profile } = data;
  return {
    title: `Portfolio de ${profile.display_name} — Vista Digital`,
    description: profile.meta_description || profile.bio,
    openGraph: {
      title: `Portfolio de ${profile.display_name}`,
      description: profile.meta_description || profile.bio,
      images: profile.og_image_url ? [profile.og_image_url] : [],
    },
  };
}

export default async function PortfolioPage({ params }: Props) {
  const { locale, username } = await params;
  const t = await getTranslations('portfolio');
  const data = await getPublicPortfolio(username);

  if (!data) notFound();

  const { profile, items } = data;
  const jsonLd = buildItemListJsonLd(profile, items, locale);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioNav profileName={profile.display_name} locale={locale} username={username} />
      <main className="flex-1 pt-16">
        <ProfileHero profile={profile} />
        <PublicPortfolioGrid items={items} locale={locale} username={username} />
      </main>
      <footer className="text-center py-6 text-sm text-gray-400 border-t border-gray-100 dark:border-gray-800">
        {t('poweredBy')}
      </footer>
    </div>
  );
}
