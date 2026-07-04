import { notFound } from 'next/navigation';
import type { Metadata, Viewport } from 'next';
import { getPublicProfile } from '@/lib/publicApi';
import { buildPersonJsonLd } from '@/lib/seo';
import { PublicCardView } from '@/components/tarjeta/PublicCardView';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { PwaInstallRegister } from '@/components/shared/PwaInstallRegister';

interface Props {
  params: Promise<{ locale: string; username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, username } = await params;
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
      ...(profile.og_image_url ? { images: [profile.og_image_url] } : {}),
    },
    twitter: { card: 'summary_large_image' },
    manifest: `/${locale}/tarjeta/${username}/manifest`,
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: profile.display_name,
    },
  };
}

export async function generateViewport({ params }: Props): Promise<Viewport> {
  const { username } = await params;
  const data = await getPublicProfile(username);

  return {
    themeColor: data?.digital_card?.primary_color || '#3B82F6',
  };
}

export default async function TarjetaPage({ params }: Props) {
  const { locale, username } = await params;
  const data = await getPublicProfile(username);

  if (!data) {
    notFound();
  }

  const { profile, digital_card } = data;
  const jsonLd = buildPersonJsonLd(profile, digital_card);
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? '';
  const publicUrl = `${baseUrl}/${locale}/tarjeta/${username}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PwaInstallRegister scope={`/${locale}/tarjeta/${username}`} />
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
        <header className="flex items-center justify-end px-6 py-2 lg:py-4">
          <ThemeToggle />
        </header>

        <main className="flex-1 px-4 pt-2 pb-6 lg:px-8 lg:pt-6 max-w-5xl mx-auto w-full">
          <PublicCardView
            profile={profile}
            card={digital_card}
            publicUrl={publicUrl}
          />
        </main>

        <footer className="text-center py-6 text-sm text-gray-400">
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
    </>
  );
}
