import type { Metadata, Viewport } from 'next';
import { getPublicPortfolio } from '@/lib/publicApi';
import { PwaInstallRegister } from '@/components/shared/PwaInstallRegister';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string; username: string }>;
}

// Shared PWA metadata for both /portafolio/[username] and /portafolio/[username]/[slug] —
// they belong to the same installed app (same manifest scope), so this lives in the layout
// instead of being duplicated in each page.tsx.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, username } = await params;
  const data = await getPublicPortfolio(username);

  if (!data) return {};

  return {
    manifest: `/${locale}/portafolio/${username}/manifest`,
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: data.profile.display_name,
    },
  };
}

export async function generateViewport({ params }: Props): Promise<Viewport> {
  const { username } = await params;
  const data = await getPublicPortfolio(username);

  return {
    themeColor: data?.digital_card?.primary_color || data?.theme_colors?.accent || '#3B82F6',
  };
}

export default async function PortafolioLayout({ children, params }: Props) {
  const { locale, username } = await params;

  return (
    <>
      <PwaInstallRegister scope={`/${locale}/portafolio/${username}`} />
      {children}
    </>
  );
}
