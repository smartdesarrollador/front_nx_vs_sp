'use client';
import { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';

interface QRDisplayProps {
  qrUrl: string | null;
  publicUrl: string;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export function QRDisplay({ qrUrl, publicUrl, onRegenerate, isRegenerating }: QRDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
      {qrUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={qrUrl} alt="Código QR" className="w-32 h-32" />
      ) : (
        <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center px-2">
            Guarda la tarjeta para generar el QR
          </p>
        </div>
      )}
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-500" />
              <span className="text-green-600">Copiado</span>
            </>
          ) : (
            <>
              <Copy size={14} /> Copiar URL
            </>
          )}
        </button>
        <button
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={isRegenerating ? 'animate-spin' : ''} />
          Regenerar QR
        </button>
      </div>
    </div>
  );
}
