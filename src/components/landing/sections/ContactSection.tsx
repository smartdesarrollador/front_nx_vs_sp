import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Instagram, Globe, Music2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ContactFormClient } from '../ContactFormClient';
import type { ContactSectionProps } from '../PublicLandingView';
import type { LandingSocialLinks } from '@/types/digital';

interface ContactContent {
  title?: string;
  email?: string;
  phone?: string;
  address?: string;
  showForm?: boolean;
}

const SOCIAL_ICONS: { key: keyof LandingSocialLinks; Icon: LucideIcon; label: string }[] = [
  { key: 'linkedin', Icon: Linkedin, label: 'LinkedIn' },
  { key: 'github', Icon: Github, label: 'GitHub' },
  { key: 'twitter', Icon: Twitter, label: 'Twitter / X' },
  { key: 'instagram', Icon: Instagram, label: 'Instagram' },
  { key: 'website', Icon: Globe, label: 'Sitio web' },
  { key: 'tiktok', Icon: Music2, label: 'TikTok' },
];

export function ContactSection({
  content,
  enableContactForm,
  contactEmail,
  socialLinks,
  styleTokens,
}: ContactSectionProps) {
  const { title, email, phone, address, showForm } = content as ContactContent;

  const activeSocials = socialLinks
    ? SOCIAL_ICONS.filter(({ key }) => socialLinks[key])
    : [];

  const contactInfo = (
    <div className="space-y-3">
      {email && (
        <a
          href={`mailto:${email}`}
          className={`flex items-center gap-3 p-4 bg-white dark:bg-gray-800 ${styleTokens.radiusCard} ${styleTokens.shadowCard} ${styleTokens.shadowCardHover} transition-shadow group`}
        >
          <Mail className="w-5 h-5 text-primary-600 flex-shrink-0" />
          <span className="text-gray-700 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {email}
          </span>
        </a>
      )}
      {phone && (
        <a
          href={`tel:${phone}`}
          className={`flex items-center gap-3 p-4 bg-white dark:bg-gray-800 ${styleTokens.radiusCard} ${styleTokens.shadowCard} ${styleTokens.shadowCardHover} transition-shadow group`}
        >
          <Phone className="w-5 h-5 text-primary-600 flex-shrink-0" />
          <span className="text-gray-700 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {phone}
          </span>
        </a>
      )}
      {address && (
        <div className={`flex items-start gap-3 p-4 bg-white dark:bg-gray-800 ${styleTokens.radiusCard} ${styleTokens.shadowCard}`}>
          <MapPin className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700 dark:text-gray-200">{address}</span>
        </div>
      )}

      {/* Redes sociales */}
      {activeSocials.length > 0 && (
        <div className="pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
            Síguenos en
          </p>
          <div className="grid grid-cols-3 gap-2">
            {activeSocials.map(({ key, Icon, label }) => (
              <a
                key={key}
                href={socialLinks![key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-300 dark:hover:border-primary-700 hover:text-primary-600 dark:hover:text-primary-400 transition-all text-xs font-medium"
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{label}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section id="contact" className={`max-w-5xl mx-auto px-4 ${styleTokens.spacingSection}`}>
      {title && (
        <h2 className={`text-3xl ${styleTokens.headingFont} ${styleTokens.headingWeight} ${styleTokens.headingTracking} text-gray-900 dark:text-white mb-10 text-center`}>
          {title}
        </h2>
      )}

      {showForm && enableContactForm ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>{contactInfo}</div>
          <div>
            <ContactFormClient contactEmail={contactEmail || email || ''} styleTokens={styleTokens} />
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto">
          {contactInfo}
        </div>
      )}
    </section>
  );
}
