// app/components/Footer.js
"use client"

import {FaCopyright} from "react-icons/fa";
import {Avatar} from "@heroui/react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const LOCALES = ['hu', 'de', 'en'];
const COOKIE_NAME = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const COPYRIGHT_TEXT = {
    hu: '2022-2025 Magnólia Tiffanystúdió | Minden jog fenntartva.',
    de: '2022-2025 Magnolia Tiffany Studio | Alle Rechte vorbehalten.',
    en: '2022-2025 Magnolia Tiffany Studio | All rights reserved.'
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

function setLocaleCookie(locale) {
    document.cookie = `${COOKIE_NAME}=${locale}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

export default function Footer() {
    const pathname = usePathname() || '/';
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentLocale = getLocaleFromPath(pathname);
    const basePath = stripLocaleFromPath(pathname);
    const search = searchParams ? `?${searchParams.toString()}` : '';

    const changeLocale = (locale) => {
        if (!LOCALES.includes(locale)) return;
        setLocaleCookie(locale);
        const hash = (typeof window !== 'undefined' && window.location.hash) ? window.location.hash : '';
        const to = `/${locale}${basePath}${search}${hash}`;
        router.push(to);
    };

    const baseBtnClass = "p-0 bg-transparent border-0 cursor-pointer hover:text-gray-200 transition-colors";

    return (
        <footer className="fixed bottom-0 lg:pr-2 z-53 w-screen lg:w-2/5 h-min mt-10 justify-self-end">
            <div
                className="flex flex-row gap-4 w-full my-2 items-center justify-center lg:justify-end text-gray-400 text-xs">
                <div  className="hidden lg:flex flex-row gap-2 items-center">
                    <button
                        aria-label="Magyar"
                        aria-current={currentLocale === 'hu' ? 'true' : undefined}
                        onClick={() => changeLocale('hu')}
                        className={`${baseBtnClass} ${currentLocale === 'hu' ? 'underline' : ''}`}
                    >
                        magyar
                    </button>
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
                        {COPYRIGHT_TEXT[currentLocale || 'hu']}
                    </p>
                </div>
            </div>
        </footer>
    )
}
