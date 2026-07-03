'use client';
import { useState, useMemo, useEffect } from 'react';
import { AlertCircle, Briefcase, CheckCircle, ExternalLink, Save } from 'lucide-react';
import { useFeatureGate } from '@/hooks/useFeatureGate';
import { useAuthStore } from '@/store/authStore';
import { UpgradePrompt } from '@/components/shared/UpgradePrompt';
import { FEATURES_BY_PLAN, type Plan } from '@/data/featureGates';
import { useDigitalCard } from '@/features/tarjeta/hooks/useDigitalCard';
import { ProfileHero } from '@/components/portfolio/ProfileHero';
import { PublicPortfolioGrid } from '@/components/portfolio/PublicPortfolioGrid';
import { PortfolioAboutSection } from '@/components/portfolio/PortfolioAboutSection';
import { PortfolioSkillsSection } from '@/components/portfolio/PortfolioSkillsSection';
import { PortfolioServicesSection } from '@/components/portfolio/PortfolioServicesSection';
import { PortfolioTestimonialsSection } from '@/components/portfolio/PortfolioTestimonialsSection';
import { PortfolioContactSection } from '@/components/portfolio/PortfolioContactSection';
import { usePortfolioItems } from '../hooks/usePortfolioItems';
import { useCreateItem } from '../hooks/useCreateItem';
import { useUpdateItem } from '../hooks/useUpdateItem';
import { useDeleteItem } from '../hooks/useDeleteItem';
import { usePortfolioSettings, useSavePortfolioSettings } from '../hooks/usePortfolioSettings';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { PortfolioTemplateSelector } from './PortfolioTemplateSelector';
import { PortfolioConstructor } from './PortfolioConstructor';
import { PORTFOLIO_STYLE_PRESET_TOKENS } from '../types';
import type {
  PortfolioItem,
  PortfolioForm,
  PortfolioThemeColors,
  PortfolioHeroContent,
  PortfolioContactContent,
  PortfolioAboutContent,
  PortfolioSkillsContent,
  PortfolioServicesContent,
  PortfolioTestimonialsContent,
  PortfolioStylePreset,
} from '../types';

