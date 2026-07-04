import { ImageResponse } from 'next/og';
import { getPublicProfile } from '@/lib/publicApi';

export const alt = 'Tarjeta Digital';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ locale: string; username: string }>;
}

// Satori (the renderer behind ImageResponse) can't reliably parse remote SVGs — Dicebear's
// default avatar URL is SVG, so request its PNG variant; any other remote SVG is skipped.
function resolveAvatarUrl(url: string): string | null {
  if (!url) return null;
  if (url.includes('api.dicebear.com') && url.includes('/svg')) {
    return url.replace('/svg', '/png');
  }
  if (/\.svg(\?|$)/i.test(url)) return null;
  return url;
}

export default async function Image({ params }: Props) {
  const { username } = await params;
  const data = await getPublicProfile(username);

  const displayName = data?.profile.display_name ?? 'Vista Digital';
  const title = data?.profile.title ?? '';
  const avatarUrl = resolveAvatarUrl(data?.profile.avatar_url ?? '');
  const bgColor = data?.digital_card?.primary_color || '#3B82F6';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: bgColor,
          fontFamily: 'sans-serif',
        }}
      >
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt=""
            width={180}
            height={180}
            style={{
              borderRadius: '50%',
              border: '6px solid rgba(255,255,255,0.8)',
              marginBottom: 32,
            }}
          />
        )}
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, color: '#fff' }}>
          {displayName}
        </div>
        {title && (
          <div
            style={{ display: 'flex', fontSize: 32, color: 'rgba(255,255,255,0.85)', marginTop: 12 }}
          >
            {title}
          </div>
        )}
      </div>
    ),
    { ...size },
  );
}
