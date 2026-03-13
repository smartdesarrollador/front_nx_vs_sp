import {
  Calendar,
  Briefcase,
  Users,
  Heart,
  Shield,
  Star,
  Award,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SectionProps } from '../PublicLandingView';

interface StatItem {
  icon?: string;
  value: string;
  label: string;
}

interface StatsContent {
  title?: string;
  items?: StatItem[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  calendar: Calendar,
  briefcase: Briefcase,
  users: Users,
  heart: Heart,
  shield: Shield,
  star: Star,
  award: Award,
};

function getStatsBg(templateType: string): string {
  switch (templateType) {
    case 'creative':
      return 'bg-gradient-to-r from-purple-600 to-blue-600 text-white';
    case 'corporate':
      return 'bg-gray-800 text-white';
    default:
      return 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white';
  }
}

function getGridCols(count: number): string {
  if (count <= 2) return 'grid-cols-2';
  if (count === 3) return 'grid-cols-3';
  return 'grid-cols-2 sm:grid-cols-4';
}

export function StatsSection({ content, templateType }: SectionProps) {
  const { title, items = [] } = content as StatsContent;
  const bgClass = getStatsBg(templateType);

  return (
    <section className={`py-16 px-4 ${bgClass}`}>
      <div className="max-w-5xl mx-auto">
        {title && (
          <h2 className="text-3xl font-bold mb-10 text-center">{title}</h2>
        )}
        <div className={`grid ${getGridCols(items.length)} gap-8`}>
          {items.map((item, i) => {
            const IconComp =
              (item.icon && ICON_MAP[item.icon.toLowerCase()]) || Star;
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-2"
              >
                <IconComp className="w-8 h-8 opacity-80" />
                <p className="text-3xl font-bold">{item.value}</p>
                <p className="text-sm opacity-75">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
