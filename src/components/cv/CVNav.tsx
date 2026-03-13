'use client';
import Link from 'next/link';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

interface Props {
  displayName: string;
  locale: string;
}

export function CVNav({ displayName, locale }: Props) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200/60 dark:border-gray-700/60">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <span className="font-semibold text-gray-900 dark:text-white">
          {displayName} <span className="text-gray-400 font-normal">· CV</span>
        </span>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href={`/${locale}`}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            Vista Digital
          </Link>
        </div>
      </div>
    </nav>
  );
}
