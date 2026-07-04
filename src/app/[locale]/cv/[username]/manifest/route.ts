import { NextResponse } from 'next/server';
import { getPublicCV } from '@/lib/publicApi';

interface Params {
  params: Promise<{ locale: string; username: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const { locale, username } = await params;
  const data = await getPublicCV(username);

  if (!data) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  const { profile, cv } = data;
  const scope = `/${locale}/cv/${username}`;
  const themeColor = cv?.accent_color || '#3B82F6';

  const manifest = {
    id: scope,
    name: `CV de ${profile.display_name}`,
    short_name: profile.display_name.slice(0, 20),
    description: `CV de ${profile.display_name}`,
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
