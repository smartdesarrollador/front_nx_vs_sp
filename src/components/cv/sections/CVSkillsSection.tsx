interface Props {
  skills: string[];
  title: string;
}

export function CVSkillsSection({ skills, title }: Props) {
  if (!skills.length) return null;
  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
        {title}
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
