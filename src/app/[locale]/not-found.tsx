import Link from 'next/link';
import type { Route } from 'next';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">Página no encontrada</p>
        <Link
          href={'/' as Route}
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
