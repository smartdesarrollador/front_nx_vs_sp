import { Mail, Phone, MapPin } from 'lucide-react';
import { ContactFormClient } from '../ContactFormClient';
import type { ContactSectionProps } from '../PublicLandingView';

interface ContactContent {
  title?: string;
  email?: string;
  phone?: string;
  address?: string;
  showForm?: boolean;
}

export function ContactSection({
  content,
  enableContactForm,
  contactEmail,
}: ContactSectionProps) {
  const { title, email, phone, address, showForm } = content as ContactContent;

  return (
    <section id="contact" className="max-w-2xl mx-auto px-4 py-16">
      {title && (
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          {title}
        </h2>
      )}
      {showForm && enableContactForm ? (
        <ContactFormClient contactEmail={contactEmail || email || ''} />
      ) : (
        <div className="flex flex-col gap-4">
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <Mail className="w-5 h-5 text-primary-600" />
              <span className="text-gray-700 dark:text-gray-200">{email}</span>
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <Phone className="w-5 h-5 text-primary-600" />
              <span className="text-gray-700 dark:text-gray-200">{phone}</span>
            </a>
          )}
          {address && (
            <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <MapPin className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-200">
                {address}
              </span>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
