import Image from 'next/image';
import { MapPin, Globe, ExternalLink } from 'lucide-react';
import type { CVProject, CVVolunteer, CVAward } from '@/types/digital';
import type { TemplateProps } from './ClassicTemplate';
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

  const gradientStyle = cv.accent_color
    ? { background: `linear-gradient(to right, ${cv.accent_color}, ${cv.accent_color}cc)` }
    : undefined;

  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden">
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
            <h1 className="text-3xl font-bold">{profile.display_name}</h1>
            {(cv.headline || profile.title) && (
              <p className="text-blue-100 text-lg mt-1 italic">{cv.headline || profile.title}</p>
            )}
            {cv.show_contact && (email || phone) && (
              <div className="flex gap-4 mt-2 text-blue-100 text-sm">
                {email && <span>{email}</span>}
                {phone && <span>{phone}</span>}
              </div>
            )}
            {/* Location + Social */}
            <div className="flex flex-wrap gap-3 mt-2">
              {cv.location && (
                <span className="flex items-center gap-1 text-blue-100 text-xs">
                  <MapPin size={11} /> {cv.location}
                </span>
              )}
              {cv.linkedin_url && (
                <a href={cv.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-100 text-xs hover:text-white transition-colors">
                  <ExternalLink size={11} /> LinkedIn
                </a>
              )}
              {cv.github_url && (
                <a href={cv.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-100 text-xs hover:text-white transition-colors">
                  <ExternalLink size={11} /> GitHub
                </a>
              )}
              {cv.website_url && (
                <a href={cv.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-100 text-xs hover:text-white transition-colors">
                  <Globe size={11} /> {cv.website_url.replace(/^https?:\/\//, '')}
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-8 flex flex-col gap-8">
        {cv.professional_summary && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
              {labels.summary}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{cv.professional_summary}</p>
          </section>
        )}
        <CVExperienceSection
          experience={cv.experience}
          presentLabel={labels.present}
          title={labels.experience}
        />
        <CVEducationSection
          education={cv.education}
          presentLabel={labels.present}
          title={labels.education}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CVSkillsSection skills={cv.skills} title={labels.skills} variant="dots" />
          <CVLanguagesSection languages={cv.languages} title={labels.languages} />
        </div>

        {cv.certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
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
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              {labels.projects ?? 'Proyectos'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((p: CVProject, i: number) => (
                <div key={i} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
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
                        <span key={j} className="text-xs bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded">{t}</span>
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
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
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
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
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
