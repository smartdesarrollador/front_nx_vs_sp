import Image from 'next/image';
import { ChevronDown, Linkedin, Github, Twitter, Instagram, Globe, Music2 } from 'lucide-react';
import type { PublicProfile, LandingSocialLinks, LandingTemplate } from '@/types/digital';
import type { SectionProps } from '../PublicLandingView';

interface HeroContent {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  alignment?: 'left' | 'center' | 'right';
  badge?: string;
}

const SOCIAL_ICONS = [
  { key: 'linkedin' as const, Icon: Linkedin },
  { key: 'github' as const, Icon: Github },
  { key: 'twitter' as const, Icon: Twitter },
  { key: 'instagram' as const, Icon: Instagram },
  { key: 'website' as const, Icon: Globe },
  { key: 'tiktok' as const, Icon: Music2 },
];

function getHeroBg(templateType: string): string {
  switch (templateType) {
    case 'creative':
      return 'bg-gradient-to-br from-purple-600 via-fuchsia-600 to-blue-600 text-white';
    case 'minimal':
      return 'bg-white border-b border-gray-200 text-gray-900';
    case 'corporate':
      return 'bg-gray-900 text-white';
    default:
      return 'bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white';
  }
}

export interface HeroSectionProps extends SectionProps {
  profile?: PublicProfile;
  socialLinks?: LandingSocialLinks;
  accentColor?: string;
}

export function HeroSection({ content, templateType, profile, socialLinks }: HeroSectionProps) {
  const {
    title,
    subtitle,
    ctaText,
    ctaUrl,
    alignment = 'center',
    badge,
  } = content as HeroContent;

  const bgClass = getHeroBg(templateType);
  const isLight = templateType === 'minimal';
  const alignClass = alignment === 'left' ? 'text-left' : alignment === 'right' ? 'text-right' : 'text-center';
  const itemsClass = alignment === 'left' ? 'items-start' : alignment === 'right' ? 'items-end' : 'items-center';

  const activeSocials = socialLinks
    ? SOCIAL_ICONS.filter(({ key }) => socialLinks[key])
    : [];

  const avatarUrl = profile?.avatar_url;
  const initials = profile?.display_name
    ? profile.display_name.substring(0, 2).toUpperCase()
    : '??';

  return (
    <section id="hero" className={`relative overflow-hidden py-32 px-4 ${bgClass}`}>
      {/* Blobs decorativos */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/3 pointer-events-none" />

      <div className={`relative max-w-4xl mx-auto flex flex-col gap-6 ${itemsClass} ${alignClass}`}>
        {/* Avatar */}
        {(avatarUrl || profile) && (
          <div className="mb-2">
            {avatarUrl ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
                <Image src={avatarUrl} alt={profile?.display_name ?? 'Avatar'} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full border-4 border-white/30 shadow-xl bg-white/20 flex items-center justify-center">
                <span className={`text-2xl font-bold ${isLight ? 'text-gray-700' : 'text-white'}`}>
                  {initials}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Badge */}
        {badge && (
          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm ${isLight ? 'bg-primary-100 text-primary-700' : 'bg-white/20 text-white'}`}>
            {badge}
          </span>
        )}

        {/* Título */}
        {title && (
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {title}
          </h1>
        )}

        {/* Subtítulo */}
        {subtitle && (
          <p className={`text-lg md:text-xl max-w-2xl leading-relaxed ${isLight ? 'text-gray-600' : 'opacity-85'}`}>
            {subtitle}
          </p>
        )}

        {/* CTA */}
        {ctaText && (
          <a
            href={ctaUrl || '#contact'}
            className={`inline-flex items-center px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${isLight ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-white text-primary-700 hover:bg-gray-50'}`}
          >
            {ctaText}
          </a>
        )}

        {/* Social links */}
        {activeSocials.length > 0 && (
          <div className="flex items-center gap-3 mt-2">
            {activeSocials.map(({ key, Icon }) => (
              <a
                key={key}
                href={socialLinks![key]}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all hover:-translate-y-0.5 ${isLight ? 'bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600' : 'bg-white/15 text-white/80 hover:bg-white/25 hover:text-white'}`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        )}

        {/* Scroll indicator */}
        <div className="mt-6 animate-bounce">
          <ChevronDown className={`w-6 h-6 ${isLight ? 'text-gray-400' : 'opacity-60'}`} />
        </div>
      </div>
    </section>
  );
}
