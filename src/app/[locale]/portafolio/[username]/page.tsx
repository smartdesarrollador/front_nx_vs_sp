import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPublicPortfolio } from '@/lib/publicApi';
import { buildItemListJsonLd } from '@/lib/seo';
import { PORTFOLIO_STYLE_PRESET_TOKENS } from '@/features/portfolio/types';
import { PortfolioNav, type PortfolioNavSection } from '@/components/portfolio/PortfolioNav';
import { ProfileHero } from '@/components/portfolio/ProfileHero';
import { PublicPortfolioGrid } from '@/components/portfolio/PublicPortfolioGrid';
import { PortfolioAboutSection } from '@/components/portfolio/PortfolioAboutSection';
import { PortfolioSkillsSection } from '@/components/portfolio/PortfolioSkillsSection';
import { PortfolioServicesSection } from '@/components/portfolio/PortfolioServicesSection';
import { PortfolioTestimonialsSection } from '@/components/portfolio/PortfolioTestimonialsSection';
import { PortfolioContactSection } from '@/components/portfolio/PortfolioContactSection';
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter';

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
  const data = await getPublicPortfolio(username);

  if (!data) notFound();

  const {
    profile,
    items,
    style_preset,
    theme_colors,
    hero_content,
    contact_content,
    about_content,
    skills_content,
    skills,
    services_content,
    testimonials_content,
    digital_card,
  } = data;
  const jsonLd = buildItemListJsonLd(profile, items, locale);
  const styleTokens = PORTFOLIO_STYLE_PRESET_TOKENS[style_preset ?? 'modern'];

  const hasAbout = !!(about_content?.title || about_content?.text || about_content?.highlights?.some(Boolean));
  const hasSkills = !!(skills_content?.showSkills && skills && skills.length > 0);
  const hasServices = !!(services_content?.items && services_content.items.length > 0);
  const hasProjects = items.length > 0;
  const hasTestimonials = !!(testimonials_content?.items && testimonials_content.items.length > 0);
  const hasSocialLink = !!(
    digital_card?.linkedin_url || digital_card?.github_url || digital_card?.twitter_url ||
    digital_card?.instagram_url || digital_card?.facebook_url || digital_card?.website_url
  );
  const hasContact = !!(
    contact_content?.title || contact_content?.description ||
    digital_card?.email || digital_card?.phone || digital_card?.location || hasSocialLink
  );

  const navSections: PortfolioNavSection[] = [
    hasAbout && { id: 'about', label: 'Sobre mí' },
    hasSkills && { id: 'skills', label: 'Habilidades' },
    hasServices && { id: 'services', label: 'Servicios' },
    hasProjects && { id: 'projects', label: 'Proyectos' },
    hasTestimonials && { id: 'testimonials', label: 'Testimonios' },
    hasContact && { id: 'contact', label: 'Contacto' },
  ].filter((s): s is PortfolioNavSection => !!s);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 scroll-smooth">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioNav
        profileName={profile.display_name}
        locale={locale}
        username={username}
        navBgColor={theme_colors?.nav_bg}
        navTextColor={theme_colors?.nav_bg ? theme_colors?.header_text : undefined}
        styleTokens={styleTokens}
        sections={navSections}
      />
      <main className="flex-1 pt-16">
        <ProfileHero
          profile={profile}
          items={items}
          themeColors={theme_colors}
          heroContent={hero_content}
          digitalCard={digital_card}
          styleTokens={styleTokens}
        />
        <PortfolioAboutSection aboutContent={about_content} styleTokens={styleTokens} />
        <PortfolioSkillsSection skillsContent={skills_content} skills={skills} styleTokens={styleTokens} />
        <PortfolioServicesSection servicesContent={services_content} styleTokens={styleTokens} />
        <PublicPortfolioGrid
          items={items}
          locale={locale}
          username={username}
          themeColors={theme_colors}
          styleTokens={styleTokens}
        />
        <PortfolioTestimonialsSection testimonialsContent={testimonials_content} styleTokens={styleTokens} />
        <PortfolioContactSection
          contactContent={contact_content}
          digitalCard={digital_card}
          themeColors={theme_colors}
          styleTokens={styleTokens}
        />
      </main>
      <PortfolioFooter digitalCard={digital_card} styleTokens={styleTokens} />
    </div>
  );
}
