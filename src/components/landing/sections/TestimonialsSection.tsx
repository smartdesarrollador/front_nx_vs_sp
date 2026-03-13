import type { SectionProps } from '../PublicLandingView';

interface TestimonialItem {
  name: string;
  role?: string;
  text: string;
  rating?: number;
}

interface TestimonialsContent {
  title?: string;
  items?: TestimonialItem[];
}

export function TestimonialsSection({ content }: SectionProps) {
  const { title, items = [] } = content as TestimonialsContent;

  return (
    <section id="testimonials" className="bg-gray-50 dark:bg-gray-800/50 py-16">
      <div className="max-w-5xl mx-auto px-4">
        {title && (
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
            {title}
          </h2>
        )}
        {items.length === 0 ? (
          <p className="text-center text-gray-400">
            No hay testimonios configurados
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl p-6"
              >
                <p className="text-4xl text-primary-300 dark:text-primary-700 leading-none mb-3">
                  ❝
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {item.text}
                </p>
                {item.rating != null && (
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= item.rating!
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 flex items-center justify-center font-semibold text-sm">
                    {item.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {item.name}
                    </p>
                    {item.role && (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.role}
                      </p>
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
