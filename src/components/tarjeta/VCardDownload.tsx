'use client';

import { UserPlus } from 'lucide-react';
import type { DigitalCard } from '@/types/digital';
import type { PublicProfile } from '@/types/digital';
import { useTranslations } from 'next-intl';

interface Props {
  profile: PublicProfile;
  card: DigitalCard;
  primaryColor: string;
}

export function VCardDownload({ profile, card, primaryColor }: Props) {
  const t = useTranslations('tarjeta');

  const handleDownload = () => {
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${profile.display_name}`,
      `TITLE:${profile.title}`,
    ];

    if (card.email) lines.push(`EMAIL:${card.email}`);
    if (card.phone) lines.push(`TEL:${card.phone}`);
    if (card.website_url) lines.push(`URL:${card.website_url}`);
    if (card.linkedin_url) lines.push(`X-SOCIALPROFILE;type=linkedin:${card.linkedin_url}`);
    if (card.twitter_url) lines.push(`X-SOCIALPROFILE;type=twitter:${card.twitter_url}`);
    if (card.github_url) lines.push(`X-SOCIALPROFILE;type=github:${card.github_url}`);
    if (card.location) lines.push(`ADR:;;${card.location};;;;`);

    lines.push('END:VCARD');

    const vcfContent = lines.join('\r\n');
    const blob = new Blob([vcfContent], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${profile.username}.vcf`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-medium text-sm hover:opacity-80 transition-opacity"
      style={{ borderColor: primaryColor, color: primaryColor }}
    >
      <UserPlus className="w-4 h-4" />
      {t('saveContact')}
    </button>
  );
}
