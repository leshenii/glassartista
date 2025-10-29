"use client"

import {FaCopyright} from "react-icons/fa";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const LOCALES = ['hu', 'de', 'en'];
const COOKIE_NAME = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const DEFAULT_LOCALE = 'en';

const HOST_CONFIG = {
    'tiffanystudio.at': { defaultLocale: 'de', hideDefault: true, isStudio: true },
    'tiffanystudio.hu': { defaultLocale: 'hu', hideDefault: true, isStudio: true },
    'glassartista.com': { defaultLocale: 'de', hideDefault: true, isStudio: false },
    'localhost': { defaultLocale: 'de', hideDefault: true, isStudio: false }
};

function stripLocaleFromPath(pathname) {
    const parts = pathname.split('/');
    if (parts.length > 1 && LOCALES.includes(parts[1])) {
        parts.splice(1, 1);
        const p = parts.join('/');
        return p === '' ? '/' : p;
    }
    return pathname;
}

function getLocaleFromPath(pathname) {
    const parts = pathname.split('/');
    return (parts.length > 1 && LOCALES.includes(parts[1])) ? parts[1] : null;
}

function getLocaleFromCookie() {
    if (typeof document === 'undefined') return undefined;
    const m = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]+)/);
    return m ? m[1] : undefined;
}

function setLocaleCookie(locale) {
    if (typeof document === 'undefined') return;
    document.cookie = `${COOKIE_NAME}=${locale}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function getHostCfg() {
    if (typeof window === 'undefined') return { defaultLocale: DEFAULT_LOCALE, hideDefault: false, isStudio: false };
    const host = window.location.hostname.replace(/^www\./, '').toLowerCase();
    return HOST_CONFIG[host] || { defaultLocale: DEFAULT_LOCALE, hideDefault: false, isStudio: false };
}

export default function Footer() {
    const pathname = usePathname() || '/';
    const searchParams = useSearchParams();
    const router = useRouter();

    const hostCfg = getHostCfg();

    // derive current locale: path -> cookie -> host default -> global default
    const currentLocale = getLocaleFromPath(pathname) || getLocaleFromCookie() || hostCfg.defaultLocale || DEFAULT_LOCALE;
    const basePath = stripLocaleFromPath(pathname);
    const search = searchParams ? `?${searchParams.toString()}` : '';


    const host = (typeof window !== 'undefined') ? window.location.hostname.replace(/^www\./, '').toLowerCase() : '';
    const hideHungarian = host === 'tiffanystudio.at';
    const isGlassRoot = (host === 'glassartista.com' || host === 'localhost') && basePath === '/';

    const defaultBrand = (host === 'glassartista.com' || host === 'www.glassartista.com') ? 'GlassArtista' : 'Magnolia Tiffany Studio';
    const huBrand = 'Magnólia Tiffanystudió';
    const brand = currentLocale === 'hu' ? huBrand : defaultBrand;

    const COPYRIGHT_TEXT = {
        hu: `2022-2025 ${brand} | Minden jog fenntartva.`,
        de: `2022-2025 ${brand} | Alle Rechte vorbehalten.`,
        en: `2022-2025 ${brand} | All rights reserved.`
    };

    const changeLocale = (locale) => {
        if (!LOCALES.includes(locale)) return;
        setLocaleCookie(locale);
        const hash = (typeof window !== 'undefined' && window.location.hash) ? window.location.hash : '';
        const cfg = hostCfg;
        let to;
        // If host hides its default locale and we're switching to that default, navigate without prefix
        if (cfg.hideDefault && locale === cfg.defaultLocale) {
            to = `${basePath}${search}${hash}`;
        } else {
            to = `/${locale}${basePath}${search}${hash}`;
        }

        // For glassartista/localhost you may want absolute navigation, but router.push with relative path works on same origin
        router.push(to);
    };

    const baseBtnClass = "p-0 bg-transparent border-0 cursor-pointer hover:text-gray-200 transition-colors";

    return (
        <footer className="fixed bottom-0 lg:pr-2 z-53 w-screen lg:w-2/5 h-min mt-10 justify-self-end animate__animated animate__fadeInUp">
            <div
                className="flex flex-col gap-1 lg:flex-row lg:gap-4 w-full my-2 items-center justify-center lg:justify-end text-gray-300 text-xs">
                <div  className={`${isGlassRoot ? 'flex' : 'hidden lg:flex'} flex-row gap-2 items-center`}>
                    {!hideHungarian && (
                        <button
                            aria-label="Magyar"
                            aria-current={currentLocale === 'hu' ? 'true' : undefined}
                            onClick={() => changeLocale('hu')}
                            className={`${baseBtnClass} ${currentLocale === 'hu' ? 'underline' : ''}`}
                        >
                            magyar
                        </button>
                    )}
                    <button
                        aria-label="Deutsch"
                        aria-current={currentLocale === 'de' ? 'true' : undefined}
                        onClick={() => changeLocale('de')}
                        className={`${baseBtnClass} ${currentLocale === 'de' ? 'underline' : ''}`}
                    >
                        deutsch
                    </button>
                    <button
                        aria-label="English"
                        aria-current={currentLocale === 'en' ? 'true' : undefined}
                        onClick={() => changeLocale('en')}
                        className={`${baseBtnClass} ${currentLocale === 'en' ? 'underline' : ''}`}
                    >
                        english
                    </button>
                </div>
                <div className="flex flex-row gap-2 lg:justify-end">
                    <FaCopyright className="mb-[1px]" size={14}/>
                    <p className="leading-4">
                        {COPYRIGHT_TEXT[currentLocale || hostCfg.defaultLocale || DEFAULT_LOCALE]}
                    </p>
                </div>
            </div>
        </footer>
    )
}