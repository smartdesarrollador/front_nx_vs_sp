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
}

export function CVTemplateSelector({ selected, onChange, currentPlan }: Props) {
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
