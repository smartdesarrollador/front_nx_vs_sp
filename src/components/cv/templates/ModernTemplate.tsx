import Image from 'next/image';
import { MapPin, Globe, ExternalLink } from 'lucide-react';
import type { CVProject, CVVolunteer, CVAward } from '@/types/digital';
import type { TemplateProps } from './ClassicTemplate';
import { CV_STYLE_PRESET_TOKENS } from '@/features/cv/types';
import { CVExperienceSection } from '../sections/CVExperienceSection';
import { CVEducationSection } from '../sections/CVEducationSection';
import { CVSkillsSection } from '../sections/CVSkillsSection';
import { CVLanguagesSection } from '../sections/CVLanguagesSection';
import { CVContactSection } from '../sections/CVContactSection';

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  if (!year) return dateStr;
  if (!month) return year;
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
}

export function ModernTemplate({ profile, cv, labels, email, phone }: TemplateProps) {
  const projects = cv.projects ?? [];
  const volunteer = cv.volunteer ?? [];
  const awards = cv.awards ?? [];
  const styleTokens = CV_STYLE_PRESET_TOKENS[cv.style_preset ?? 'modern'];

  const gradientStyle = cv.accent_color
    ? { background: `linear-gradient(to right, ${cv.accent_color}, ${cv.accent_color}cc)` }
    : undefined;

  return (
    <div
      className={`bg-white dark:bg-gray-900 overflow-hidden ${styleTokens.radiusCard} ${styleTokens.shadowCard}`}
      style={cv.theme_colors?.background ? { backgroundColor: cv.theme_colors.background } : undefined}
    >
      {/* Header with gradient */}
      <header
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8"
        style={gradientStyle}
      >
        <div className="flex items-center gap-6">
          {cv.show_photo && profile.avatar_url && (
            <Image
              src={profile.avatar_url}
              alt={profile.display_name}
              width={100}
              height={100}
              className="rounded-full object-cover border-4 border-white/30 shadow-lg flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <h1 className={`text-3xl ${styleTokens.headingFont} ${styleTokens.headingWeight} ${styleTokens.headingTracking}`}>{profile.display_name}</h1>
            {(cv.headline || profile.title) && (
              <p className="text-white/90 text-lg mt-1 italic">{cv.headline || profile.title}</p>
            )}
            {cv.show_contact && (email || phone) && (
              <div className="flex gap-4 mt-2 text-white/90 text-sm">
                {email && <span>{email}</span>}
                {phone && <span>{phone}</span>}
              </div>
            )}
            {/* Location + Social */}
            <div className="flex flex-wrap gap-3 mt-2">
              {cv.location && (
                <span className="flex items-center gap-1 text-white/90 text-xs">
                  <MapPin size={11} /> {cv.location}
                </span>
              )}
              {cv.linkedin_url && (
                <a href={cv.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-white/90 text-xs hover:text-white transition-colors">
                  <ExternalLink size={11} /> LinkedIn
                </a>
              )}
              {cv.github_url && (
                <a href={cv.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-white/90 text-xs hover:text-white transition-colors">
                  <ExternalLink size={11} /> GitHub
                </a>
              )}
              {cv.website_url && (
                <a href={cv.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-white/90 text-xs hover:text-white transition-colors">
                  <Globe size={11} /> {cv.website_url.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className={`p-8 flex flex-col ${styleTokens.spacingSection}`}>
        {cv.professional_summary && (
          <section>
            <h2 className={`text-lg mb-3 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${styleTokens.headingFont} ${styleTokens.headingWeight} ${styleTokens.headingTracking}`}>
              {labels.summary}
            </h2>
            <p className={`text-gray-600 dark:text-gray-300 ${styleTokens.bodyLeading}`}>{cv.professional_summary}</p>
          </section>
        )}
        <CVExperienceSection
          experience={cv.experience}
          presentLabel={labels.present}
          title={labels.experience}
          styleTokens={styleTokens}
        />
        <CVEducationSection
          education={cv.education}
          presentLabel={labels.present}
          title={labels.education}
          styleTokens={styleTokens}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CVSkillsSection skills={cv.skills} title={labels.skills} variant="dots" styleTokens={styleTokens} />
          <CVLanguagesSection languages={cv.languages} title={labels.languages} styleTokens={styleTokens} />
        </div>

        {cv.certifications.length > 0 && (
          <section>
            <h2 className={`text-lg mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${styleTokens.headingFont} ${styleTokens.headingWeight} ${styleTokens.headingTracking}`}>
              {labels.certifications}
            </h2>
            <div className="space-y-2">
              {cv.certifications.map((cert, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-0.5">•</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{cert.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {cert.issuer}{cert.date ? ` · ${cert.date}` : ''}
                      {cert.credential_id ? ` · ID: ${cert.credential_id}` : ''}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className={`text-lg mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${styleTokens.headingFont} ${styleTokens.headingWeight} ${styleTokens.headingTracking}`}>
              {labels.projects ?? 'Proyectos'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((p: CVProject, i: number) => (
                <div key={i} className={`border border-gray-200 dark:border-gray-700 p-3 ${styleTokens.radiusCard}`}>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</p>
                    {p.year && <span className="text-xs text-gray-400">{p.year}</span>}
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="ml-auto text-indigo-500 hover:text-indigo-600">
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                  {p.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{p.description}</p>}
                  {p.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {p.technologies.map((t, j) => (
                        <span key={j} className="text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {volunteer.length > 0 && (
          <section>
            <h2 className={`text-lg mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${styleTokens.headingFont} ${styleTokens.headingWeight} ${styleTokens.headingTracking}`}>
              {labels.volunteer ?? 'Voluntariado'}
            </h2>
            <div className="space-y-3">
              {volunteer.map((v: CVVolunteer, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-0.5">♥</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{v.role}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {v.org} · {v.start_date ? formatDate(v.start_date) : ''} — {v.end_date ? formatDate(v.end_date) : labels.present}
                    </p>
                    {v.description && <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{v.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {awards.length > 0 && (
          <section>
            <h2 className={`text-lg mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${styleTokens.headingFont} ${styleTokens.headingWeight} ${styleTokens.headingTracking}`}>
              {labels.awards ?? 'Premios y Reconocimientos'}
            </h2>
            <div className="space-y-2">
              {awards.map((a: CVAward, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">★</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{a.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {a.issuer}{a.date ? ` · ${a.date}` : ''}
                    </p>
                    {a.description && <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{a.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
