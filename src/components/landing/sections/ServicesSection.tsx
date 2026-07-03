import {
  Code, Globe, Star, Zap, Heart, Settings, Users,
  Mail, Phone, Camera, BookOpen, Briefcase, ArrowRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SectionProps } from '../PublicLandingView';

interface ServiceItem {
  icon?: string;
  title: string;
  description?: string;
  link?: string;
}

interface ServicesContent {
  title?: string;
  items?: ServiceItem[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  code: Code, globe: Globe, star: Star, zap: Zap, heart: Heart,
  settings: Settings, users: Users, mail: Mail, phone: Phone,
  camera: Camera, book: BookOpen, briefcase: Briefcase,
};

export function ServicesSection({ content, accentColor, styleTokens }: SectionProps) {
  const { title, items = [] } = content as ServicesContent;

  return (
    <section id="services" className={`max-w-5xl mx-auto px-4 ${styleTokens.spacingSection}`}>
      {title && (
        <h2 className={`text-3xl ${styleTokens.headingFont} ${styleTokens.headingWeight} ${styleTokens.headingTracking} text-gray-900 dark:text-white mb-10 text-center`}>
          {title}
        </h2>
      )}
      {items.length === 0 ? (
        <p className="text-center text-gray-400">No hay servicios configurados</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const IconComp = (item.icon && ICON_MAP[item.icon.toLowerCase()]) || Star;
            return (
              <div
                key={i}
                className={`group bg-white dark:bg-gray-800 ${styleTokens.radiusCard} ${styleTokens.shadowCard} border border-gray-100 dark:border-gray-700 p-6 border-t-4 ${styleTokens.shadowCardHover} ${styleTokens.cardHover} transition-all duration-300`}
                style={{ borderTopColor: accentColor || undefined }}
              >
                <div
                  className={`w-12 h-12 ${styleTokens.radiusCard} bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mb-4`}
                >
                  <IconComp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                )}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 text-sm font-medium mt-3 hover:gap-2 transition-all"
                  >
                    Ver más <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
