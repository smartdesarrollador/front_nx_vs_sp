import {
  Code, Globe, Star, Zap, Heart, Settings, Users,
  Mail, Phone, Camera, BookOpen, Briefcase, Shield, Award, Check,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SectionProps } from '../PublicLandingView';

interface FeatureItem {
  icon?: string;
  title: string;
  description: string;
  highlight?: string;
}

interface FeaturesContent {
  title?: string;
  subtitle?: string;
  items?: FeatureItem[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  code: Code, globe: Globe, star: Star, zap: Zap, heart: Heart,
  settings: Settings, users: Users, mail: Mail, phone: Phone,
  camera: Camera, book: BookOpen, briefcase: Briefcase,
  shield: Shield, award: Award, check: Check,
};

export function FeaturesSection({ content, styleTokens }: SectionProps) {
  const { title, subtitle, items = [] } = content as FeaturesContent;

  return (
    <section id="features" className={`max-w-5xl mx-auto px-4 ${styleTokens.spacingSection}`}>
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className={`text-3xl ${styleTokens.headingFont} ${styleTokens.headingWeight} ${styleTokens.headingTracking} text-gray-900 dark:text-white mb-3`}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {items.length === 0 ? (
        <p className="text-center text-gray-400">No hay características configuradas</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const IconComp = (item.icon && ICON_MAP[item.icon.toLowerCase()]) || Zap;
            return (
              <div
                key={i}
                className={`relative bg-white dark:bg-gray-800 ${styleTokens.radiusCard} ${styleTokens.shadowCard} border border-gray-100 dark:border-gray-700 p-6 ${styleTokens.shadowCardHover} transition-shadow`}
              >
                {item.highlight && (
                  <span className="absolute top-4 right-4 inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">
                    {item.highlight}
                  </span>
                )}
                <div className={`w-14 h-14 ${styleTokens.radiusCard} bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mb-5`}>
                  <IconComp className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
