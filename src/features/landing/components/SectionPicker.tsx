'use client';
import { X, Layout, User, Briefcase, Quote, BarChart2, Mail, HelpCircle, Zap, type LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { LandingSectionType } from '@/types/digital';
import { SECTION_META } from '../types';

interface Props {
  isOpen: boolean;
  existingSectionTypes: LandingSectionType[];
  onAdd: (type: LandingSectionType) => void;
  onClose: () => void;
}

const SECTION_TYPES: LandingSectionType[] = [
  'hero',
  'about',
  'services',
  'testimonials',
  'stats',
  'contact',
  'faq',
  'features',
];

type LucideIcon = ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;

const ICON_MAP: Record<string, LucideIcon> = {
  layout: Layout,
  user: User,
  briefcase: Briefcase,
  quote: Quote,
  'bar-chart': BarChart2,
  mail: Mail,
  'help-circle': HelpCircle,
  zap: Zap,
};

export function SectionPicker({ isOpen, existingSectionTypes, onAdd, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Añadir sección
          </h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {SECTION_TYPES.map((type) => {
            const meta = SECTION_META[type];
            const isHeroDisabled =
              type === 'hero' && existingSectionTypes.includes('hero');
            const Icon = ICON_MAP[meta.icon] ?? Layout;

            return (
              <button
                key={type}
                type="button"
                disabled={isHeroDisabled}
                onClick={() => {
                  onAdd(type);
                  onClose();
                }}
                className={`flex items-start gap-3 rounded-xl border p-3 text-left transition-all ${
                  isHeroDisabled
                    ? 'opacity-40 cursor-not-allowed border-gray-200 dark:border-gray-700'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0 rounded-lg bg-blue-100 dark:bg-blue-900/30 p-2">
                  <Icon size={16} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {meta.label}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {meta.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
