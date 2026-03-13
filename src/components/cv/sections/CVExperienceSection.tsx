import type { CVExperience } from '@/types/digital';

interface Props {
  experience: CVExperience[];
  presentLabel: string;
  title: string;
}

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
}

export function CVExperienceSection({ experience, presentLabel, title }: Props) {
  if (!experience.length) return null;
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        {title}
      </h2>
      <div className="space-y-5">
        {experience.map((exp, i) => (
          <div key={i} className="relative pl-4 border-l-2 border-gray-200 dark:border-gray-700">
            <p className="font-semibold text-gray-900 dark:text-white">{exp.role}</p>
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{exp.company}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {formatDate(exp.start_date)} — {exp.end_date ? formatDate(exp.end_date) : presentLabel}
            </p>
            {exp.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{exp.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
