import type {
  PublicProfile,
  DigitalCard,
  LandingTemplate,
  PortfolioItem,
  CVDocument,
} from '@/types/digital';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3004';

export function buildPersonJsonLd(
  profile: PublicProfile,
  card: DigitalCard | null,
) {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.display_name,
    jobTitle: profile.title || undefined,
    description: profile.bio || undefined,
    image: profile.avatar_url || undefined,
    url: `${APP_URL}/tarjeta/${profile.username}`,
  };

  if (card) {
    if (card.email) base.email = card.email;
    if (card.phone) base.telephone = card.phone;
    if (card.location)
      base.address = {
        '@type': 'PostalAddress',
        addressLocality: card.location,
      };
    const sameAs: string[] = [];
    if (card.linkedin_url) sameAs.push(card.linkedin_url);
    if (card.twitter_url) sameAs.push(card.twitter_url);
    if (card.github_url) sameAs.push(card.github_url);
    if (card.website_url) sameAs.push(card.website_url);
    if (sameAs.length) base.sameAs = sameAs;
  }

  return base;
}

export function buildWebPageJsonLd(
  profile: PublicProfile,
  landing: LandingTemplate,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: profile.meta_title || profile.display_name,
    description: profile.meta_description || profile.bio || undefined,
    url: `${APP_URL}/landing/${profile.username}`,
    author: { '@type': 'Person', name: profile.display_name },
    ...(profile.og_image_url && {
      image: { '@type': 'ImageObject', url: profile.og_image_url },
    }),
    ...(landing.contact_email && {
      contactPoint: { '@type': 'ContactPoint', email: landing.contact_email },
    }),
  };
}

export function buildItemListJsonLd(
  profile: PublicProfile,
  items: PortfolioItem[],
  locale: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Portfolio de ${profile.display_name}`,
    url: `${APP_URL}/${locale}/portafolio/${profile.username}`,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: item.title,
        description: item.description_short || undefined,
        url: `${APP_URL}/${locale}/portafolio/${profile.username}/${item.slug}`,
        ...(item.cover_image_url && { image: item.cover_image_url }),
        ...(item.project_date && { dateCreated: item.project_date }),
      },
    })),
  };
}

export function buildCreativeWorkJsonLd(
  item: PortfolioItem,
  profile: PublicProfile,
  locale: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: item.title,
    description: item.description_short || undefined,
    url: `${APP_URL}/${locale}/portafolio/${profile.username}/${item.slug}`,
    author: { '@type': 'Person', name: profile.display_name },
    ...(item.cover_image_url && { image: item.cover_image_url }),
    ...(item.project_date && { dateCreated: item.project_date }),
    ...(item.demo_url && { sameAs: item.demo_url }),
    ...(item.tags.length && { keywords: item.tags.join(', ') }),
  };
}

export function buildCVPersonJsonLd(profile: PublicProfile, cv: CVDocument) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.display_name,
    description: cv.professional_summary || profile.bio || undefined,
    image: profile.avatar_url || undefined,
    url: `${APP_URL}/cv/${profile.username}`,
    ...(cv.skills.length && { knowsAbout: cv.skills }),
    ...(cv.languages.length && {
      knowsLanguage: cv.languages.map((l) => l.name),
    }),
    ...(cv.experience.length && {
      worksFor: cv.experience
        .filter((e) => !e.end_date)
        .map((e) => ({ '@type': 'Organization', name: e.company })),
      hasOccupation: cv.experience.map((e) => ({
        '@type': 'Occupation',
        name: e.role,
        occupationLocation: { '@type': 'Organization', name: e.company },
      })),
    }),
    ...(cv.education.length && {
      alumniOf: cv.education.map((e) => ({
        '@type': 'EducationalOrganization',
        name: e.institution,
      })),
    }),
  };
}
