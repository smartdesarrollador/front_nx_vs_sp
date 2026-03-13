'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import type { LandingSection, LandingSectionType } from '@/types/digital';

const ANCHOR_LABELS: Record<LandingSectionType, string> = {
  hero: 'Inicio',
  about: 'Acerca de',
  services: 'Servicios',
  testimonials: 'Testimonios',
  stats: 'Logros',
  contact: 'Contacto',
};

interface Props {
  sections: LandingSection[];
  profileName: string;
  locale: string;
}

export function PublicLandingNav({ sections, profileName, locale }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navSections = sections.filter((s) => s.type !== 'stats');

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-lg font-bold text-primary-600 hover:text-primary-700 transition-colors"
        >
          {profileName}
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navSections.map((section) => (
            <a
              key={section.type}
              href={`#${section.type}`}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {ANCHOR_LABELS[section.type]}
            </a>
          ))}
          <ThemeToggle />
        </div>
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 py-3 flex flex-col gap-3">
          {navSections.map((section) => (
            <a
              key={section.type}
              href={`#${section.type}`}
              className="text-sm text-gray-700 dark:text-gray-200 py-2 hover:text-primary-600 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {ANCHOR_LABELS[section.type]}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
