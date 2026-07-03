import type { PortfolioSkillsContent } from '@/types/digital';
import type { PortfolioStyleTokens } from '@/features/portfolio/types';

interface Props {
  skillsContent?: PortfolioSkillsContent;
  skills?: string[];
  styleTokens?: PortfolioStyleTokens;
}

export function PortfolioSkillsSection({ skillsContent, skills = [], styleTokens }: Props) {
  if (!skillsContent?.showSkills || skills.length === 0) {
    return null;
  }

  return (
    <section id="skills" className={`max-w-3xl mx-auto px-4 text-center scroll-mt-16 ${styleTokens?.spacingSection ?? 'py-12'}`}>
      <h2 className={`text-2xl text-gray-900 dark:text-white mb-6 ${styleTokens?.headingFont ?? 'font-sans'} ${styleTokens?.headingWeight ?? 'font-bold'} ${styleTokens?.headingTracking ?? ''}`}>
        {skillsContent.title || 'Habilidades'}
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
