import type { CVDocument, CVExperience, CVEducation } from '@/types/digital';
export type { CVDocument };

export interface CVFormExperience extends CVExperience {
  _id: string;
  is_current: boolean; // true → end_date sent as null
}

export interface CVFormEducation extends CVEducation {
  _id: string;
}

export interface CVFormLanguage {
  _id: string;
  name: string;
  level: string;
}

export interface CVFormCertification {
  _id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface CVFormState {
  professional_summary: string;
  experience: CVFormExperience[];
  education: CVFormEducation[];
  skills: string[];
  languages: CVFormLanguage[];
  certifications: CVFormCertification[];
  template_type: 'classic' | 'modern' | 'minimal';
  show_photo: boolean;
  show_contact: boolean;
}

export function formStateToPayload(s: CVFormState): CVDocument {
  return {
    professional_summary: s.professional_summary,
    experience: s.experience.map(({ _id: _unused, is_current, end_date, ...rest }) => ({
      ...rest,
      end_date: is_current ? null : end_date,
    })),
    education: s.education.map(({ _id: _unused, ...rest }) => rest),
    skills: s.skills,
    languages: s.languages.map(({ _id: _unused, ...rest }) => rest),
    certifications: s.certifications.map(({ _id: _unused, ...rest }) => rest),
    template_type: s.template_type,
    show_photo: s.show_photo,
    show_contact: s.show_contact,
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
};

function uuid(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now() + Math.random());
}

export function cvDocumentToFormState(cv: CVDocument): CVFormState {
  return {
    professional_summary: cv.professional_summary,
    experience: cv.experience.map((e) => ({
      ...e,
      _id: uuid(),
      is_current: e.end_date === null,
    })),
    education: cv.education.map((e) => ({ ...e, _id: uuid() })),
    skills: cv.skills,
    languages: cv.languages.map((l) => ({ ...l, _id: uuid() })),
    certifications: cv.certifications.map((c) => ({ ...c, _id: uuid() })),
    template_type: (cv.template_type as CVFormState['template_type']) ?? 'classic',
    show_photo: cv.show_photo,
    show_contact: cv.show_contact,
  };
}
