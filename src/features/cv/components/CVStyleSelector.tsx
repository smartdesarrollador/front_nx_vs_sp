'use client';
import { CV_STYLE_PRESET_META, CV_STYLE_PRESET_TOKENS, type CVStylePreset } from '../types';

interface Props {
  selected: CVStylePreset;
  onChange: (preset: CVStylePreset) => void;
}

const STYLE_PRESETS: CVStylePreset[] = ['modern', 'classic', 'soft'];

export function CVStyleSelector({ selected, onChange }: Props) {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white">Estilo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {STYLE_PRESETS.map((preset) => {
          const meta = CV_STYLE_PRESET_META[preset];
          const tokens = CV_STYLE_PRESET_TOKENS[preset];
          const isSelected = selected === preset;
          return (
            <button
              key={preset}
              type="button"
              onClick={() => onChange(preset)}
              className={`relative rounded-xl border-2 p-3 text-left transition-all focus:outline-none ${
                isSelected
                  ? 'border-blue-600 shadow-md'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
              }`}
            >
              <div className="h-16 rounded-lg mb-3 bg-gray-50 dark:bg-gray-900/40 flex items-center justify-center p-3">
                <div
                  className={`w-full h-10 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 ${tokens.radiusCard} ${tokens.shadowCard}`}
                />
              </div>
              <p className={`text-sm text-gray-900 dark:text-white ${tokens.headingFont} ${tokens.headingWeight} ${tokens.headingTracking}`}>{meta.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{meta.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
