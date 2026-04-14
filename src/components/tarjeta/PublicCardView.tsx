import type { PublicProfile, DigitalCard } from '@/types/digital';
import { ProfileSidebar } from './ProfileSidebar';
import { ContactLinkList } from './ContactLinkList';
import { QRPanel } from './QRPanel';
import { AboutSection } from './AboutSection';

interface Props {
  profile: PublicProfile;
  card: DigitalCard | null;
  publicUrl: string;
}

export function PublicCardView({ profile, card, publicUrl }: Props) {
  const primaryColor = card?.primary_color ?? '#3B82F6';

  return (
    <div className="w-full">
      {/* Main grid: 3 cols desktop / stacked mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] min-h-[480px] overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-gray-900">
        {/* Col 1 — Profile sidebar */}
        <ProfileSidebar profile={profile} card={card} />

        {/* Col 2 — Contact links */}
        <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-l border-gray-100 dark:border-gray-800">
          {card ? (
            <ContactLinkList
              card={card}
              profile={profile}
              publicUrl={publicUrl}
              primaryColor={primaryColor}
            />
          ) : (
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              Sin información de contacto
            </p>
          )}
        </div>

        {/* Col 3 — QR panel */}
        <div className="p-6 lg:p-8 lg:border-l border-gray-100 dark:border-gray-800">
          {card ? (
            <QRPanel
              profile={profile}
              card={card}
              publicUrl={publicUrl}
              primaryColor={primaryColor}
            />
          ) : null}
        </div>
      </div>

      {/* About section (bio + specialties + years exp) */}
      {card && (
        <AboutSection profile={profile} card={card} primaryColor={primaryColor} />
      )}
    </div>
  );
}
