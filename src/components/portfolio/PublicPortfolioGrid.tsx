'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ExternalLink, Github, Star } from 'lucide-react';
import type { PortfolioItem, PortfolioThemeColors } from '@/types/digital';
import type { PortfolioStyleTokens } from '@/features/portfolio/types';

export const CATEGORY_LABELS: Record<string, string> = {
  web: 'Web', mobile: 'Mobile', design: 'Diseño', branding: 'Branding',
  data: 'Datos', consulting: 'Consultoría', other: 'Otro',
};

export const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  completed:   { label: 'Completado',  className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
  in_progress: { label: 'En progreso', className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  archived:    { label: 'Archivado',   className: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400' },
};

const CARD_GRADIENTS = [
  'from-blue-500 to-blue-700',
  'from-purple-500 to-pink-600',
  'from-green-500 to-teal-600',
  'from-orange-500 to-red-600',
  'from-indigo-500 to-purple-600',
  'from-teal-500 to-cyan-600',
];

interface Props {
  items: PortfolioItem[];
  locale: string;
  username: string;
  themeColors?: PortfolioThemeColors;
  styleTokens?: PortfolioStyleTokens;
}

interface CardProps {
  item: PortfolioItem;
  index: number;
  locale: string;
  username: string;
  t: ReturnType<typeof useTranslations>;
  styleTokens?: PortfolioStyleTokens;
}

function PortfolioCard({ item, index, locale, username, t, styleTokens }: CardProps) {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  const categoryLabel = item.category ? CATEGORY_LABELS[item.category] : null;

  return (
    <Link
      href={`/${locale}/portafolio/${username}/${item.slug}`}
      className={`group block bg-white dark:bg-gray-800 overflow-hidden transition-shadow border border-gray-100 dark:border-gray-700 ${styleTokens?.radiusCard ?? 'rounded-xl'} ${styleTokens?.shadowCard ?? 'shadow-sm'} ${styleTokens?.shadowCardHover ?? 'hover:shadow-md'} ${styleTokens?.cardHover ?? ''}`}
    >
      {/* Cover image or gradient */}
      <div className={`relative h-48 bg-gradient-to-br ${gradient}`}>
        {item.is_featured && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-full">
            <Star size={12} />
            {t('featured')}
          </div>
        )}
        {categoryLabel && (
          <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
            {categoryLabel}
          </div>
        )}
        {item.cover_image_url && (
          <Image
            src={item.cover_image_url}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-base text-gray-900 dark:text-white line-clamp-1">
            {item.title}
          </h3>
          {item.status === 'in_progress' && (
            <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 shrink-0 mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Activo
            </span>
          )}
        </div>

        {item.client_name && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">{item.client_name}</p>
        )}

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
          {item.description_short}
        </p>

        {/* Technologies */}
        {item.technologies && item.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
            {item.technologies.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-gray-400">+{item.technologies.length - 3}</span>
            )}
          </div>
        )}

        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
              >
                {tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-gray-400">+{item.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Action links */}
        <div className="flex gap-2" onClick={(e) => e.preventDefault()}>
          {item.demo_url && (
            <a
              href={item.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 text-xs px-3 py-1.5 bg-primary-600 text-white hover:bg-primary-700 transition-colors ${styleTokens?.radiusButton ?? 'rounded-lg'}`}
            >
              <ExternalLink size={12} />
              {t('viewProject')}
            </a>
          )}
          {item.repo_url && (
            <a
              href={item.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${styleTokens?.radiusButton ?? 'rounded-lg'}`}
            >
              <Github size={12} />
              {t('viewGithub')}
            </a>
          )}
        </div>
      </div>
    </Link>
  );
}

export function PublicPortfolioGrid({ items, locale, username, themeColors, styleTokens }: Props) {
  const t = useTranslations('portfolio');
  const [activeTag, setActiveTag] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const accentColor = themeColors?.accent;

  const allTags = Array.from(new Set(items.flatMap((i) => i.tags)));
  const allCategories = Array.from(new Set(items.map((i) => i.category).filter(Boolean)));

  const filteredItems = items.filter((i) => {
    const tagOk = activeTag === 'all' || i.tags.includes(activeTag);
    const catOk = activeCategory === 'all' || i.category === activeCategory;
    return tagOk && catOk;
  });

  const featuredItems = items.filter((i) => i.is_featured);

  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 pb-16 scroll-mt-16">
      {/* Category filter */}
      {allCategories.length >= 2 && (
        <div className="mb-4 flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeCategory === 'all'
                ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Todas
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? accentColor ? 'text-white' : 'bg-orange-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              style={
                activeCategory === cat && accentColor
                  ? { background: accentColor }
                  : undefined
              }
            >
              {CATEGORY_LABELS[cat] ?? cat}
            </button>
          ))}
        </div>
      )}

      {/* Tag filter bar */}
      {allTags.length > 0 && (
        <div className="sticky top-16 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur py-3 mb-6 -mx-4 px-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTag('all')}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTag === 'all'
                  ? accentColor ? 'text-white' : 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              style={activeTag === 'all' && accentColor ? { background: accentColor } : undefined}
            >
              {t('filterAll')}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTag === tag
                    ? accentColor ? 'text-white' : 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                style={activeTag === tag && accentColor ? { background: accentColor } : undefined}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">{activeTag === 'all' ? t('noProjects') : t('noProjectsFiltered')}</p>
        </div>
      )}

      {/* Featured section (only when no filters active) */}
      {activeTag === 'all' && activeCategory === 'all' && featuredItems.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
            {t('featured')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredItems.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                locale={locale}
                username={username}
                t={t}
                styleTokens={styleTokens}
              />
            ))}
          </div>
        </div>
      )}

      {/* All items grid */}
      {filteredItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <PortfolioCard
              key={item.id}
              item={item}
              index={index}
              locale={locale}
              username={username}
              t={t}
              styleTokens={styleTokens}
            />
          ))}
        </div>
      )}
    </section>
  );
}
