import type { SectionProps } from '../PublicLandingView';
import { ChevronDown } from 'lucide-react';

interface HeroContent {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  alignment?: 'left' | 'center' | 'right';
}

function getHeroBg(templateType: string): string {
  switch (templateType) {
    case 'creative':
      return 'bg-gradient-to-br from-purple-600 to-blue-600 text-white';
    case 'minimal':
      return 'bg-white border-b border-gray-200 text-gray-900';
    case 'corporate':
      return 'bg-gray-900 text-white';
    default:
      return 'bg-gradient-to-br from-primary-600 to-primary-800 text-white';
  }
}

export function HeroSection({ content, templateType }: SectionProps) {
  const {
    title,
    subtitle,
    ctaText,
    ctaUrl,
    alignment = 'center',
  } = content as HeroContent;
  const bgClass = getHeroBg(templateType);
  const alignClass =
    alignment === 'left'
      ? 'text-left'
      : alignment === 'right'
        ? 'text-right'
        : 'text-center';
  const itemsClass =
    alignment === 'left'
      ? 'items-start'
      : alignment === 'right'
        ? 'items-end'
        : 'items-center';

  return (
    <section id="hero" className={`py-32 px-4 ${bgClass}`}>
      <div
        className={`max-w-4xl mx-auto flex flex-col gap-6 ${itemsClass} ${alignClass}`}
      >
        {title && (
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-lg md:text-xl opacity-90 max-w-2xl">{subtitle}</p>
        )}
        {ctaText && (
          <a
            href={ctaUrl || '#contact'}
            className="inline-flex items-center px-8 py-4 bg-white text-primary-700 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            {ctaText}
          </a>
        )}
        <div className="mt-8 animate-bounce">
          <ChevronDown className="w-6 h-6 opacity-70" />
        </div>
      </div>
    </section>
  );
}
