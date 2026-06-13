'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import type { PortfolioItem, PortfolioForm } from '../types';
import { DEFAULT_PORTFOLIO_FORM } from '../types';
import { TagInput } from './TagInput';
import { SingleImageField, GalleryImagesField } from './ImageUploadField';

const CATEGORY_OPTIONS = [
  { value: '', label: 'Sin categoría' },
  { value: 'web', label: 'Web' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'design', label: 'Diseño' },
  { value: 'branding', label: 'Branding' },
  { value: 'data', label: 'Datos' },
  { value: 'consulting', label: 'Consultoría' },
  { value: 'other', label: 'Otro' },
];

const STATUS_OPTIONS = [
  { value: 'completed', label: 'Completado' },
  { value: 'in_progress', label: 'En progreso' },
  { value: 'archived', label: 'Archivado' },
];

const schema = z.object({
  title: z.string().min(1, 'Campo requerido'),
  description_short: z.string(),
  description_full: z.string(),
  cover_image_url: z.string(),
  gallery_images: z.array(z.string()),
  demo_url: z.string(),
  repo_url: z.string(),
  case_study_url: z.string(),
  tags: z.array(z.string()),
  is_featured: z.boolean(),
  is_published: z.boolean(),
  project_date: z.string().min(1, 'Campo requerido'),
  category: z.string(),
  client_name: z.string(),
  technologies: z.array(z.string()),
  duration: z.string(),
  status: z.string(),
  accent_color: z.string(),
});

type Tab = 'basic' | 'gallery' | 'config';

const inputClass =
  'w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500';
const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1';

interface Props {
  item?: PortfolioItem;
  isOpen: boolean;
  onClose: () => void;
  onCreate: (payload: PortfolioForm) => void;
  onUpdate: (uuid: string, payload: PortfolioForm) => void;
  isPending: boolean;
  apiError?: string | null;
  maxGalleryImages?: number;
}

export function ProjectModal({
  item,
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  isPending,
  apiError,
  maxGalleryImages,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('basic');

  const defaultValues: PortfolioForm = item
    ? {
        title: item.title,
        description_short: item.description_short,
        description_full: item.description_full,
        cover_image_url: item.cover_image_url,
        gallery_images: item.gallery_images,
        demo_url: item.demo_url,
        repo_url: item.repo_url,
        case_study_url: item.case_study_url,
        tags: item.tags,
        is_featured: item.is_featured,
        is_published: item.is_published,
        project_date: item.project_date,
        category: item.category ?? '',
        client_name: item.client_name ?? '',
        technologies: item.technologies ?? [],
        duration: item.duration ?? '',
        status: item.status ?? 'completed',
        accent_color: item.accent_color ?? '',
      }
    : DEFAULT_PORTFOLIO_FORM;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<PortfolioForm>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const galleryImages = watch('gallery_images');
  const tags = watch('tags');
  const technologies = watch('technologies');
  const isFeatured = watch('is_featured');
  const isPublished = watch('is_published');
  const accentColor = watch('accent_color');

  if (!isOpen) return null;

  const onSubmit = (data: PortfolioForm) => {
    if (item) {
      onUpdate(item.id, data);
    } else {
      onCreate(data);
    }
  };

  const handleClose = () => {
    reset(defaultValues);
    setActiveTab('basic');
    onClose();
  };

  const TABS: { id: Tab; label: string }[] = [
    { id: 'basic', label: 'Básico' },
    { id: 'gallery', label: 'Galería' },
    { id: 'config', label: 'Config' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative z-10 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {item ? 'Editar proyecto' : 'Nuevo proyecto'}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Básico tab */}
            {activeTab === 'basic' && (
              <>
                <div>
                  <label className={labelClass}>
                    Título <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('title')}
                    placeholder="Nombre del proyecto"
                    className={inputClass}
                  />
                  {errors.title && (
                    <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Categoría</label>
                    <select {...register('category')} className={inputClass}>
                      {CATEGORY_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Estado</label>
                    <select {...register('status')} className={inputClass}>
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Cliente (opcional)</label>
                    <input
                      {...register('client_name')}
                      placeholder="Nombre del cliente"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Duración</label>
                    <input
                      {...register('duration')}
                      placeholder="2 meses, 6 semanas..."
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Descripción corta</label>
                  <input
                    {...register('description_short')}
                    placeholder="Resumen en una línea"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Descripción completa</label>
                  <textarea
                    {...register('description_full')}
                    rows={4}
                    placeholder="Descripción detallada del proyecto..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Fecha del proyecto <span className="text-red-500">*</span>
                  </label>
                  <input {...register('project_date')} type="date" className={inputClass} />
                  {errors.project_date && (
                    <p className="mt-1 text-xs text-red-500">{errors.project_date.message}</p>
                  )}
                </div>
              </>
            )}

            {/* Galería tab */}
            {activeTab === 'gallery' && (
              <>
                <SingleImageField
                  label="Imagen de portada"
                  value={watch('cover_image_url')}
                  onChange={(url) => setValue('cover_image_url', url)}
                />

                <GalleryImagesField
                  values={galleryImages}
                  onChange={(urls) => setValue('gallery_images', urls)}
                  maxImages={maxGalleryImages}
                />

                <div>
                  <label className={labelClass}>URL Demo</label>
                  <input
                    {...register('demo_url')}
                    type="url"
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>URL Repositorio</label>
                  <input
                    {...register('repo_url')}
                    type="url"
                    placeholder="https://github.com/..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>URL Case Study</label>
                  <input
                    {...register('case_study_url')}
                    type="url"
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>
              </>
            )}

            {/* Config tab */}
            {activeTab === 'config' && (
              <>
                <div>
                  <label className={labelClass}>Etiquetas</label>
                  <TagInput
                    value={tags}
                    onChange={(newTags) => setValue('tags', newTags)}
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Presiona Enter o coma para agregar una etiqueta.
                  </p>
                </div>

                <div>
                  <label className={labelClass}>Stack tecnológico</label>
                  <TagInput
                    value={technologies}
                    onChange={(newTech) => setValue('technologies', newTech)}
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Ej. React, Django, PostgreSQL...
                  </p>
                </div>

                <div>
                  <label className={labelClass}>Color de acento</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={accentColor || '#2563eb'}
                      onChange={(e) => setValue('accent_color', e.target.value)}
                      className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer p-0.5 bg-white dark:bg-gray-700"
                    />
                    <input
                      className={`${inputClass} font-mono uppercase`}
                      value={accentColor}
                      placeholder="#2563eb"
                      maxLength={7}
                      onChange={(e) => setValue('accent_color', e.target.value)}
                    />
                    {accentColor && (
                      <button
                        type="button"
                        onClick={() => setValue('accent_color', '')}
                        className="text-xs text-gray-400 hover:text-gray-600 whitespace-nowrap"
                      >
                        Limpiar
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 py-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={isFeatured}
                    onChange={(e) => setValue('is_featured', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="is_featured"
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    ★ Proyecto destacado
                  </label>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {isPublished ? 'Publicado' : 'Borrador'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Los borradores no aparecen en tu portafolio público
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isPublished}
                    onClick={() => setValue('is_published', !isPublished)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isPublished ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        isPublished ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </>
            )}

            {/* API error */}
            {apiError && (
              <p className="rounded-lg bg-red-50 dark:bg-red-900/20 px-3 py-2 text-sm text-red-600 dark:text-red-400">
                {apiError}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 flex items-center gap-2"
            >
              {isPending && (
                <span className="h-3 w-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              )}
              {item ? 'Guardar cambios' : 'Crear proyecto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
