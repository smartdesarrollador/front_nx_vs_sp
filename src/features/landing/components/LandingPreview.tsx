'use client';
import { PublicLandingView } from '@/components/landing/PublicLandingView';
import type { LandingTemplate, PublicProfile } from '@/types/digital';
import type { LandingFormState } from '../types';

interface Props {
  profile: { username: string; display_name: string };
  formState: LandingFormState;
  isLoading: boolean;
}

export function LandingPreview({ profile, formState, isLoading }: Props) {
  if (isLoading) {
    return <div className="animate-pulse h-96 rounded-2xl bg-gray-200 dark:bg-gray-700" />;
  }

  if (!formState.sections.length) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-sm text-gray-400">
        Añade secciones para ver el preview
      </div>
    );
  }

  const landingForPreview: LandingTemplate = {
    template_type: formState.template_type,
    sections: formState.sections,
    contact_email: formState.contact_email,
    enable_contact_form: formState.enable_contact_form,
    custom_css: '',
    ga_tracking_id: '',
  };

  const fakeProfile: PublicProfile = {
    username: profile.username,
    display_name: profile.display_name,
    title: '',
    bio: '',
    avatar_url: '',
    is_public: formState.is_public,
    meta_title: '',
    meta_description: '',
    og_image_url: '',
  };

  return (
    <div className="space-y-3">
      {/* Status badge */}
      <div className="flex items-center gap-2">
        {formState.is_public ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Publicado
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
            Borrador
          </span>
        )}
      </div>

      {/* Preview container */}
      <div className="overflow-y-auto max-h-[70vh] rounded-xl border border-gray-200 dark:border-gray-700">
        <PublicLandingView profile={fakeProfile} landing={landingForPreview} />
      </div>
    </div>
  );
}
