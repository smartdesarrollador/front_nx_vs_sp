'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import type { PortfolioStyleTokens } from '@/features/portfolio/types';

export interface PortfolioNavSection {
  id: string;
  label: string;
}

interface Props {
  profileName: string;
  locale: string;
  username: string;
  showBackLink?: boolean;
  navBgColor?: string;
  navTextColor?: string;
  styleTokens?: PortfolioStyleTokens;
  sections?: PortfolioNavSection[];
}

export function PortfolioNav({
  profileName,
  locale,
  username,
  showBackLink = false,
  navBgColor,
  navTextColor,
  styleTokens,
  sections = [],
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (sections.length === 0) return;
    const sectionEls = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur border-b border-gray-200/60 dark:border-gray-700/60 ${navBgColor ? '' : 'bg-white/80 dark:bg-gray-900/80'}`}
      style={navBgColor ? { background: navBgColor } : undefined}
    >
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
              className={`text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${styleTokens?.headingFont ?? 'font-sans'} ${styleTokens?.headingWeight ?? 'font-semibold'}`}
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

        {!showBackLink && sections.length > 0 && (
          <div className="hidden md:flex items-center gap-5">
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`text-sm transition-colors ${isActive ? 'font-semibold' : ''} ${
                    navTextColor
                      ? ''
                      : isActive
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                  style={navTextColor ? { color: navTextColor, opacity: isActive ? 1 : 0.75 } : undefined}
                >
                  {section.label}
                </a>
              );
            })}
          </div>
        )}

        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        {!showBackLink && sections.length > 0 && (
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
        )}
        {(showBackLink || sections.length === 0) && (
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        )}
      </div>

      {mobileOpen && !showBackLink && sections.length > 0 && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 px-4 py-3 flex flex-col gap-1">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`text-sm py-2.5 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary-600'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {section.label}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
