'use client';

import { useState, useEffect } from 'react';
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
  faq: 'FAQ',
  features: 'Características',
};

interface Props {
  sections: LandingSection[];
  profileName: string;
  locale: string;
  ctaText?: string;
  ctaUrl?: string;
  navBgColor?: string;
}

export function PublicLandingNav({ sections, profileName, locale, ctaText, ctaUrl, navBgColor }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const navSections = sections.filter((s) => s.type !== 'stats');

  useEffect(() => {
    const sectionEls = document.querySelectorAll('section[id]');
    if (!sectionEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm ${
        navBgColor ? '' : 'bg-white/80 dark:bg-gray-900/80'
      }`}
      style={navBgColor ? { background: navBgColor } : undefined}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-lg font-bold text-primary-600 hover:text-primary-700 transition-colors"
        >
          {profileName}
        </Link>

        <div className="hidden md:flex items-center gap-5">
          {navSections.map((section) => {
            const isActive = activeSection === section.type;
            return (
              <a
                key={section.type}
                href={`#${section.type}`}
                className={`text-sm transition-colors ${
                  isActive
                    ? 'text-primary-600 dark:text-primary-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {ANCHOR_LABELS[section.type]}
              </a>
            );
          })}
          <ThemeToggle />
          {ctaText && (
            <a
              href={ctaUrl || '#contact'}
              className="ml-2 inline-flex items-center px-4 py-2 rounded-full bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors shadow-sm"
            >
              {ctaText}
            </a>
          )}
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
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 py-3 flex flex-col gap-1">
          {navSections.map((section) => {
            const isActive = activeSection === section.type;
            return (
              <a
                key={section.type}
                href={`#${section.type}`}
                className={`text-sm py-2.5 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary-600'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {ANCHOR_LABELS[section.type]}
              </a>
            );
          })}
          {ctaText && (
            <a
              href={ctaUrl || '#contact'}
              onClick={() => setMobileOpen(false)}
              className="mt-2 text-center px-4 py-2.5 rounded-full bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors"
            >
              {ctaText}
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
