import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { i18n } from './lib/i18n-config';

export function middleware(request: NextRequest): NextResponse | undefined {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith('/_next') || pathname.includes('.')) {
        return undefined;
    }

    const hasLocale = i18n.locales.some((locale) => pathname.startsWith(`/${locale}`));
    if (hasLocale) {
        return undefined;
    }

    const url = request.nextUrl.clone();
    url.pathname = `/${i18n.defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    matcher: ['/((?!api).*)']
};