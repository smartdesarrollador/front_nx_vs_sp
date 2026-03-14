'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, Home, Sun, Moon, LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/useAuth';
import { PlanBadge } from '@/components/shared/PlanBadge';
import type { Plan } from '@/data/featureGates';

interface NavbarProps {
  onToggleSidebar: () => void;
  locale: string;
}

function getBreadcrumb(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  // skip locale prefix
  const relevant = segments.slice(1);
  if (relevant.length === 0 || relevant[0] === 'dashboard') return '';
  return relevant[relevant.length - 1]
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getInitials(name: string): string {
  const parts = (name ?? '').trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return (parts[0]?.[0] ?? '').toUpperCase();
}

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL ?? '';

export function Navbar({ onToggleSidebar, locale }: NavbarProps) {
  const t = useTranslations('nav');
  const { user, currentPlan, clearAuth } = useAuth();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const breadcrumb = getBreadcrumb(pathname);

  function handleLogout() {
    clearAuth();
    window.location.href = HUB_URL;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="flex h-full items-center justify-between px-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Hamburger (mobile) */}
          <button
            onClick={onToggleSidebar}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:hidden"
            aria-label="Abrir menú"
          >
            <Menu size={20} />
          </button>

          {/* Logo */}
          <Link
            href={`/${locale}/dashboard`}
            className="flex items-center gap-2 font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Home size={20} className="text-blue-600" />
            <span>{t('home')}</span>
          </Link>

          {/* Breadcrumb */}
          {breadcrumb && (
            <div className="hidden items-center gap-2 md:flex">
              <span className="text-gray-400">/</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{breadcrumb}</span>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* User info (desktop) */}
          {user && (
            <div className="hidden flex-col items-end md:flex mr-1">
              <span className="text-sm font-medium text-gray-900 dark:text-white leading-tight">
                {user.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{user.email}</span>
            </div>
          )}

          {/* Avatar */}
          {user && (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white shrink-0">
              {getInitials(user.name)}
            </div>
          )}

          {/* Plan badge */}
          <PlanBadge plan={(currentPlan as Plan) ?? 'free'} className="hidden sm:inline-flex" />

          {/* Dark mode toggle */}
          {mounted ? (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          ) : (
            <div className="h-9 w-9" />
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
            aria-label={t('logout')}
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">{t('logout')}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
