'use client';
import { useEffect, useState } from 'react';
import { ExternalLink, Lock, Save } from 'lucide-react';
import { useFeatureGate } from '@/hooks/useFeatureGate';
import { useAuthStore } from '@/store/authStore';
import { UpgradePrompt } from '@/components/shared/UpgradePrompt';
import type { Plan } from '@/data/featureGates';
import { isPlanHigherThan } from '@/data/featureGates';
import { useLandingTemplate } from '../hooks/useLandingTemplate';
import { useSaveLanding } from '../hooks/useSaveLanding';
import {
  DEFAULT_FORM_STATE,
  DEFAULT_SECTION_CONTENT,
  type LandingFormState,
} from '../types';
import { TemplateSelector } from './TemplateSelector';
import { SectionBuilder } from './SectionBuilder';
import { SectionPicker } from './SectionPicker';
import { LandingPreview } from './LandingPreview';

type Tab = 'templates' | 'constructor' | 'preview';

interface Props {
  locale: string;
}

const inputClass =
  'w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500';
const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1';

export function LandingEditorPage({ locale }: Props) {
  const { canAccess } = useFeatureGate('landingPage');
  const currentPlan = useAuthStore((s) => s.currentPlan) as Plan;
  const { data, isLoading } = useLandingTemplate();
  const { mutate, isPending, error } = useSaveLanding();

  const [activeTab, setActiveTab] = useState<Tab>('templates');
  const [formState, setFormState] = useState<LandingFormState>(DEFAULT_FORM_STATE);
  const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);
  const [showSectionPicker, setShowSectionPicker] = useState(false);

  // Initialize form when data loads
  useEffect(() => {
    if (data === undefined) return;
    if (data?.landing) {
      setFormState(data.landing);
    } else {
      setFormState(DEFAULT_FORM_STATE);
    }
  }, [data]);

  const canAdvanced = isPlanHigherThan(currentPlan, 'professional');

  const publicUrl = data?.profile
    ? `/${locale}/landing/${data.profile.username}`
    : null;

  if (!canAccess) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <UpgradePrompt isOpen onClose={() => {}} featureKey="landingPage" />
      </div>
    );
  }

  const TABS: { id: Tab; label: string }[] = [
    { id: 'templates', label: 'Plantillas' },
    { id: 'constructor', label: 'Constructor' },
    { id: 'preview', label: 'Preview' },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Landing Page</h1>
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
            onClick={() => mutate(formState)}
            disabled={isPending}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isPending ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <Save size={16} />
            )}
            Guardar
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500">Error al guardar. Intenta de nuevo.</p>
      )}

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

      {/* Tab: Templates */}
      {activeTab === 'templates' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <TemplateSelector
            selected={formState.template_type}
            onChange={(t) => setFormState((s) => ({ ...s, template_type: t }))}
            currentPlan={currentPlan}
          />
        </div>
      )}

      {/* Tab: Constructor */}
      {activeTab === 'constructor' && (
        <div className="space-y-6">
          {/* 2-column layout: section list + editor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Secciones
              </h3>
              <SectionBuilder
                sections={formState.sections}
                selectedIndex={selectedSectionIndex}
                onSelect={setSelectedSectionIndex}
                onChange={(sections) => setFormState((s) => ({ ...s, sections }))}
                onAdd={() => setShowSectionPicker(true)}
              />
            </div>

            {/* Right column placeholder when no section is selected */}
            {selectedSectionIndex === null && (
              <div className="hidden lg:flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-sm text-gray-400">
                Selecciona una sección para editarla
              </div>
            )}
          </div>

          {/* Advanced config */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Configuración avanzada
            </h3>

            <div>
              <label className={labelClass}>Email de contacto</label>
              <input
                className={inputClass}
                type="email"
                value={formState.contact_email}
                placeholder="tu@email.com"
                onChange={(e) => setFormState((s) => ({ ...s, contact_email: e.target.value }))}
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formState.enable_contact_form}
                onChange={(e) =>
                  setFormState((s) => ({ ...s, enable_contact_form: e.target.checked }))
                }
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Habilitar formulario de contacto
              </span>
            </label>

            {/* Custom CSS — professional+ only */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className={`${labelClass} mb-0`}>CSS personalizado</label>
                {!canAdvanced && (
                  <span className="flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                    <Lock size={10} /> Professional
                  </span>
                )}
              </div>
              <textarea
                className={`${inputClass} ${!canAdvanced ? 'opacity-50 cursor-not-allowed' : ''}`}
                rows={4}
                disabled={!canAdvanced}
                value={formState.custom_css}
                placeholder={canAdvanced ? '/* Tu CSS personalizado */' : 'Disponible en plan Professional+'}
                onChange={(e) => setFormState((s) => ({ ...s, custom_css: e.target.value }))}
              />
            </div>

            {/* Google Analytics — professional+ only */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <label className={`${labelClass} mb-0`}>Google Analytics ID</label>
                {!canAdvanced && (
                  <span className="flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                    <Lock size={10} /> Professional
                  </span>
                )}
              </div>
              <input
                className={`${inputClass} ${!canAdvanced ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!canAdvanced}
                value={formState.ga_tracking_id}
                placeholder={canAdvanced ? 'G-XXXXXXXXXX' : 'Disponible en plan Professional+'}
                onChange={(e) => setFormState((s) => ({ ...s, ga_tracking_id: e.target.value }))}
              />
            </div>

            {/* Publish toggle */}
            <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-3">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Publicar landing</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Hace visible tu landing page para todo el mundo
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={formState.is_public}
                onClick={() => setFormState((s) => ({ ...s, is_public: !s.is_public }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  formState.is_public ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    formState.is_public ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Preview */}
      {activeTab === 'preview' && (
        <LandingPreview
          profile={
            data?.profile ?? {
              username: 'preview',
              display_name: 'Preview',
            }
          }
          formState={formState}
          isLoading={isLoading}
        />
      )}

      {/* Section Picker Modal */}
      <SectionPicker
        isOpen={showSectionPicker}
        existingSectionTypes={formState.sections.map((s) => s.type)}
        onAdd={(type) => {
          setFormState((s) => ({
            ...s,
            sections: [...s.sections, { type, content: DEFAULT_SECTION_CONTENT[type] }],
          }));
          setSelectedSectionIndex(formState.sections.length);
        }}
        onClose={() => setShowSectionPicker(false)}
      />
    </div>
  );
}
