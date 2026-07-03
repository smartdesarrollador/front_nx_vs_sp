import Image from 'next/image';
import type { PortfolioTestimonialsContent } from '@/types/digital';
import type { PortfolioStyleTokens } from '@/features/portfolio/types';

interface Props {
  testimonialsContent?: PortfolioTestimonialsContent;
  styleTokens?: PortfolioStyleTokens;
}

export function PortfolioTestimonialsSection({ testimonialsContent, styleTokens }: Props) {
  const items = testimonialsContent?.items ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className={`bg-gray-50 dark:bg-gray-800/50 scroll-mt-16 ${styleTokens?.spacingSection ?? 'py-12'}`}>
      <div className="max-w-5xl mx-auto px-4">
        {testimonialsContent?.title && (
          <h2 className={`text-2xl text-gray-900 dark:text-white mb-8 text-center ${styleTokens?.headingFont ?? 'font-sans'} ${styleTokens?.headingWeight ?? 'font-bold'} ${styleTokens?.headingTracking ?? ''}`}>
            {testimonialsContent.title}
          </h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={i}
              className={`bg-white dark:bg-gray-800 p-6 border border-gray-100 dark:border-gray-700 flex flex-col ${styleTokens?.radiusCard ?? 'rounded-xl'} ${styleTokens?.shadowCard ?? 'shadow-sm'} ${styleTokens?.shadowCardHover ?? ''} ${styleTokens?.cardHover ?? ''}`}
            >
              <span className="font-serif text-5xl text-blue-200 dark:text-blue-800 leading-none mb-3 select-none">
                &quot;
              </span>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1 mb-4">{item.text}</p>
              {item.rating != null && item.rating > 0 && (
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={star <= item.rating! ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-700'}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-3 border-t border-gray-100 dark:border-gray-700 pt-4">
                {item.avatarUrl ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={item.avatarUrl} alt={item.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                    {item.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{item.name}</p>
                  {item.role && <p className="text-xs text-gray-500 dark:text-gray-400">{item.role}</p>}
                  {item.company && <p className="text-xs text-gray-400 dark:text-gray-500">{item.company}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
