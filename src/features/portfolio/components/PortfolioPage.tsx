'use client';
import { useState, useMemo } from 'react';
import { Briefcase, ExternalLink } from 'lucide-react';
import { useFeatureGate } from '@/hooks/useFeatureGate';
import { useAuthStore } from '@/store/authStore';
import { UpgradePrompt } from '@/components/shared/UpgradePrompt';
import { FEATURES_BY_PLAN, type Plan } from '@/data/featureGates';
import { useDigitalCard } from '@/features/tarjeta/hooks/useDigitalCard';
import { ProfileHero } from '@/components/portfolio/ProfileHero';
import { PublicPortfolioGrid } from '@/components/portfolio/PublicPortfolioGrid';
import { usePortfolioItems } from '../hooks/usePortfolioItems';
import { useCreateItem } from '../hooks/useCreateItem';
import { useUpdateItem } from '../hooks/useUpdateItem';
import { useDeleteItem } from '../hooks/useDeleteItem';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import type { PortfolioItem, PortfolioForm } from '../types';

type Tab = 'projects' | 'preview';

interface Props {
  locale: string;
}

export function PortfolioPage({ locale }: Props) {
  const { canAccess } = useFeatureGate('portfolio');
  const currentPlan = useAuthStore((s) => s.currentPlan) as Plan;

  const { data, isLoading } = usePortfolioItems();
  const { data: cardData } = useDigitalCard();
  const { mutate: createItem, isPending: isCreating, error: createError } = useCreateItem();
  const { mutate: updateItem, isPending: isUpdating, error: updateError } = useUpdateItem();
  const { mutate: deleteItem } = useDeleteItem();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | undefined>(undefined);
  const [activeTag, setActiveTag] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<Tab>('projects');

  const items = useMemo(() => data?.items ?? [], [data]);
  const profile = data?.profile;

  const maxGalleryImages = FEATURES_BY_PLAN[currentPlan].portfolioGalleryImages as number;

  // All unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    items.forEach((item) => item.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [items]);

  // Sorted + filtered items: featured first, then by order
  const sortedItems = useMemo(() => {
    const sorted = [...items].sort((a, b) => {
      if (a.is_featured && !b.is_featured) return -1;
      if (!a.is_featured && b.is_featured) return 1;
      return a.order - b.order;
    });
    if (activeTag === 'all') return sorted;
    return sorted.filter((item) => item.tags.includes(activeTag));
  }, [items, activeTag]);

  if (!canAccess) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <UpgradePrompt isOpen onClose={() => {}} featureKey="portfolio" />
      </div>
    );
  }

  const username = profile?.username ?? cardData?.profile?.username;
  const publicUrl = username
    ? typeof window !== 'undefined'
      ? `${window.location.origin}/${locale}/portafolio/${username}`
      : `/${locale}/portafolio/${username}`
    : null;

  const openCreate = () => {
    setEditingItem(undefined);
    setModalOpen(true);
  };

  const openEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleCreate = (payload: PortfolioForm) => {
    createItem(payload, { onSuccess: () => setModalOpen(false) });
  };

  const handleUpdate = (uuid: string, payload: PortfolioForm) => {
    updateItem({ uuid, payload }, { onSuccess: () => setModalOpen(false) });
  };

  const handleDelete = (uuid: string) => {
    deleteItem(uuid);
  };

  const isPending = isCreating || isUpdating;
  const apiErrorRaw = createError || updateError;
  const apiErrorMsg = apiErrorRaw
    ? (apiErrorRaw as { response?: { data?: { detail?: string } } })?.response?.data?.detail ??
      'Error al guardar el proyecto.'
    : null;

  const TABS: { id: Tab; label: string }[] = [
    { id: 'projects', label: 'Proyectos' },
    { id: 'preview', label: 'Preview' },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portafolio Digital</h1>
        <div className="flex items-center gap-3">
          {publicUrl && (
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium transition-colors"
            >
              Ver pública <ExternalLink size={14} />
            </a>
          )}
          <button
            type="button"
            onClick={openCreate}
            className="rounded-lg px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
          >
            + Nuevo proyecto
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Preview */}
      {activeTab === 'preview' && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
          <ProfileHero
            profile={
              profile ?? {
                username: username ?? 'preview',
                display_name: 'Preview',
                title: '',
                bio: '',
                avatar_url: '',
                is_public: true,
                meta_title: '',
                meta_description: '',
                og_image_url: '',
              }
            }
          />
          <PublicPortfolioGrid
            items={items}
            locale={locale}
            username={username ?? 'preview'}
          />
        </div>
      )}

      {/* Tab: Proyectos */}
      {activeTab === 'projects' && (
        <>
      {/* Tag filter pills */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag('all')}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              activeTag === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            Todos
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Count */}
      {!isLoading && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {sortedItems.length} proyecto{sortedItems.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="h-36 bg-gray-200 dark:bg-gray-700" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : sortedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Briefcase size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Sin proyectos</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {activeTag !== 'all'
              ? `No hay proyectos con la etiqueta "${activeTag}".`
              : 'Agrega tu primer proyecto al portafolio.'}
          </p>
          {activeTag === 'all' && (
            <button
              type="button"
              onClick={openCreate}
              className="rounded-lg px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
            >
              Agregar Proyecto
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedItems.map((item, i) => (
            <ProjectCard
              key={item.id}
              item={item}
              index={i}
              onEdit={openEdit}
              onDelete={handleDelete}
              canDelete
            />
          ))}
        </div>
      )}

        </>
      )}

      {/* Modal */}
      <ProjectModal
        item={editingItem}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        isPending={isPending}
        apiError={apiErrorMsg}
        maxGalleryImages={maxGalleryImages === Infinity ? undefined : maxGalleryImages}
      />
    </div>
  );
}
