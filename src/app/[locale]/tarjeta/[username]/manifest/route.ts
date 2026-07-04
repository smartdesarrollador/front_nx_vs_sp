import { NextResponse } from 'next/server';
import { getPublicProfile } from '@/lib/publicApi';

interface Params {
  params: Promise<{ locale: string; username: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const { locale, username } = await params;
  const data = await getPublicProfile(username);

  if (!data) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  const { profile, digital_card } = data;
  const scope = `/${locale}/tarjeta/${username}`;
  const themeColor = digital_card?.primary_color || '#3B82F6';

  const manifest = {
    id: scope,
    name: `${profile.display_name} · Tarjeta Digital`,
    short_name: profile.display_name.slice(0, 20),
    description: `Tarjeta digital de ${profile.display_name}`,
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
