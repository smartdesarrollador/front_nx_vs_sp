import type { PublicProfile, LandingTemplate, LandingSectionType } from '@/types/digital';
import type { ComponentType } from 'react';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { StatsSection } from './sections/StatsSection';
import { ContactSection } from './sections/ContactSection';

export interface SectionProps {
  content: Record<string, unknown>;
  templateType: LandingTemplate['template_type'];
}

export interface ContactSectionProps extends SectionProps {
  enableContactForm: boolean;
  contactEmail: string;
}

const SECTION_MAP: Partial<Record<LandingSectionType, ComponentType<SectionProps>>> = {
  hero: HeroSection,
  about: AboutSection,
  services: ServicesSection,
  testimonials: TestimonialsSection,
  stats: StatsSection,
};

interface Props {
  profile: PublicProfile;
  landing: LandingTemplate;
}

export function PublicLandingView({ profile: _profile, landing }: Props) {
  return (
    <div>
      {landing.sections.map((section, index) => {
        if (section.type === 'contact') {
          return (
            <ContactSection
              key={index}
              content={section.content}
              templateType={landing.template_type}
              enableContactForm={landing.enable_contact_form}
              contactEmail={landing.contact_email}
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
          />
        );
      })}
    </div>
  );
}
