'use client';

export function SSOCallbackPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Iniciando sesión...</p>
      </div>
    </div>
  );
}
