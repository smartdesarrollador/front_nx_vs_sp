import type {
  CVDocument,
  CVExperience,
  CVEducation,
  CVSkill,
  CVCertification,
  CVProject,
  CVVolunteer,
  CVAward,
} from '@/types/digital';
export type { CVDocument };

export interface CVFormExperience extends Omit<CVExperience, 'achievements' | 'employment_type'> {
  _id: string;
  is_current: boolean;
  achievements: string[];
  employment_type: string;
}

export interface CVFormEducation extends CVEducation {
  _id: string;
}

export interface CVFormLanguage {
  _id: string;
  name: string;
  level: string;
}

export interface CVFormCertification extends CVCertification {
  _id: string;
  credential_id: string;
  expiry_date: string;
}

export interface CVFormSkill extends CVSkill {
  _id: string;
}

export interface CVFormProject extends CVProject {
  _id: string;
}

export interface CVFormVolunteer extends CVVolunteer {
  _id: string;
  is_current: boolean;
}

export interface CVFormAward extends CVAward {
  _id: string;
}

export interface CVFormState {
  professional_summary: string;
  experience: CVFormExperience[];
  education: CVFormEducation[];
  skills: CVFormSkill[];
  languages: CVFormLanguage[];
  certifications: CVFormCertification[];
  template_type: 'classic' | 'modern' | 'minimal';
  show_photo: boolean;
  show_contact: boolean;
  headline: string;
  location: string;
  website_url: string;
  linkedin_url: string;
  github_url: string;
  accent_color: string;
  is_published: boolean;
  projects: CVFormProject[];
  volunteer: CVFormVolunteer[];
  awards: CVFormAward[];
}

export function formStateToPayload(s: CVFormState): CVDocument {
  return {
    professional_summary: s.professional_summary,
    experience: s.experience.map(({ _id: _u, is_current, end_date, achievements, employment_type, ...rest }) => ({
      ...rest,
      end_date: is_current ? null : end_date,
      achievements,
      employment_type: employment_type as CVExperience['employment_type'],
    })),
    education: s.education.map(({ _id: _u, ...rest }) => rest),
    skills: s.skills.map(({ _id: _u, ...rest }) => rest),
    languages: s.languages.map(({ _id: _u, ...rest }) => rest),
    certifications: s.certifications.map(({ _id: _u, ...rest }) => rest),
    template_type: s.template_type,
    show_photo: s.show_photo,
    show_contact: s.show_contact,
    headline: s.headline,
    location: s.location,
    website_url: s.website_url,
    linkedin_url: s.linkedin_url,
    github_url: s.github_url,
    accent_color: s.accent_color,
    is_published: s.is_published,
    projects: s.projects.map(({ _id: _u, ...rest }) => rest),
    volunteer: s.volunteer.map(({ _id: _u, is_current, end_date, ...rest }) => ({
      ...rest,
      end_date: is_current ? null : (end_date as string | null),
    })),
    awards: s.awards.map(({ _id: _u, ...rest }) => rest),
  };
}

export const DEFAULT_CV_FORM: CVFormState = {
  professional_summary: '',
  experience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  template_type: 'classic',
  show_photo: true,
  show_contact: true,
  headline: '',
  location: '',
  website_url: '',
  linkedin_url: '',
  github_url: '',
  accent_color: '',
  is_published: true,
  projects: [],
  volunteer: [],
  awards: [],
};

function uuid(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now() + Math.random());
}

function normalizeSkill(s: CVSkill | string): CVFormSkill {
  if (typeof s === 'string') {
    return { _id: uuid(), name: s, level: 'intermediate', category: '' };
  }
  return { ...s, _id: uuid() };
}

export function cvDocumentToFormState(cv: CVDocument): CVFormState {
  return {
    professional_summary: cv.professional_summary,
    experience: cv.experience.map((e) => ({
      ...e,
      _id: uuid(),
      is_current: e.end_date === null,
      achievements: e.achievements ?? [],
      employment_type: e.employment_type ?? '',
    })),
    education: cv.education.map((e) => ({ ...e, _id: uuid() })),
    skills: (cv.skills as (CVSkill | string)[]).map(normalizeSkill),
    languages: cv.languages.map((l) => ({ ...l, _id: uuid() })),
    certifications: cv.certifications.map((c) => ({
      ...c,
      _id: uuid(),
      credential_id: c.credential_id ?? '',
      expiry_date: c.expiry_date ?? '',
    })),
    template_type: (cv.template_type as CVFormState['template_type']) ?? 'classic',
    show_photo: cv.show_photo,
    show_contact: cv.show_contact,
    headline: cv.headline ?? '',
    location: cv.location ?? '',
    website_url: cv.website_url ?? '',
    linkedin_url: cv.linkedin_url ?? '',
    github_url: cv.github_url ?? '',
    accent_color: cv.accent_color ?? '',
    is_published: cv.is_published ?? true,
    projects: (cv.projects ?? []).map((p) => ({ ...p, _id: uuid() })),
    volunteer: (cv.volunteer ?? []).map((v) => ({
      ...v,
      _id: uuid(),
      is_current: v.end_date === null,
    })),
    awards: (cv.awards ?? []).map((a) => ({ ...a, _id: uuid() })),
  };
}