type Tab = 'projects' | 'appearance' | 'constructor' | 'preview';

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

  const { data: settingsData } = usePortfolioSettings();
  const { mutate: saveSettings, isPending: isSavingSettings } = useSavePortfolioSettings();
  const [stylePreset, setStylePreset] = useState<PortfolioStylePreset>('modern');
  const [themeColors, setThemeColors] = useState<PortfolioThemeColors>({});
  const [heroContent, setHeroContent] = useState<PortfolioHeroContent>({});
  const [contactContent, setContactContent] = useState<PortfolioContactContent>({});
  const [aboutContent, setAboutContent] = useState<PortfolioAboutContent>({});
  const [skillsContent, setSkillsContent] = useState<PortfolioSkillsContent>({});
  const [servicesContent, setServicesContent] = useState<PortfolioServicesContent>({});
  const [testimonialsContent, setTestimonialsContent] = useState<PortfolioTestimonialsContent>({});
  const [saveState, setSaveState] = useState<'idle' | 'success' | 'error'>('idle');

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | undefined>(undefined);
  const [activeTag, setActiveTag] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<Tab>('projects');

  useEffect(() => {
    if (settingsData?.style_preset) {
      setStylePreset(settingsData.style_preset);
    }
    if (settingsData?.theme_colors && Object.keys(settingsData.theme_colors).length > 0) {
      setThemeColors(settingsData.theme_colors);
    }
    if (settingsData?.hero_content && Object.keys(settingsData.hero_content).length > 0) {
      setHeroContent(settingsData.hero_content);
    }
    if (settingsData?.contact_content && Object.keys(settingsData.contact_content).length > 0) {
      setContactContent(settingsData.contact_content);
    }
    if (settingsData?.about_content && Object.keys(settingsData.about_content).length > 0) {
      setAboutContent(settingsData.about_content);
    }
    if (settingsData?.skills_content && Object.keys(settingsData.skills_content).length > 0) {
      setSkillsContent(settingsData.skills_content);
    }
    if (settingsData?.services_content && Object.keys(settingsData.services_content).length > 0) {
      setServicesContent(settingsData.services_content);
    }
    if (settingsData?.testimonials_content && Object.keys(settingsData.testimonials_content).length > 0) {
      setTestimonialsContent(settingsData.testimonials_content);
    }
  }, [settingsData]);

  const handleSaveSettings = () => {
    saveSettings(
      {
        style_preset: stylePreset,
        theme_colors: themeColors,
        hero_content: heroContent,
        contact_content: contactContent,
        about_content: aboutContent,
        skills_content: skillsContent,
        services_content: servicesContent,
        testimonials_content: testimonialsContent,
      },
      {
        onSuccess: () => {
          setSaveState('success');
          setTimeout(() => setSaveState('idle'), 5000);
        },
        onError: () => {
          setSaveState('error');
          setTimeout(() => setSaveState('idle'), 6000);
        },
      },
    );
  };

  const items = useMemo(() => data?.items ?? [], [data]);
  const profile = data?.profile;
  const styleTokens = PORTFOLIO_STYLE_PRESET_TOKENS[stylePreset] ?? PORTFOLIO_STYLE_PRESET_TOKENS.modern;

  // Tecnologías únicas ordenadas por frecuencia, para previsualizar la sección Habilidades
  const previewSkills = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((item) => {
      (item.technologies ?? []).forEach((tech) => {
        counts.set(tech, (counts.get(tech) ?? 0) + 1);
      });
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([tech]) => tech);
  }, [items]);

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
    { id: 'appearance', label: 'Apariencia' },
    { id: 'constructor', label: 'Constructor' },
    { id: 'preview', label: 'Preview' },
  ];

  const saveButton = (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={handleSaveSettings}
        disabled={isSavingSettings || saveState !== 'idle'}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all duration-300 disabled:cursor-default ${
          saveState === 'success'
            ? 'bg-green-600 scale-105'
            : saveState === 'error'
              ? 'bg-red-600'
              : 'bg-blue-600 hover:bg-blue-700 disabled:opacity-50'
        }`}
      >
        {isSavingSettings ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : saveState === 'success' ? (
          <CheckCircle size={16} />
        ) : saveState === 'error' ? (
          <AlertCircle size={16} />
        ) : (
          <Save size={16} />
        )}
        {saveState === 'success' ? '¡Guardado!' : saveState === 'error' ? 'Error al guardar' : 'Guardar cambios'}
      </button>
    </div>
  );

  const saveToast = saveState !== 'idle' && (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl text-white text-sm font-medium ${
        saveState === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      {saveState === 'success' ? (
        <><CheckCircle size={16} /> Cambios guardados exitosamente</>
      ) : (
        <><AlertCircle size={16} /> Error al guardar. Intenta de nuevo.</>
      )}
    </div>
  );

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

      {/* Tab: Apariencia */}
      {activeTab === 'appearance' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <PortfolioTemplateSelector
              themeColors={themeColors}
              onThemeColorsChange={setThemeColors}
              stylePreset={stylePreset}
              onStylePresetChange={setStylePreset}
            />
          </div>
          {saveButton}
          {saveToast}
        </div>
      )}

      {/* Tab: Constructor */}
      {activeTab === 'constructor' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <PortfolioConstructor
              heroContent={heroContent}
              onHeroContentChange={setHeroContent}
              aboutContent={aboutContent}
              onAboutContentChange={setAboutContent}
              skillsContent={skillsContent}
              onSkillsContentChange={setSkillsContent}
              servicesContent={servicesContent}
              onServicesContentChange={setServicesContent}
              testimonialsContent={testimonialsContent}
              onTestimonialsContentChange={setTestimonialsContent}
              contactContent={contactContent}
              onContactContentChange={setContactContent}
              locale={locale}
            />
          </div>
          {saveButton}
          {saveToast}
        </div>
      )}

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
            items={items}
            themeColors={themeColors}
            heroContent={heroContent}
            digitalCard={cardData?.digital_card}
            styleTokens={styleTokens}
          />
          <PortfolioAboutSection aboutContent={aboutContent} styleTokens={styleTokens} />
          <PortfolioSkillsSection skillsContent={skillsContent} skills={previewSkills} styleTokens={styleTokens} />
          <PortfolioServicesSection servicesContent={servicesContent} styleTokens={styleTokens} />
          <PublicPortfolioGrid
            items={items}
            locale={locale}
            username={username ?? 'preview'}
            themeColors={themeColors}
            styleTokens={styleTokens}
          />
          <PortfolioTestimonialsSection testimonialsContent={testimonialsContent} styleTokens={styleTokens} />
          <PortfolioContactSection
            contactContent={contactContent}
            digitalCard={cardData?.digital_card}
            styleTokens={styleTokens}
            themeColors={themeColors}
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
