import type { CVEducation } from '@/types/digital';

interface Props {
  education: CVEducation[];
  presentLabel: string;
  title: string;
}

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
}

export function CVEducationSection({ education, presentLabel, title }: Props) {
  if (!education.length) return null;
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        {title}
      </h2>
      <div className="space-y-4">
        {education.map((edu, i) => (
          <div key={i} className="relative pl-4 border-l-2 border-gray-200 dark:border-gray-700">
            <p className="font-semibold text-gray-900 dark:text-white">
              {edu.degree}{edu.field ? ` — ${edu.field}` : ''}
            </p>
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{edu.institution}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {formatDate(edu.start_date)} — {edu.end_date ? formatDate(edu.end_date) : presentLabel}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
