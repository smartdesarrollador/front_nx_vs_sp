import { Check } from 'lucide-react';
import type { PortfolioAboutContent } from '@/types/digital';
import type { PortfolioStyleTokens } from '@/features/portfolio/types';

interface Props {
  aboutContent?: PortfolioAboutContent;
  styleTokens?: PortfolioStyleTokens;
}

export function PortfolioAboutSection({ aboutContent, styleTokens }: Props) {
  const { title, text } = aboutContent ?? {};
  const highlights = aboutContent?.highlights?.filter(Boolean) ?? [];

  if (!title && !text && highlights.length === 0) {
    return null;
  }

  return (
    <section id="about" className={`max-w-3xl mx-auto px-4 scroll-mt-16 ${styleTokens?.spacingSection ?? 'py-12'}`}>
      {title && (
        <h2 className={`text-2xl text-gray-900 dark:text-white mb-4 text-center ${styleTokens?.headingFont ?? 'font-sans'} ${styleTokens?.headingWeight ?? 'font-bold'} ${styleTokens?.headingTracking ?? ''}`}>
          {title}
        </h2>
      )}
      {text && (
        <p className={`text-gray-600 dark:text-gray-300 whitespace-pre-line mb-6 ${styleTokens?.bodyLeading ?? 'leading-relaxed'}`}>
          {text}
        </p>
      )}
      {highlights.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 dark:text-gray-300">{h}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
