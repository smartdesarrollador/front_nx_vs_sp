import { Linkedin, Github, Twitter, Instagram, Globe, Music2 } from 'lucide-react';
import type { LandingSocialLinks } from '@/types/digital';

interface Props {
  displayName: string;
  username: string;
  socialLinks: LandingSocialLinks;
  locale: string;
  poweredByText?: string;
}

const SOCIAL_ICONS = [
  { key: 'linkedin' as const, Icon: Linkedin, label: 'LinkedIn' },
  { key: 'github' as const, Icon: Github, label: 'GitHub' },
  { key: 'twitter' as const, Icon: Twitter, label: 'Twitter / X' },
  { key: 'instagram' as const, Icon: Instagram, label: 'Instagram' },
  { key: 'website' as const, Icon: Globe, label: 'Sitio web' },
  { key: 'tiktok' as const, Icon: Music2, label: 'TikTok' },
];

export function PublicLandingFooter({ displayName, socialLinks, poweredByText }: Props) {
  const year = new Date().getFullYear();
  const activeSocials = SOCIAL_ICONS.filter(({ key }) => socialLinks?.[key]);

  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
          <div className="text-center sm:text-left">
            <p className="font-semibold text-gray-900 dark:text-white">{displayName}</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
              {poweredByText ?? (
                <>
                  Creado con{' '}
                  <span className="text-primary-600 dark:text-primary-400 font-medium">
                    Vista Digital
                  </span>
                </>
              )}
            </p>
          </div>

          {activeSocials.length > 0 && (
            <div className="flex items-center gap-3">
              {activeSocials.map(({ key, Icon, label }) => (
                <a
                  key={key}
                  href={socialLinks[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-primary-100 dark:hover:bg-primary-900/40 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400 dark:text-gray-500">
          <span>© {year} {displayName}. Todos los derechos reservados.</span>
          <a
            href="#hero"
            className="inline-flex items-center gap-1.5 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            ↑ Volver arriba
          </a>
        </div>
      </div>
    </footer>
  );
}
