import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Script from 'next/script';
import { getPublicLanding } from '@/lib/publicApi';
import { buildWebPageJsonLd } from '@/lib/seo';
import { PublicLandingNav } from '@/components/landing/PublicLandingNav';
import { PublicLandingView } from '@/components/landing/PublicLandingView';
import { PublicLandingFooter } from '@/components/landing/PublicLandingFooter';
import type { LandingSocialLinks } from '@/types/digital';
import type { HeroContent } from '@/features/landing/types';

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
  const jsonLd = buildWebPageJsonLd(profile, landing);

  const heroSection = landing.sections.find((s) => s.type === 'hero');
  const heroContent = heroSection?.content as HeroContent | undefined;
  const ctaText = heroContent?.ctaText;
  const ctaUrl = heroContent?.ctaUrl;

  const socialLinks = (landing.social_links ?? {}) as LandingSocialLinks;

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 scroll-smooth">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        ctaText={ctaText}
        ctaUrl={ctaUrl}
        navBgColor={landing.theme_colors?.nav_bg}
      />
      <main className="flex-1 pt-16">
        <PublicLandingView profile={profile} landing={landing} />
      </main>
      <PublicLandingFooter
        displayName={profile.display_name}
        username={username}
        socialLinks={socialLinks}
        locale={locale}
        poweredByText={t('poweredBy')}
      />
    </div>
  );
}
