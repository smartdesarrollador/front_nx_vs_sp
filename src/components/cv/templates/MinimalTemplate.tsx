import type { TemplateProps } from './ClassicTemplate';
import { CVExperienceSection } from '../sections/CVExperienceSection';
import { CVEducationSection } from '../sections/CVEducationSection';
import { CVSkillsSection } from '../sections/CVSkillsSection';
import { CVLanguagesSection } from '../sections/CVLanguagesSection';

export function MinimalTemplate({ profile, cv, labels, email, phone }: TemplateProps) {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden p-8 md:p-12">
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 pb-6 border-b border-gray-200 dark:border-gray-700 mb-8">
        <div>
          <h1 className="text-3xl font-light tracking-wide text-gray-900 dark:text-white">
            {profile.display_name}
          </h1>
          {profile.title && (
            <p className="text-gray-500 dark:text-gray-400 mt-1">{profile.title}</p>
          )}
        </div>
        {cv.show_contact && (email || phone) && (
          <div className="text-sm text-gray-500 dark:text-gray-400 text-right flex flex-col gap-0.5">
            {email && <span>{email}</span>}
            {phone && <span>{phone}</span>}
          </div>
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
                {cv.skills.map((skill, i) => (
                  <span key={i} className="text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                    {skill}
                  </span>
                ))}
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
    </div>
  );
}
