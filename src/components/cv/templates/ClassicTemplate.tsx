import Image from 'next/image';
import { MapPin, Globe, ExternalLink } from 'lucide-react';
import type { PublicProfile, CVDocument, CVProject, CVVolunteer, CVAward } from '@/types/digital';
import { CV_STYLE_PRESET_TOKENS } from '@/features/cv/types';
import { CVExperienceSection } from '../sections/CVExperienceSection';
import { CVEducationSection } from '../sections/CVEducationSection';
import { CVSkillsSection } from '../sections/CVSkillsSection';
import { CVLanguagesSection } from '../sections/CVLanguagesSection';
import { CVContactSection } from '../sections/CVContactSection';

export interface TemplateProps {
  profile: PublicProfile;
  cv: CVDocument;
  labels: {
    summary: string;
    experience: string;
    education: string;
    skills: string;
    languages: string;
    certifications: string;
    projects?: string;
    volunteer?: string;
    awards?: string;
    present: string;
    contact: string;
  };
  email?: string;
  phone?: string;
}

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  if (!year) return dateStr;
  if (!month) return year;
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
}

export function ClassicTemplate({ profile, cv, labels, email, phone }: TemplateProps) {
  const accentStyle = cv.accent_color ? { borderColor: cv.accent_color } : {};
  const accentTextStyle = cv.accent_color ? { color: cv.accent_color } : {};
  const styleTokens = CV_STYLE_PRESET_TOKENS[cv.style_preset ?? 'modern'];

  const projects = cv.projects ?? [];
  const volunteer = cv.volunteer ?? [];
  const awards = cv.awards ?? [];

  return (
    <div
      className={`bg-white dark:bg-gray-900 overflow-hidden grid grid-cols-1 md:grid-cols-[280px_1fr] min-h-[600px] ${styleTokens.radiusCard} ${styleTokens.shadowCard}`}
      style={cv.theme_colors?.background ? { backgroundColor: cv.theme_colors.background } : undefined}
    >
      {/* Sidebar */}
      <aside
        className="bg-gray-50 dark:bg-gray-800 p-6 flex flex-col gap-6"
        style={cv.theme_colors?.sidebar_bg ? { backgroundColor: cv.theme_colors.sidebar_bg } : undefined}
      >
        {cv.show_photo && profile.avatar_url && (
          <div className="flex justify-center">
            <Image
              src={profile.avatar_url}
              alt={profile.display_name}
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-white dark:border-gray-700 shadow"
            />
          </div>
        )}
        <div>
          <h1 className={`text-xl text-gray-900 dark:text-white text-center md:text-left ${styleTokens.headingFont} ${styleTokens.headingWeight} ${styleTokens.headingTracking}`}>
            {profile.display_name}
          </h1>
          {(cv.headline || profile.title) && (
            <p className="text-sm font-medium mt-1 text-center md:text-left" style={cv.accent_color ? accentTextStyle : { color: 'var(--color-primary-600)' }}>
              {cv.headline || profile.title}
            </p>
          )}

          {/* Location + Social links */}
          <div className="mt-3 space-y-1.5">
            {cv.location && (
              <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                <MapPin size={12} className="shrink-0" />
                {cv.location}
              </div>
            )}
            {cv.website_url && (
              <a href={cv.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                <Globe size={12} className="shrink-0" />
                {cv.website_url.replace(/^https?:\/\//, '')}
              </a>
            )}
            {cv.linkedin_url && (
              <a href={cv.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                <ExternalLink size={12} className="shrink-0" />
                LinkedIn
              </a>
            )}
            {cv.github_url && (
              <a href={cv.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
                <ExternalLink size={12} className="shrink-0" />
                GitHub
              </a>
            )}
          </div>
        </div>

        <CVContactSection
          profile={profile}
          showContact={cv.show_contact}
          title={labels.contact}
          email={email}
          phone={phone}
          styleTokens={styleTokens}
        />
        <CVSkillsSection skills={cv.skills} title={labels.skills} variant="bars" styleTokens={styleTokens} />
        <CVLanguagesSection languages={cv.languages} title={labels.languages} styleTokens={styleTokens} />
      </aside>

      {/* Main content */}
      <main className={`p-6 md:p-8 flex flex-col ${styleTokens.spacingSection}`}>
        {cv.professional_summary && (
          <section>
            <h2 className={`text-lg mb-3 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${styleTokens.headingFont} ${styleTokens.headingWeight} ${styleTokens.headingTracking}`} style={accentStyle}>
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

        {cv.certifications.length > 0 && (
          <section>
            <h2 className={`text-lg mb-4 pb-2 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white ${styleTokens.headingFont} ${styleTokens.headingWeight} ${styleTokens.headingTracking}`}>
              {labels.certifications}
            </h2>
            <div className="space-y-2">
              {cv.certifications.map((cert, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-primary-500 mt-0.5" style={accentTextStyle}>•</span>
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
            <div className="space-y-3">
              {projects.map((p: CVProject, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-primary-500 mt-0.5" style={accentTextStyle}>▸</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</p>
                      {p.year && <span className="text-xs text-gray-400">{p.year}</span>}
                      {p.url && (
                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline">
                          Ver ↗
                        </a>
                      )}
                    </div>
                    {p.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.description}</p>}
                    {p.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {p.technologies.map((t, j) => (
                          <span key={j} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
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
                <div key={i} className="relative pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{v.role}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {v.org} · {v.start_date ? formatDate(v.start_date) : ''} — {v.end_date ? formatDate(v.end_date) : labels.present}
                  </p>
                  {v.description && <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{v.description}</p>}
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
                  <span className="text-yellow-500 mt-0.5">🏆</span>
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
      </main>
    </div>
  );
}
