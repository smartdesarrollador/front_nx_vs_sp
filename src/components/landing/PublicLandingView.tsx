import type { PublicProfile, LandingTemplate, LandingSectionType, LandingSocialLinks } from '@/types/digital';
import type { ComponentType } from 'react';
import { HeroSection } from './sections/HeroSection';
import type { HeroSectionProps } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { StatsSection } from './sections/StatsSection';
import { ContactSection } from './sections/ContactSection';
import { FAQSection } from './sections/FAQSection';
import { FeaturesSection } from './sections/FeaturesSection';

export interface SectionProps {
  content: Record<string, unknown>;
  templateType: LandingTemplate['template_type'];
  profile?: PublicProfile;
  socialLinks?: LandingSocialLinks;
  accentColor?: string;
}

export interface ContactSectionProps extends SectionProps {
  enableContactForm: boolean;
  contactEmail: string;
}

const SECTION_MAP: Partial<Record<LandingSectionType, ComponentType<SectionProps>>> = {
  about: AboutSection,
  services: ServicesSection,
  testimonials: TestimonialsSection,
  stats: StatsSection,
  faq: FAQSection,
  features: FeaturesSection,
};

interface Props {
  profile: PublicProfile;
  landing: LandingTemplate;
}

export function PublicLandingView({ profile, landing }: Props) {
  const socialLinks = (landing.social_links ?? {}) as LandingSocialLinks;
  const accentColor = landing.accent_color || undefined;

  return (
    <div>
      {landing.sections.map((section, index) => {
        if (section.type === 'hero') {
          return (
            <HeroSection
              key={index}
              content={section.content}
              templateType={landing.template_type}
              profile={profile}
              socialLinks={socialLinks}
              accentColor={accentColor}
            />
          );
        }

        if (section.type === 'contact') {
          return (
            <ContactSection
              key={index}
              content={section.content}
              templateType={landing.template_type}
              enableContactForm={landing.enable_contact_form}
              contactEmail={landing.contact_email}
              socialLinks={socialLinks}
            />
          );
        }

        const Section = SECTION_MAP[section.type];
        if (!Section) return null;
        return (
          <Section
            key={index}
            content={section.content}
            templateType={landing.template_type}
            accentColor={accentColor}
          />
        );
      })}
    </div>
  );
}
