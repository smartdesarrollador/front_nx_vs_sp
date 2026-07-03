'use client';
import { PORTFOLIO_STYLE_PRESET_META, PORTFOLIO_STYLE_PRESET_TOKENS, type PortfolioStylePreset } from '../types';

interface Props {
  selected: PortfolioStylePreset;
  onChange: (preset: PortfolioStylePreset) => void;
}

const STYLE_PRESETS: PortfolioStylePreset[] = ['modern', 'classic', 'soft', 'editorial', 'bold'];

export function PortfolioStyleSelector({ selected, onChange }: Props) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Elige un estilo</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-4">
        Define bordes, sombras y espaciado de todo tu portafolio.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {STYLE_PRESETS.map((preset) => {
          const meta = PORTFOLIO_STYLE_PRESET_META[preset];
          const tokens = PORTFOLIO_STYLE_PRESET_TOKENS[preset];
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
              <div className="h-16 rounded-lg mb-3 bg-gray-50 dark:bg-gray-900/40 flex items-center justify-center gap-2 p-3">
                <div
                  className={`w-10 h-8 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 ${tokens.radiusCard} ${tokens.shadowCard}`}
                />
                <div className={`w-10 h-5 bg-primary-600 ${tokens.radiusButton} ${tokens.shadowButton}`} />
              </div>
              <p className={`text-sm text-gray-900 dark:text-white ${tokens.headingFont} ${tokens.headingWeight} ${tokens.headingTracking}`}>
                {meta.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{meta.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
