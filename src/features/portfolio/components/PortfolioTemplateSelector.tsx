'use client';
import { RotateCcw } from 'lucide-react';
import {
  PORTFOLIO_PALETTES,
  PORTFOLIO_TEMPLATE_META,
  type PortfolioTemplateType,
  type PortfolioThemeColors,
  type PortfolioStylePreset,
} from '../types';
import { PortfolioStyleSelector } from './PortfolioStyleSelector';

interface Props {
  themeColors: PortfolioThemeColors;
  onThemeColorsChange: (colors: PortfolioThemeColors) => void;
  stylePreset: PortfolioStylePreset;
  onStylePresetChange: (preset: PortfolioStylePreset) => void;
}

const TEMPLATES: PortfolioTemplateType[] = ['light', 'dark', 'creative', 'minimal'];

const inputClass =
  'w-28 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm font-mono uppercase text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500';

interface ColorRowProps {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  onReset?: () => void;
}

function ColorRow({ label, hint, value, onChange, onReset }: ColorRowProps) {
  const displayValue = value || '#000000';
  return (
    <div className="flex items-center gap-3">
      <div className="w-32 shrink-0">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{hint}</p>
      </div>
      <input
        type="color"
        value={displayValue}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer p-0.5 bg-white dark:bg-gray-700 shrink-0"
      />
      <input
        className={inputClass}
        value={value}
        placeholder="#000000"
        maxLength={7}
        onChange={(e) => onChange(e.target.value)}
      />
      {onReset && value && (
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <RotateCcw size={12} />
        </button>
      )}
    </div>
  );
}

export function PortfolioTemplateSelector({
  themeColors,
  onThemeColorsChange,
  stylePreset,
  onStylePresetChange,
}: Props) {
  const applyPalette = (tpl: PortfolioTemplateType) => {
    onThemeColorsChange({ ...PORTFOLIO_PALETTES[tpl] });
  };

  const handleReset = () => {
    onThemeColorsChange({});
  };

  const setColor = (key: keyof PortfolioThemeColors, value: string) => {
    onThemeColorsChange({ ...themeColors, [key]: value });
  };

  const clearColor = (key: keyof PortfolioThemeColors) => {
    const next = { ...themeColors };
    delete next[key];
    onThemeColorsChange(next);
  };

  const hasCustomColors = !!(
    themeColors.header_bg ||
    themeColors.header_text ||
    themeColors.accent ||
    themeColors.nav_bg
  );

  return (
    <div className="space-y-6">
      {/* Sección 1: Plantilla base */}
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Elige una paleta de colores para tu portafolio público.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {TEMPLATES.map((tpl) => {
            const meta = PORTFOLIO_TEMPLATE_META[tpl];
            const palette = PORTFOLIO_PALETTES[tpl];
            const isActive =
              themeColors.header_bg === palette.header_bg &&
              themeColors.accent === palette.accent;

            return (
              <button
                key={tpl}
                type="button"
                onClick={() => applyPalette(tpl)}
                className={`relative rounded-xl border-2 p-3 text-left transition-all focus:outline-none ${
                  isActive
                    ? 'border-blue-600 shadow-md'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                }`}
              >
                <div className={`h-24 rounded-lg mb-3 ${meta.previewBg}`} />
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{meta.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{meta.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Separador */}
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Sección 2: Personalizar colores */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Personalizar colores</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Ajusta los colores de cada parte de tu portafolio
            </p>
          </div>
          {hasCustomColors && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
            >
              <RotateCcw size={12} />
              Restablecer todo
            </button>
          )}
        </div>

        {/* Paletas rápidas */}
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
            Paletas rápidas
          </p>
          <div className="flex flex-wrap gap-2">
            {TEMPLATES.map((tpl) => {
              const palette = PORTFOLIO_PALETTES[tpl];
              const meta = PORTFOLIO_TEMPLATE_META[tpl];
              return (
                <button
                  key={tpl}
                  type="button"
                  onClick={() => applyPalette(tpl)}
                  title={`Aplicar paleta ${meta.name}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all border-gray-200 dark:border-gray-700 hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <span className="flex gap-0.5">
                    <span
                      className="w-3 h-3 rounded-full inline-block border border-white/30"
                      style={{ background: palette.header_bg }}
                    />
                    <span
                      className="w-3 h-3 rounded-full inline-block border border-white/30"
                      style={{ background: palette.accent }}
                    />
                    <span
                      className="w-3 h-3 rounded-full inline-block border border-white/30"
                      style={{ background: palette.nav_bg }}
                    />
                  </span>
                  {meta.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Color pickers */}
        <div className="space-y-4">
          <ColorRow
            label="Header — Fondo"
            hint="Fondo del encabezado del perfil"
            value={themeColors.header_bg ?? ''}
            onChange={(v) => setColor('header_bg', v)}
            onReset={() => clearColor('header_bg')}
          />
          <ColorRow
            label="Header — Texto"
            hint="Color del nombre, título y bio"
            value={themeColors.header_text ?? ''}
            onChange={(v) => setColor('header_text', v)}
            onReset={() => clearColor('header_text')}
          />
          <ColorRow
            label="Acento"
            hint="Pills activas de filtros y botón demo"
            value={themeColors.accent ?? ''}
            onChange={(v) => setColor('accent', v)}
            onReset={() => clearColor('accent')}
          />
          <ColorRow
            label="Nav — Fondo"
            hint="Barra de navegación pública"
            value={themeColors.nav_bg ?? ''}
            onChange={(v) => setColor('nav_bg', v)}
            onReset={() => clearColor('nav_bg')}
          />
        </div>
      </div>

      {/* Separador */}
      <hr className="border-gray-200 dark:border-gray-700" />

      {/* Sección 3: Elige un estilo */}
      <PortfolioStyleSelector selected={stylePreset} onChange={onStylePresetChange} />
    </div>
  );
}
