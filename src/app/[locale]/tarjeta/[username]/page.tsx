import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getPublicProfile } from '@/lib/publicApi';
import { PublicCardView } from '@/components/tarjeta/PublicCardView';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import Link from 'next/link';

interface Props {
  params: Promise<{ locale: string; username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const data = await getPublicProfile(username);

  if (!data) {
    return { title: 'Tarjeta no encontrada' };
  }

  const { profile } = data;

  return {
    title: profile.meta_title || `${profile.display_name} — Vista Digital`,
    description:
      profile.meta_description ||
      `Tarjeta digital de ${profile.display_name}`,
    openGraph: {
      title: profile.meta_title || profile.display_name,
      description: profile.meta_description || profile.bio,
      images: profile.og_image_url ? [profile.og_image_url] : [],
    },
  };
}

export default async function TarjetaPage({ params }: Props) {
  const { locale, username } = await params;
  const t = await getTranslations('tarjeta');
  const data = await getPublicProfile(username);

  if (!data) {
    notFound();
  }

  const { profile, digital_card } = data;
  const bgColor = digital_card?.background_color ?? '#ffffff';

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: bgColor }}
    >
      <header className="flex items-center justify-between px-6 py-4">
        <Link
          href={`/${locale}`}
          className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
        >
          Vista Digital
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <PublicCardView profile={profile} card={digital_card} />
      </main>

      <footer className="text-center py-6 text-sm text-gray-400">
        {t('poweredBy')}
      </footer>
    </div>
  );
}
