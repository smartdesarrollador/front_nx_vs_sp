import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
});

export default function middleware(req: NextRequest) {
  // Protect /[locale]/dashboard routes
  if (/^\/(es|en)\/dashboard/.test(req.nextUrl.pathname)) {
    const token = req.cookies.get('accessToken');
    if (!token) {
      const hubUrl = process.env.NEXT_PUBLIC_HUB_URL ?? 'http://localhost:3003';
      return NextResponse.redirect(hubUrl);
    }
  }

  // Apply i18n routing
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
