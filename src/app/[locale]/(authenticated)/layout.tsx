'use client';

import { useState, useEffect, use } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileOverlay } from '@/components/layout/MobileOverlay';
import { cn } from '@/utils/cn';
import { useSessionRestore } from '@/hooks/useSessionRestore';
import { useAuthStore } from '@/store/authStore';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default function AuthenticatedLayout({ children, params }: AuthenticatedLayoutProps) {
  const { locale } = use(params);
  useSessionRestore();
  const tenant = useAuthStore((s) => s.tenant);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Restore sidebar collapsed state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sidebarCollapsed');
      if (stored !== null) setSidebarCollapsed(stored === 'true');
    } catch {}
  }, []);

  // Inject dynamic favicon when tenant branding is available
  useEffect(() => {
    if (!tenant?.favicon_url) return;
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = tenant.favicon_url;
  }, [tenant?.favicon_url]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        locale={locale}
      />

      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onCollapsedChange={(collapsed) => setSidebarCollapsed(collapsed)}
        locale={locale}
      />

      {sidebarOpen && <MobileOverlay onClose={() => setSidebarOpen(false)} />}

      <main
        className={cn(
          'pt-16 transition-all duration-300',
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        )}
      >
        {children}
      </main>
    </div>
  );
}
