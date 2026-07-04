import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata, Viewport } from 'next';
import { getPublicCV } from '@/lib/publicApi';
import { buildCVPersonJsonLd } from '@/lib/seo';
import { CVNav } from '@/components/cv/CVNav';
import { PrintButton } from '@/components/cv/PrintButton';
import { PwaInstallRegister } from '@/components/shared/PwaInstallRegister';
import { ClassicTemplate } from '@/components/cv/templates/ClassicTemplate';
import { ModernTemplate } from '@/components/cv/templates/ModernTemplate';
import { MinimalTemplate } from '@/components/cv/templates/MinimalTemplate';
import type { TemplateProps } from '@/components/cv/templates/ClassicTemplate';
import type { ComponentType } from 'react';

interface Props {
  params: Promise<{ locale: string; username: string }>;
}

const TEMPLATE_MAP: Record<string, ComponentType<TemplateProps>> = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, username } = await params;
  const data = await getPublicCV(username);
  if (!data) return { title: 'CV no encontrado' };
  const { profile } = data;
  return {
    title: `CV de ${profile.display_name} — Vista Digital`,
    description: profile.meta_description || profile.bio,
    openGraph: {
      title: `CV de ${profile.display_name}`,
      description: profile.meta_description || profile.bio,
      images: profile.og_image_url ? [profile.og_image_url] : [],
    },
    manifest: `/${locale}/cv/${username}/manifest`,
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: profile.display_name,
    },
  };
}

export async function generateViewport({ params }: Props): Promise<Viewport> {
  const { username } = await params;
  const data = await getPublicCV(username);

  return {
    themeColor: data?.cv?.accent_color || '#3B82F6',
  };
}

export default async function CVPage({ params }: Props) {
  const { locale, username } = await params;
  const t = await getTranslations('cv');
  const data = await getPublicCV(username);

  if (!data || !data.cv || data.cv.is_published === false) notFound();

  const { profile, cv } = data;
  const Template = TEMPLATE_MAP[cv.template_type] ?? ClassicTemplate;
  const jsonLd = buildCVPersonJsonLd(profile, cv);

  const labels = {
    summary: t('summary'),
    experience: t('experience'),
    education: t('education'),
    skills: t('skills'),
    languages: t('languages'),
    certifications: t('certifications'),
    projects: 'Proyectos',
    volunteer: 'Voluntariado',
    awards: 'Premios y Reconocimientos',
    present: t('present'),
    contact: t('contact'),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <style>{`
        @media print {
          nav, footer, button { display: none !important; }
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>

      <PwaInstallRegister scope={`/${locale}/cv/${username}`} />
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
        <CVNav displayName={profile.display_name} locale={locale} />

        <main className="flex-1 pt-16">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="flex justify-end mb-4 print:hidden">
              <PrintButton label={t('print')} loadingLabel={t('printing')} />
            </div>
            <Template profile={profile} cv={cv} labels={labels} />
          </div>
        </main>

        <footer className="text-center py-6 text-sm text-gray-400 border-t border-gray-100 dark:border-gray-800 print:hidden">
          <a
            href="https://digisider.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            Digisider
          </a>
        </footer>
      </div>
    </>
  );
}
