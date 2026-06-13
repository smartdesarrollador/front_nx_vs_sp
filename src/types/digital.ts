export interface PublicProfile {
  username: string;
  display_name: string;
  title: string;
  bio: string;
  avatar_url: string;
  is_public: boolean;
  meta_title: string;
  meta_description: string;
  og_image_url: string;
}

export interface DigitalCard {
  email: string;
  phone: string;
  location: string;
  linkedin_url: string;
  twitter_url: string;
  github_url: string;
  instagram_url: string;
  facebook_url: string;
  website_url: string;
  primary_color: string;
  background_color: string;
  qr_code_url: string;
  specialties: string[];
  years_experience: number | null;
}

export interface PublicCardResponse {
  profile: PublicProfile;
  digital_card: DigitalCard | null;
}

// Landing types (PASO 5)
export type LandingSectionType =
  | 'hero'
  | 'about'
  | 'services'
  | 'testimonials'
  | 'stats'
  | 'contact'
  | 'faq'
  | 'features';

export type LandingTemplateType = 'basic' | 'minimal' | 'corporate' | 'creative';

export interface LandingSection {
  type: LandingSectionType;
  content: Record<string, unknown>;
}

export interface LandingSocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
  tiktok?: string;
}

export interface LandingTemplate {
  template_type: LandingTemplateType;
  sections: LandingSection[];
  contact_email: string;
  enable_contact_form: boolean;
  custom_css: string;
  ga_tracking_id: string;
  social_links?: LandingSocialLinks;
  accent_color?: string;
}

export interface PublicLandingResponse {
  profile: PublicProfile;
  landing: LandingTemplate | null;
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  description_short: string;
  description_full: string;
  cover_image_url: string;
  gallery_images: string[];
  demo_url: string;
  repo_url: string;
  case_study_url: string;
  tags: string[];
  is_featured: boolean;
  order: number;
  project_date: string;
}

export interface PublicPortfolioResponse {
  profile: PublicProfile;
  items: PortfolioItem[];
}

export interface CVExperience {
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

export interface CVEducation {
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string | null;
}

export interface CVDocument {
  professional_summary: string;
  experience: CVExperience[];
  education: CVEducation[];
  skills: string[];
  languages: { name: string; level: string }[];
  certifications: { name: string; issuer: string; date: string }[];
  template_type: string;
  show_photo: boolean;
  show_contact: boolean;
}

export interface PublicCVResponse {
  profile: PublicProfile;
  cv: CVDocument | null;
}

export interface DigitalProfile {
  username: string;
  display_name: string;
  is_public: boolean;
  has_digital_card: boolean;
  has_landing: boolean;
  has_portfolio: boolean;
  has_cv: boolean;
  digital_card_published: boolean;
  landing_published: boolean;
  portfolio_published: boolean;
  cv_published: boolean;
}
