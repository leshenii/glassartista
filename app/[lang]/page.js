'use client'

import * as React from 'react';
import {Button} from "@heroui/react";
import {BsLampFill} from "react-icons/bs";
import {GiWindowBars} from "react-icons/gi";
import {useRouter} from "next/navigation";

const LOCALES = ['hu', 'de', 'en'];
const COOKIE_NAME = 'NEXT_LOCALE';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const DEFAULT_LOCALE = 'en';

function getLocaleFromCookie() {
    if (typeof document === 'undefined') return DEFAULT_LOCALE;
    const m = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]+)/);
    if (m && LOCALES.includes(m[1])) return m[1];
    const nav = (navigator?.language || '').toLowerCase();
    if (nav.startsWith('hu')) return 'hu';
    if (nav.startsWith('de')) return 'de';
    if (nav.startsWith('en')) return 'en';
    return DEFAULT_LOCALE;
}

function setLocaleCookie(locale) {
    if (typeof document === 'undefined') return;
    if (!LOCALES.includes(locale)) return;
    document.cookie = `${COOKIE_NAME}=${locale}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

const TEXTS = {
    hu: {
        title1: 'Magnólia Tiffanystúdió',
        title2: 'Építészeti díszüveg',
        p1: `A Diósgyőri vár szomszédságában található Magnólia Tiffanystúdió több, mint 20 éve foglalkozik az építészethez kapcsolódó külső és belső tereket díszítő vagy elválasztó üvegművészeti alkotások tervezésével és kivitelezésével. Számos üvegablak, ajtóbetét, Tiffany lámpa elkészítése mellett, a régi üvegablakok, lámpák helyreállítása és restaurálása is a munkánk része.`,
        p2: `Cégünk teljeskörű megoldást kínál épület- és belsőépítészeti díszüveg készítésére a tervezéstől egészen a kivitelezésig. Ólomüveg kupolák, díszüveg előtetők, bejárati ajtók, felülvilágítók, modern üvegablakok mind a termékkörünk részét képezik. Minden munkánk a legmagasabb minőséget képviseli, több évtizedes szakmai múltra tekint vissza. Amit nyújtunk: mérnöki tervezés, legmagasabb minőségű művészeti üvegek és alapanyagok felhasználása, professzionális kivitelezés.`,
        btnPrimary: 'Tovább a weboldalra',
        btnDisabled: 'Fejlesztés alatt',
        altLogo1: 'Magnólia Tiffanystudió logó',
        altLogo2: 'Építészeti díszüveg'
    },
    de: {
        title1: 'Magnolia Tiffany Studio',
        title2: 'Architektonisches Dekorglas',
        p1: `Die Magnolia Tiffany Studio beschäftigt sich seit über 20 Jahren mit der Herstellung von Tiffany-Lampen. Diese wunderschönen Lampen werden nach den Originalentwürfen des berühmten Louis Comfort Tiffany gefertigt.`,
        p2: `Unser Unternehmen bietet umfassende Lösungen für die Herstellung von Bau- und Innenarchitektur-Dekorglas, von der Planung bis zur Ausführung. Bleiglas-Kuppeln, dekorative Glasvordächer, Eingangstüren, Oberlichter und moderne Glasfenster gehören zu unserem Produktsortiment. Alle unsere Arbeiten stehen für höchste Qualität und blicken auf eine jahrzehntelange Berufserfahrung zurück.`,
        btnPrimary: 'Zur Webseite',
        btnDisabled: 'In Bearbeitung',
        altLogo1: 'Magnolia Tiffany Studio Logo',
        altLogo2: 'Architektonisches Dekorglas'
    },
    en: {
        title1: 'Magnolia Tiffany Studio',
        title2: 'Architectural Decorative Glass',
        p1: `Magnolia Tiffany Studio has been engaged in the production of Tiffany lamps for over 20 years. These beautiful lamps are crafted after the original designs of the famous Louis Comfort Tiffany.`,
        p2: `Our company offers comprehensive solutions for the manufacture of architectural and interior decorative glass, from design to execution. Lead-glass domes, decorative glass canopies, entrance doors, skylights and modern glass windows are part of our product range. All our work represents the highest quality and is backed by decades of professional experience.`,
        btnPrimary: 'Go to website',
        btnDisabled: 'Under development',
        altLogo1: 'Magnolia Tiffany Studio logo',
        altLogo2: 'Architectural decorative glass'
    }
};

export default function Home({params}) {
    const router = useRouter();

    // Unwrap the params Promise using React.use before accessing properties
    const resolvedParams = React.use ? React.use(params) : params;
    const langParam = resolvedParams?.lang;
    const lang = (langParam && LOCALES.includes(langParam)) ? langParam : DEFAULT_LOCALE;
    const t = TEXTS[lang] || TEXTS[DEFAULT_LOCALE];

    const goToStudio = () => {
        const locale = getLocaleFromCookie();
        const domain = window.location.hostname
        setLocaleCookie(locale);
        if (domain === 'glassartista.com') {
            if (locale === 'hu') {
                router.push(`https://tiffanystudio.hu/${locale}`);
            } else if (locale === 'de' || locale === 'en') {
                router.push('https://tiffanystudio.at/de');
            }
        } else {
            router.push(`/tiffanystudio/`);
        }
    };

    return (
        <div className="h-screen">
            <div className="flex flex-col lg:flex-row text-white items-center justify-center h-full ">
                <div
                    className="lg:w-1/2 p-10 items-center bg-[url(/design/index-tiffany.webp)] bg-center bg-cover h-full relative overflow-hidden">
                    <div
                        className="animate__animated animate__fadeInLeft animate__slow absolute w-[200vw] lg:w-screen inset-0 bg-gradient-to-r from-black/90 to-black/0 z-0"/>
                    <div
                        className="animate__animated animate__fadeIn animate__slow flex flex-col gap-4 justify-center h-full relative z-1">
                        <div className="flex flex-row gap-3">
                            <img
                                draggable={false}
                                alt={t.altLogo1}
                                src="/design/tiffanystudiologowhiteoutline.png"
                                loading="eager"
                                decoding="sync"
                                width={36}
                                style={{objectFit: "contain"}}
                            />
                            <h1 className="text-3xl lg:text-5xl allura-regular pt-2">{t.title1}</h1>
                        </div>
                        <p className="text-sm lg:text-xl text-justify paragraph--p1">{t.p1}</p>
                        <div>
                            <Button className="light" variant="faded" startContent={<BsLampFill size={20}/>}
                                    onPress={goToStudio}>
                                {t.btnPrimary}
                            </Button>
                        </div>
                    </div>
                </div>

                <div
                    className="lg:w-1/2 p-10 items-center bg-[url(/design/index-olomuveg.webp)] bg-center bg-cover h-full relative overflow-hidden">
                    <div
                        className="animate__animated animate__fadeInRight animate__slow absolute w-[300vw] lg:w-screen inset-y-0 right-0 lg:-inset-x-full bg-gradient-to-l from-black/90 to-black/0 z-0"/>
                    <div
                        className="animate__animated animate__fadeIn animate__slow flex flex-col gap-4 justify-center h-full relative z-1">
                        <div className="flex flex-row gap-3">
                            <img
                                draggable={false}
                                alt={t.altLogo2}
                                src="/design/glassartistalogowhiteoutline.png"
                                loading="eager"
                                decoding="sync"
                                width={48}
                                style={{objectFit: "contain"}}
                            />
                            <h1 className="text-3xl lg:text-4xl antonio-navbar tracking-wider ">{t.title2}</h1>
                        </div>
                        <p className="text-sm lg:text-xl text-justify paragraph--p1">{t.p2}</p>
                        <div>
                            <Button className="light" variant="faded"
                                    startContent={<GiWindowBars size={20}/>}
                                    onPress={() => {
                                        router.push('/home')
                                    }}>
                                {t.btnPrimary}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
