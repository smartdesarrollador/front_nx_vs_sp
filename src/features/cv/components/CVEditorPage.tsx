'use client';
import { useEffect, useState } from 'react';
import { ExternalLink, Save } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import type { Plan } from '@/data/featureGates';
import { ClassicTemplate } from '@/components/cv/templates/ClassicTemplate';
import { ModernTemplate } from '@/components/cv/templates/ModernTemplate';
import { MinimalTemplate } from '@/components/cv/templates/MinimalTemplate';
import type { PublicProfile } from '@/types/digital';
import { useCVDocument } from '../hooks/useCVDocument';
import { useSaveCV } from '../hooks/useSaveCV';
import {
  DEFAULT_CV_FORM,
  cvDocumentToFormState,
  formStateToPayload,
  type CVFormState,
} from '../types';
import { CVTemplateSelector } from './CVTemplateSelector';
import { ExperienceList } from './ExperienceList';
import { EducationList } from './EducationList';
import { SkillsEditor } from './SkillsEditor';
import { LanguagesEditor } from './LanguagesEditor';
import { CertificationsEditor } from './CertificationsEditor';
import { ExportPDFButton } from './ExportPDFButton';

type Tab = 'editor' | 'preview';

interface Props {
  locale: string;
}

const inputClass =
  'w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500';
const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1';

const PREVIEW_LABELS = {
  summary: 'Resumen profesional',
  experience: 'Experiencia',
  education: 'Educación',
  skills: 'Habilidades',
  languages: 'Idiomas',
  certifications: 'Certificaciones',
  present: 'Presente',
  contact: 'Contacto',
};

const FALLBACK_PROFILE: PublicProfile = {
  username: 'preview',
  display_name: 'Tu Nombre',
  title: 'Tu cargo',
  bio: '',
  avatar_url: '',
  is_public: false,
  meta_title: '',
  meta_description: '',
  og_image_url: '',
};

export function CVEditorPage({ locale }: Props) {
  const currentPlan = useAuthStore((s) => s.currentPlan) as Plan;
  const { data, isLoading } = useCVDocument();
  const { mutate, isPending, error } = useSaveCV();

  const [activeTab, setActiveTab] = useState<Tab>('editor');
  const [formState, setFormState] = useState<CVFormState>(DEFAULT_CV_FORM);

  useEffect(() => {
    if (data === undefined) return;
    if (data?.cv) {
      setFormState(cvDocumentToFormState(data.cv));
    } else {
      setFormState(DEFAULT_CV_FORM);
    }
  }, [data]);

  const profile = data?.profile ?? FALLBACK_PROFILE;
  const publicUrl = data?.profile ? `/${locale}/cv/${data.profile.username}` : null;

  const TABS: { id: Tab; label: string }[] = [
    { id: 'editor', label: 'Editor' },
    { id: 'preview', label: 'Vista previa' },
  ];

  function handleSave() {
    mutate(formStateToPayload(formState));
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CV Digital</h1>
        <div className="flex items-center gap-3">
          {publicUrl && (
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium transition-colors"
            >
              Ver público <ExternalLink size={14} />
            </a>
          )}
          <ExportPDFButton />
          <button
            onClick={handleSave}
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

      {/* Tab: Editor */}
      {activeTab === 'editor' && (
        <div className="space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {/* Template selector */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
                <CVTemplateSelector
                  selected={formState.template_type}
                  onChange={(t) => setFormState((s) => ({ ...s, template_type: t }))}
                  currentPlan={currentPlan}
                />
                {/* Toggles */}
                <div className="flex flex-wrap gap-4 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formState.show_photo}
                      onChange={(e) => setFormState((s) => ({ ...s, show_photo: e.target.checked }))}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Mostrar foto</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formState.show_contact}
                      onChange={(e) => setFormState((s) => ({ ...s, show_contact: e.target.checked }))}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Mostrar contacto</span>
                  </label>
                </div>
              </div>

              {/* Resumen profesional */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Resumen profesional</h2>
                <textarea
                  className={inputClass}
                  rows={4}
                  value={formState.professional_summary}
                  placeholder="Describe tu perfil profesional, experiencia clave y objetivos…"
                  onChange={(e) => setFormState((s) => ({ ...s, professional_summary: e.target.value }))}
                />
              </div>

              {/* Experiencia */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Experiencia</h2>
                <ExperienceList
                  value={formState.experience}
                  onChange={(experience) => setFormState((s) => ({ ...s, experience }))}
                />
              </div>

              {/* Educación */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Educación</h2>
                <EducationList
                  value={formState.education}
                  onChange={(education) => setFormState((s) => ({ ...s, education }))}
                />
              </div>

              {/* Habilidades */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Habilidades</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Escribe una habilidad y presiona Enter o coma para agregarla.
                </p>
                <SkillsEditor
                  value={formState.skills}
                  onChange={(skills) => setFormState((s) => ({ ...s, skills }))}
                />
              </div>

              {/* Idiomas */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Idiomas</h2>
                <LanguagesEditor
                  value={formState.languages}
                  onChange={(languages) => setFormState((s) => ({ ...s, languages }))}
                />
              </div>

              {/* Certificaciones */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Certificaciones</h2>
                <CertificationsEditor
                  value={formState.certifications}
                  onChange={(certifications) => setFormState((s) => ({ ...s, certifications }))}
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* Tab: Preview */}
      {activeTab === 'preview' && (
        <div className="overflow-auto">
          {formState.template_type === 'modern' ? (
            <ModernTemplate
              profile={profile}
              cv={formStateToPayload(formState)}
              labels={PREVIEW_LABELS}
            />
          ) : formState.template_type === 'minimal' ? (
            <MinimalTemplate
              profile={profile}
              cv={formStateToPayload(formState)}
              labels={PREVIEW_LABELS}
            />
          ) : (
            <ClassicTemplate
              profile={profile}
              cv={formStateToPayload(formState)}
              labels={PREVIEW_LABELS}
            />
          )}
        </div>
      )}
    </div>
  );
}
