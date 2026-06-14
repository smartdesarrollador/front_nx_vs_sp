import type { CVSkill } from '@/types/digital';

export type SkillVariant = 'pills' | 'bars' | 'dots';

interface Props {
  skills: (CVSkill | string)[];
  title: string;
  variant?: SkillVariant;
}

const LEVEL_PERCENT: Record<CVSkill['level'], number> = {
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  expert: 100,
};

const LEVEL_BAR_COLOR: Record<CVSkill['level'], string> = {
  beginner: 'bg-gray-400',
  intermediate: 'bg-yellow-400',
  advanced: 'bg-blue-500',
  expert: 'bg-green-500',
};

const LEVEL_DOT: Record<CVSkill['level'], string> = {
  beginner: 'bg-gray-400',
  intermediate: 'bg-yellow-400',
  advanced: 'bg-blue-500',
  expert: 'bg-green-500',
};

const LEVEL_LABEL: Record<CVSkill['level'], string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
  expert: 'Experto',
};

function normalize(s: CVSkill | string): CVSkill {
  if (typeof s === 'string') return { name: s, level: 'intermediate', category: '' };
  return s;
}

export function CVSkillsSection({ skills, title, variant = 'pills' }: Props) {
  if (!skills.length) return null;

  const normalized = skills.map(normalize);

  // Group by category if any skill has one
  const hasCategories = normalized.some((s) => s.category);
  const grouped = hasCategories
    ? normalized.reduce<Record<string, CVSkill[]>>((acc, s) => {
        const key = s.category || 'Otras';
        acc[key] = [...(acc[key] ?? []), s];
        return acc;
      }, {})
    : { '': normalized };

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
        {title}
      </h2>

      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat} className="mb-3 last:mb-0">
          {cat && hasCategories && (
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
              {cat}
            </p>
          )}

          {variant === 'bars' && (
            <div className="space-y-2">
              {items.map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
                    <span className="text-gray-400">{LEVEL_LABEL[skill.level]}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className={`h-1.5 rounded-full ${LEVEL_BAR_COLOR[skill.level]}`}
                      style={{ width: `${LEVEL_PERCENT[skill.level]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {variant === 'dots' && (
            <div className="flex flex-wrap gap-2">
              {items.map((skill, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  <span className={`h-2 w-2 rounded-full ${LEVEL_DOT[skill.level]}`} />
                  {skill.name}
                </span>
              ))}
            </div>
          )}

          {variant === 'pills' && (
            <div className="flex flex-wrap gap-2">
              {items.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
