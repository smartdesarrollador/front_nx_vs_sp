'use client';
import { useRef, useState } from 'react';
import { Plus, X, AlertTriangle, Upload, Loader2 } from 'lucide-react';
import { useUploadImage, type AssetSlot } from '@/hooks/useUploadImage';

const inputClass =
  'w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500';

const ACCEPT = 'image/png,image/jpeg,image/webp,image/gif';
const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL ?? '';

interface ApiError {
  status?: number;
  message: string;
}

/** Extrae status + mensaje legible de un error de axios, cubriendo las formas del backend. */
function extractApiError(err: unknown): ApiError {
  const e = err as { response?: { status?: number; data?: Record<string, unknown> } };
  const status = e?.response?.status;
  const data = e?.response?.data ?? {};
  const errorObj = data.error as { message?: string } | undefined;
  const fileErr = data.file as string[] | undefined;
  const message =
    errorObj?.message ??
    (typeof data.detail === 'string' ? data.detail : undefined) ??
    fileErr?.[0] ??
    'No se pudo subir la imagen. Inténtalo de nuevo.';
  return { status, message };
}

/**
 * Botón de subida real de imagen. Sube al backend (cuenta hacia la cuota) y devuelve la URL
 * interna vía onUploaded. El 402 (límite de plan / cuota) muestra un banner con CTA al Hub.
 */
function UploadButton({
  slot,
  onUploaded,
  disabled,
  compact,
}: {
  slot: AssetSlot;
  onUploaded: (url: string) => void;
  disabled?: boolean;
  compact?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadImage();
  const [error, setError] = useState<ApiError | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // permite re-subir el mismo archivo
    if (!file) return;
    setError(null);
    upload.mutate(
      { file, slot },
      {
        onSuccess: (data) => onUploaded(data.url),
        onError: (err) => setError(extractApiError(err)),
      },
    );
  };

  return (
    <div className={compact ? '' : 'space-y-2'}>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        onChange={handleFile}
        className="hidden"
        data-testid={`upload-input-${slot}`}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={disabled || upload.isPending}
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {upload.isPending ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
        {upload.isPending ? 'Subiendo...' : 'Subir imagen'}
      </button>

      {error && (
        <div className="flex flex-col gap-1 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 px-3 py-2 text-xs text-red-700 dark:text-red-400">
          <span className="flex items-center gap-1.5">
            <AlertTriangle size={12} /> {error.message}
          </span>
          {error.status === 402 && (
            <a
              href={`${HUB_URL}/subscription`}
              className="font-semibold underline hover:no-underline"
            >
              Mejorar plan
            </a>
          )}
        </div>
      )}
    </div>
  );
}

interface SingleProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  slot: AssetSlot;
}

export function SingleImageField({ label, value, onChange, slot }: SingleProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="flex items-start gap-2">
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... o sube una imagen"
          className={inputClass}
        />
        <UploadButton slot={slot} onUploaded={onChange} compact />
      </div>
      {value && (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="preview"
            className="h-20 w-auto rounded-md border border-gray-200 dark:border-gray-600 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
}

interface GalleryProps {
  values: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
  slot: AssetSlot;
}

export function GalleryImagesField({ values, onChange, maxImages, slot }: GalleryProps) {
  const atLimit = maxImages !== undefined && maxImages !== Infinity && values.length >= maxImages;

  const update = (index: number, url: string) => {
    const next = [...values];
    next[index] = url;
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  const add = () => {
    if (!atLimit) onChange([...values, '']);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Imágenes de galería{' '}
          {maxImages !== undefined && maxImages !== Infinity && (
            <span className="text-gray-400">
              ({values.length}/{maxImages})
            </span>
          )}
        </label>
        <div className="flex items-center gap-3">
          <UploadButton
            slot={slot}
            onUploaded={(url) => onChange([...values, url])}
            disabled={atLimit}
            compact
          />
          <button
            type="button"
            onClick={add}
            disabled={atLimit}
            className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus size={12} />
            Agregar URL
          </button>
        </div>
      </div>

      {atLimit && (
        <div className="flex items-center gap-2 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
          <AlertTriangle size={12} />
          Límite de {maxImages} imágenes alcanzado en tu plan actual.
        </div>
      )}

      <div className="space-y-2">
        {values.map((url, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => update(i, e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
            {url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={url}
                alt={`preview ${i + 1}`}
                className="h-10 w-10 rounded border border-gray-200 dark:border-gray-600 object-cover flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <button
              type="button"
              onClick={() => remove(i)}
              className="flex-shrink-0 text-gray-400 hover:text-red-500"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {values.length === 0 && (
        <p className="text-xs text-gray-400 italic">Sin imágenes. Sube una imagen o agrega URLs.</p>
      )}
    </div>
  );
}
