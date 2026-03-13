'use client';
import { useState } from 'react';
import { Pencil, Trash2, Plus, Check, X } from 'lucide-react';
import type { CVFormCertification } from '../types';

const inputClass =
  'w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500';
const labelClass = 'block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1';

function uuid(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now() + Math.random());
}

function emptyItem(): CVFormCertification {
  return { _id: uuid(), name: '', issuer: '', date: '' };
}

interface Props {
  value: CVFormCertification[];
  onChange: (items: CVFormCertification[]) => void;
}

export function CertificationsEditor({ value, onChange }: Props) {
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [draft, setDraft] = useState<CVFormCertification>(emptyItem());

  function startNew() {
    setDraft(emptyItem());
    setEditingId('new');
  }

  function startEdit(item: CVFormCertification) {
    setDraft({ ...item });
    setEditingId(item._id);
  }

  function cancel() {
    setEditingId(null);
  }

  function save() {
    if (!draft.name.trim()) return;
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

  function updateDraft(partial: Partial<CVFormCertification>) {
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
              <p className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {item.issuer}{item.date ? ` · ${item.date}` : ''}
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
          <Plus size={14} /> Agregar certificación
        </button>
      )}
    </div>
  );
}

function InlineForm({ draft, onChange }: { draft: CVFormCertification; onChange: (p: Partial<CVFormCertification>) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="sm:col-span-2">
        <label className={labelClass}>Nombre *</label>
        <input className={inputClass} value={draft.name} placeholder="AWS Certified Developer…" onChange={(e) => onChange({ name: e.target.value })} />
      </div>
      <div>
        <label className={labelClass}>Emisor</label>
        <input className={inputClass} value={draft.issuer} placeholder="Amazon, Google…" onChange={(e) => onChange({ issuer: e.target.value })} />
      </div>
      <div>
        <label className={labelClass}>Fecha (AAAA-MM)</label>
        <input className={inputClass} value={draft.date} placeholder="2023-05" onChange={(e) => onChange({ date: e.target.value })} />
      </div>
    </div>
  );
}
