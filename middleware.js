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
    let { pathname } = url;

    // Skip internals and assets
    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
        return NextResponse.next();
    }

    // normalize host (strip port and optional www)
    const rawHost = request.headers.get('host') || '';
    const hostname = rawHost.split(':')[0].toLowerCase().replace(/^www\./, '');
    const studioHosts = new Set(['tiffanystudio.at', 'tiffanystudio.hu']);
    const isStudio = studioHosts.has(hostname);

    // If path has a locale prefix
    const parts = (pathname || '/').split('/'); // ['', 'hu', 'tiffanylamps', ...]
    const locale = parts.length > 1 && LOCALES.includes(parts[1]) ? parts[1] : null;

    if (locale) {
        // If on studio host, ensure the `magnoliatiffanystudio` segment is present after locale.
        if (isStudio) {
            const second = parts[2] || '';
            if (second === '' || second === undefined) {
                // `/hu` or `/hu/` -> serve `/hu/magnoliatiffanystudio`
                url.pathname = `/${locale}/magnoliatiffanystudio`;
                return NextResponse.rewrite(url);
            }
            if (second !== 'magnoliatiffanystudio') {
                // `/hu/tiffanylamps...` -> `/hu/magnoliatiffanystudio/tiffanylamps...`
                const rest = parts.slice(2).join('/');
                url.pathname = `/${locale}/magnoliatiffanystudio/${rest}`;
                return NextResponse.rewrite(url);
            }
            // if already `/hu/magnoliatiffanystudio...` do nothing special
            return NextResponse.next();
        }

        // Non-studio hosts with locale prefix, proceed normally
        return NextResponse.next();
    }

    // No locale in path -> handle root / studio root and detection logic
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
