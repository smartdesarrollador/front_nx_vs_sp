'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  CreditCard,
  Globe,
  Briefcase,
  FileText,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Lock,
  Zap,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { useFeatureGate } from '@/hooks/useFeatureGate';
import { useAuth } from '@/hooks/useAuth';
import { UpgradePrompt } from '@/components/shared/UpgradePrompt';
import type { FeatureKey, Plan } from '@/data/featureGates';

interface NavItem {
  key: string;
  href: string;
  icon: React.ReactNode;
  featureKey?: FeatureKey;
}

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
  onCollapsedChange: (collapsed: boolean) => void;
  locale: string;
}

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL ?? '';

function NavItemRow({
  item,
  locale,
  isCollapsed,
  isActive,
  label,
}: {
  item: NavItem;
  locale: string;
  isCollapsed: boolean;
  isActive: boolean;
  label: string;
}) {
  // Always call hook — use 'digitalCard' as fallback (always true) when no gate needed
  const gateResult = useFeatureGate(item.featureKey ?? 'digitalCard');
  const canAccess = item.featureKey ? gateResult.canAccess : true;
  const [showPrompt, setShowPrompt] = useState(false);

  if (!canAccess && item.featureKey) {
    return (
      <>
        <button
          onClick={() => setShowPrompt(true)}
          className={cn(
            'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
            'opacity-60 cursor-not-allowed text-gray-500 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          )}
          title={label}
        >
          <span className="shrink-0">{item.icon}</span>
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{label}</span>
              <Lock size={12} className="shrink-0" />
            </>
          )}
        </button>
        <UpgradePrompt
          isOpen={showPrompt}
          onClose={() => setShowPrompt(false)}
          featureKey={item.featureKey}
        />
      </>
    );
  }

  return (
    <Link
      href={`/${locale}${item.href}`}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
        isActive
          ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
      )}
      title={label}
    >
      <span className="shrink-0">{item.icon}</span>
      {!isCollapsed && (
        <>
          <span className="flex-1">{label}</span>
          {isActive && (
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0" />
          )}
        </>
      )}
    </Link>
  );
}

const NAV_ITEMS: NavItem[] = [
  {
    key: 'tarjeta',
    href: '/dashboard/tarjeta',
    icon: <CreditCard size={18} />,
  },
  {
    key: 'landing',
    href: '/dashboard/landing',
    icon: <Globe size={18} />,
    featureKey: 'landingPage',
  },
  {
    key: 'portfolio',
    href: '/dashboard/portfolio',
    icon: <Briefcase size={18} />,
    featureKey: 'portfolio',
  },
  {
    key: 'cv',
    href: '/dashboard/cv',
    icon: <FileText size={18} />,
  },
  {
    key: 'analytics',
    href: '/dashboard/analytics',
    icon: <BarChart2 size={18} />,
    featureKey: 'digitalCardAnalytics',
  },
  {
    key: 'dominio',
    href: '/dashboard/dominio',
    icon: <Settings size={18} />,
    featureKey: 'customDomain',
  },
];

export function Sidebar({ isOpen, isCollapsed, onClose, onCollapsedChange, locale }: SidebarProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const { currentPlan } = useAuth();

  function toggleCollapse() {
    const next = !isCollapsed;
    onCollapsedChange(next);
    try {
      localStorage.setItem('sidebarCollapsed', String(next));
    } catch {}
  }

  return (
    <aside
      className={cn(
        'fixed top-16 left-0 z-20 flex h-[calc(100vh-4rem)] flex-col',
        'border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800',
        'transition-all duration-300',
        // Desktop width
        isCollapsed ? 'w-16' : 'w-64',
        // Mobile: slide in/out
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      )}
    >
      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto p-3">
        {/* Dashboard link */}
        <Link
          href={`/${locale}/dashboard`}
          onClick={onClose}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm mb-4 transition-colors',
            pathname === `/${locale}/dashboard` || pathname === `/${locale}/dashboard/`
              ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
          )}
          title={t('dashboard')}
        >
          <span className="shrink-0 text-lg">🏠</span>
          {!isCollapsed && <span className="font-medium">{t('dashboard')}</span>}
        </Link>

        {/* Separator */}
        <div className="mb-3 border-t border-gray-200 dark:border-gray-700" />

        {/* Service items */}
        <div className="space-y-1" onClick={onClose}>
          {NAV_ITEMS.map((item) => (
            <NavItemRow
              key={item.key}
              item={item}
              locale={locale}
              isCollapsed={isCollapsed}
              isActive={pathname.startsWith(`/${locale}${item.href}`)}
              label={t(item.key)}
            />
          ))}
        </div>
      </nav>

      {/* Upgrade CTA */}
      {!isCollapsed && currentPlan !== 'enterprise' && (
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <a
            href={`${HUB_URL}/subscription`}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            <Zap size={16} />
            <span>{t('upgrade')}</span>
          </a>
        </div>
      )}

      {/* Collapse toggle (desktop only) */}
      <button
        onClick={toggleCollapse}
        className="hidden md:flex items-center justify-center h-10 border-t border-gray-200 dark:border-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
