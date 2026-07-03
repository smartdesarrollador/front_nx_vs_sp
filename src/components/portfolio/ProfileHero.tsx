import Image from 'next/image';
import type { PublicProfile, PortfolioItem, PortfolioThemeColors, PortfolioHeroContent, DigitalCard } from '@/types/digital';
import type { PortfolioStyleTokens } from '@/features/portfolio/types';
import { getActiveSocials } from './socialIcons';

interface Props {
  profile: PublicProfile;
  items?: PortfolioItem[];
  themeColors?: PortfolioThemeColors;
  heroContent?: PortfolioHeroContent;
  digitalCard?: DigitalCard | null;
  styleTokens?: PortfolioStyleTokens;
}

export function ProfileHero({ profile, items, themeColors, heroContent, digitalCard, styleTokens }: Props) {
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

  const headerBgStyle = themeColors?.header_bg ? { background: themeColors.header_bg } : undefined;
  const textStyle = themeColors?.header_text ? { color: themeColors.header_text } : undefined;

  const activeSocials = heroContent?.showSocialLinks ? getActiveSocials(digitalCard) : [];

  return (
    <section className="w-full" style={headerBgStyle}>
      <div className={`max-w-4xl mx-auto px-4 text-center ${styleTokens?.spacingHero ?? 'py-12'}`}>
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
      {heroContent?.badge && (
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-medium bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
          {heroContent.badge}
        </span>
      )}
      <h1
        className={`text-3xl mb-2 ${styleTokens?.headingFont ?? 'font-sans'} ${styleTokens?.headingWeight ?? 'font-bold'} ${styleTokens?.headingTracking ?? ''} ${textStyle ? '' : 'text-gray-900 dark:text-white'}`}
        style={textStyle}
      >
        {profile.display_name}
      </h1>
      {profile.title && (
        <p
          className={`text-lg mb-4 ${styleTokens?.bodyLeading ?? ''} ${textStyle ? 'opacity-80' : 'text-gray-500 dark:text-gray-400'}`}
          style={textStyle}
        >
          {profile.title}
        </p>
      )}
      {profile.bio && (
        <p
          className={`max-w-2xl mx-auto mb-6 ${styleTokens?.bodyLeading ?? 'leading-relaxed'} ${textStyle ? 'opacity-75' : 'text-gray-600 dark:text-gray-300'}`}
          style={textStyle}
        >
          {profile.bio}
        </p>
      )}

      {heroContent?.ctaText && (
        <a
          href={heroContent.ctaUrl || '#'}
          className={`inline-flex items-center px-6 py-3 font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors mb-6 ${styleTokens?.radiusButton ?? 'rounded-lg'} ${styleTokens?.shadowButton ?? ''} ${styleTokens?.shadowButtonHover ?? ''} ${styleTokens?.buttonHover ?? ''}`}
        >
          {heroContent.ctaText}
        </a>
      )}

      {activeSocials.length > 0 && (
        <div className="flex items-center justify-center gap-3 mb-6">
          {activeSocials.map(({ key, Icon }) => (
            <a
              key={key}
              href={digitalCard![key]}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      )}

      {showStats && (
        <div className="flex items-center justify-center gap-8 mt-2">
          <div className="text-center">
            <p
              className={`text-2xl font-bold ${textStyle ? '' : 'text-gray-900 dark:text-white'}`}
              style={textStyle}
            >
              {totalItems}
            </p>
            <p className={`text-xs mt-0.5 ${textStyle ? 'opacity-60' : 'text-gray-500 dark:text-gray-400'}`} style={textStyle}>
              {totalItems === 1 ? 'Proyecto' : 'Proyectos'}
            </p>
          </div>
          {uniqueCategories > 0 && (
            <div className="text-center">
              <p
                className={`text-2xl font-bold ${textStyle ? '' : 'text-gray-900 dark:text-white'}`}
                style={textStyle}
              >
                {uniqueCategories}
              </p>
              <p className={`text-xs mt-0.5 ${textStyle ? 'opacity-60' : 'text-gray-500 dark:text-gray-400'}`} style={textStyle}>
                {uniqueCategories === 1 ? 'Categoría' : 'Categorías'}
              </p>
            </div>
          )}
          {uniqueTechs > 0 && (
            <div className="text-center">
              <p
                className={`text-2xl font-bold ${textStyle ? '' : 'text-gray-900 dark:text-white'}`}
                style={textStyle}
              >
                {uniqueTechs}
              </p>
              <p className={`text-xs mt-0.5 ${textStyle ? 'opacity-60' : 'text-gray-500 dark:text-gray-400'}`} style={textStyle}>
                Tecnologías
              </p>
            </div>
          )}
        </div>
      )}
      </div>
    </section>
  );
}
