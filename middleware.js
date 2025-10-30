import { NextResponse } from 'next/server';

const LOCALES = ['hu', 'de', 'en'];
const COOKIE_NAME = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // kept for compatibility but not used
const GLOBAL_DEFAULT = 'en';

// Host-specific configuration
const HOST_CONFIG = {
    'tiffanystudio.at': { defaultLocale: 'de', hideDefault: true, isStudio: true },
    'tiffanystudio.hu': { defaultLocale: 'hu', hideDefault: true, isStudio: true },
    'glassartista.com': { defaultLocale: 'de', hideDefault: true, isStudio: false },
    'localhost': { defaultLocale: 'de', hideDefault: true, isStudio: false } // localhost same as glassartista.com
};

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

function getHostConfig(rawHost) {
    const hostname = (rawHost || '').split(':')[0].toLowerCase().replace(/^www\./, '');
    return HOST_CONFIG[hostname] || { defaultLocale: GLOBAL_DEFAULT, hideDefault: false, isStudio: false };
}

export function middleware(request) {
    const url = request.nextUrl.clone();
    let { pathname } = url;

    // Skip internals and assets
    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.includes('.')) {
        return NextResponse.next();
    }

    const rawHost = request.headers.get('host') || '';
    const hostname = rawHost.split(':')[0].toLowerCase().replace(/^www\./, '');
    const hostCfg = getHostConfig(rawHost);
    const isStudio = hostCfg.isStudio;
    const hostDefault = hostCfg.defaultLocale;
    const hideDefault = hostCfg.hideDefault;

    // If path already has a locale prefix
    const pathnameHasLocale = LOCALES.some(
        (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
    );

    // MAP of top-level public paths to tiffanystudio subtree
    const MAP = {
        '/contact': '/tiffanystudio/contact',
        '/lampbases': '/tiffanystudio/lampbases',
        '/tiffanylamps': '/tiffanystudio/tiffanylamps',
        '/tiffanylampsavailable': '/tiffanystudio/tiffanylampsavailable'
    };

    if (pathnameHasLocale) {
        const matchedLocale = LOCALES.find(loc => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`));
        if (matchedLocale) {
            if (isStudio) {
                // Map top-level routes (after locale) into the internal tiffanystudio subtree
                const afterLocale = pathname.slice(`/${matchedLocale}`.length) || '/';
                for (const [src, dst] of Object.entries(MAP)) {
                    if (
                        afterLocale === src ||
                        afterLocale === src + '/' ||
                        afterLocale.startsWith(src + '/')
                    ) {
                        const rest = afterLocale.slice(src.length); // keep any subpath or trailing slash
                        url.pathname = `/${matchedLocale}${dst}${rest}`;
                        return NextResponse.rewrite(url);
                    }
                }

                // internally serve the tiffanystudio page for bare locale roots on studio hosts
                if (afterLocale === '/' || afterLocale === '') {
                    url.pathname = `/${matchedLocale}/tiffanystudio`;
                    return NextResponse.rewrite(url);
                }
            }
            return NextResponse.next();
        }
    }

    function detectLocale(hostDefaultParam, hideDefaultParam /* cookies ignored */) {
        // prefer host default for hosts that hide their default
        if (hideDefaultParam && hostDefaultParam && LOCALES.includes(hostDefaultParam)) return hostDefaultParam;

        // accept-language header
        const accept = request.headers.get('accept-language');
        const parsed = parseAcceptLanguage(accept);
        if (parsed && LOCALES.includes(parsed)) return parsed;

        // host-specific default fallback
        if (hostDefaultParam && LOCALES.includes(hostDefaultParam)) return hostDefaultParam;

        // global fallback
        return GLOBAL_DEFAULT;
    }

    // Special handling for studio hosts: public top-level routes map to internal /{locale}/tiffanystudio/*
    if (isStudio) {
        // If user requested site root on studio host -> serve internal studio home
        if (pathname === '/' || pathname === '') {
            // Cookies are ignored here — detectLocale never reads cookies
            const targetLocale = detectLocale(hostDefault, hideDefault);
            url.pathname = `/${targetLocale}/tiffanystudio`;
            // If we hide default locale and target is host default, keep browser URL as '/' (rewrite)
            if (hideDefault && targetLocale === hostDefault) {
                return NextResponse.rewrite(url);
            }
            // Otherwise redirect user to visible locale-prefixed root (no cookie set)
            return NextResponse.redirect(url);
        }

        // If path begins with /tiffanystudio and there's no locale prefix, map it same as top-level
        if (pathname.startsWith('/tiffanystudio')) {
            const after = pathname.slice('/tiffanystudio'.length) || '/';
            const targetLocale = detectLocale(hostDefault, hideDefault);
            url.pathname = `/${targetLocale}/tiffanystudio${after}`;
            if (hideDefault && targetLocale === hostDefault) {
                // keep URL visible as the requested `/tiffanystudio/...` (rewrite)
                return NextResponse.rewrite(url);
            } else {
                // redirect to /{locale}/tiffanystudio/... (no cookie set)
                const redirectUrl = request.nextUrl.clone();
                redirectUrl.pathname = `/${targetLocale}${pathname}`;
                return NextResponse.redirect(redirectUrl);
            }
        }

        // If path is a top-level mapped route (like /contact) and there is no locale prefix, rewrite/redirect
        for (const [src, dst] of Object.entries(MAP)) {
            if (
                pathname === src ||
                pathname === src + '/' ||
                pathname.startsWith(src + '/')
            ) {
                const rest = pathname.slice(src.length);
                const targetLocale = detectLocale(hostDefault, hideDefault);
                url.pathname = `/${targetLocale}${dst}${rest}`; // dst already contains /tiffanystudio
                if (hideDefault && targetLocale === hostDefault) {
                    // public URL remains '/contact' etc.
                    return NextResponse.rewrite(url);
                } else {
                    // redirect to /{locale}/contact (visible) without setting a cookie
                    const redirectUrl = request.nextUrl.clone();
                    redirectUrl.pathname = `/${targetLocale}${pathname}`;
                    return NextResponse.redirect(redirectUrl);
                }
            }
        }
    }

    // Non-studio hosts or no special mapping
    // Cookies are ignored: do not read or set cookie for locale
    // Try detection
    const detected = detectLocale(hostDefault, hideDefault);
    const target = (detected && LOCALES.includes(detected)) ? detected : GLOBAL_DEFAULT;

    // For hosts that hide default locale, if the target equals host default and path is root-ish, keep visible root.
    if (hideDefault && target === hostDefault) {
        // serve internal localized path without changing browser URL
        url.pathname = `/${target}${pathname.startsWith('/') ? '' : '/'}${pathname}`.replace(`//`, '/');
        return NextResponse.rewrite(url);
    }

    // Otherwise redirect to localized path (visible) — no cookie set
    url.pathname = `/${target}${pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    matcher: ['/((?!_next|api|favicon.ico).*)']
};
