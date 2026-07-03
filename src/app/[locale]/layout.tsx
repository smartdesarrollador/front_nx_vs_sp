import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Playfair_Display } from 'next/font/google';
import { Providers } from '@/components/shared/Providers';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
});

const locales = ['es', 'en'];

export const metadata: Metadata = {
  title: {
    default: 'Vista — Digital Services',
    template: '%s | Vista',
  },
  description: 'Servicios digitales profesionales',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('vista-theme')==='dark')document.documentElement.classList.add('dark')}catch{}`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfairDisplay.variable} font-sans antialiased bg-[#EAF1F8] dark:bg-[#071D2E] text-[#0B2740] dark:text-[#EAF1F8]`}
      >
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
