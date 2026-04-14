import Image from 'next/image';
import { MapPin } from 'lucide-react';
import type { PublicProfile, DigitalCard } from '@/types/digital';

interface Props {
  profile: PublicProfile;
  card: DigitalCard | null;
}

export function ProfileSidebar({ profile, card }: Props) {
  const primaryColor = card?.primary_color ?? '#3B82F6';
  const initial = profile.display_name.charAt(0).toUpperCase();

  return (
    <div
      className="flex flex-col items-center justify-center gap-6 p-8 lg:min-h-full"
      style={{ backgroundColor: primaryColor }}
    >
      {/* Avatar */}
      <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-white/30 shadow-xl flex-shrink-0">
        {profile.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt={profile.display_name}
            fill
            className="object-cover"
            sizes="96px"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/20 text-white text-3xl font-bold">
            {initial}
          </div>
        )}
      </div>

      {/* Name */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white leading-tight">
          {profile.display_name}
        </h1>
        {profile.title && (
          <p className="text-sm text-white/80 mt-1">{profile.title}</p>
        )}
      </div>

      {/* Location */}
      {card?.location && (
        <div className="flex items-center gap-1.5 text-sm text-white/70">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span>{card.location}</span>
        </div>
      )}
    </div>
  );
}
