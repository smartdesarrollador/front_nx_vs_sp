'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Algo salió mal</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">{error.message}</p>
        <button
          onClick={reset}
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </main>
  );
}
