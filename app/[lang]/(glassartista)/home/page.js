'use client'

import React from 'react';
import Image from "next/image";

const LOCALES = ['hu', 'de', 'en'];
const DEFAULT_LOCALE = 'en';

const TEXT = {
    hu: {
        title: "GlassArtista",
        p1: "Cégünk teljeskörű megoldást kínál épület- és belsőépítészeti díszüveg készítésére a tervezéstől egészen a kivitelezésig.",
        p2: "Ólomüveg kupolák, díszüveg előtetők, bejárati ajtók, felülvilágítók, modern üvegablakok mind a termékkörünk részét képezik.",
        p3: "Minden munkánk a legmagasabb minőséget képviseli, több évtizedes szakmai múltra tekint vissza.",
        p4: "Amit nyújtunk:",
        li1: "Mérnöki tervezés",
        li2: "Legmagasabb minőségű művészeti üvegek és alapanyagok felhasználása",
        li3: "Professzionális kivitelezés",
        li4: "Régi, sérült művészeti üvegablakok, templomi ablakok restaurálása"
    },
    en: {
        title: "GlassArtista",
        p1: "Our company provides complete solutions for creating architectural and interior decorative glass, from design all the way to implementation.",
        p2: "Stained-glass domes, decorative glass canopies, entrance doors, skylights, and modern glass windows are all part of our product range.",
        p3: "Every piece of our work represents the highest quality and is backed by decades of professional experience.",
        p4: "What we offer:",
        li1: "Engineering design",
        li2: "Use of the highest-quality artistic glass and raw materials",
        li3: "Professional execution",
        li4: "Restoration of old, damaged stained glass, church windows"
    },
    de: {
        title: "GlassArtista",
        p1: "Unser Unternehmen bietet umfassende Lösungen für die Herstellung von Bau- und Innenarchitektur-Dekorglas, von der Planung bis zur Ausführung.",
        p2: "Bleiglas-Kuppeln, dekorative Glasvordächer, Eingangstüren, Oberlichter und moderne Glasfenster gehören zu unserem Produktsortiment.",
        p3: "Alle unsere Arbeiten stehen für höchste Qualität und blicken auf eine jahrzehntelange Berufserfahrung zurück.",
        p4: "Was wir bieten:",
        li1: "Technische Planung",
        li2: "Verwendung von hochwertigstem Kunstglas und Rohstoffen.",
        li3: "Professionelle Ausführung und Installierung der Kunstverglasung",
        li4: "Restaurierung von alten, beschädigten Kunstverglasungen, Kirchenfenster"
    }
}

export default function GlassArtistaPage({ params }) {

    const resolvedParams = React.use ? React.use(params) : params;
    const langParam = resolvedParams?.lang;
    const lang = (langParam && LOCALES.includes(langParam)) ? langParam : DEFAULT_LOCALE;

    const t = (TEXT[lang] && TEXT[lang]) ? TEXT[lang] : TEXT[DEFAULT_LOCALE];


    return (
        <div className="w-screen px-10 xl:px-0 xl:w-1/2 justify-self-center pb-16" >
            <Image src="/design/glassartista_logo_text_gradient.png" alt="GlassArtista Logo" width={250} height={250} className=" justify-self-center my-12 select-none animate__animated animate__fadeInDown" draggable={false} />
            <article className="flex flex-col gap-2 text-md xl:text-lg animate__animated animate__fadeInUp">
                <p>{t.p1}</p>
                <p>{t.p2}</p>
                <p>{t.p3}</p>
                <p><strong>{t.p4}</strong></p>
                <ul className="list-disc pl-5">
                    <li>{t.li1}</li>
                    <li>{t.li2}</li>
                    <li>{t.li3}</li>
                    <li>{t.li4}</li>
                </ul>
            </article>
        </div>
    );
}