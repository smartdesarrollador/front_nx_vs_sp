'use client';

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL ?? 'http://localhost:3003';

interface AuthErrorProps {
  message: string;
}

export function AuthError({ message }: AuthErrorProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full rounded-xl border border-red-200 bg-white dark:bg-gray-800 p-8 shadow-sm text-center">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Error de autenticación
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{message}</p>
        <a
          href={HUB_URL}
          className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Volver al Hub
        </a>
      </div>
    </div>
  );
}
