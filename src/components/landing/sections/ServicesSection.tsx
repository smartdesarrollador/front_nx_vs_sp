import {
  Code,
  Globe,
  Star,
  Zap,
  Heart,
  Settings,
  Users,
  Mail,
  Phone,
  Camera,
  BookOpen,
  Briefcase,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SectionProps } from '../PublicLandingView';

interface ServiceItem {
  icon?: string;
  title: string;
  description?: string;
}

interface ServicesContent {
  title?: string;
  items?: ServiceItem[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  code: Code,
  globe: Globe,
  star: Star,
  zap: Zap,
  heart: Heart,
  settings: Settings,
  users: Users,
  mail: Mail,
  phone: Phone,
  camera: Camera,
  book: BookOpen,
  briefcase: Briefcase,
};

export function ServicesSection({ content }: SectionProps) {
  const { title, items = [] } = content as ServicesContent;

  return (
    <section id="services" className="max-w-5xl mx-auto px-4 py-16">
      {title && (
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          {title}
        </h2>
      )}
      {items.length === 0 ? (
        <p className="text-center text-gray-400">
          No hay servicios configurados
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const IconComp =
              (item.icon && ICON_MAP[item.icon.toLowerCase()]) || Star;
            return (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                  <IconComp className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
