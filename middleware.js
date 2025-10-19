import { NextResponse } from 'next/server';

const LOCALES = ['hu', 'de', 'en'];
const COOKIE_NAME = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const DEFAULT = 'en';

function parseAcceptLanguage(header) {
    if (!header) return null;
    const langs = header.split(',').map(s => s.trim().toLowerCase());
    // prefer first matching supported locale
    for (const l of langs) {
        if (l.startsWith('hu')) return 'hu';
        if (l.startsWith('de')) return 'de';
        if (l.startsWith('en')) return 'en';
    }
    return null;
}

export function middleware(request) {
    const url = request.nextUrl.clone();
    const { pathname, search } = url;

    // Skip internals and assets
    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
        return NextResponse.next();
    }

    // If path already has a locale prefix, proceed
    const pathnameHasLocale = LOCALES.some(
        (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
    );
    if (pathnameHasLocale) return NextResponse.next();

    // Respect cookie if present
    const cookieLocale = request.cookies.get(COOKIE_NAME)?.value;
    if (cookieLocale && LOCALES.includes(cookieLocale)) {
        url.pathname = `/${cookieLocale}${pathname}`;
        return NextResponse.redirect(url);
    }

    // Try geo (available on Vercel Edge); map countries
    let detected = null;
    try {
        const country = (request.geo?.country || '').toUpperCase();
        if (country === 'HU') detected = 'hu';
        if (country === 'AT' || country === 'DE') detected = 'de';
    } catch (e) {
        /* ignore */
    }

    // Fallback to Accept-Language
    if (!detected) {
        const accept = request.headers.get('accept-language');
        detected = parseAcceptLanguage(accept);
    }

    const target = detected && LOCALES.includes(detected) ? detected : DEFAULT;

    url.pathname = `/${target}${pathname}`;
    const res = NextResponse.redirect(url);
    res.cookies.set({
        name: COOKIE_NAME,
        value: target,
        path: '/',
        maxAge: COOKIE_MAX_AGE,
        sameSite: 'lax'
    });
    return res;
}

export const config = {
    matcher: ['/((?!_next|api|favicon.ico).*)']
};