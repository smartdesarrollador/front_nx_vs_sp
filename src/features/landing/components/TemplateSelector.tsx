'use client';
import { Lock, RotateCcw } from 'lucide-react';
import type { LandingTemplateType } from '@/types/digital';
import type { Plan } from '@/data/featureGates';
import { isPlanHigherThan } from '@/data/featureGates';
import { TEMPLATE_META, TEMPLATE_PLAN_REQUIRED, TEMPLATE_PALETTES, type LandingThemeColors } from '../types';

interface Props {
  selected: LandingTemplateType;
  onChange: (t: LandingTemplateType) => void;
  currentPlan: Plan;
  themeColors: LandingThemeColors;
  accentColor: string;
  onThemeColorsChange: (colors: LandingThemeColors) => void;
  onAccentColorChange: (color: string) => void;
}

const TEMPLATES: LandingTemplateType[] = ['basic', 'corporate', 'creative', 'minimal'];

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
          className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 whitespace-nowrap"
        >
          <RotateCcw size={12} />
        </button>
      )}
    </div>
  );
}

export function TemplateSelector({
  selected,
  onChange,
  currentPlan,
  themeColors,
  accentColor,
  onThemeColorsChange,
  onAccentColorChange,
}: Props) {
  const handleTemplateClick = (tpl: LandingTemplateType) => {
    const palette = TEMPLATE_PALETTES[tpl];
    const { accent, ...colors } = palette;
    onChange(tpl);
    onThemeColorsChange(colors);
    onAccentColorChange(accent);
  };

  const applyPalette = (tpl: LandingTemplateType) => {
    const palette = TEMPLATE_PALETTES[tpl];
    const { accent, ...colors } = palette;
    onThemeColorsChange(colors);
    onAccentColorChange(accent);
  };

  const handleReset = () => {
    onThemeColorsChange({});
    onAccentColorChange('');
  };

  const setColor = (key: keyof LandingThemeColors, value: string) => {
    onThemeColorsChange({ ...themeColors, [key]: value });
  };

  const clearColor = (key: keyof LandingThemeColors) => {
    const next = { ...themeColors };
    delete next[key];
    onThemeColorsChange(next);
  };

  const hasCustomColors = !!(
    themeColors.hero_bg ||
    themeColors.hero_text ||
    themeColors.button_bg ||
    themeColors.nav_bg ||
    accentColor
  );

  return (
    <div className="space-y-6">
      {/* Sección 1: Plantilla base */}
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Elige la plantilla visual para tu landing page.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {TEMPLATES.map((tpl) => {
            const meta = TEMPLATE_META[tpl];
            const requiredPlan = TEMPLATE_PLAN_REQUIRED[tpl];
            const isLocked = !isPlanHigherThan(currentPlan, requiredPlan);
            const isSelected = selected === tpl;

            return (
              <button
                key={tpl}
                type="button"
                onClick={() => !isLocked && handleTemplateClick(tpl)}
                className={`relative rounded-xl border-2 p-3 text-left transition-all focus:outline-none ${
                  isSelected
                    ? 'border-blue-600 shadow-md'
                    : isLocked
                      ? 'border-red-300 opacity-60 cursor-not-allowed'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
                }`}
              >
                <div className={`h-24 rounded-lg mb-3 ${meta.previewClass}`} />

                {isLocked && (
                  <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-red-100 dark:bg-red-900/40 px-2 py-0.5 text-xs font-medium text-red-700 dark:text-red-400">
                    <Lock size={10} />
                    Professional
                  </span>
                )}

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
              Ajusta los colores de cada parte de tu landing
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
              const palette = TEMPLATE_PALETTES[tpl];
              const meta = TEMPLATE_META[tpl];
              const isLocked = !isPlanHigherThan(currentPlan, TEMPLATE_PLAN_REQUIRED[tpl]);
              return (
                <button
                  key={tpl}
                  type="button"
                  disabled={isLocked}
                  onClick={() => !isLocked && applyPalette(tpl)}
                  title={isLocked ? `Requiere plan Professional` : `Aplicar paleta ${meta.name}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                    isLocked
                      ? 'opacity-40 cursor-not-allowed border-gray-200 dark:border-gray-700 text-gray-400'
                      : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}
                >
                  <span className="flex gap-0.5">
                    <span className="w-3 h-3 rounded-full inline-block border border-white/30" style={{ background: palette.hero_bg }} />
                    <span className="w-3 h-3 rounded-full inline-block border border-white/30" style={{ background: palette.button_bg }} />
                    <span className="w-3 h-3 rounded-full inline-block border border-white/30" style={{ background: palette.accent }} />
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
            label="Hero — Fondo"
            hint="Fondo de la sección principal"
            value={themeColors.hero_bg ?? ''}
            onChange={(v) => setColor('hero_bg', v)}
            onReset={() => clearColor('hero_bg')}
          />
          <ColorRow
            label="Hero — Texto"
            hint="Color del título y subtítulo"
            value={themeColors.hero_text ?? ''}
            onChange={(v) => setColor('hero_text', v)}
            onReset={() => clearColor('hero_text')}
          />
          <ColorRow
            label="Botón CTA"
            hint="Fondo de los botones de acción"
            value={themeColors.button_bg ?? ''}
            onChange={(v) => setColor('button_bg', v)}
            onReset={() => clearColor('button_bg')}
          />
          <ColorRow
            label="Acento"
            hint="Bordes de cards y estadísticas"
            value={accentColor}
            onChange={onAccentColorChange}
            onReset={accentColor ? () => onAccentColorChange('') : undefined}
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
    </div>
  );
}
