'use client';

import { useState } from 'react';
import { useFeatureGate } from '@/hooks/useFeatureGate';
import { UpgradePrompt } from './UpgradePrompt';
import type { FeatureKey } from '@/data/featureGates';

interface FeatureGateProps {
  feature: FeatureKey;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function FeatureGate({ feature, children, fallback }: FeatureGateProps) {
  const { canAccess } = useFeatureGate(feature);
  const [showPrompt, setShowPrompt] = useState(false);

  if (canAccess) return <>{children}</>;

  if (fallback !== undefined) return <>{fallback}</>;

  return (
    <>
      <div
        onClick={() => setShowPrompt(true)}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setShowPrompt(true)}
      >
        {children}
      </div>
      <UpgradePrompt
        isOpen={showPrompt}
        onClose={() => setShowPrompt(false)}
        featureKey={feature}
      />
    </>
  );
}
