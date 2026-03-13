import { render, screen } from '@testing-library/react';
import { PublicLandingView } from '@/components/landing/PublicLandingView';
import type { PublicProfile, LandingTemplate } from '@/types/digital';

// Mock child section components to avoid complex DOM assertions
jest.mock('@/components/landing/sections/HeroSection', () => ({
  HeroSection: ({ content }: { content: Record<string, unknown> }) => (
    <div data-testid="hero-section">{content.headline as string}</div>
  ),
}));
jest.mock('@/components/landing/sections/AboutSection', () => ({
  AboutSection: () => <div data-testid="about-section">About</div>,
}));
jest.mock('@/components/landing/sections/ServicesSection', () => ({
  ServicesSection: () => <div data-testid="services-section">Services</div>,
}));
jest.mock('@/components/landing/sections/TestimonialsSection', () => ({
  TestimonialsSection: () => <div data-testid="testimonials-section">Testimonials</div>,
}));
jest.mock('@/components/landing/sections/StatsSection', () => ({
  StatsSection: () => <div data-testid="stats-section">Stats</div>,
}));
jest.mock('@/components/landing/sections/ContactSection', () => ({
  ContactSection: ({ enableContactForm }: { enableContactForm: boolean }) => (
    <div data-testid="contact-section" data-form={String(enableContactForm)}>Contact</div>
  ),
}));

const mockProfile: PublicProfile = {
  username: 'testuser',
  display_name: 'Test User',
  title: 'Developer',
  bio: 'Bio',
  avatar_url: '',
  is_public: true,
  meta_title: '',
  meta_description: '',
  og_image_url: '',
};

const buildLanding = (overrides: Partial<LandingTemplate> = {}): LandingTemplate => ({
  template_type: 'basic',
  sections: [],
  contact_email: 'test@example.com',
  enable_contact_form: true,
  custom_css: '',
  ga_tracking_id: '',
  ...overrides,
});

describe('PublicLandingView', () => {
  it('renders hero section when present', () => {
    const landing = buildLanding({
      sections: [{ type: 'hero', content: { headline: 'Hello World' } }],
    });
    render(<PublicLandingView profile={mockProfile} landing={landing} />);
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders about section when present', () => {
    const landing = buildLanding({
      sections: [{ type: 'about', content: {} }],
    });
    render(<PublicLandingView profile={mockProfile} landing={landing} />);
    expect(screen.getByTestId('about-section')).toBeInTheDocument();
  });

  it('renders services section when present', () => {
    const landing = buildLanding({
      sections: [{ type: 'services', content: {} }],
    });
    render(<PublicLandingView profile={mockProfile} landing={landing} />);
    expect(screen.getByTestId('services-section')).toBeInTheDocument();
  });

  it('renders contact section with enableContactForm prop', () => {
    const landing = buildLanding({
      sections: [{ type: 'contact', content: {} }],
      enable_contact_form: true,
    });
    render(<PublicLandingView profile={mockProfile} landing={landing} />);
    const contactSection = screen.getByTestId('contact-section');
    expect(contactSection).toBeInTheDocument();
    expect(contactSection.getAttribute('data-form')).toBe('true');
  });

  it('renders multiple sections in order', () => {
    const landing = buildLanding({
      sections: [
        { type: 'hero', content: { headline: 'Hero' } },
        { type: 'about', content: {} },
        { type: 'services', content: {} },
      ],
    });
    render(<PublicLandingView profile={mockProfile} landing={landing} />);
    expect(screen.getByTestId('hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('about-section')).toBeInTheDocument();
    expect(screen.getByTestId('services-section')).toBeInTheDocument();
  });

  it('renders nothing for unknown section type', () => {
    const landing = buildLanding({
      // @ts-expect-error testing unknown type
      sections: [{ type: 'unknown_type', content: {} }],
    });
    const { container } = render(<PublicLandingView profile={mockProfile} landing={landing} />);
    // The outer div renders but no inner section content
    expect(container.querySelector('[data-testid]')).toBeNull();
  });

  it('renders empty when no sections', () => {
    const landing = buildLanding({ sections: [] });
    const { container } = render(<PublicLandingView profile={mockProfile} landing={landing} />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.querySelector('[data-testid]')).toBeNull();
  });
});
