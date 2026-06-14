'use client';
import { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';
import type { CVFormSkill } from '../types';

const inputClass =
  'w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500';
const labelClass = 'block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1';

function uuid(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now() + Math.random());
}

function emptySkill(): CVFormSkill {
  return { _id: uuid(), name: '', level: 'intermediate', category: '' };
}

const LEVEL_OPTIONS: { value: CVFormSkill['level']; label: string }[] = [
  { value: 'beginner', label: 'Principiante' },
  { value: 'intermediate', label: 'Intermedio' },
  { value: 'advanced', label: 'Avanzado' },
  { value: 'expert', label: 'Experto' },
];

const LEVEL_DOT: Record<CVFormSkill['level'], string> = {
  beginner: 'bg-gray-400',
  intermediate: 'bg-yellow-400',
  advanced: 'bg-blue-500',
  expert: 'bg-green-500',
};

interface Props {
  value: CVFormSkill[];
  onChange: (skills: CVFormSkill[]) => void;
}

export function SkillsEditor({ value, onChange }: Props) {
  const [draft, setDraft] = useState<CVFormSkill>(emptySkill());
  const [adding, setAdding] = useState(false);

  function startAdd() {
    setDraft(emptySkill());
    setAdding(true);
  }

  function save() {
    if (!draft.name.trim()) return;
    if (!value.find((s) => s._id === draft._id)) {
      onChange([...value, draft]);
    } else {
      onChange(value.map((s) => (s._id === draft._id ? draft : s)));
    }
    setAdding(false);
    setDraft(emptySkill());
  }

  function remove(id: string) {
    onChange(value.filter((s) => s._id !== id));
  }

  function updateLevel(id: string, level: CVFormSkill['level']) {
    onChange(value.map((s) => (s._id === id ? { ...s, level } : s)));
  }

  return (
    <div className="space-y-2">
      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((skill) => (
            <div
              key={skill._id}
              className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2"
            >
              <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${LEVEL_DOT[skill.level]}`} />
              <span className="flex-1 text-sm font-medium text-gray-900 dark:text-white truncate">
                {skill.name}
              </span>
              {skill.category && (
                <span className="text-xs text-gray-400 dark:text-gray-500 truncate max-w-[80px]">
                  {skill.category}
                </span>
              )}
              <select
                value={skill.level}
                onChange={(e) => updateLevel(skill._id, e.target.value as CVFormSkill['level'])}
                className="text-xs rounded border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {LEVEL_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => remove(skill._id)}
                className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors shrink-0"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      {adding && (
        <div className="rounded-lg border border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/10 p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-1">
              <label className={labelClass}>Habilidad *</label>
              <input
                className={inputClass}
                value={draft.name}
                placeholder="React, Python…"
                autoFocus
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && save()}
              />
            </div>
            <div>
              <label className={labelClass}>Nivel</label>
              <select
                className={inputClass}
                value={draft.level}
                onChange={(e) => setDraft((d) => ({ ...d, level: e.target.value as CVFormSkill['level'] }))}
              >
                {LEVEL_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Categoría (opcional)</label>
              <input
                className={inputClass}
                value={draft.category}
                placeholder="Backend, Frontend…"
                onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={save}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-xs font-medium text-white transition-colors"
            >
              Agregar
            </button>
            <button
              type="button"
              onClick={() => setAdding(false)}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {!adding && (
        <button
          type="button"
          onClick={startAdd}
          className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
        >
          <Plus size={14} /> Agregar habilidad
        </button>
      )}
    </div>
  );
}
