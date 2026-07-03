import { cache } from 'react';
import { headers } from 'next/headers';
import type {
  PublicCardResponse,
  PublicLandingResponse,
  PublicPortfolioResponse,
  PublicCVResponse,
} from '@/types/digital';

const API_URL =
  process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? '';

async function forwardedHeaders(): Promise<HeadersInit> {
  const h = await headers();
  const result: Record<string, string> = {};
  const ua = h.get('user-agent');
  if (ua) result['User-Agent'] = ua;
  const ref = h.get('referer');
  if (ref) result['Referer'] = ref;
  const xff = h.get('x-forwarded-for');
  if (xff) result['X-Forwarded-For'] = xff;
  return result;
}

export const getPublicProfile = cache(async (
  username: string,
): Promise<PublicCardResponse | null> => {
  try {
    const res = await fetch(`${API_URL}/api/v1/public/profiles/${username}/`, {
      cache: 'no-store',
      headers: await forwardedHeaders(),
    });
    if (!res.ok) return null;
    return res.json() as Promise<PublicCardResponse>;
  } catch {
    return null;
  }
});

export const getPublicLanding = cache(async (
  username: string,
): Promise<PublicLandingResponse | null> => {
  try {
    const res = await fetch(`${API_URL}/api/v1/public/landing/${username}/`, {
      cache: 'no-store',
      headers: await forwardedHeaders(),
    });
    if (!res.ok) return null;
    return res.json() as Promise<PublicLandingResponse>;
  } catch {
    return null;
  }
});

export const getPublicPortfolio = cache(async (
  username: string,
): Promise<PublicPortfolioResponse | null> => {
  try {
    const res = await fetch(
      `${API_URL}/api/v1/public/portafolio/${username}/`,
      { cache: 'no-store', headers: await forwardedHeaders() },
    );
    if (!res.ok) return null;
    return res.json() as Promise<PublicPortfolioResponse>;
  } catch {
    return null;
  }
});

export const getPublicCV = cache(async (
  username: string,
): Promise<PublicCVResponse | null> => {
  try {
    const res = await fetch(`${API_URL}/api/v1/public/cv/${username}/`, {
      cache: 'no-store',
      headers: await forwardedHeaders(),
    });
    if (!res.ok) return null;
    return res.json() as Promise<PublicCVResponse>;
  } catch {
    return null;
  }
});
