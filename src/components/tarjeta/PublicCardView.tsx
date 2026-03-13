import Image from 'next/image';
import { MapPin } from 'lucide-react';
import type { PublicProfile, DigitalCard } from '@/types/digital';
import { SocialLinksGrid } from './SocialLinksGrid';
import { CardContactButton } from './CardContactButton';
import { VCardDownload } from './VCardDownload';

interface Props {
  profile: PublicProfile;
  card: DigitalCard | null;
}

export function PublicCardView({ profile, card }: Props) {
  const primaryColor = card?.primary_color ?? '#3B82F6';
  const hasContactInfo = !!(card?.email || card?.phone);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Header accent bar */}
        <div className="h-2 w-full" style={{ backgroundColor: primaryColor }} />

        <div className="p-6 flex flex-col items-center gap-5">
          {/* Avatar */}
          <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-700 shadow-lg">
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.display_name}
                fill
                className="object-cover"
                sizes="112px"
                priority
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-white text-3xl font-bold"
                style={{ backgroundColor: primaryColor }}
              >
                {profile.display_name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Name & title */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {profile.display_name}
            </h1>
            {profile.title && (
              <p className="text-sm font-medium mt-1" style={{ color: primaryColor }}>
                {profile.title}
              </p>
            )}
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              {profile.bio.slice(0, 500)}
            </p>
          )}

          {/* Location */}
          {card?.location && (
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{card.location}</span>
            </div>
          )}

          {/* Contact buttons */}
          {card && hasContactInfo && (
            <CardContactButton card={card} primaryColor={primaryColor} />
          )}

          {/* Save contact */}
          {card && hasContactInfo && (
            <VCardDownload
              profile={profile}
              card={card}
              primaryColor={primaryColor}
            />
          )}

          {/* Social links */}
          {card && (
            <SocialLinksGrid card={card} primaryColor={primaryColor} />
          )}

          {/* QR code */}
          {card?.qr_code_url && (
            <div className="flex flex-col items-center gap-2 pt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.qr_code_url}
                alt="QR code"
                className="w-32 h-32"
              />
              <p className="text-xs text-gray-400">Escanea el QR</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
