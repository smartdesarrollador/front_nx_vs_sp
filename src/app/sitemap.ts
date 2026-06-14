import type { MetadataRoute } from 'next';

export const dynamic = 'force-dynamic';

const API_URL =
  process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? '';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3004';
const LOCALES = ['es', 'en'] as const;

async function getPublicUsernames(): Promise<string[]> {
  try {
    const res = await fetch(`${API_URL}/api/v1/public/profiles/`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const items = Array.isArray(data) ? data : (data.results ?? []);
    return items
      .filter((p: { is_public?: boolean }) => p.is_public !== false)
      .map((p: { username: string }) => p.username)
      .filter(Boolean);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const usernames = await getPublicUsernames();
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: `${APP_URL}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    });
  }

  const services = ['tarjeta', 'landing', 'portafolio', 'cv'] as const;
  for (const username of usernames) {
    for (const locale of LOCALES) {
      for (const service of services) {
        entries.push({
          url: `${APP_URL}/${locale}/${service}/${username}`,
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }
  }

  return entries;
}
