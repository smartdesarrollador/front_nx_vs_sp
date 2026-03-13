import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Script from 'next/script';
import { getPublicLanding } from '@/lib/publicApi';
import { PublicLandingNav } from '@/components/landing/PublicLandingNav';
import { PublicLandingView } from '@/components/landing/PublicLandingView';

interface Props {
  params: Promise<{ locale: string; username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const data = await getPublicLanding(username);
  if (!data) return { title: 'Landing no encontrada' };
  const { profile } = data;
  return {
    title: profile.meta_title || `${profile.display_name} — Vista Digital`,
    description: profile.meta_description || profile.bio,
    openGraph: {
      title: profile.meta_title || profile.display_name,
      description: profile.meta_description,
      images: profile.og_image_url ? [profile.og_image_url] : [],
    },
  };
}

export default async function LandingPage({ params }: Props) {
  const { locale, username } = await params;
  const t = await getTranslations('landing');
  const data = await getPublicLanding(username);

  if (!data || !data.landing) notFound();

  const { profile, landing } = data;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      {landing.ga_tracking_id && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${landing.ga_tracking_id}`}
          strategy="afterInteractive"
        />
      )}
      {landing.custom_css && (
        <style dangerouslySetInnerHTML={{ __html: landing.custom_css }} />
      )}
      <PublicLandingNav
        sections={landing.sections}
        profileName={profile.display_name}
        locale={locale}
      />
      <main className="flex-1 pt-16">
        <PublicLandingView profile={profile} landing={landing} />
      </main>
      <footer className="text-center py-6 text-sm text-gray-400 border-t border-gray-100 dark:border-gray-800">
        {t('poweredBy')}
      </footer>
    </div>
  );
}
