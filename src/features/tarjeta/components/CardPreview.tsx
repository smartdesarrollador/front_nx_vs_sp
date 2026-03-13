'use client';
import { PublicCardView } from '@/components/tarjeta/PublicCardView';
import { QRDisplay } from './QRDisplay';
import { useGenerateQR } from '../hooks/useGenerateQR';
import type { CardData } from '../types';

interface CardPreviewProps {
  data: CardData | null;
  isLoading: boolean;
  locale: string;
}

export function CardPreview({ data, isLoading, locale }: CardPreviewProps) {
  const { mutate: regenerateQR, isPending: isRegenerating } = useGenerateQR();

  if (isLoading) {
    return (
      <div className="animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700 h-96 w-full max-w-sm mx-auto" />
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p className="text-lg font-medium">Aún no has configurado tu tarjeta</p>
        <p className="text-sm mt-1">Ve a la pestaña Editor para comenzar.</p>
      </div>
    );
  }

  const publicUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/${locale}/tarjeta/${data.profile.username}`
      : `/${locale}/tarjeta/${data.profile.username}`;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-2">
        {data.profile.is_public ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Publicado
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
            Borrador
          </span>
        )}
      </div>
      <PublicCardView profile={data.profile} card={data.digital_card} />
      <QRDisplay
        qrUrl={data.digital_card?.qr_code_url ?? null}
        publicUrl={publicUrl}
        onRegenerate={() => regenerateQR()}
        isRegenerating={isRegenerating}
      />
    </div>
  );
}
