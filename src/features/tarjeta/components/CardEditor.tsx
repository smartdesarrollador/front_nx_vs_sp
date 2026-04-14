'use client';
import { useEffect, useState, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { useSaveCard } from '../hooks/useSaveCard';
import type { CardData, CardFormData } from '../types';

interface FormValues {
  username: string;
  display_name: string;
  title: string;
  bio: string;
  avatar_url: string;
  is_public: boolean;
  email: string;
  phone: string;
  location: string;
  linkedin_url: string;
  twitter_url: string;
  github_url: string;
  instagram_url: string;
  facebook_url: string;
  website_url: string;
  primary_color: string;
  background_color: string;
  years_experience: number | null;
}

type StringFormField = Exclude<keyof FormValues, 'is_public' | 'years_experience'>;

interface CardEditorProps {
  data: CardData | null;
  onSaved: () => void;
}

const USERNAME_REGEX = /^[a-z0-9]([a-z0-9-]{0,48}[a-z0-9])?$/;

function getDefaultValues(data: CardData | null): FormValues {
  return {
    username: data?.profile.username ?? '',
    display_name: data?.profile.display_name ?? '',
    title: data?.profile.title ?? '',
    bio: data?.profile.bio ?? '',
    avatar_url: data?.profile.avatar_url ?? '',
    is_public: data?.profile.is_public ?? false,
    email: data?.digital_card?.email ?? '',
    phone: data?.digital_card?.phone ?? '',
    location: data?.digital_card?.location ?? '',
    linkedin_url: data?.digital_card?.linkedin_url ?? '',
    twitter_url: data?.digital_card?.twitter_url ?? '',
    github_url: data?.digital_card?.github_url ?? '',
    instagram_url: data?.digital_card?.instagram_url ?? '',
    facebook_url: data?.digital_card?.facebook_url ?? '',
    website_url: data?.digital_card?.website_url ?? '',
    primary_color: data?.digital_card?.primary_color ?? '#3B82F6',
    background_color: data?.digital_card?.background_color ?? '#FFFFFF',
    years_experience: data?.digital_card?.years_experience ?? null,
  };
}

const URL_REGEX = /^(https?:\/\/.+)?$/;

export function CardEditor({ data, onSaved }: CardEditorProps) {
  const { mutate: saveCard, isPending, error } = useSaveCard();
  const [urlErrors, setUrlErrors] = useState<Partial<Record<StringFormField, string>>>({});
  const [specialties, setSpecialties] = useState<string[]>(
    data?.digital_card?.specialties ?? [] as string[],
  );
  const [specialtyInput, setSpecialtyInput] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: getDefaultValues(data),
  });

  useEffect(() => {
    reset(getDefaultValues(data));
    setSpecialties(data?.digital_card?.specialties ?? [] as string[]);
    setUrlErrors({});
  }, [data, reset]);

  function handleSpecialtyKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = specialtyInput.trim();
      if (value && !specialties.includes(value)) {
        setSpecialties((prev) => [...prev, value]);
      }
      setSpecialtyInput('');
    }
  }

  function removeSpecialty(index: number) {
    setSpecialties((prev) => prev.filter((_, i) => i !== index));
  }

  const urlFields: StringFormField[] = [
    'avatar_url',
    'linkedin_url',
    'twitter_url',
    'github_url',
    'instagram_url',
    'facebook_url',
    'website_url',
  ];

  const onSubmit = (values: FormValues) => {
    // Validate URL fields
    const newUrlErrors: Partial<Record<StringFormField, string>> = {};
    for (const field of urlFields) {
      const val = values[field] as string;
      if (val && !URL_REGEX.test(val)) {
        newUrlErrors[field] = 'URL inválida';
      }
    }
    if (Object.keys(newUrlErrors).length > 0) {
      setUrlErrors(newUrlErrors);
      return;
    }
    setUrlErrors({});
    saveCard(
      {
        ...(values as Omit<CardFormData, 'specialties'>),
        specialties,
        years_experience: values.years_experience
          ? Number(values.years_experience)
          : null,
      } as CardFormData,
      {
        onSuccess: () => onSaved(),
      },
    );
  };

  const inputClass =
    'w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500';
  const labelClass = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1';
  const errorClass = 'text-xs text-red-500 mt-0.5';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      {/* Seccion 1: Perfil */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Perfil</h3>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Nombre de usuario *</label>
            <input
              {...register('username', {
                required: 'Nombre de usuario requerido',
                pattern: {
                  value: USERNAME_REGEX,
                  message: 'Solo minúsculas, números y guiones (ej: juan-perez)',
                },
              })}
              className={inputClass}
              placeholder="ej: juan-perez"
            />
            {errors.username && <p className={errorClass}>{errors.username.message}</p>}
            <p className="text-xs text-gray-400 mt-0.5">
              Tu URL pública: /tarjeta/<strong>{'{username}'}</strong>
            </p>
          </div>
          <div>
            <label className={labelClass}>Nombre completo *</label>
            <input
              {...register('display_name', { required: 'Nombre requerido' })}
              className={inputClass}
              placeholder="Tu nombre"
            />
            {errors.display_name && (
              <p className={errorClass}>{errors.display_name.message}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Titulo / Cargo</label>
            <input
              {...register('title')}
              className={inputClass}
              placeholder="Ej: Desarrollador Full Stack"
            />
          </div>
          <div>
            <label className={labelClass}>Bio</label>
            <textarea
              {...register('bio', {
                maxLength: { value: 500, message: 'Maximo 500 caracteres' },
              })}
              rows={3}
              className={inputClass}
              placeholder="Una breve descripcion sobre ti (max. 500 caracteres)"
            />
            {errors.bio && <p className={errorClass}>{errors.bio.message}</p>}
          </div>
          <div>
            <label className={labelClass}>URL de Avatar</label>
            <input
              {...register('avatar_url')}
              className={inputClass}
              placeholder="https://..."
            />
            {urlErrors.avatar_url && <p className={errorClass}>{urlErrors.avatar_url}</p>}
          </div>
        </div>
      </section>

      {/* Seccion 2: Contacto */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Contacto</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Email</label>
            <input
              {...register('email', {
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalido' },
              })}
              type="email"
              className={inputClass}
              placeholder="tu@email.com"
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Telefono</label>
            <input {...register('phone')} className={inputClass} placeholder="+34 600 000 000" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Ubicacion</label>
            <input
              {...register('location')}
              className={inputClass}
              placeholder="Madrid, Espana"
            />
          </div>
        </div>
      </section>

      {/* Seccion 3: Redes sociales */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
          Redes Sociales
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(
            [
              { field: 'linkedin_url', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/...' },
              { field: 'twitter_url', label: 'Twitter / X', placeholder: 'https://twitter.com/...' },
              { field: 'github_url', label: 'GitHub', placeholder: 'https://github.com/...' },
              { field: 'instagram_url', label: 'Instagram', placeholder: 'https://instagram.com/...' },
              { field: 'facebook_url', label: 'Facebook', placeholder: 'https://facebook.com/...' },
              { field: 'website_url', label: 'Portafolio / Sitio Web', placeholder: 'https://...' },
            ] as { field: StringFormField; label: string; placeholder: string }[]
          ).map(({ field, label, placeholder }) => (
            <div key={field}>
              <label className={labelClass}>{label}</label>
              <input {...register(field)} className={inputClass} placeholder={placeholder} />
              {urlErrors[field] && <p className={errorClass}>{urlErrors[field]}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Seccion 4: Especialidades y experiencia */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
          Perfil Profesional
        </h3>
        <div className="space-y-4">
          {/* Specialties tag input */}
          <div>
            <label className={labelClass}>Especialidades</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {specialties.map((s, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => removeSpecialty(i)}
                    className="hover:text-blue-900 dark:hover:text-blue-100"
                    aria-label={`Eliminar ${s}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              value={specialtyInput}
              onChange={(e) => setSpecialtyInput(e.target.value)}
              onKeyDown={handleSpecialtyKeyDown}
              className={inputClass}
              placeholder="Escribe una especialidad y presiona Enter"
            />
            <p className="text-xs text-gray-400 mt-0.5">
              Presiona Enter o coma (,) para agregar cada especialidad
            </p>
          </div>

          {/* Years of experience */}
          <div className="max-w-[180px]">
            <label className={labelClass}>Años de experiencia</label>
            <input
              type="number"
              min={0}
              max={60}
              {...register('years_experience', {
                min: { value: 0, message: 'Mínimo 0' },
                max: { value: 60, message: 'Máximo 60' },
              })}
              className={inputClass}
              placeholder="Ej: 4"
            />
            {errors.years_experience && (
              <p className={errorClass}>{errors.years_experience.message}</p>
            )}
            <p className="text-xs text-gray-400 mt-0.5">
              Se mostrará como &quot;4+ años de experiencia&quot;
            </p>
          </div>
        </div>
      </section>

      {/* Seccion 5: Tema */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Tema</h3>
        <div className="flex gap-6">
          <div>
            <label className={labelClass}>Color principal</label>
            <input
              type="color"
              {...register('primary_color')}
              className="w-12 h-10 rounded cursor-pointer border border-gray-200 dark:border-gray-600"
            />
          </div>
          <div>
            <label className={labelClass}>Color de fondo</label>
            <input
              type="color"
              {...register('background_color')}
              className="w-12 h-10 rounded cursor-pointer border border-gray-200 dark:border-gray-600"
            />
          </div>
        </div>
      </section>

      {/* Footer fijo */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 p-4 -mx-4 flex items-center justify-between gap-4 rounded-b-xl">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register('is_public')}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Publicar tarjeta
          </span>
        </label>
        <div className="flex items-center gap-3">
          {error && (
            <p className="text-xs text-red-500">Error al guardar. Intenta de nuevo.</p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isPending && (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            )}
            Guardar cambios
          </button>
        </div>
      </div>
    </form>
  );
}
