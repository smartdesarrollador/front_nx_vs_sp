'use client';
import { ChevronUp, ChevronDown, X, Plus } from 'lucide-react';
import type { LandingSection } from '@/types/digital';
import { SECTION_META } from '../types';
import { SectionEditor } from './SectionEditor';

interface Props {
  sections: LandingSection[];
  selectedIndex: number | null;
  onSelect: (i: number) => void;
  onChange: (sections: LandingSection[]) => void;
  onAdd: () => void;
}

function swap<T>(arr: T[], i: number, j: number): T[] {
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

export function SectionBuilder({ sections, selectedIndex, onSelect, onChange, onAdd }: Props) {
  return (
    <div className="space-y-4">
      {/* Section list */}
      <div className="space-y-2">
        {sections.map((section, i) => {
          const meta = SECTION_META[section.type];
          const isSelected = selectedIndex === i;
          return (
            <div
              key={`${section.type}-${i}`}
              className={`flex items-center justify-between rounded-lg border px-3 py-2 cursor-pointer transition-colors ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={() => onSelect(i)}
            >
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {meta.label}
              </span>
              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  disabled={i === 0}
                  onClick={() => onChange(swap(sections, i, i - 1))}
                  className="rounded p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-30"
                  aria-label="Mover arriba"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  type="button"
                  disabled={i === sections.length - 1}
                  onClick={() => onChange(swap(sections, i, i + 1))}
                  className="rounded p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-30"
                  aria-label="Mover abajo"
                >
                  <ChevronDown size={14} />
                </button>
                <button
                  type="button"
                  disabled={sections.length <= 1}
                  onClick={() => {
                    const next = sections.filter((_, idx) => idx !== i);
                    onChange(next);
                    // Ajustar selectedIndex si es necesario
                  }}
                  className="rounded p-1 text-gray-400 hover:text-red-500 disabled:opacity-30"
                  aria-label="Eliminar sección"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add section button */}
      <button
        type="button"
        onClick={onAdd}
        className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <Plus size={16} />
        Añadir sección
      </button>

      {/* Section editor for selected section */}
      {selectedIndex !== null && sections[selectedIndex] && (
        <div className="mt-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Editar: {SECTION_META[sections[selectedIndex].type].label}
          </h4>
          <SectionEditor
            key={selectedIndex}
            section={sections[selectedIndex]}
            onChange={(updated) => {
              const next = [...sections];
              next[selectedIndex] = updated;
              onChange(next);
            }}
          />
        </div>
      )}
    </div>
  );
}
