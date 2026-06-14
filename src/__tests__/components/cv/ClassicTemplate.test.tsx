import { render, screen } from '@testing-library/react';
import { ClassicTemplate } from '@/components/cv/templates/ClassicTemplate';
import type { PublicProfile, CVDocument } from '@/types/digital';

// Mock child CV section components
jest.mock('@/components/cv/sections/CVExperienceSection', () => ({
  CVExperienceSection: ({ experience }: { experience: { company: string; role: string }[] }) => (
    <div data-testid="experience-section">
      {experience.map((e, i) => (
        <div key={i}>
          <span>{e.company}</span>
          <span>{e.role}</span>
        </div>
      ))}
    </div>
  ),
}));
jest.mock('@/components/cv/sections/CVEducationSection', () => ({
  CVEducationSection: ({ education }: { education: { institution: string }[] }) => (
    <div data-testid="education-section">
      {education.map((e, i) => <span key={i}>{e.institution}</span>)}
    </div>
  ),
}));
jest.mock('@/components/cv/sections/CVSkillsSection', () => ({
  CVSkillsSection: ({ skills }: { skills: Array<{ name: string } | string> }) => (
    <div data-testid="skills-section">
      {skills.map((s, i) => <span key={i}>{typeof s === 'string' ? s : s.name}</span>)}
    </div>
  ),
}));
jest.mock('@/components/cv/sections/CVLanguagesSection', () => ({
  CVLanguagesSection: ({ languages }: { languages: { name: string }[] }) => (
    <div data-testid="languages-section">
      {languages.map((l, i) => <span key={i}>{l.name}</span>)}
    </div>
  ),
}));
jest.mock('@/components/cv/sections/CVContactSection', () => ({
  CVContactSection: () => <div data-testid="contact-section" />,
}));

const mockProfile: PublicProfile = {
  username: 'johndoe',
  display_name: 'John Doe',
  title: 'Frontend Engineer',
  bio: 'Experienced developer',
  avatar_url: 'https://example.com/avatar.jpg',
  is_public: true,
  meta_title: '',
  meta_description: '',
  og_image_url: '',
};

const mockCV: CVDocument = {
  professional_summary: 'A great developer',
  experience: [
    { company: 'Acme Corp', role: 'Engineer', start_date: '2020-01', end_date: null, description: '' },
    { company: 'Beta Inc', role: 'Senior Engineer', start_date: '2022-01', end_date: null, description: '' },
  ],
  education: [
    { institution: 'MIT', degree: 'BS', field: 'Computer Science', start_date: '2015', end_date: '2019' },
  ],
  skills: [
    { name: 'React', level: 'expert' as const, category: 'Frontend' },
    { name: 'TypeScript', level: 'advanced' as const, category: 'Frontend' },
    { name: 'Node.js', level: 'intermediate' as const, category: 'Backend' },
  ],
  languages: [{ name: 'English', level: 'Native' }, { name: 'Spanish', level: 'B2' }],
  certifications: [{ name: 'AWS Certified', issuer: 'Amazon', date: '2023' }],
  template_type: 'classic',
  show_photo: false,
  show_contact: true,
};

const mockLabels = {
  summary: 'Summary',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  languages: 'Languages',
  certifications: 'Certifications',
  present: 'Present',
  contact: 'Contact',
};

describe('ClassicTemplate', () => {
  it('renders display_name', () => {
    render(<ClassicTemplate profile={mockProfile} cv={mockCV} labels={mockLabels} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<ClassicTemplate profile={mockProfile} cv={mockCV} labels={mockLabels} />);
    expect(screen.getByText('Frontend Engineer')).toBeInTheDocument();
  });

  it('renders experience company names', () => {
    render(<ClassicTemplate profile={mockProfile} cv={mockCV} labels={mockLabels} />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Beta Inc')).toBeInTheDocument();
  });

  it('renders education institution names', () => {
    render(<ClassicTemplate profile={mockProfile} cv={mockCV} labels={mockLabels} />);
    expect(screen.getByText('MIT')).toBeInTheDocument();
  });

  it('renders skills', () => {
    render(<ClassicTemplate profile={mockProfile} cv={mockCV} labels={mockLabels} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('does not render avatar when show_photo is false', () => {
    render(<ClassicTemplate profile={mockProfile} cv={mockCV} labels={mockLabels} />);
    expect(screen.queryByAltText('John Doe')).not.toBeInTheDocument();
  });

  it('renders avatar when show_photo is true and avatar_url is set', () => {
    const cvWithPhoto = { ...mockCV, show_photo: true };
    render(<ClassicTemplate profile={mockProfile} cv={cvWithPhoto} labels={mockLabels} />);
    expect(screen.getByAltText('John Doe')).toBeInTheDocument();
  });

  it('renders professional summary when present', () => {
    render(<ClassicTemplate profile={mockProfile} cv={mockCV} labels={mockLabels} />);
    expect(screen.getByText('A great developer')).toBeInTheDocument();
  });

  it('renders certifications', () => {
    render(<ClassicTemplate profile={mockProfile} cv={mockCV} labels={mockLabels} />);
    expect(screen.getByText('AWS Certified')).toBeInTheDocument();
    expect(screen.getByText(/Amazon/)).toBeInTheDocument();
  });
});
