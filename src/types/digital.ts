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

export interface LandingThemeColors {
  hero_bg?: string;
  hero_text?: string;
  button_bg?: string;
  nav_bg?: string;
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
  theme_colors?: LandingThemeColors;
}

export interface PublicLandingResponse {
  profile: PublicProfile;
  landing: LandingTemplate | null;
}

export type PortfolioCategory =
  | 'web' | 'mobile' | 'design' | 'branding' | 'data' | 'consulting' | 'other' | '';

export type PortfolioStatus = 'completed' | 'in_progress' | 'archived';

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
  is_published: boolean;
  order: number;
  project_date: string;
  category: PortfolioCategory;
  client_name: string;
  technologies: string[];
  duration: string;
  status: PortfolioStatus;
  accent_color: string;
}

export interface PortfolioThemeColors {
  header_bg?: string;
  header_text?: string;
  accent?: string;
  nav_bg?: string;
}

export interface PublicPortfolioResponse {
  profile: PublicProfile;
  items: PortfolioItem[];
  theme_colors?: PortfolioThemeColors;
}

export interface CVExperience {
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string;
  achievements?: string[];
  employment_type?: 'full_time' | 'part_time' | 'freelance' | 'internship' | 'contract' | '';
}

export interface CVEducation {
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string | null;
}

export interface CVSkill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

export interface CVCertification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
  credential_id?: string;
  expiry_date?: string;
}

export interface CVProject {
  name: string;
  description: string;
  url: string;
  year: string;
  technologies: string[];
}

export interface CVVolunteer {
  org: string;
  role: string;
  start_date: string;
  end_date: string | null;
  description: string;
}

export interface CVAward {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface CVDocument {
  professional_summary: string;
  experience: CVExperience[];
  education: CVEducation[];
  skills: CVSkill[];
  languages: { name: string; level: string }[];
  certifications: CVCertification[];
  template_type: string;
  show_photo: boolean;
  show_contact: boolean;
  headline?: string;
  location?: string;
  website_url?: string;
  linkedin_url?: string;
  github_url?: string;
  accent_color?: string;
  is_published?: boolean;
  projects?: CVProject[];
  volunteer?: CVVolunteer[];
  awards?: CVAward[];
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
