import Image from 'next/image';
import type { PublicProfile, CVDocument } from '@/types/digital';
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
    present: string;
    contact: string;
  };
  email?: string;
  phone?: string;
}

export function ClassicTemplate({ profile, cv, labels, email, phone }: TemplateProps) {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-[280px_1fr] min-h-[600px]">
      {/* Sidebar */}
      <aside className="bg-gray-50 dark:bg-gray-800 p-6 flex flex-col gap-6">
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
          <h1 className="text-xl font-bold text-gray-900 dark:text-white text-center md:text-left">
            {profile.display_name}
          </h1>
          {profile.title && (
            <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-1 text-center md:text-left">
              {profile.title}
            </p>
          )}
        </div>
        <CVContactSection
          profile={profile}
          showContact={cv.show_contact}
          title={labels.contact}
          email={email}
          phone={phone}
        />
        <CVSkillsSection skills={cv.skills} title={labels.skills} />
        <CVLanguagesSection languages={cv.languages} title={labels.languages} />
      </aside>

      {/* Main content */}
      <main className="p-6 md:p-8 flex flex-col gap-8">
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
        {cv.certifications.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              {labels.certifications}
            </h2>
            <div className="space-y-2">
              {cv.certifications.map((cert, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-primary-500 mt-0.5">•</span>
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
      </main>
    </div>
  );
}
