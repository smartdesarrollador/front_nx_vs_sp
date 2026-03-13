import type { PublicProfile } from '@/types/digital';
import { Mail, Phone } from 'lucide-react';

interface Props {
  profile: PublicProfile;
  showContact: boolean;
  title: string;
  email?: string;
  phone?: string;
}

export function CVContactSection({ profile, showContact, title, email, phone }: Props) {
  if (!showContact) return null;
  if (!email && !phone) return null;

  return (
    <section>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
        {title}
      </h2>
      <div className="space-y-2">
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <Mail size={14} />
            {email}
          </a>
        )}
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <Phone size={14} />
            {phone}
          </a>
        )}
      </div>
    </section>
  );
}
