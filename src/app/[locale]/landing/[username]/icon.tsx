import { getPublicLanding } from '@/lib/publicApi';
import { renderProfileIcon } from '@/lib/pwa/profileIcon';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ username: string }>;
}

export default async function Icon({ params }: Props) {
  const { username } = await params;
  const data = await getPublicLanding(username);

  return renderProfileIcon({
    avatarUrl: data?.profile.avatar_url ?? '',
    displayName: data?.profile.display_name ?? 'Vista Digital',
    bgColor: data?.landing?.accent_color || data?.landing?.theme_colors?.hero_bg || '#3B82F6',
    size: 32,
  });
}
