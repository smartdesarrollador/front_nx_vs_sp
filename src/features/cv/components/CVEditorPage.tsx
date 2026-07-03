'use client';
import { useEffect, useState } from 'react';
import { ExternalLink, Save, Check, ChevronDown, ChevronUp, Lock } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import type { Plan, UpgradableFeatureKey } from '@/data/featureGates';
import { FEATURES_BY_PLAN, UPGRADE_MESSAGES, getPlanDisplayName } from '@/data/featureGates';
import { useFeatureGate } from '@/hooks/useFeatureGate';

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL ?? '';

function FeatureLock({ featureKey }: { featureKey: UpgradableFeatureKey }) {
  const info = UPGRADE_MESSAGES[featureKey] ?? {
    title: 'Función Premium',
    message: 'Esta función está disponible en planes superiores.',
    requiredPlan: 'professional' as Plan,
  };
  return (
    <div className="flex items-center gap-3 rounded-lg border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
      <Lock size={18} className="text-gray-400 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{info.title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          {info.message} Disponible en{' '}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            {getPlanDisplayName(info.requiredPlan)}
          </span>{' '}
          o superior.
        </p>
      </div>
      <a
        href={`${HUB_URL}/subscription`}
        className="flex-shrink-0 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
      >
        Actualizar →
      </a>
    </div>
  );
}
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
import { CVAppearanceTab } from './CVAppearanceTab';
import { ExperienceList } from './ExperienceList';
import { EducationList } from './EducationList';
import { SkillsEditor } from './SkillsEditor';
import { LanguagesEditor } from './LanguagesEditor';
import { CertificationsEditor } from './CertificationsEditor';
import { ProjectsList } from './ProjectsList';
import { VolunteerEditor } from './VolunteerEditor';
import { AwardsEditor } from './AwardsEditor';
import { ExportPDFButton } from './ExportPDFButton';

type Tab = 'editor' | 'appearance' | 'preview';

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
  projects: 'Proyectos',
  volunteer: 'Voluntariado',
  awards: 'Premios y Reconocimientos',
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

  const { canAccess: canProjects } = useFeatureGate('cvProjects');
  const { canAccess: canVolunteer } = useFeatureGate('cvVolunteer');
  const { canAccess: canAwards } = useFeatureGate('cvAwards');
  const { canAccess: canAccentColor } = useFeatureGate('cvAccentColor');

  const [activeTab, setActiveTab] = useState<Tab>('editor');
  const [formState, setFormState] = useState<CVFormState>(DEFAULT_CV_FORM);
  const [configOpen, setConfigOpen] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

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
    { id: 'appearance', label: 'Apariencia' },
    { id: 'preview', label: 'Vista previa' },
  ];

  function handleSave() {
    mutate(formStateToPayload(formState), {
      onSuccess: () => {
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 2500);
      },
    });
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
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50 ${
              justSaved ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isPending ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : justSaved ? (
              <Check size={16} />
            ) : (
              <Save size={16} />
            )}
            {justSaved ? 'Guardado' : 'Guardar'}
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
              {/* Configuración (collapsible) */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setConfigOpen((o) => !o)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div>
                    <h2 className="text-base font-semibold text-gray-900 dark:text-white">Configuración</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Titular, ubicación, links, color de acento y visibilidad
                    </p>
                  </div>
                  {configOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                </button>

                {configOpen && (
                  <div className="px-6 pb-6 space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                    {/* Headline + Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Titular</label>
                        <input
                          className={inputClass}
                          value={formState.headline}
                          placeholder="Full-Stack Developer · 8 años de experiencia"
                          onChange={(e) => setFormState((s) => ({ ...s, headline: e.target.value }))}
                        />
                        <p className="mt-1 text-xs text-gray-400">Aparece debajo de tu nombre en el CV</p>
                      </div>
                      <div>
                        <label className={labelClass}>Ubicación</label>
                        <input
                          className={inputClass}
                          value={formState.location}
                          placeholder="Buenos Aires, Argentina"
                          onChange={(e) => setFormState((s) => ({ ...s, location: e.target.value }))}
                        />
                      </div>
                    </div>

                    {/* Social links */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className={labelClass}>LinkedIn</label>
                        <input
                          className={inputClass}
                          type="url"
                          value={formState.linkedin_url}
                          placeholder="https://linkedin.com/in/…"
                          onChange={(e) => setFormState((s) => ({ ...s, linkedin_url: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>GitHub</label>
                        <input
                          className={inputClass}
                          type="url"
                          value={formState.github_url}
                          placeholder="https://github.com/…"
                          onChange={(e) => setFormState((s) => ({ ...s, github_url: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Sitio web</label>
                        <input
                          className={inputClass}
                          type="url"
                          value={formState.website_url}
                          placeholder="https://tusitio.com"
                          onChange={(e) => setFormState((s) => ({ ...s, website_url: e.target.value }))}
                        />
                      </div>
                    </div>

                    {/* is_published */}
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {formState.is_published ? 'CV Público' : 'CV Privado'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formState.is_published ? 'Tu URL pública está activa' : 'La URL pública muestra 404'}
                          </p>
                        </div>
                        <button
                          type="button"
                          role="switch"
                          aria-checked={formState.is_published}
                          onClick={() => setFormState((s) => ({ ...s, is_published: !s.is_published }))}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            formState.is_published ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              formState.is_published ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
                  Agrega habilidades con nivel de proficiencia y categoría opcional.
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

              {/* Proyectos personales */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Proyectos personales</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Proyectos propios, open source o side projects
                </p>
                {canProjects ? (
                  <ProjectsList
                    value={formState.projects}
                    onChange={(projects) => setFormState((s) => ({ ...s, projects }))}
                  />
                ) : (
                  <FeatureLock featureKey="cvProjects" />
                )}
              </div>

              {/* Voluntariado */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Voluntariado</h2>
                {canVolunteer ? (
                  <VolunteerEditor
                    value={formState.volunteer}
                    onChange={(volunteer) => setFormState((s) => ({ ...s, volunteer }))}
                  />
                ) : (
                  <FeatureLock featureKey="cvVolunteer" />
                )}
              </div>

              {/* Premios */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Premios y Reconocimientos</h2>
                {canAwards ? (
                  <AwardsEditor
                    value={formState.awards}
                    onChange={(awards) => setFormState((s) => ({ ...s, awards }))}
                  />
                ) : (
                  <FeatureLock featureKey="cvAwards" />
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* Tab: Apariencia */}
      {activeTab === 'appearance' && (
        <CVAppearanceTab
          formState={formState}
          setFormState={setFormState}
          currentPlan={currentPlan}
          canAccentColor={canAccentColor}
        />
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
