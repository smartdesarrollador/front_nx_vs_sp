'use client';
import { useFeatureGate } from '@/hooks/useFeatureGate';
import { UpgradePrompt } from '@/components/shared/UpgradePrompt';
import { useCustomDomain } from '../hooks/useCustomDomain';
import { useVerifyDomain } from '../hooks/useVerifyDomain';
import { DomainForm } from './DomainForm';
import { DNSInstructions } from './DNSInstructions';
import { DomainVerificationStatus } from './DomainVerificationStatus';

interface Props {
  locale: string;
}

export function DomainPage({ locale: _locale }: Props) {
  const { canAccess } = useFeatureGate('customDomain');

  if (!canAccess) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <UpgradePrompt isOpen onClose={() => {}} featureKey="customDomain" />
      </div>
    );
  }

  return <DomainPageContent />;
}

function DomainPageContent() {
  const { data: domainData, isLoading } = useCustomDomain();
  const { mutate: verifyDomain, isPending: isVerifying } = useVerifyDomain();

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dominio Personalizado
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Conecta tu propio dominio a tu perfil Vista.
        </p>
      </div>

      {/* Card 1 — Tu dominio */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">
          Tu dominio
        </h2>
        {isLoading ? (
          <div className="h-9 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800" />
        ) : (
          <DomainForm initialDomain={domainData?.domain} />
        )}
      </div>

      {/* Card 2 — Configuración DNS */}
      {!isLoading && domainData != null && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">
            Configuración DNS
          </h2>
          <DNSInstructions
            domain={domainData.domain}
            verificationToken={domainData.verification_token}
          />
        </div>
      )}

      {/* Card 3 — Estado de verificación */}
      {!isLoading && domainData != null && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-gray-900 dark:text-white">
            Estado de verificación
          </h2>
          <DomainVerificationStatus
            data={domainData}
            onVerify={() => verifyDomain()}
            isVerifying={isVerifying}
          />
        </div>
      )}
    </div>
  );
}
