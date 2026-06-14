import { ExternalLink } from 'lucide-react';
import type { CVProject, CVVolunteer, CVAward } from '@/types/digital';
import type { TemplateProps } from './ClassicTemplate';
import { CVSkillsSection } from '../sections/CVSkillsSection';
import { CVLanguagesSection } from '../sections/CVLanguagesSection';

const LEVEL_LABEL: Record<string, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
  expert: 'Experto',
};

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  if (!year) return dateStr;
  if (!month) return year;
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
}

export function MinimalTemplate({ profile, cv, labels, email, phone }: TemplateProps) {
  const projects = cv.projects ?? [];
  const volunteer = cv.volunteer ?? [];
  const awards = cv.awards ?? [];

  const contactParts = [
    cv.show_contact && email,
    cv.show_contact && phone,
    cv.location,
    cv.website_url ? cv.website_url.replace(/^https?:\/\//, '') : null,
    cv.linkedin_url ? 'LinkedIn' : null,
    cv.github_url ? 'GitHub' : null,
  ].filter(Boolean) as string[];

  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden p-8 md:p-12">
      {/* Header row */}
      <div className="pb-6 border-b border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
          <div>
            <h1 className="text-3xl font-light tracking-wide text-gray-900 dark:text-white">
              {profile.display_name}
            </h1>
            {(cv.headline || profile.title) && (
              <p className="text-gray-500 dark:text-gray-400 font-light mt-1">{cv.headline || profile.title}</p>
            )}
          </div>
        </div>
        {contactParts.length > 0 && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 flex flex-wrap gap-x-2 gap-y-0.5">
            {contactParts.map((part, i) => (
              <span key={i}>
                {i > 0 && <span className="mr-2">·</span>}
                {part}
              </span>
            ))}
            {cv.linkedin_url && (
              <a href={cv.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-0.5 hover:text-gray-600 transition-colors">
                LinkedIn <ExternalLink size={9} />
              </a>
            )}
            {cv.github_url && (
              <a href={cv.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-0.5 hover:text-gray-600 transition-colors">
                GitHub <ExternalLink size={9} />
              </a>
            )}
          </p>
        )}
      </div>

      {/* Summary */}
      {cv.professional_summary && (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
            {labels.summary}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{cv.professional_summary}</p>
        </section>
      )}

      {/* Experience */}
      {cv.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 pb-1 border-b border-gray-200 dark:border-gray-700">
            {labels.experience}
          </h2>
          <div className="space-y-5">
            {cv.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{exp.role}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{exp.company}</p>
                  </div>
                  <p className="text-xs text-gray-400 whitespace-nowrap">
                    {exp.start_date} — {exp.end_date ?? labels.present}
                  </p>
                </div>
                {exp.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1.5 leading-relaxed">{exp.description}</p>
                )}
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="mt-1.5 space-y-0.5">
                    {exp.achievements.map((a, j) => (
                      <li key={j} className="text-sm text-gray-500 dark:text-gray-400">— {a}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education + Skills grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cv.education.length > 0 && (
          <section>
            <h2 className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4 pb-1 border-b border-gray-200 dark:border-gray-700">
              {labels.education}
            </h2>
            <div className="space-y-3">
              {cv.education.map((edu, i) => (
                <div key={i}>
                  <p className="font-medium text-sm text-gray-900 dark:text-white">{edu.degree}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{edu.institution}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-col gap-6">
          {cv.skills.length > 0 && (
            <section>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 pb-1 border-b border-gray-200 dark:border-gray-700">
                {labels.skills}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {cv.skills.map((skill, i) => {
                  const s = typeof skill === 'string' ? skill : skill.name;
                  const level = typeof skill === 'string' ? null : skill.level;
                  return (
                    <span key={i} className="text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                      {s}{level ? ` (${LEVEL_LABEL[level] ?? level})` : ''}
                    </span>
                  );
                })}
              </div>
            </section>
          )}
          {cv.languages.length > 0 && (
            <section>
              <h2 className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 pb-1 border-b border-gray-200 dark:border-gray-700">
                {labels.languages}
              </h2>
              <div className="space-y-1">
                {cv.languages.map((lang, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-800 dark:text-gray-200">{lang.name}</span>
                    <span className="text-gray-400 text-xs">{lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Certifications */}
      {cv.certifications.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 pb-1 border-b border-gray-200 dark:border-gray-700">
            {labels.certifications}
          </h2>
          <div className="space-y-1">
            {cv.certifications.map((cert, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-800 dark:text-gray-200">{cert.name}</span>
                <span className="text-gray-400 text-xs">{cert.issuer}{cert.date ? ` · ${cert.date}` : ''}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 pb-1 border-b border-gray-200 dark:border-gray-700">
            {labels.projects ?? 'Proyectos'}
          </h2>
          <div className="space-y-2">
            {projects.map((p: CVProject, i: number) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-gray-400 mt-0.5">—</span>
                <div>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{p.name}</span>
                  {p.year && <span className="text-gray-400 text-xs ml-1.5">{p.year}</span>}
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="ml-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <ExternalLink size={10} className="inline" />
                    </a>
                  )}
                  {p.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Volunteer */}
      {volunteer.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 pb-1 border-b border-gray-200 dark:border-gray-700">
            {labels.volunteer ?? 'Voluntariado'}
          </h2>
          <div className="space-y-2">
            {volunteer.map((v: CVVolunteer, i: number) => (
              <div key={i} className="flex items-start justify-between gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{v.role}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{v.org}</p>
                </div>
                <p className="text-xs text-gray-400 whitespace-nowrap">
                  {v.start_date} — {v.end_date ?? labels.present}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Awards */}
      {awards.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 pb-1 border-b border-gray-200 dark:border-gray-700">
            {labels.awards ?? 'Premios y Reconocimientos'}
          </h2>
          <div className="space-y-1">
            {awards.map((a: CVAward, i: number) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-800 dark:text-gray-200">{a.title}</span>
                <span className="text-gray-400 text-xs">{a.issuer}{a.date ? ` · ${a.date}` : ''}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
