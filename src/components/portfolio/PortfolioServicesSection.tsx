import {
  Code, Globe, Star, Zap, Heart, Settings, Users,
  Mail, Phone, Camera, BookOpen, Briefcase, ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { PortfolioServicesContent } from '@/types/digital';
import type { PortfolioStyleTokens } from '@/features/portfolio/types';

interface Props {
  servicesContent?: PortfolioServicesContent;
  styleTokens?: PortfolioStyleTokens;
}

const ICON_MAP: Record<string, LucideIcon> = {
  code: Code, globe: Globe, star: Star, zap: Zap, heart: Heart,
  settings: Settings, users: Users, mail: Mail, phone: Phone,
  camera: Camera, book: BookOpen, briefcase: Briefcase,
};

export function PortfolioServicesSection({ servicesContent, styleTokens }: Props) {
  const items = servicesContent?.items ?? [];

  if (items.length === 0) {
    return null;
  }

  return (
    <section id="services" className={`max-w-5xl mx-auto px-4 scroll-mt-16 ${styleTokens?.spacingSection ?? 'py-12'}`}>
      {servicesContent?.title && (
        <h2 className={`text-2xl text-gray-900 dark:text-white mb-8 text-center ${styleTokens?.headingFont ?? 'font-sans'} ${styleTokens?.headingWeight ?? 'font-bold'} ${styleTokens?.headingTracking ?? ''}`}>
          {servicesContent.title}
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => {
          const IconComp = (item.icon && ICON_MAP[item.icon.toLowerCase()]) || Star;
          return (
            <div
              key={i}
              className={`bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 ${styleTokens?.radiusCard ?? 'rounded-xl'} ${styleTokens?.shadowCard ?? 'shadow-sm'} ${styleTokens?.shadowCardHover ?? ''} ${styleTokens?.cardHover ?? ''}`}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center mb-4">
                <IconComp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              {item.description && (
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
              )}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium mt-3 hover:gap-2 transition-all"
                >
                  Ver más <ArrowRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
