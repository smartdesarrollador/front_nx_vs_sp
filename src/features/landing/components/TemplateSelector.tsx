'use client';
import { Lock } from 'lucide-react';
import type { LandingTemplateType } from '@/types/digital';
import type { Plan } from '@/data/featureGates';
import { isPlanHigherThan } from '@/data/featureGates';
import { TEMPLATE_META, TEMPLATE_PLAN_REQUIRED } from '../types';

interface Props {
  selected: LandingTemplateType;
  onChange: (t: LandingTemplateType) => void;
  currentPlan: Plan;
}

const TEMPLATES: LandingTemplateType[] = ['basic', 'corporate', 'creative', 'minimal'];

export function TemplateSelector({ selected, onChange, currentPlan }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
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
              onClick={() => !isLocked && onChange(tpl)}
              className={`relative rounded-xl border-2 p-3 text-left transition-all focus:outline-none ${
                isSelected
                  ? 'border-blue-600 shadow-md'
                  : isLocked
                    ? 'border-red-300 opacity-60 cursor-not-allowed'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-400'
              }`}
            >
              {/* Preview color block */}
              <div className={`h-24 rounded-lg mb-3 ${meta.previewClass}`} />

              {/* Locked badge */}
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
  );
}
