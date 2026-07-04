import { getPublicProfile } from '@/lib/publicApi';
import { renderProfileIcon } from '@/lib/pwa/profileIcon';

interface Params {
  params: Promise<{ username: string }>;
}

export async function GET(_request: Request, { params }: Params) {
  const { username } = await params;
  const data = await getPublicProfile(username);

  return renderProfileIcon({
    avatarUrl: data?.profile.avatar_url ?? '',
    displayName: data?.profile.display_name ?? 'Vista Digital',
    bgColor: data?.digital_card?.primary_color || '#3B82F6',
    size: 512,
  });
}
