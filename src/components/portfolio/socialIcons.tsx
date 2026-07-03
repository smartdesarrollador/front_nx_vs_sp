import { Linkedin, Github, Twitter, Instagram, Facebook, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { DigitalCard } from '@/types/digital';

type SocialUrlKey = 'linkedin_url' | 'github_url' | 'twitter_url' | 'instagram_url' | 'facebook_url' | 'website_url';

export const SOCIAL_ICONS: { key: SocialUrlKey; Icon: LucideIcon }[] = [
  { key: 'linkedin_url', Icon: Linkedin },
  { key: 'github_url', Icon: Github },
  { key: 'twitter_url', Icon: Twitter },
  { key: 'instagram_url', Icon: Instagram },
  { key: 'facebook_url', Icon: Facebook },
  { key: 'website_url', Icon: Globe },
];

export function getActiveSocials(digitalCard?: DigitalCard | null) {
  if (!digitalCard) return [];
  return SOCIAL_ICONS.filter(({ key }) => digitalCard[key]);
}
