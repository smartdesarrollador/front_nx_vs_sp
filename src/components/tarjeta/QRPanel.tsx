'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';
import { UserPlus, ChevronDown, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { DigitalCard, PublicProfile } from '@/types/digital';

type QRAction = 'contact' | 'whatsapp' | 'portfolio';

interface Props {
  profile: PublicProfile;
  card: DigitalCard;
  publicUrl: string;
  primaryColor: string;
}

export function QRPanel({ profile, card, publicUrl, primaryColor }: Props) {
  const t = useTranslations('tarjeta');
  const [activeAction, setActiveAction] = useState<QRAction>('contact');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const phoneDigits = card.phone.replace(/\D/g, '');

  const qrValueMap: Record<QRAction, string> = {
    contact: publicUrl,
    whatsapp: phoneDigits ? `https://wa.me/${phoneDigits}` : publicUrl,
    portfolio: card.website_url || publicUrl,
  };

  const actionLabels: Record<QRAction, string> = {
    contact: t('saveContact'),
    whatsapp: t('saveWhatsApp'),
    portfolio: t('savePortfolio'),
  };

  const availableActions: QRAction[] = [
    'contact',
    ...(phoneDigits ? (['whatsapp'] as QRAction[]) : []),
    ...(card.website_url ? (['portfolio'] as QRAction[]) : []),
  ];

  const qrValue = qrValueMap[activeAction];

  function handleActionSelect(action: QRAction) {
    setActiveAction(action);
    setDropdownOpen(false);
  }

  return (
    <div className="flex flex-col items-center gap-4 h-full">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 self-start">
        {t('connectWithMe')}
      </h2>

      {/* QR card */}
      <div className="w-full bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center gap-4">
        <div className="p-2 bg-white rounded-xl shadow-sm">
          <QRCode
            value={qrValue}
            size={160}
            bgColor="#ffffff"
            fgColor="#000000"
            level="M"
          />
        </div>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400 leading-snug">
          {t('scanToSave', { name: profile.display_name })}
        </p>

        {/* Primary action button */}
        <button
          onClick={() => {
            if (activeAction === 'whatsapp' && phoneDigits) {
              window.open(`https://wa.me/${phoneDigits}`, '_blank');
            } else if (activeAction === 'portfolio' && card.website_url) {
              window.open(card.website_url, '_blank');
            } else {
              window.open(publicUrl, '_blank');
            }
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: primaryColor }}
        >
          <UserPlus className="w-4 h-4" />
          {actionLabels[activeAction]}
        </button>

        {/* Change action — only shown if there are alternatives */}
        {availableActions.length > 1 && (
          <div className="relative w-full">
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-colors
                text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600
                hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              {t('changeAction')}
            </button>

            {dropdownOpen && (
              <ul className="absolute bottom-full mb-1 left-0 right-0 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl shadow-lg overflow-hidden">
                {availableActions.map((action) => (
                  <li key={action}>
                    <button
                      onClick={() => handleActionSelect(action)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left
                        hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors
                        text-gray-700 dark:text-gray-200"
                    >
                      {activeAction === action && (
                        <Check className="w-4 h-4 flex-shrink-0" style={{ color: primaryColor }} />
                      )}
                      <span className={activeAction === action ? 'font-medium' : ''}>
                        {actionLabels[action]}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
