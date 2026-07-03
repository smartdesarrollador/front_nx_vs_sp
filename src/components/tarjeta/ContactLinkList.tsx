'use client';

import { useState } from 'react';
import {
  MessageCircle,
  Globe,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Instagram,
  Github,
  Facebook,
  Share2,
  Check,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { DigitalCard, PublicProfile } from '@/types/digital';
import { CUSTOM_LINK_ICONS, DEFAULT_CUSTOM_LINK_ICON } from '@/features/tarjeta/customLinkIcons';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

function trackShare(username: string) {
  fetch(`${API_URL}/api/v1/public/track-share/${username}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ service: 'tarjeta' }),
  }).catch(() => {});
}

interface Props {
  card: DigitalCard;
  profile: PublicProfile;
  publicUrl: string;
  primaryColor: string;
}

interface ContactItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  href: string;
  iconColor?: string;
  highlight?: boolean;
}

export function ContactLinkList({ card, profile, publicUrl, primaryColor }: Props) {
  const t = useTranslations('tarjeta');
  const [copied, setCopied] = useState(false);

  const phoneDigits = card.phone.replace(/\D/g, '');

  const items: ContactItem[] = [
    card.phone
      ? {
          key: 'whatsapp',
          icon: <MessageCircle className="w-5 h-5" />,
          label: 'WhatsApp',
          sublabel: t('whatsappLink'),
          href: `https://wa.me/${phoneDigits}`,
          iconColor: '#25D366',
          highlight: true,
        }
      : null,
    card.website_url
      ? {
          key: 'portfolio',
          icon: <Globe className="w-5 h-5" />,
          label: 'Portafolio',
          sublabel: t('portfolioLink'),
          href: card.website_url,
          iconColor: primaryColor,
        }
      : null,
    card.email
      ? {
          key: 'email',
          icon: <Mail className="w-5 h-5" />,
          label: card.email,
          sublabel: card.email.split('@')[1] ?? '',
          href: `mailto:${card.email}`,
          iconColor: '#EA4335',
        }
      : null,
    card.phone
      ? {
          key: 'phone',
          icon: <Phone className="w-5 h-5" />,
          label: card.phone,
          sublabel: t('callOrWhatsapp'),
          href: `tel:${card.phone}`,
          iconColor: primaryColor,
        }
      : null,
    card.linkedin_url
      ? {
          key: 'linkedin',
          icon: <Linkedin className="w-5 h-5" />,
          label: 'Perfil Profesional',
          sublabel: t('professionalProfile'),
          href: card.linkedin_url,
          iconColor: '#0A66C2',
        }
      : null,
    card.twitter_url
      ? {
          key: 'twitter',
          icon: <Twitter className="w-5 h-5" />,
          label: 'Twitter',
          sublabel: t('followOnX'),
          href: card.twitter_url,
          iconColor: '#1DA1F2',
        }
      : null,
    card.instagram_url
      ? {
          key: 'instagram',
          icon: <Instagram className="w-5 h-5" />,
          label: 'Instagram',
          sublabel: t('photosAndMoments'),
          href: card.instagram_url,
          iconColor: '#E1306C',
        }
      : null,
    card.github_url
      ? {
          key: 'github',
          icon: <Github className="w-5 h-5" />,
          label: 'GitHub',
          sublabel: t('codeAndProjects'),
          href: card.github_url,
          iconColor: '#333',
        }
      : null,
    card.facebook_url
      ? {
          key: 'facebook',
          icon: <Facebook className="w-5 h-5" />,
          label: 'Facebook',
          sublabel: t('facebookLink'),
          href: card.facebook_url,
          iconColor: '#1877F2',
        }
      : null,
    ...(card.custom_links ?? []).map((link) => {
      const Icon = CUSTOM_LINK_ICONS[link.icon] ?? CUSTOM_LINK_ICONS[DEFAULT_CUSTOM_LINK_ICON];
      return {
        key: `custom-${link.id}`,
        icon: <Icon className="w-5 h-5" />,
        label: link.label,
        sublabel: '',
        href: link.url,
        iconColor: primaryColor,
      };
    }),
  ].filter(Boolean) as ContactItem[];

  async function handleShare() {
    trackShare(profile.username);
    if (navigator.share) {
      await navigator.share({ title: profile.display_name, url: publicUrl });
      return;
    }
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        {t('contactInfo')}
      </h2>

      <ul className="flex flex-col gap-2 flex-1">
        {items.map((item) => (
          <li key={item.key}>
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl
                transition-colors duration-150 group
                ${
                  item.highlight
                    ? 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30'
                    : 'bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-700/60'
                }
              `}
            >
              <span
                className="flex-shrink-0"
                style={{ color: item.iconColor ?? primaryColor }}
              >
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                  {item.label}
                </p>
                {item.sublabel && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {item.sublabel}
                  </p>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>

      {/* Share button */}
      <button
        onClick={handleShare}
        className="
          mt-4 w-full flex items-center justify-center gap-2
          px-4 py-3 rounded-xl text-sm font-medium
          text-white transition-opacity hover:opacity-90 active:opacity-80
        "
        style={{ backgroundColor: primaryColor }}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            {t('shareUrlCopied')}
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            {t('shareCard')}
          </>
        )}
      </button>
    </div>
  );
}
