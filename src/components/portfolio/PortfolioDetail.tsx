import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ExternalLink, Github, BookOpen, ArrowLeft } from 'lucide-react';
import type { PortfolioItem } from '@/types/digital';
import { ImageGallery } from './ImageGallery';

const CARD_GRADIENTS = [
  'from-blue-500 to-blue-700',
  'from-purple-500 to-pink-600',
  'from-green-500 to-teal-600',
  'from-orange-500 to-red-600',
  'from-indigo-500 to-purple-600',
  'from-teal-500 to-cyan-600',
];

interface Props {
  item: PortfolioItem;
  locale: string;
  username: string;
}

export async function PortfolioDetail({ item, locale, username }: Props) {
  const t = await getTranslations('portfolio');

  const gradient = CARD_GRADIENTS[0];

  const formattedDate = item.project_date
    ? new Date(item.project_date).toLocaleDateString(
        locale === 'es' ? 'es-ES' : 'en-US',
        { year: 'numeric', month: 'long' },
      )
    : null;

  return (
    <article className="max-w-4xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link
          href={`/${locale}/portafolio/${username}`}
          className="flex items-center gap-1.5 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <ArrowLeft size={14} />
          {t('backToPortfolio')}
        </Link>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-200 font-medium truncate">{item.title}</span>
      </nav>

      {/* Cover image */}
      <div className={`relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br ${gradient} mb-8`}>
        {item.cover_image_url && (
          <Image
            src={item.cover_image_url}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
        )}
      </div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          {formattedDate && <span>{formattedDate}</span>}
          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action links */}
      {(item.demo_url || item.repo_url || item.case_study_url) && (
        <div className="flex flex-wrap gap-3 mb-8">
          {item.demo_url && (
            <a
              href={item.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              <ExternalLink size={16} />
              {t('viewProject')}
            </a>
          )}
          {item.repo_url && (
            <a
              href={item.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
            >
              <Github size={16} />
              {t('viewGithub')}
            </a>
          )}
          {item.case_study_url && (
            <a
              href={item.case_study_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <BookOpen size={16} />
              {t('viewCaseStudy')}
            </a>
          )}
        </div>
      )}

      {/* Description */}
      {item.description_full && (
        <div className="prose prose-gray dark:prose-invert max-w-none mb-10">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {item.description_full}
          </p>
        </div>
      )}

      {/* Image gallery */}
      {item.gallery_images.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t('gallery')}
          </h2>
          <ImageGallery images={item.gallery_images} projectTitle={item.title} />
        </div>
      )}
    </article>
  );
}
