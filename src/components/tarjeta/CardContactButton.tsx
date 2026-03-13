import { Mail, Phone, MessageCircle } from 'lucide-react';
import type { DigitalCard } from '@/types/digital';

interface Props {
  card: DigitalCard;
  primaryColor: string;
}

export function CardContactButton({ card, primaryColor }: Props) {
  const phoneDigits = card.phone.replace(/\D/g, '');
  const hasEmail = !!card.email;
  const hasPhone = !!card.phone;

  if (!hasEmail && !hasPhone) return null;

  return (
    <div className="flex gap-3 w-full">
      {hasEmail && (
        <a
          href={`mailto:${card.email}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium text-sm hover:opacity-90 transition-opacity"
          style={{ backgroundColor: primaryColor }}
        >
          <Mail className="w-4 h-4" />
          Email
        </a>
      )}

      {hasPhone && (
        <a
          href={`tel:${card.phone}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium text-sm hover:opacity-90 transition-opacity"
          style={{ backgroundColor: primaryColor }}
        >
          <Phone className="w-4 h-4" />
          Llamar
        </a>
      )}

      {hasPhone && (
        <a
          href={`https://wa.me/${phoneDigits}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium text-sm hover:opacity-90 transition-opacity"
          style={{ backgroundColor: primaryColor }}
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      )}
    </div>
  );
}
