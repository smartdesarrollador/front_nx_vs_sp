import Image from 'next/image';
import type { PublicProfile, PortfolioItem } from '@/types/digital';

interface Props {
  profile: PublicProfile;
  items?: PortfolioItem[];
}

export function ProfileHero({ profile, items }: Props) {
  const initials = profile.display_name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const uniqueCategories = items
    ? new Set(items.map((i) => i.category).filter(Boolean)).size
    : 0;
  const uniqueTechs = items
    ? new Set(items.flatMap((i) => i.technologies ?? [])).size
    : 0;
  const totalItems = items?.length ?? 0;

  const showStats = items && items.length > 0;

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 text-center">
      <div className="flex justify-center mb-6">
        {profile.avatar_url ? (
          <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-gray-100 dark:ring-gray-800">
            <Image
              src={profile.avatar_url}
              alt={profile.display_name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center ring-4 ring-gray-100 dark:ring-gray-800">
            <span className="text-2xl font-bold text-white">{initials}</span>
          </div>
        )}
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {profile.display_name}
      </h1>
      {profile.title && (
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-4">{profile.title}</p>
      )}
      {profile.bio && (
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
          {profile.bio}
        </p>
      )}

      {showStats && (
        <div className="flex items-center justify-center gap-8 mt-2">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalItems}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {totalItems === 1 ? 'Proyecto' : 'Proyectos'}
            </p>
          </div>
          {uniqueCategories > 0 && (
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{uniqueCategories}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {uniqueCategories === 1 ? 'Categoría' : 'Categorías'}
              </p>
            </div>
          )}
          {uniqueTechs > 0 && (
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{uniqueTechs}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Tecnologías</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
