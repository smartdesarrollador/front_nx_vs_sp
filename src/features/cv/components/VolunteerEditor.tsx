'use client';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react';
import type { CVFormVolunteer } from '../types';

const inputClass =
  'w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500';
const labelClass = 'block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1';

function uuid(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now() + Math.random());
}

function emptyItem(): CVFormVolunteer {
  return { _id: uuid(), org: '', role: '', start_date: '', end_date: null, description: '', is_current: false };
}

interface Props {
  value: CVFormVolunteer[];
  onChange: (items: CVFormVolunteer[]) => void;
}

export function VolunteerEditor({ value, onChange }: Props) {
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [draft, setDraft] = useState<CVFormVolunteer>(emptyItem());

  function startNew() {
    setDraft(emptyItem());
    setEditingId('new');
  }

  function startEdit(item: CVFormVolunteer) {
    setDraft({ ...item });
    setEditingId(item._id);
  }

  function cancel() {
    setEditingId(null);
  }

  function save() {
    if (!draft.org.trim() || !draft.role.trim()) return;
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

  function updateDraft(partial: Partial<CVFormVolunteer>) {
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
              <p className="text-sm font-medium text-gray-900 dark:text-white">{item.role}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.org} · {item.start_date} – {item.is_current ? 'Presente' : (item.end_date ?? '')}
              </p>
              {item.description && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 line-clamp-2">{item.description}</p>
              )}
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
          <Plus size={14} /> Agregar voluntariado
        </button>
      )}
    </div>
  );
}

function InlineForm({ draft, onChange }: { draft: CVFormVolunteer; onChange: (p: Partial<CVFormVolunteer>) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label className={labelClass}>Organización *</label>
        <input className={inputClass} value={draft.org} placeholder="Cruz Roja, ONG…" onChange={(e) => onChange({ org: e.target.value })} />
      </div>
      <div>
        <label className={labelClass}>Rol *</label>
        <input className={inputClass} value={draft.role} placeholder="Coordinador, Mentor…" onChange={(e) => onChange({ role: e.target.value })} />
      </div>
      <div>
        <label className={labelClass}>Inicio (AAAA-MM)</label>
        <input className={inputClass} value={draft.start_date} placeholder="2022-03" onChange={(e) => onChange({ start_date: e.target.value })} />
      </div>
      <div>
        <label className={labelClass}>Fin (AAAA-MM)</label>
        <input className={inputClass} value={draft.end_date ?? ''} placeholder="2023-12" disabled={draft.is_current} onChange={(e) => onChange({ end_date: e.target.value || null })} />
      </div>
      <div className="sm:col-span-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={draft.is_current}
            onChange={(e) => onChange({ is_current: e.target.checked, end_date: e.target.checked ? null : draft.end_date })}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-xs text-gray-700 dark:text-gray-300">Actualmente activo</span>
        </label>
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass}>Descripción</label>
        <textarea className={inputClass} rows={2} value={draft.description} placeholder="Describe tu actividad y contribución…" onChange={(e) => onChange({ description: e.target.value })} />
      </div>
    </div>
  );
}
