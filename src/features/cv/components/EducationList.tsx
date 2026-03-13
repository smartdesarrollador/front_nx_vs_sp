'use client';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react';
import type { CVFormEducation } from '../types';

const inputClass =
  'w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500';
const labelClass = 'block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1';

function uuid(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now() + Math.random());
}

function emptyItem(): CVFormEducation {
  return { _id: uuid(), institution: '', degree: '', field: '', start_date: '', end_date: null };
}

interface Props {
  value: CVFormEducation[];
  onChange: (items: CVFormEducation[]) => void;
}

export function EducationList({ value, onChange }: Props) {
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [draft, setDraft] = useState<CVFormEducation>(emptyItem());

  function startNew() {
    setDraft(emptyItem());
    setEditingId('new');
  }

  function startEdit(item: CVFormEducation) {
    setDraft({ ...item });
    setEditingId(item._id);
  }

  function cancel() {
    setEditingId(null);
  }

  function save() {
    if (!draft.institution.trim()) return;
    if (editingId === 'new') {
      onChange([...value, draft]);
    } else {
      onChange(value.map((i) => (i._id === editingId ? draft : i)));
    }
    setEditingId(null);
  }

  function remove(id: string) {
    onChange(value.filter((i) => i._id !== id));
  }

  function updateDraft(partial: Partial<CVFormEducation>) {
    setDraft((d) => ({ ...d, ...partial }));
  }

  return (
    <div className="space-y-3">
      {value.map((item) =>
        editingId === item._id ? (
          <div key={item._id} className="rounded-lg border border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/10 p-4 space-y-3">
            <InlineForm draft={draft} onChange={updateDraft} />
            <div className="flex gap-2">
              <button type="button" onClick={save} className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-xs font-medium text-white transition-colors">
                <Check size={12} /> Guardar
              </button>
              <button type="button" onClick={cancel} className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <X size={12} /> Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div key={item._id} className="flex items-start justify-between rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{item.degree}{item.field ? ` en ${item.field}` : ''}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.institution} · {item.start_date}{item.end_date ? ` – ${item.end_date}` : ''}
              </p>
            </div>
            <div className="flex gap-1 ml-2 shrink-0">
              <button type="button" onClick={() => startEdit(item)} className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <Pencil size={13} />
              </button>
              <button type="button" onClick={() => remove(item._id)} className="p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        )
      )}

      {editingId === 'new' && (
        <div className="rounded-lg border border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/10 p-4 space-y-3">
          <InlineForm draft={draft} onChange={updateDraft} />
          <div className="flex gap-2">
            <button type="button" onClick={save} className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 px-3 py-1.5 text-xs font-medium text-white transition-colors">
              <Check size={12} /> Guardar
            </button>
            <button type="button" onClick={cancel} className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <X size={12} /> Cancelar
            </button>
          </div>
        </div>
      )}

      {editingId === null && (
        <button type="button" onClick={startNew} className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
          <Plus size={14} /> Agregar educación
        </button>
      )}
    </div>
  );
}

function InlineForm({ draft, onChange }: { draft: CVFormEducation; onChange: (p: Partial<CVFormEducation>) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="sm:col-span-2">
        <label className={labelClass}>Institución *</label>
        <input className={inputClass} value={draft.institution} placeholder="Universidad o escuela" onChange={(e) => onChange({ institution: e.target.value })} />
      </div>
      <div>
        <label className={labelClass}>Título / Grado</label>
        <input className={inputClass} value={draft.degree} placeholder="Lic., Máster, Técnico…" onChange={(e) => onChange({ degree: e.target.value })} />
      </div>
      <div>
        <label className={labelClass}>Campo de estudio</label>
        <input className={inputClass} value={draft.field} placeholder="Ingeniería, Diseño…" onChange={(e) => onChange({ field: e.target.value })} />
      </div>
      <div>
        <label className={labelClass}>Inicio (AAAA-MM)</label>
        <input className={inputClass} value={draft.start_date} placeholder="2018-09" onChange={(e) => onChange({ start_date: e.target.value })} />
      </div>
      <div>
        <label className={labelClass}>Fin (AAAA-MM)</label>
        <input className={inputClass} value={draft.end_date ?? ''} placeholder="2022-06" onChange={(e) => onChange({ end_date: e.target.value || null })} />
      </div>
    </div>
  );
}
