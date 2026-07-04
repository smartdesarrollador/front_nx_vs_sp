import { NextResponse } from 'next/server';
import { getPublicLanding } from '@/lib/publicApi';

interface Params {
  params: Promise<{ locale: string; username: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const { locale, username } = await params;
  const data = await getPublicLanding(username);

  if (!data) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  const { profile, landing } = data;
  const scope = `/${locale}/landing/${username}`;
  const themeColor = landing?.accent_color || landing?.theme_colors?.hero_bg || '#3B82F6';

  const manifest = {
    id: scope,
    name: `${profile.display_name} · Landing`,
    short_name: profile.display_name.slice(0, 20),
    description: `Landing page de ${profile.display_name}`,
    start_url: scope,
    scope: `${scope}/`,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: themeColor,
    icons: [
      {
        src: `${scope}/icon-512`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  };

  return new NextResponse(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/manifest+json' },
  });
}
