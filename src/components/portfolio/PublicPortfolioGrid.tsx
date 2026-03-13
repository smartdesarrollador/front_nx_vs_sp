'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ExternalLink, Github, Star } from 'lucide-react';
import type { PortfolioItem } from '@/types/digital';

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
}

interface CardProps {
  item: PortfolioItem;
  index: number;
  locale: string;
  username: string;
  t: ReturnType<typeof useTranslations>;
}

function PortfolioCard({ item, index, locale, username, t }: CardProps) {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

  return (
    <Link
      href={`/${locale}/portafolio/${username}/${item.slug}`}
      className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
    >
      {/* Cover image or gradient */}
      <div className={`relative h-48 bg-gradient-to-br ${gradient}`}>
        {item.is_featured && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-semibold rounded-full">
            <Star size={12} />
            {t('featured')}
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
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
          {item.description_short}
        </p>
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
              className="flex items-center gap-1 text-xs px-3 py-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
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
              className="flex items-center gap-1 text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
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

export function PublicPortfolioGrid({ items, locale, username }: Props) {
  const t = useTranslations('portfolio');
  const [activeTag, setActiveTag] = useState('all');

  // Extract unique tags
  const allTags = Array.from(new Set(items.flatMap((i) => i.tags)));

  const filteredItems =
    activeTag === 'all' ? items : items.filter((i) => i.tags.includes(activeTag));

  const featuredItems = items.filter((i) => i.is_featured);

  return (
    <section className="max-w-6xl mx-auto px-4 pb-16">
      {/* Tag filter bar */}
      {allTags.length > 0 && (
        <div className="sticky top-16 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur py-3 mb-6 -mx-4 px-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTag('all')}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTag === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {t('filterAll')}
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTag === tag
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
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

      {/* Featured section (only when showing all) */}
      {activeTag === 'all' && featuredItems.length > 0 && (
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
            />
          ))}
        </div>
      )}
    </section>
  );
}
