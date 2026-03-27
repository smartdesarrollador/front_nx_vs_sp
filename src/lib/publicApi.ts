import type {
  PublicCardResponse,
  PublicLandingResponse,
  PublicPortfolioResponse,
  PublicCVResponse,
} from '@/types/digital';

const API_URL =
  process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? '';

export async function getPublicProfile(
  username: string,
): Promise<PublicCardResponse | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/public/profiles/${username}/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json() as Promise<PublicCardResponse>;
  } catch {
    return null;
  }
}

export async function getPublicLanding(
  username: string,
): Promise<PublicLandingResponse | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/public/landing/${username}/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json() as Promise<PublicLandingResponse>;
  } catch {
    return null;
  }
}

export async function getPublicPortfolio(
  username: string,
): Promise<PublicPortfolioResponse | null> {
  try {
    const res = await fetch(
      `${API_URL}/api/v1/public/portafolio/${username}/`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return null;
    return res.json() as Promise<PublicPortfolioResponse>;
  } catch {
    return null;
  }
}

export async function getPublicCV(
  username: string,
): Promise<PublicCVResponse | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/public/cv/${username}/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json() as Promise<PublicCVResponse>;
  } catch {
    return null;
  }
}
