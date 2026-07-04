import { getPublicLanding } from '@/lib/publicApi';
import { renderProfileIcon } from '@/lib/pwa/profileIcon';

interface Params {
  params: Promise<{ username: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const { username } = await params;
  const data = await getPublicLanding(username);

  return renderProfileIcon({
    avatarUrl: data?.profile.avatar_url ?? '',
    displayName: data?.profile.display_name ?? 'Vista Digital',
    bgColor: data?.landing?.accent_color || data?.landing?.theme_colors?.hero_bg || '#3B82F6',
    size: 512,
  });
}
