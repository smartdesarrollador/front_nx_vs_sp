import { ImageResponse } from 'next/og';

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

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

interface RenderProfileIconOptions {
  avatarUrl: string;
  displayName: string;
  bgColor: string;
  size: number;
}

// Shared PWA icon renderer for the 4 public tenant routes (tarjeta/landing/portafolio/cv).
// Leaves ~28% safe-zone padding around the content so the icon stays legible when a maskable
// purpose is applied (Android crops the outer edges to fit its adaptive icon shape).
export function renderProfileIcon({ avatarUrl, displayName, bgColor, size }: RenderProfileIconOptions) {
  const resolvedAvatar = resolveAvatarUrl(avatarUrl);
  const contentSize = Math.round(size * 0.72);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: bgColor,
        }}
      >
        {resolvedAvatar ? (
          <img
            src={resolvedAvatar}
            alt=""
            width={contentSize}
            height={contentSize}
            style={{ borderRadius: '50%' }}
          />
        ) : (
          <span
            style={{
              color: '#fff',
              fontSize: Math.round(size * 0.4),
              fontWeight: 700,
              fontFamily: 'sans-serif',
            }}
          >
            {getInitials(displayName)}
          </span>
        )}
      </div>
    ),
    { width: size, height: size },
  );
}
