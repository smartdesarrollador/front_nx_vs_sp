'use client';
import { useState } from 'react';
import { ExternalLink, Lock } from 'lucide-react';
import { useDigitalCard } from '../hooks/useDigitalCard';
import { useFeatureGate } from '@/hooks/useFeatureGate';
import { UpgradePrompt } from '@/components/shared/UpgradePrompt';
import { CardPreview } from './CardPreview';
import { CardEditor } from './CardEditor';
import { ServiceAnalyticsView } from '@/features/analytics/components/ServiceAnalyticsView';

type Tab = 'preview' | 'editor' | 'analytics';

interface TarjetaPageProps {
  locale: string;
}

export function TarjetaPage({ locale }: TarjetaPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('preview');
  const { data: cardData, isLoading } = useDigitalCard();
  const { canAccess: canAccessAnalytics } = useFeatureGate('digitalCardAnalytics');

  const publicUrl = cardData
    ? `/${locale}/tarjeta/${cardData.profile.username}`
    : null;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tarjeta Digital</h1>
        {publicUrl && (
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium transition-colors"
          >
            Ver publica <ExternalLink size={14} />
          </a>
        )}
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {(
          [
            { id: 'preview', label: 'Preview' },
            { id: 'editor', label: 'Editor' },
            { id: 'analytics', label: 'Analytics', locked: !canAccessAnalytics },
          ] as { id: Tab; label: string; locked?: boolean }[]
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {tab.label}
            {tab.locked && <Lock size={12} className="text-gray-400" />}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'preview' && (
        <CardPreview data={cardData ?? null} isLoading={isLoading} locale={locale} />
      )}
      {activeTab === 'editor' && (
        <CardEditor
          data={cardData ?? null}
          onSaved={() => setActiveTab('preview')}
        />
      )}
      {activeTab === 'analytics' &&
        (canAccessAnalytics ? (
          <ServiceAnalyticsView service="tarjeta" days={7} />
        ) : (
          <div className="py-4">
            <UpgradePrompt
              isOpen={true}
              onClose={() => setActiveTab('preview')}
              featureKey="digitalCardAnalytics"
            />
          </div>
        ))}
    </div>
  );
}
