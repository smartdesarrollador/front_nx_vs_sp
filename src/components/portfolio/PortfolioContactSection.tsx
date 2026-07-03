import { Mail, Phone, MapPin } from 'lucide-react';
import type { PortfolioContactContent, DigitalCard, PortfolioThemeColors } from '@/types/digital';
import type { PortfolioStyleTokens } from '@/features/portfolio/types';
import { getActiveSocials } from './socialIcons';

interface Props {
  contactContent?: PortfolioContactContent;
  digitalCard?: DigitalCard | null;
  themeColors?: PortfolioThemeColors;
  styleTokens?: PortfolioStyleTokens;
}

export function PortfolioContactSection({ contactContent, digitalCard, themeColors, styleTokens }: Props) {
  const activeSocials = getActiveSocials(digitalCard);
  const hasContactInfo = !!(digitalCard?.email || digitalCard?.phone || digitalCard?.location);
  const hasTitleOrDescription = !!(contactContent?.title || contactContent?.description);

  if (!hasTitleOrDescription && !hasContactInfo && activeSocials.length === 0) {
    return null;
  }

  const accentStyle = themeColors?.accent ? { color: themeColors.accent } : undefined;
  const cardClass = `${styleTokens?.radiusCard ?? 'rounded-lg'} ${styleTokens?.shadowCard ?? ''} ${styleTokens?.shadowCardHover ?? ''}`;

  return (
    <section id="contact" className={`max-w-2xl mx-auto px-4 text-center scroll-mt-16 ${styleTokens?.spacingSection ?? 'py-16'}`}>
      {contactContent?.title && (
        <h2 className={`text-2xl text-gray-900 dark:text-white mb-2 ${styleTokens?.headingFont ?? 'font-sans'} ${styleTokens?.headingWeight ?? 'font-bold'} ${styleTokens?.headingTracking ?? ''}`}>{contactContent.title}</h2>
      )}
      {contactContent?.description && (
        <p className="text-gray-500 dark:text-gray-400 mb-8">{contactContent.description}</p>
      )}

      {hasContactInfo && (
        <div className="flex flex-col gap-3 mb-6">
          {digitalCard?.email && (
            <a
              href={`mailto:${digitalCard.email}`}
              className={`flex items-center justify-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${cardClass}`}
            >
              <Mail className="w-4 h-4 flex-shrink-0" style={accentStyle} />
              {digitalCard.email}
            </a>
          )}
          {digitalCard?.phone && (
            <a
              href={`tel:${digitalCard.phone}`}
              className={`flex items-center justify-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${cardClass}`}
            >
              <Phone className="w-4 h-4 flex-shrink-0" style={accentStyle} />
              {digitalCard.phone}
            </a>
          )}
          {digitalCard?.location && (
            <div className={`flex items-center justify-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 ${cardClass}`}>
              <MapPin className="w-4 h-4 flex-shrink-0" style={accentStyle} />
              {digitalCard.location}
            </div>
          )}
        </div>
      )}

      {activeSocials.length > 0 && (
        <div className="flex items-center justify-center gap-3">
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
    </section>
  );
}
