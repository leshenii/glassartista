// javascript
// File: `middleware.js`
import { NextResponse } from 'next/server';

const LOCALES = ['hu', 'de', 'en'];
const COOKIE_NAME = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const DEFAULT = 'en';

function parseAcceptLanguage(header) {
    if (!header) return null;
    const langs = header.split(',').map(s => s.trim().toLowerCase());
    for (const l of langs) {
        if (l.startsWith('hu')) return 'hu';
        if (l.startsWith('de')) return 'de';
        if (l.startsWith('en')) return 'en';
    }
    return null;
}

export function middleware(request) {
    const url = request.nextUrl.clone();
    const { pathname } = url;

    // Skip internals and assets
    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
        return NextResponse.next();
    }

    // normalize host (strip port and optional www)
    const rawHost = request.headers.get('host') || '';
    const hostname = rawHost.split(':')[0].toLowerCase().replace(/^www\./, '');
    const studioHosts = new Set(['tiffanystudio.at', 'tiffanystudio.hu']);
    const isStudio = studioHosts.has(hostname);

    // If path already has a locale prefix
    const pathnameHasLocale = LOCALES.some(
        (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
    );

    if (pathnameHasLocale) {
        const matchedLocale = LOCALES.find(loc => pathname === `/${loc}` || pathname === `/${loc}/`);
        if (matchedLocale && isStudio) {
            // internally serve the magnoliatiffanystudio page for bare locale roots on studio hosts
            url.pathname = `/${matchedLocale}/magnoliatiffanystudio`;
            return NextResponse.rewrite(url);
        }
        return NextResponse.next();
    }

    // If requesting the site root on a studio host, rewrite to the studio home (preserve browser URL)
    if (isStudio && (pathname === '/' || pathname === '')) {
        // Respect cookie if present
        let targetLocale = request.cookies.get(COOKIE_NAME)?.value;
        if (!targetLocale || !LOCALES.includes(targetLocale)) {
            // Try geo
            try {
                const country = (request.geo?.country || '').toUpperCase();
                if (country === 'HU') targetLocale = 'hu';
                if (country === 'AT' || country === 'DE') targetLocale = 'de';
            } catch (e) {
                /* ignore */
            }
        }
        // Fallback to Accept-Language
        if (!targetLocale) {
            const accept = request.headers.get('accept-language');
            targetLocale = parseAcceptLanguage(accept) || DEFAULT;
        }

        url.pathname = `/${targetLocale}/magnoliatiffanystudio`;
        // Keep browser URL as `/` (or later you might prefer redirect to `/${targetLocale}`), using rewrite to serve studio home
        return NextResponse.rewrite(url);
    }

    // Respect cookie if present for non-studio hosts / other pages
    const cookieLocale = request.cookies.get(COOKIE_NAME)?.value;
    if (cookieLocale && LOCALES.includes(cookieLocale)) {
        url.pathname = `/${cookieLocale}${pathname}`;
        const res = NextResponse.redirect(url);
        res.cookies.set({
            name: COOKIE_NAME,
            value: cookieLocale,
            path: '/',
            maxAge: COOKIE_MAX_AGE,
            sameSite: 'lax'
        });
        return res;
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
