import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPublicPortfolio } from '@/lib/publicApi';
import { buildCreativeWorkJsonLd } from '@/lib/seo';
import { PortfolioNav } from '@/components/portfolio/PortfolioNav';
import { PortfolioDetail } from '@/components/portfolio/PortfolioDetail';

interface Props {
  params: Promise<{ locale: string; username: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username, slug } = await params;
  const data = await getPublicPortfolio(username);
  if (!data) return { title: 'Proyecto no encontrado' };
  const item = data.items.find((i) => i.slug === slug);
  if (!item) return { title: 'Proyecto no encontrado' };
  return {
    title: `${item.title} — Portfolio de ${data.profile.display_name}`,
    description: item.description_short,
    openGraph: {
      title: item.title,
      description: item.description_short,
      images: item.cover_image_url ? [item.cover_image_url] : [],
    },
  };
}

export default async function PortfolioItemPage({ params }: Props) {
  const { locale, username, slug } = await params;
  const data = await getPublicPortfolio(username);

  if (!data) notFound();
  const item = data.items.find((i) => i.slug === slug);
  if (!item) notFound();

  const jsonLd = buildCreativeWorkJsonLd(item, data.profile, locale);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioNav
        profileName={data.profile.display_name}
        locale={locale}
        username={username}
        showBackLink
      />
      <main className="flex-1 pt-16">
        <PortfolioDetail item={item} locale={locale} username={username} allItems={data.items} />
      </main>
      <footer className="text-center py-6 text-sm text-gray-400 border-t border-gray-100 dark:border-gray-800">
        <a
          href="https://digisider.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          Digisider
        </a>
      </footer>
    </div>
  );
}
