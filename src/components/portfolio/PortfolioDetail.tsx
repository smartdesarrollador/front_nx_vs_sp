import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { ExternalLink, Github, BookOpen, ArrowLeft, ArrowRight, User, Clock, Tag, Wrench } from 'lucide-react';
import type { PortfolioItem } from '@/types/digital';
import { ImageGallery } from './ImageGallery';
import { CATEGORY_LABELS, STATUS_CONFIG } from './PublicPortfolioGrid';

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
  allItems?: PortfolioItem[];
}

export async function PortfolioDetail({ item, locale, username, allItems }: Props) {
  const t = await getTranslations('portfolio');

  const gradient = CARD_GRADIENTS[0];

  const formattedDate = item.project_date
    ? new Date(item.project_date).toLocaleDateString(
        locale === 'es' ? 'es-ES' : 'en-US',
        { year: 'numeric', month: 'long' },
      )
    : null;

  const currentIndex = allItems ? allItems.findIndex((i) => i.slug === item.slug) : -1;
  const prevItem = allItems && currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = allItems && currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  const categoryLabel = item.category ? CATEGORY_LABELS[item.category] : null;
  const statusInfo = item.status ? STATUS_CONFIG[item.status] : null;

  const hasLinks = item.demo_url || item.repo_url || item.case_study_url;
  const hasSidebarContent =
    categoryLabel ||
    item.client_name ||
    item.duration ||
    statusInfo ||
    hasLinks ||
    (item.technologies && item.technologies.length > 0);

  return (
    <article className="max-w-6xl mx-auto px-4 py-10">
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

      {/* Main layout: content + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main content (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Cover image */}
          <div className={`relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br ${gradient}`}>
            {item.cover_image_url && (
              <Image
                src={item.cover_image_url}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 640px"
                priority
              />
            )}
          </div>

          {/* Header */}
          <div>
            <div className="flex flex-wrap items-start gap-3 mb-3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex-1">{item.title}</h1>
              {categoryLabel && (
                <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-sm font-medium shrink-0">
                  {categoryLabel}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              {formattedDate && <span>{formattedDate}</span>}
              {item.client_name && (
                <span className="flex items-center gap-1">
                  <User size={13} />
                  {item.client_name}
                </span>
              )}
              {item.duration && (
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  {item.duration}
                </span>
              )}
              {statusInfo && (
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusInfo.className}`}>
                  {statusInfo.label}
                </span>
              )}
            </div>

            {/* Tags */}
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
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

          {/* Description */}
          {item.description_full && (
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {item.description_full}
              </p>
            </div>
          )}

          {/* Image gallery */}
          {item.gallery_images.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('gallery')}
              </h2>
              <ImageGallery images={item.gallery_images} projectTitle={item.title} />
            </div>
          )}
        </div>

        {/* Sidebar (1/3) */}
        {hasSidebarContent && (
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 p-5 space-y-5">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Información
              </h3>

              {categoryLabel && (
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-1.5 flex items-center gap-1">
                    <Tag size={11} /> Categoría
                  </p>
                  <span className="px-2.5 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-sm font-medium">
                    {categoryLabel}
                  </span>
                </div>
              )}

              {item.client_name && (
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-1 flex items-center gap-1">
                    <User size={11} /> Cliente
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.client_name}</p>
                </div>
              )}

              {item.duration && (
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-1 flex items-center gap-1">
                    <Clock size={11} /> Duración
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.duration}</p>
                </div>
              )}

              {statusInfo && (
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-1.5">Estado</p>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.className}`}>
                    {statusInfo.label}
                  </span>
                </div>
              )}

              {item.technologies && item.technologies.length > 0 && (
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 flex items-center gap-1">
                    <Wrench size={11} /> Tecnologías
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {hasLinks && (
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  {item.demo_url && (
                    <a
                      href={item.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-3 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                    >
                      <ExternalLink size={14} />
                      {t('viewProject')}
                    </a>
                  )}
                  {item.repo_url && (
                    <a
                      href={item.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Github size={14} />
                      {t('viewGithub')}
                    </a>
                  )}
                  {item.case_study_url && (
                    <a
                      href={item.case_study_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full px-3 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <BookOpen size={14} />
                      {t('viewCaseStudy')}
                    </a>
                  )}
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* Prev / Next navigation */}
      {(prevItem || nextItem) && (
        <nav className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between gap-4">
          {prevItem ? (
            <Link
              href={`/${locale}/portafolio/${username}/${prevItem.slug}`}
              className="flex items-center gap-3 group max-w-[45%]"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
                <ArrowLeft size={14} className="text-gray-500" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 dark:text-gray-500">Anterior</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {prevItem.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextItem ? (
            <Link
              href={`/${locale}/portafolio/${username}/${nextItem.slug}`}
              className="flex items-center gap-3 group max-w-[45%] ml-auto"
            >
              <div className="min-w-0 text-right">
                <p className="text-xs text-gray-400 dark:text-gray-500">Siguiente</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {nextItem.title}
                </p>
              </div>
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors">
                <ArrowRight size={14} className="text-gray-500" />
              </div>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      )}
    </article>
  );
}
