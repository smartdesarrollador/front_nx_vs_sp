import type { CVExperience } from '@/types/digital';
import type { CVStyleTokens } from '@/features/cv/types';

interface Props {
  experience: CVExperience[];
  presentLabel: string;
  title: string;
  styleTokens?: CVStyleTokens;
}

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  if (!year || !month) return dateStr;
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
}

const EMP_LABELS: Record<string, string> = {
  full_time: 'Tiempo completo',
  part_time: 'Tiempo parcial',
  freelance: 'Freelance',
  internship: 'Pasantía',
  contract: 'Contrato',
};

export function CVExperienceSection({ experience, presentLabel, title, styleTokens }: Props) {
  if (!experience.length) return null;
  return (
    <section>
      <h2 className={`text-lg mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${styleTokens?.headingFont ?? 'font-sans'} ${styleTokens?.headingWeight ?? 'font-semibold'} ${styleTokens?.headingTracking ?? ''}`}>
        {title}
      </h2>
      <div className="space-y-5">
        {experience.map((exp, i) => (
          <div key={i} className="relative pl-4 border-l-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-gray-900 dark:text-white">{exp.role}</p>
              {exp.employment_type && EMP_LABELS[exp.employment_type] && (
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded">
                  {EMP_LABELS[exp.employment_type]}
                </span>
              )}
            </div>
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{exp.company}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {exp.start_date ? formatDate(exp.start_date) : ''} — {exp.end_date ? formatDate(exp.end_date) : presentLabel}
            </p>
            {exp.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">{exp.description}</p>
            )}
            {exp.achievements && exp.achievements.length > 0 && (
              <ul className="mt-2 space-y-1">
                {exp.achievements.map((a, j) => (
                  <li key={j} className="flex items-start gap-1.5 text-sm text-gray-600 dark:text-gray-300">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                    {a}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
