'use client';
import { FileDown, Lock } from 'lucide-react';
import { useFeatureGate } from '@/hooks/useFeatureGate';
import { useExportCV } from '../hooks/useExportCV';

export function ExportPDFButton() {
  const { canAccess } = useFeatureGate('cvPDFExport');
  const { mutate, isPending } = useExportCV();

  if (!canAccess) {
    return (
      <button
        type="button"
        disabled
        title="Requiere plan Starter"
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed opacity-60"
      >
        <Lock size={14} />
        PDF
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => mutate()}
      disabled={isPending}
      className="flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
    >
      {isPending ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <FileDown size={14} />
      )}
      PDF
    </button>
  );
}
