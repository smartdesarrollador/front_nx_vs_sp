'use client';
import { Lock } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { Plan } from '@/data/featureGates';
import { FEATURES_BY_PLAN, getPlanDisplayName } from '@/data/featureGates';

type TemplateType = 'classic' | 'modern' | 'minimal';

interface TemplateOption {
  id: TemplateType;
  label: string;
  description: string;
  minCount: number;
  requiredPlan: Plan;
}

const TEMPLATES: TemplateOption[] = [
  {
    id: 'classic',
    label: 'Clásico',
    description: 'Diseño profesional con barra lateral y contenido principal.',
    minCount: 1,
    requiredPlan: 'free',
  },
  {
    id: 'modern',
    label: 'Moderno',
    description: 'Diseño limpio con tipografía contemporánea y sección de habilidades destacada.',
    minCount: 2,
    requiredPlan: 'starter',
  },
  {
    id: 'minimal',
    label: 'Minimalista',
    description: 'Diseño sobrio y elegante que pone el contenido al frente.',
    minCount: 3,
    requiredPlan: 'professional',
  },
];

interface Props {
  selected: TemplateType;
  onChange: (t: TemplateType) => void;
  currentPlan: Plan;
  accentColor?: string;
  backgroundColor?: string;
  sidebarBg?: string;
}

function TemplateMockup({
  id,
  accentColor,
  backgroundColor,
  sidebarBg,
}: {
  id: TemplateType;
  accentColor?: string;
  backgroundColor?: string;
  sidebarBg?: string;
}) {
  const bg = backgroundColor || undefined;
  const accent = accentColor || '#94a3b8';

  if (id === 'classic') {
    return (
      <div className="h-16 rounded-lg mb-3 flex overflow-hidden border border-gray-200 dark:border-gray-700" style={{ background: bg }}>
        <div className="w-1/3 h-full" style={{ background: sidebarBg || '#e5e7eb' }} />
        <div className="flex-1 h-full p-2 space-y-1">
          <div className="h-1.5 w-3/4 rounded" style={{ background: accent }} />
          <div className="h-1 w-full rounded bg-gray-200 dark:bg-gray-600" />
          <div className="h-1 w-5/6 rounded bg-gray-200 dark:bg-gray-600" />
        </div>
      </div>
    );
  }
  if (id === 'modern') {
    return (
      <div className="h-16 rounded-lg mb-3 overflow-hidden border border-gray-200 dark:border-gray-700" style={{ background: bg }}>
        <div className="h-7 w-full" style={{ background: accent }} />
        <div className="p-2 space-y-1">
          <div className="h-1 w-full rounded bg-gray-200 dark:bg-gray-600" />
          <div className="h-1 w-5/6 rounded bg-gray-200 dark:bg-gray-600" />
        </div>
      </div>
    );
  }
  return (
    <div className="h-16 rounded-lg mb-3 p-2.5 space-y-1.5 border border-gray-200 dark:border-gray-700" style={{ background: bg }}>
      <div className="h-1.5 w-1/2 rounded" style={{ background: accent }} />
      <div className="h-1 w-full rounded bg-gray-200 dark:bg-gray-600" />
      <div className="h-1 w-3/4 rounded bg-gray-200 dark:bg-gray-600" />
    </div>
  );
}

export function CVTemplateSelector({ selected, onChange, currentPlan, accentColor, backgroundColor, sidebarBg }: Props) {
  const maxTemplates = FEATURES_BY_PLAN[currentPlan].cvTemplates as number;

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-gray-900 dark:text-white">Plantilla</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TEMPLATES.map((tpl) => {
          const locked = maxTemplates < tpl.minCount;
          const isSelected = selected === tpl.id;

          return (
            <button
              key={tpl.id}
              type="button"
              disabled={locked}
              onClick={() => !locked && onChange(tpl.id)}
              className={cn(
                'relative flex flex-col items-start gap-1.5 rounded-xl border-2 p-4 text-left transition-all',
                locked
                  ? 'cursor-not-allowed opacity-50 border-gray-200 dark:border-gray-700'
                  : isSelected
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'
              )}
            >
              {locked && (
                <span className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-amber-100 dark:bg-amber-900/30 px-1.5 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
                  <Lock size={10} /> {getPlanDisplayName(tpl.requiredPlan)}
                </span>
              )}
              {isSelected && !locked && (
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
              )}
              <TemplateMockup
                id={tpl.id}
                accentColor={accentColor}
                backgroundColor={backgroundColor}
                sidebarBg={sidebarBg}
              />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">{tpl.label}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {tpl.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
