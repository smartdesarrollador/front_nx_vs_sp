import { getPublicPortfolio } from '@/lib/publicApi';
import { renderProfileIcon } from '@/lib/pwa/profileIcon';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ username: string }>;
}

export default async function Icon({ params }: Props) {
  const { username } = await params;
  const data = await getPublicPortfolio(username);

  return renderProfileIcon({
    avatarUrl: data?.profile.avatar_url ?? '',
    displayName: data?.profile.display_name ?? 'Vista Digital',
    bgColor: data?.digital_card?.primary_color || data?.theme_colors?.accent || '#3B82F6',
    size: 32,
  });
}
