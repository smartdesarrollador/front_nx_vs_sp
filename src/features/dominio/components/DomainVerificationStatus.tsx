'use client';
import { ShieldCheck, ShieldX, Clock, RefreshCw } from 'lucide-react';
import type { CustomDomainData, DomainVerificationStatus } from '../types';

interface Props {
  data: CustomDomainData;
  onVerify: () => void;
  isVerifying: boolean;
}

function relativeTime(isoString: string): string {
  const diffMs = Date.now() - new Date(isoString).getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  if (diffSecs < 60) return 'hace un momento';
  const diffMins = Math.floor(diffSecs / 60);
  if (diffMins < 60) return `hace ${diffMins} minuto${diffMins !== 1 ? 's' : ''}`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
  const diffDays = Math.floor(diffHours / 24);
  return `hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`;
}

const STATUS_CONFIG: Record<
  DomainVerificationStatus,
  { label: string; color: string; icon: typeof Clock }
> = {
  pending: {
    label: 'Pendiente',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    icon: Clock,
  },
  verified: {
    label: 'Verificado',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    icon: ShieldCheck,
  },
  failed: {
    label: 'Error',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    icon: ShieldX,
  },
};

const SSL_LABELS: Record<string, string> = {
  pending: 'Pendiente',
  active: 'Activo',
  failed: 'Error',
};

export function DomainVerificationStatus({ data, onVerify, isVerifying }: Props) {
  const status = STATUS_CONFIG[data.verification_status] ?? STATUS_CONFIG.pending;
  const StatusIcon = status.icon;

  return (
    <div className="space-y-4">
      {/* Verification row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.color}`}
          >
            <StatusIcon size={13} />
            {status.label}
          </span>
          {data.last_verification_attempt && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Último intento: {relativeTime(data.last_verification_attempt)}
            </span>
          )}
        </div>
        <button
          onClick={onVerify}
          disabled={isVerifying}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-60 transition-colors"
        >
          {isVerifying ? (
            <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : (
            <RefreshCw size={13} />
          )}
          Verificar ahora
        </button>
      </div>

      {/* SSL row */}
      <div className="rounded-lg bg-gray-50 dark:bg-gray-800/50 px-4 py-3 space-y-1">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          SSL / TLS
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {SSL_LABELS[data.ssl_status] ?? data.ssl_status}
          </span>
          {data.ssl_status === 'active' && data.ssl_cert_expires_at && (
            <span className="text-xs text-gray-400 dark:text-gray-500">
              · Expira:{' '}
              {new Date(data.ssl_cert_expires_at).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
