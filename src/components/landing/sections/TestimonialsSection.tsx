import Image from 'next/image';
import type { SectionProps } from '../PublicLandingView';

interface TestimonialItem {
  name: string;
  role?: string;
  company?: string;
  text: string;
  rating?: number;
  avatarUrl?: string;
}

interface TestimonialsContent {
  title?: string;
  items?: TestimonialItem[];
}

export function TestimonialsSection({ content, styleTokens }: SectionProps) {
  const { title, items = [] } = content as TestimonialsContent;

  return (
    <section id="testimonials" className={`bg-gray-50 dark:bg-gray-800/50 ${styleTokens.spacingSection}`}>
      <div className="max-w-5xl mx-auto px-4">
        {title && (
          <h2 className={`text-3xl ${styleTokens.headingFont} ${styleTokens.headingWeight} ${styleTokens.headingTracking} text-gray-900 dark:text-white mb-10 text-center`}>
            {title}
          </h2>
        )}
        {items.length === 0 ? (
          <p className="text-center text-gray-400">No hay testimonios configurados</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <div
                key={i}
                className={`bg-white dark:bg-gray-800 ${styleTokens.radiusCard} p-6 ${styleTokens.shadowCard} border border-gray-100 dark:border-gray-700 flex flex-col`}
              >
                {/* Comilla decorativa */}
                <span className="font-serif text-5xl text-primary-200 dark:text-primary-800 leading-none mb-3 select-none">
                  "
                </span>

                {/* Texto */}
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1 mb-4">
                  {item.text}
                </p>

                {/* Estrellas */}
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

                {/* Autor */}
                <div className="flex items-center gap-3 border-t border-gray-100 dark:border-gray-700 pt-4">
                  {item.avatarUrl ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={item.avatarUrl} alt={item.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                      {item.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {item.name}
                    </p>
                    {item.role && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">{item.role}</p>
                    )}
                    {item.company && (
                      <p className="text-xs text-gray-400 dark:text-gray-500">{item.company}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
