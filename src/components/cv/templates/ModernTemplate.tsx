import Image from 'next/image';
import type { PublicProfile, CVDocument } from '@/types/digital';
import type { TemplateProps } from './ClassicTemplate';
import { CVExperienceSection } from '../sections/CVExperienceSection';
import { CVEducationSection } from '../sections/CVEducationSection';
import { CVSkillsSection } from '../sections/CVSkillsSection';
import { CVLanguagesSection } from '../sections/CVLanguagesSection';
import { CVContactSection } from '../sections/CVContactSection';

export function ModernTemplate({ profile, cv, labels, email, phone }: TemplateProps) {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden">
      {/* Header with gradient */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">
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
          <div>
            <h1 className="text-3xl font-bold">{profile.display_name}</h1>
            {profile.title && (
              <p className="text-blue-100 text-lg mt-1">{profile.title}</p>
            )}
            {cv.show_contact && (email || phone) && (
              <div className="flex gap-4 mt-2 text-blue-100 text-sm">
                {email && <span>{email}</span>}
                {phone && <span>{phone}</span>}
              </div>
            )}
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
          <CVSkillsSection skills={cv.skills} title={labels.skills} />
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
                    </p>
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
