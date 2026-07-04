import type { DigitalCard } from '@/types/digital';
import type { PortfolioStyleTokens } from '@/features/portfolio/types';
import { getActiveSocials } from './socialIcons';

interface Props {
  digitalCard?: DigitalCard | null;
  styleTokens?: PortfolioStyleTokens;
}

export function PortfolioFooter({ digitalCard, styleTokens }: Props) {
  const activeSocials = getActiveSocials(digitalCard);

  return (
    <footer className={`text-center text-sm text-gray-400 border-t border-gray-100 dark:border-gray-800 ${styleTokens?.spacingFooter ?? 'py-6'}`}>
      {activeSocials.length > 0 && (
        <div className="flex items-center justify-center gap-3 mb-4">
          {activeSocials.map(({ key, Icon }) => (
            <a
              key={key}
              href={digitalCard![key]}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900/30 transition-colors"
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      )}
      <a
        href="https://digisider.com"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
      >
        Digisider
      </a>
    </footer>
  );
}
