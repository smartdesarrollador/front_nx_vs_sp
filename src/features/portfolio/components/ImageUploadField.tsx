'use client';
import { Plus, X, AlertTriangle } from 'lucide-react';

const inputClass =
  'w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500';

interface SingleProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export function SingleImageField({ label, value, onChange }: SingleProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://..."
        className={inputClass}
      />
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
}

export function GalleryImagesField({ values, onChange, maxImages }: GalleryProps) {
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
        <p className="text-xs text-gray-400 italic">Sin imágenes. Agrega URLs de imágenes.</p>
      )}
    </div>
  );
}
