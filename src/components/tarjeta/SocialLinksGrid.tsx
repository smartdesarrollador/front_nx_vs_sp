import { Linkedin, Twitter, Github, Instagram, Facebook, Globe } from 'lucide-react';
import type { DigitalCard } from '@/types/digital';

interface SocialLink {
  key: keyof Pick<
    DigitalCard,
    | 'linkedin_url'
    | 'twitter_url'
    | 'github_url'
    | 'instagram_url'
    | 'facebook_url'
    | 'website_url'
  >;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const SOCIAL_LINKS: SocialLink[] = [
  { key: 'linkedin_url', label: 'LinkedIn', Icon: Linkedin },
  { key: 'twitter_url', label: 'Twitter', Icon: Twitter },
  { key: 'github_url', label: 'GitHub', Icon: Github },
  { key: 'instagram_url', label: 'Instagram', Icon: Instagram },
  { key: 'facebook_url', label: 'Facebook', Icon: Facebook },
  { key: 'website_url', label: 'Sitio web', Icon: Globe },
];

interface Props {
  card: DigitalCard;
  primaryColor: string;
}

export function SocialLinksGrid({ card, primaryColor }: Props) {
  const activeLinks = SOCIAL_LINKS.filter((link) => !!card[link.key]);

  if (activeLinks.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-3 w-full">
      {activeLinks.map(({ key, label, Icon }) => (
        <a
          key={key}
          href={card[key]}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 p-3 rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
          style={{ color: primaryColor }}
        >
          <Icon className="w-5 h-5" />
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
