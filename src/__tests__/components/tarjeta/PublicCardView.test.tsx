import { render, screen } from '@testing-library/react';
import { PublicCardView } from '@/components/tarjeta/PublicCardView';
import type { PublicProfile, DigitalCard } from '@/types/digital';

const mockProfile: PublicProfile = {
  username: 'johndoe',
  display_name: 'John Doe',
  title: 'Software Developer',
  bio: 'My bio text here',
  avatar_url: '',
  is_public: true,
  meta_title: '',
  meta_description: '',
  og_image_url: '',
};

const mockCard: DigitalCard = {
  email: 'john@example.com',
  phone: '+34 600 000 000',
  location: 'Madrid, Spain',
  linkedin_url: 'https://linkedin.com/in/johndoe',
  twitter_url: '',
  github_url: '',
  instagram_url: '',
  facebook_url: '',
  website_url: '',
  primary_color: '#3B82F6',
  background_color: '#FFFFFF',
  qr_code_url: '',
  specialties: [],
  years_experience: null,
};

describe('PublicCardView', () => {
  it('renders display_name', () => {
    render(<PublicCardView profile={mockProfile} card={mockCard} publicUrl="https://example.com/es/tarjeta/johndoe" />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<PublicCardView profile={mockProfile} card={mockCard} publicUrl="https://example.com/es/tarjeta/johndoe" />);
    expect(screen.getByText('Software Developer')).toBeInTheDocument();
  });

  it('renders bio', () => {
    render(<PublicCardView profile={mockProfile} card={mockCard} publicUrl="https://example.com/es/tarjeta/johndoe" />);
    expect(screen.getByText('My bio text here')).toBeInTheDocument();
  });

  it('renders location with card', () => {
    render(<PublicCardView profile={mockProfile} card={mockCard} publicUrl="https://example.com/es/tarjeta/johndoe" />);
    expect(screen.getByText('Madrid, Spain')).toBeInTheDocument();
  });

  it('does not render location when card is null', () => {
    render(<PublicCardView profile={mockProfile} card={null} publicUrl="https://example.com/es/tarjeta/johndoe" />);
    expect(screen.queryByText('Madrid, Spain')).not.toBeInTheDocument();
  });

  it('renders avatar initial when no avatar_url', () => {
    render(<PublicCardView profile={mockProfile} card={mockCard} publicUrl="https://example.com/es/tarjeta/johndoe" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('renders avatar image when avatar_url is set', () => {
    const profileWithAvatar = { ...mockProfile, avatar_url: 'https://example.com/avatar.jpg' };
    render(<PublicCardView profile={profileWithAvatar} card={mockCard} publicUrl="https://example.com/es/tarjeta/johndoe" />);
    const img = screen.getByAltText('John Doe');
    expect(img).toBeInTheDocument();
  });

  it('does not render contact buttons when card is null', () => {
    render(<PublicCardView profile={mockProfile} card={null} publicUrl="https://example.com/es/tarjeta/johndoe" />);
    // No contact section, social links, or VCard download
    expect(screen.queryByText('Madrid, Spain')).not.toBeInTheDocument();
  });
});
