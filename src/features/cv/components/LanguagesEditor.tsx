'use client';
import { Plus, Trash2 } from 'lucide-react';
import type { CVFormLanguage } from '../types';

const LANG_LEVELS = ['basic', 'intermediate', 'fluent', 'native'] as const;
const LEVEL_LABELS: Record<string, string> = {
  basic: 'Básico',
  intermediate: 'Intermedio',
  fluent: 'Fluido',
  native: 'Nativo',
};

const inputClass =
  'rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500';

function uuid(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now() + Math.random());
}

interface Props {
  value: CVFormLanguage[];
  onChange: (items: CVFormLanguage[]) => void;
}

export function LanguagesEditor({ value, onChange }: Props) {
  function addLanguage() {
    onChange([...value, { _id: uuid(), name: '', level: 'intermediate' }]);
  }

  function remove(id: string) {
    onChange(value.filter((l) => l._id !== id));
  }

  function updateItem(id: string, partial: Partial<CVFormLanguage>) {
    onChange(value.map((l) => (l._id === id ? { ...l, ...partial } : l)));
  }

  return (
    <div className="space-y-2">
      {value.map((lang) => (
        <div key={lang._id} className="flex items-center gap-2">
          <input
            className={`${inputClass} flex-1`}
            value={lang.name}
            placeholder="Español, Inglés…"
            onChange={(e) => updateItem(lang._id, { name: e.target.value })}
          />
          <select
            className={`${inputClass} w-36`}
            value={lang.level}
            onChange={(e) => updateItem(lang._id, { level: e.target.value })}
          >
            {LANG_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {LEVEL_LABELS[lvl]}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => remove(lang._id)}
            className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addLanguage}
        className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
      >
        <Plus size={14} /> Agregar idioma
      </button>
    </div>
  );
}
