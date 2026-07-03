'use client';
import { RotateCcw } from 'lucide-react';
import type { Plan } from '@/data/featureGates';
import { CVTemplateSelector } from './CVTemplateSelector';
import { CVStyleSelector } from './CVStyleSelector';
import type { CVFormState } from '../types';

interface Props {
  formState: CVFormState;
  setFormState: React.Dispatch<React.SetStateAction<CVFormState>>;
  currentPlan: Plan;
  canAccentColor: boolean;
}

interface ColorRowProps {
  label: string;
  hint?: string;
  value: string;
  fallback: string;
  onChange: (v: string) => void;
  onReset?: () => void;
}

function ColorRow({ label, hint, value, fallback, onChange, onReset }: ColorRowProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-1.5">{hint}</p>}
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value || fallback}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer p-0.5 bg-white dark:bg-gray-700"
        />
        <input
          className="w-28 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm font-mono uppercase text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          placeholder={fallback}
          maxLength={7}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && onReset && (
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <RotateCcw size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

export function CVAppearanceTab({ formState, setFormState, currentPlan, canAccentColor }: Props) {
  return (
    <div className="space-y-6">
      {/* Plantilla */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <CVTemplateSelector
          selected={formState.template_type}
          onChange={(t) => setFormState((s) => ({ ...s, template_type: t }))}
          currentPlan={currentPlan}
          accentColor={formState.accent_color}
          backgroundColor={formState.background_color}
          sidebarBg={formState.sidebar_bg_color}
        />
      </div>

      {/* Colores */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">Colores</h2>
        {canAccentColor && (
          <ColorRow
            label="Color de acento"
            value={formState.accent_color}
            fallback="#2563eb"
            onChange={(v) => setFormState((s) => ({ ...s, accent_color: v }))}
            onReset={() => setFormState((s) => ({ ...s, accent_color: '' }))}
          />
        )}
        <ColorRow
          label="Fondo"
          value={formState.background_color}
          fallback="#ffffff"
          onChange={(v) => setFormState((s) => ({ ...s, background_color: v }))}
          onReset={() => setFormState((s) => ({ ...s, background_color: '' }))}
        />
        <ColorRow
          label="Fondo de barra lateral"
          hint="Solo aplica a la plantilla Clásica"
          value={formState.sidebar_bg_color}
          fallback="#f9fafb"
          onChange={(v) => setFormState((s) => ({ ...s, sidebar_bg_color: v }))}
          onReset={() => setFormState((s) => ({ ...s, sidebar_bg_color: '' }))}
        />
      </div>

      {/* Estilo */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <CVStyleSelector
          selected={formState.style_preset}
          onChange={(p) => setFormState((s) => ({ ...s, style_preset: p }))}
        />
      </div>

      {/* Visualización */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Visualización</h2>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formState.show_photo}
              onChange={(e) => setFormState((s) => ({ ...s, show_photo: e.target.checked }))}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Mostrar foto</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formState.show_contact}
              onChange={(e) => setFormState((s) => ({ ...s, show_contact: e.target.checked }))}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Mostrar contacto</span>
          </label>
        </div>
      </div>
    </div>
  );
}
