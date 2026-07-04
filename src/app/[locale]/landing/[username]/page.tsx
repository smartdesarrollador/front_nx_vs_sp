import { notFound } from 'next/navigation';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { getPublicLanding } from '@/lib/publicApi';
import { buildWebPageJsonLd } from '@/lib/seo';
import { PublicLandingNav } from '@/components/landing/PublicLandingNav';
import { PublicLandingView } from '@/components/landing/PublicLandingView';
import { PublicLandingFooter } from '@/components/landing/PublicLandingFooter';
import { PwaInstallRegister } from '@/components/shared/PwaInstallRegister';
import type { LandingSocialLinks } from '@/types/digital';
import type { HeroContent } from '@/features/landing/types';
import { STYLE_PRESET_TOKENS } from '@/features/landing/types';

interface Props {
  params: Promise<{ locale: string; username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, username } = await params;
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
    manifest: `/${locale}/landing/${username}/manifest`,
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: profile.display_name,
    },
  };
}

export async function generateViewport({ params }: Props): Promise<Viewport> {
  const { username } = await params;
  const data = await getPublicLanding(username);

  return {
    themeColor: data?.landing?.accent_color || data?.landing?.theme_colors?.hero_bg || '#3B82F6',
  };
}

export default async function LandingPage({ params }: Props) {
  const { locale, username } = await params;
  const data = await getPublicLanding(username);

  if (!data || !data.landing) notFound();

  const { profile, landing } = data;
  const jsonLd = buildWebPageJsonLd(profile, landing);

  const heroSection = landing.sections.find((s) => s.type === 'hero');
  const heroContent = heroSection?.content as HeroContent | undefined;
  const ctaText = heroContent?.ctaText;
  const ctaUrl = heroContent?.ctaUrl;

  const socialLinks = (landing.social_links ?? {}) as LandingSocialLinks;
  const styleTokens = STYLE_PRESET_TOKENS[landing.style_preset ?? 'modern'];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 scroll-smooth">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PwaInstallRegister scope={`/${locale}/landing/${username}`} />
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
        navTextColor={landing.theme_colors?.nav_text}
        styleTokens={styleTokens}
      />
      <main className="flex-1 pt-16">
        <PublicLandingView profile={profile} landing={landing} />
      </main>
      <PublicLandingFooter
        displayName={profile.display_name}
        username={username}
        socialLinks={socialLinks}
        locale={locale}
        styleTokens={styleTokens}
      />
    </div>
  );
}
