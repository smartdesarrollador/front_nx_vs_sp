import { Award } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { DigitalCard, PublicProfile } from '@/types/digital';

interface Props {
  profile: PublicProfile;
  card: DigitalCard;
  primaryColor: string;
}

export function AboutSection({ profile, card, primaryColor }: Props) {
  const t = useTranslations('tarjeta');
  const specialties = card.specialties ?? [];
  const hasAbout = !!(profile.bio || specialties.length > 0);
  const hasExp = !!(card.years_experience && card.years_experience > 0);

  if (!hasAbout && !hasExp) return null;

  return (
    <section className="lg:col-span-3 px-6 py-8 lg:px-8 border-t border-gray-100 dark:border-gray-800">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
        {/* Bio + Specialties */}
        <div className="space-y-5">
          {profile.bio && (
            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {t('aboutMe')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {profile.bio}
              </p>
            </div>
          )}

          {specialties.length > 0 && (
            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {t('specialties')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Years of experience badge */}
        {hasExp && (
          <div
            className="flex flex-col items-center justify-center gap-2 px-6 py-5 rounded-2xl text-white shadow-md flex-shrink-0 min-w-[140px]"
            style={{ backgroundColor: primaryColor }}
          >
            <Award className="w-6 h-6 opacity-90" />
            <p className="text-2xl font-bold leading-none">
              {card.years_experience}+
            </p>
            <p className="text-xs text-center opacity-80 leading-tight">
              años de experiencia
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
