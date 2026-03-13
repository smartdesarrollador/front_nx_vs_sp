interface Props {
  languages: { name: string; level: string }[];
  title: string;
}

const LEVEL_COLORS: Record<string, string> = {
  native: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  fluent: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  basic: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
};

export function CVLanguagesSection({ languages, title }: Props) {
  if (!languages.length) return null;
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
        {title}
      </h2>
      <div className="space-y-2">
        {languages.map((lang, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-sm text-gray-800 dark:text-gray-200">{lang.name}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[lang.level] ?? LEVEL_COLORS.basic}`}
            >
              {lang.level}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
