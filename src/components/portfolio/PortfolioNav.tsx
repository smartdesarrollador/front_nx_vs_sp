'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

interface Props {
  profileName: string;
  locale: string;
  username: string;
  showBackLink?: boolean;
}

export function PortfolioNav({ profileName, locale, username, showBackLink = false }: Props) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200/60 dark:border-gray-700/60">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackLink && (
            <Link
              href={`/${locale}/portafolio/${username}`}
              className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              Portfolio
            </Link>
          )}
          {!showBackLink && (
            <Link
              href={`/${locale}/portafolio/${username}`}
              className="font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {profileName}
            </Link>
          )}
          {showBackLink && (
            <span className="text-gray-300 dark:text-gray-600">/</span>
          )}
          {showBackLink && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-xs">
              {profileName}
            </span>
          )}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
