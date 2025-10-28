'use client'

import React, {createRef, useEffect, useMemo, useRef, useState} from "react";
import {ImageCarousel, TextCarousel} from "@/app/components/carousel";
import {IconArrowNarrowRight} from "@tabler/icons-react";

import {PiAcornFill, PiFlowerFill, PiFlowerTulipBold, PiFlowerTulipFill} from "react-icons/pi";
import {
    GiChestnutLeaf,
    GiCurlingVines,
    GiDoorway,
    GiDragonfly,
    GiFairyWings,
    GiLilyPads,
    GiWindowBars
} from "react-icons/gi";
import {IoRose} from "react-icons/io5";
import {Button} from "@heroui/react";
import {FaArrowAltCircleDown, FaArrowAltCircleUp} from "react-icons/fa";
import {MdChurch, MdLocalFlorist} from "react-icons/md";
import {FaLandmarkDome} from "react-icons/fa6";
import {BiArch, BiVerticalTop} from "react-icons/bi";

const LOCALES = ['hu', 'de', 'en'];
const DEFAULT_LOCALE = 'en';

const PROJECTS_META = [
    {key: "dome", icon: FaLandmarkDome, refIdx: 0},
    {key: "canopy", icon: BiArch, refIdx: 1},
    {key: "entrance", icon: GiDoorway, refIdx: 2},
    {key: "window", icon: GiWindowBars, refIdx: 3},
    {key: "ceiling", icon: BiVerticalTop, refIdx: 4},
    {key: "ecclesial", icon: MdChurch, refIdx: 5},
];

const TEXTS = {
    hu: {
        dome: [
            {title: "Ólomüveg kupola", src: "/glassartista/dome/dome-1.webp"},
            {
                paragraph: "Az itt látható ólomüveg kupola üvegfelülete 10,5 négyzetméter, ólomsínes technikával a német Glashütte Lamberts üveggyár által kifejezetten erre a munkára legyártatott fújt és kézzel hengerelt katedrál üvegből készült.",
                src: "/glassartista/dome/dome-2.webp"
            },
            {
                paragraph: "A kupola stabilitását ólomsínes technológia mellett az általunk megtervezett és legyártott speciális merevítőszerkezet adja.",
                src: "/glassartista/dome/dome-3.webp"
            },
            {
                paragraph: "A kupolát tartó rozsdamentes acél tartószerkezetet szintén cégünk tervezte és gyárttatta le.",
                src: "/glassartista/dome/dome-4.webp"
            },
            {
                paragraph: "Az ólomüveg kupola 24 darab része összesen 1820 darab üvegelemből áll, és 144 db csiszolt kristály ékkő és számtalan fazettázott üvegelem díszíti, ami különlegessé és egyedivé teszi ezt az alkotást.",
                src: "/glassartista/dome/dome-5.webp"
            },
            {paragraph: "Ólomsínes technika", src: "/glassartista/dome/dome-6.webp"},
            {src: "/glassartista/dome/dome-7.webp"},
        ],
        canopy: [
            {title: "Ólomüveg előtető", src: "/glassartista/canopy/canopy-1.webp"},
            {
                paragraph: "Modern és egyben nagyon stílusos ez a monumentális méretű ólomüveg előtető, melyet 160 darab, egyenként 37×37 cm méretű ólomsínes és fusing (üvegolvasztásos) technikával készített üvegkazetta díszíti.",
                src: "/glassartista/canopy/canopy-2.webp"
            },
            {
                paragraph: "Az egyszerű, de nagyszerű minta elkészítése alatt 1 hónapon át folyamatosan izottak műhelyünkben az üvegkemencék. Az ólomüveg kazetták 3 rétegű hőszigetelt és edzett üveg-szerkezetben kerültek beépítésre, így a szélsőséges időjárásnak is bátran ellenállnak.",
                src: "/glassartista/canopy/canopy-3.webp"
            },
            {
                paragraph: "Az előtetőt díszítő díszüvegbetétek összmérete 22 négyzetméter nagyságú. Az acél tartószerkezet tervezését és gyártását szintén cégünk végezte.",
                src: "/glassartista/canopy/canopy-4.webp"
            },
            {
                paragraph: "Ólomsínes és Tiffany technika\n" +
                    "Projekt átadása: 2021. november\n" +
                    "Elkészítési idő: a tervezéstől az átadásig 3 hónap"
            },
        ],
        entrance: [
            {title: "Fazettázott ólomüveg bejárati ajtó", src: "/glassartista/entrance/entrance-1.webp"},
            {
                paragraph: "Az itt látható bejárati főportál az üvegelemekkel együtt több, mint 12,5 méter magas, 2 elemeletnyi helyet foglal el.",
                src: "/glassartista/entrance/entrance-2.webp"
            },
            {
                paragraph: "A díszüveg ablakok a Glashütte Lamberts és Uroboros üveggyár kézzel hengerelt katedrálüvegjeiből készültek.",
                src: "/glassartista/entrance/entrance-3.webp"
            },
            {
                paragraph: "A földszinten a hatalmas kétszárnyú bejárati ajtó mellett mindkét oldalon egy-egy hosszú és egy-egy rövidebb ólomüvegpanel fogadja a látogatót.",
                src: "/glassartista/entrance/entrance-4.webp"
            },
            {
                paragraph: "A díszüveg mintázata egyben klasszikus és modern elemeket is tartalmaz. A szélső fazettázott elemek lenyűgöző eleganciát kölcsönöznek a díszüvegnek.",
                src: "/glassartista/entrance/entrance-5.webp"
            },
            {
                paragraph: "Az emeleti szinten lévő ólomüvegszerkezet mintázatában már sokkal szabadabb, játékosabb stílust képvisel. De itt is törekedtünk a modern eleganciára, a földszinti üvegbetétekkel történő összhangra.",
                src: "/glassartista/entrance/entrance-6.webp"
            },
            {
                paragraph: "Az emeleti díszüveg család 8 üvegablakból áll, a legnagyobb ablakelem több, mint 2×1 méter nagyságú.",
                src: "/glassartista/entrance/entrance-7.webp"
            },
            {
                paragraph: "A méretekből adódóan csakis ólomsínes technológia jöhetett szóba, hiszen ekkora üvegfelületnél csakis így lehet az üvegnek a megfelelő stabilitását biztosítani.",
                src: "/glassartista/entrance/entrance-8.webp"
            },
            {
                paragraph: "Az emeleti teret díszítő ólomüveg ablakokat csiszolt kristálykövekkel díszítettük, ami hihetetlen nagyvonalú, elegáns kinézetet kölcsönöz az alkotásnak.",
                src: "/glassartista/entrance/entrance-9.webp"
            },
            {
                paragraph: "Ólomsínes technika\n" +
                    "Projekt átadása: 2022. nyara\n" +
                    "Elkészítési idő: 1 hónap", src: "/glassartista/entrance/entrance-10.webp"
            },
        ],
        window: [
            {title: "Ólomüveg ablak ékkövekkel díszítve", src: "/glassartista/window/window-1.jpg"},
            {
                paragraph: "Ha meghalljuk az ólomüveg szót, legtöbbször tradicionális díszüvegre, vagy festett templomüvegre gondolunk.",
                src: "/glassartista/window/window-2.jpg"
            },
            {
                paragraph: "Mennyivel másabb, könnyedebb stílusú az itt látható ólomüveg ablak, ugye? Pedig ugyanaz a hagyományos ólmozott sínes technológiával készül, de a csodaszép eltérő fajtájú és különleges felületű átlátszó és színtelen katedrál üvegek felhasználásával egy egészen könnyed, modernebb mintázat lett a végeredmény.",
                src: "/glassartista/window/window-3.jpg"
            },
            {
                paragraph: "A kristály ékkövekkel díszített ólomüveg ablak 8 darab üvegkazettából , 552 darab díszüveg elemből áll, melyek összesen több mint 7,5 négyzetméter nagyságúak.",
                src: "/glassartista/window/window-4.jpg"
            },
            {
                paragraph: "Az ólomüveg elemek az elkészítésük után hőszigetelt üvegben kerültek a végleges helyükre beépítve.",
                src: "/glassartista/window/window-5.jpg"
            },
            {
                paragraph: "Az üvegkollekció megálmodása után a mérnöki tervezés segített, hogy minden egyes üvegelem tizedmilliméter pontosan passzoljon a helyére.",
                src: "/glassartista/window/window-6.jpg"
            },
            {
                paragraph: "Az ólomüveg ablak kollekció a híres német Lamberts Glashütte és az amerikai Spectrum, illetve Wissmach üveggyárak csodálatos katedrál üvegeinek felhasználásával készült, emellett a csiszolt kristály ékkövek teszik egyedi, egyfajta modern eleganciát kölcsönöznek a díszüvegnek és a lakásnak egyaránt.",
                src: "/glassartista/window/window-7.jpg"
            },
            {
                paragraph: "Ki ne szeretné, ha egy ilyen lenyűgöző ólomüveg kollekció mosolyogna rá nap mint nap?",
                src: "/glassartista/window/window-8.jpg"
            },
            {
                paragraph: "Ólomsínes technika\n" +
                    "Projekt kezdete: 2022. február\n" +
                    "Átadás: 2022. húsvét\n", src: "/glassartista/window/window-9.jpg"
            },
            {paragraph: "", src: "/glassartista/window/window-10.jpg"},
            {paragraph: "", src: "/glassartista/window/window-11.jpg"},
            {paragraph: "", src: "/glassartista/window/window-12.jpg"},
            {paragraph: "", src: "/glassartista/window/window-13.jpg"},
            {paragraph: "", src: "/glassartista/window/window-14.jpg"},
        ],
        ceiling: [
            {title: "Ólomüveg mennyezet", src: "/glassartista/ceiling/ceiling-1.mp4"},
            {paragraph: "Egy újonnan épülő családi ház étkezőjében kapott ez a csodás díszüveg mennyezet, a „Virágom, virágom” főszerepet. Habár az épület és a berendezés minimalista stílusú, de a család ragaszkodott a színes virág mintához. Milyen jól tette, ugye?", src: "/glassartista/ceiling/ceiling-2.jpg"},
            {paragraph: "Minden egyes virág és levél más és más formájú, a többféle fajtájú és színű Tiffany üveg felhasználásával egy különleges üvegkompozíció tárul a szemünk elé. A pillangó, amihez a kislányok ragaszkodtak, kedves kis játékosságot kölcsönöz a díszüvegnek.", src: "/glassartista/ceiling/ceiling-3.jpg"},
            {paragraph: "Egy ilyen ólomüveg mennyezet alatt minden étkezés egy élmény tud lenni, a szürke hétköznapokat is „felvirágoztatja”.", src: "/glassartista/ceiling/ceiling-4.jpg"},
            {paragraph: "Tiffany technika speciális merevítőrendszerrel\n" +
                    "Projekt átadása: 2024. február\n" +
                    "Elkészítési idő: 1,5 hónap\n" +
                    "Méret: 120×240 cm ", src: "/glassartista/ceiling/ceiling-5.jpg"},
            {paragraph: "", src: "/glassartista/ceiling/ceiling-6.jpg"},
            {paragraph: "", src: "/glassartista/ceiling/ceiling-7.jpg"},
            {paragraph: "", src: "/glassartista/ceiling/ceiling-8.jpg"},
        ],
        ecclesial: [
            {title: "Egyházi üvegek", src: "/glassartista/ecclesial/ecclesial-1.jpg"},
            { paragraph: "Bátran kijelenthetjük, hogy az üvegművészetben a leglátványosabbak az egyházi, azaz templomüvegek. Festett színpompompás üvegkompozíciók jellemzik őket, melyek csodálatos fényjátékot kölcsönöznek az egyházi épületeknek.",
                src: "/glassartista/ecclesial/ecclesial-2.jpg" },
            { paragraph: "Mind a modern, mind pedig a tradicionális egyházi üvegművészetben is otthonosan mozgunk, nemcsak elkészítjük, hanem restauráljuk is a régi, vagy sérült ólomüvegeket.",
                src: "/glassartista/ecclesial/ecclesial-3.jpg" },
            { paragraph: "Ezen a fotósorozaton a Diósgyőri Kisboldogasszony Óvoda Imatermébe készült üvegablak fotóit látod.", src: "/glassartista/ecclesial/ecclesial-4.jpg" },
            { src: "/glassartista/ecclesial/ecclesial-5.jpg" },
            { src: "/glassartista/ecclesial/ecclesial-6.jpg" },
            { src: "/glassartista/ecclesial/ecclesial-7.jpg" },
            { src: "/glassartista/ecclesial/ecclesial-8.jpg" },
        ],
    },
    de: {
        dome: [
            {title: "Bleiglaskuppel", src: "/glassartista/dome/dome-1.webp"},
            {
                paragraph: "Die hier gezeigte Bleiglaskuppel hat eine Glasoberfläche von 10,5 Quadratmetern und wurde in Bleiglastechnik aus mundgeblasenem und handgerolltem Kathedralglas gefertigt, das von der deutschen Glashütte Lamberts speziell für diese Arbeit hergestellt wurde.",
                src: "/glassartista/dome/dome-2.webp"
            },
            {
                paragraph: "Die Stabilität der Kuppel wird neben der Bleisglastechnik durch eine von uns geplante und gefertigte spezielle Versteifungskonstruktion gewährleistet.",
                src: "/glassartista/dome/dome-3.webp"
            },
            {
                paragraph: "Die Edelstahl-Tragkonstruktion, die die Kuppel trägt, wurde ebenfalls von unserer Firma entworfen und hergestellt.",
                src: "/glassartista/dome/dome-4.webp"
            },
            {
                paragraph: "Die Bleiglaskuppel besteht aus 24 Teilen mit insgesamt 1820 Glaselementen und ist mit 144 geschliffenen Kristalljuwelen und unzähligen facettierten Glaselementen verziert, was diese Kreation besonders und einzigartig macht.",
                src: "/glassartista/dome/dome-5.webp"
            },
            {paragraph: "Bleirinnen-Technik", src: "/glassartista/dome/dome-6.webp"},
            {src: "/glassartista/dome/dome-7.webp"},
        ],
        canopy: [
            {title: "Vordach", src: "/glassartista/canopy/canopy-1.webp"},
            {
                paragraph: "Modern und zugleich sehr stilvoll ist dieses monumentale Vordach, das mit 160 Glaskasetten verziert ist, die jeweils 37×37 cm groß sind und mit Bleigverglasung und Fusing-Technik (Glasschmelztechnik) hergestellt wurden.",
                src: "/glassartista/canopy/canopy-2.webp"
            },
            {
                paragraph: "Die Bleiglasplatten wurden in einem 3-schichtigen wärmedämmenden und gehärteten Glasverbund eingebaut, sodass sie extremen Wetterbedingungen problemlos standhalten.",
                src: "/glassartista/canopy/canopy-3.webp"
            },
            {
                paragraph: "Die Gesamtfläche der dekorativen Glaselemente die das Vordach schmücken, beträgt 22 Quadratmeter. Die Planung und Fertigung der Stahlunterkonstruktion wurden ebenfalls von unserem Unternehmen durchgeführt.",
                src: "/glassartista/canopy/canopy-4.webp"
            },
            {
                paragraph: "Bleirinnen- und Tiffany-Technik\n" +
                "Projektübergabe: November 2021\n" +
                "Herstellungszeit: 3 Monate von der Planung bis zur Übergabe"
            },
        ],
        entrance: [
            {title: "Eingang", src: "/glassartista/entrance/entrance-1.webp"},
            {
                paragraph: "Das hier gezeigte Hauptportal am Eingang ist zusammen mit den Glaselementen über 12,5 Meter hoch und erstreckt sich über zwei Stockwerke.",
                src: "/glassartista/entrance/entrance-2.webp"
            },
            {
                paragraph: "Die Buntglasfenster wurden aus handgewalztem Kathedralglas der Glashütte Lamberts und der Glasmanufaktur Uroboros gefertigt.",
                src: "/glassartista/entrance/entrance-3.webp"
            },
            {
                paragraph: "Im Erdgeschoss empfangen den Besucher neben der riesigen zweiflügeligen Eingangstür auf beiden Seiten jeweils ein langes und ein kürzeres Bleiglaspanel.",
                src: "/glassartista/entrance/entrance-4.webp"
            },
            {
                paragraph: "Die Musterung des Buntglases enthält sowohl klassische als auch moderne Elemente. Die äußeren, facettierten Elemente verleihen dem Buntglas eine beeindruckende Eleganz.",
                src: "/glassartista/entrance/entrance-5.webp"
            },
            {
                paragraph: "Die Bleiglasstruktur auf der Ebene des Obergeschosses repräsentiert in ihrer Musterung bereits einen viel freieren, spielerischeren Stil. Aber auch hier haben wir uns um moderne Eleganz und die Harmonie mit den Glaseinsätzen im Erdgeschoss bemüht.",
                src: "/glassartista/entrance/entrance-6.webp"
            },
            {
                paragraph: "Die ganze Kunstglaskollektion im Obergeschoss besteht aus 8 Glasfenstern, wobei das größte Fensterelement über 2×1 Meter groß ist.",
                src: "/glassartista/entrance/entrance-7.webp"
            },
            {
                paragraph: "Aufgrund der Abmessungen kam nur die Bleiverglasungstechnik in Frage, da nur so die entsprechende Stabilität des Glases bei einer so großen Glasfläche gewährleistet werden kann.",
                src: "/glassartista/entrance/entrance-8.webp"
            },
            {
                paragraph: "Die Bleiglasfenster, die den Raum im Obergeschoss schmücken, wurden mit geschliffenen Kristallsteinen verziert, was der Kreation ein unglaublich großzügiges, elegantes Aussehen verleiht.",
                src: "/glassartista/entrance/entrance-9.webp"
            },
            {
                paragraph: "Bleirinnen-Technik\nProjektübergabe: Sommer 2022\nHerstellungszeit: 1 Monat",
                src: "/glassartista/entrance/entrance-10.webp"
            }
        ],
        window: [
            {title: "Fenster", src: "/glassartista/window/window-1.jpg"},
            {
                paragraph: "Wenn wir das Wort Bleiglas hören, denken die meisten von uns an traditionelle Bleiverglasung oder bemalte Kirchenfenster.",
                src: "/glassartista/window/window-2.jpg"
            },
            {
                paragraph: "Wie viel anders und leichter ist der Stil dieses Bleiglasfensters hier, nicht wahr? Dabei wird es mit der gleichen traditionellen Bleiverglasungstechnik hergestellt, aber die Verwendung von wunderschönen, unterschiedlichen Arten und speziell bearbeiteten transparenten und farblosen Kathedralgläsern führt zu einem ganz leichten, moderneren Design.",
                src: "/glassartista/window/window-3.jpg"
            },
            {
                paragraph: "Das mit Kristalljuwelen verzierte Bleiglasfenster besteht aus 8 Glaskassetten und 552 Glaselementen, die insgesamt mehr als 7,5 Quadratmeter groß sind.",
                src: "/glassartista/window/window-4.jpg"
            },
            {
                paragraph: "Nach der Herstellung wurden die Fensterelemente in Isolierglas eingebaut, um ihren endgültigen Platz zu finden.",
                src: "/glassartista/window/window-5.jpg"
            },
            {
                paragraph: "Nach der Konzeption der Glaskollektion half die technische Planung dabei, dass jedes einzelne Glaselement bis auf den Zehntelmillimeter genau an seinen Platz passte.",
                src: "/glassartista/window/window-6.jpg"
            },
            {
                paragraph: ". Die Bleiglas-Fensterkollektion wurde unter Verwendung der wunderbaren Kathedralgläser der berühmten deutschen Lamberts Glashütte und der amerikanischen Glasfabriken Spectrum bzw. Wissmach hergestellt.",
                src: "/glassartista/window/window-7.jpg"
            },
            {
                paragraph: "Darüber hinaus verleihen die geschliffenen Kristalljuwelen dem Fenster und der Wohnung gleichermaßen eine einzigartige, moderne Eleganz. Wer würde sich nicht freuen, wenn eine solch beeindruckende Bleiglaskollektion ihn Tag für Tag anlächeln würde?",
                src: "/glassartista/window/window-8.jpg"
            },
            {
                paragraph: "Bleirinnen-Technik\nProjektbeginn: Februar 2022\nÜbergabe: Ostern 2022",
                src: "/glassartista/window/window-9.jpg"
            },
            {paragraph: "", src: "/glassartista/window/window-10.jpg"},
            {paragraph: "", src: "/glassartista/window/window-11.jpg"},
            {paragraph: "", src: "/glassartista/window/window-12.jpg"},
            {paragraph: "", src: "/glassartista/window/window-13.jpg"},
            {paragraph: "", src: "/glassartista/window/window-14.jpg"},
        ],
        ceiling: [
            {title: "Glasdecke", src: "/glassartista/ceiling/ceiling-1.mp4"},
            {paragraph: " Diese wundervolle Glasdecke, \"Meine Blume, meine Blume\", erhielt in einem Esszimmer eines neu gebauten Einfamilienhauses die Hauptrolle.", src: "/glassartista/ceiling/ceiling-2.jpg"},
            {paragraph: "Obwohl das Gebäude und die Einrichtung minimalistisch gehalten sind, bestand die Familie auf dem farbenfrohen Blumenmuster. Wie gut sie das getan hat, nicht wahr?", src: "/glassartista/ceiling/ceiling-3.jpg"},
            {paragraph: "Jede einzelne Blume und jedes Blatt hat eine andere Form, und durch die Verwendung verschiedener Arten und Farben von Tiffany-Glas eröffnet sich uns eine außergewöhnliche Glaskomposition.", src: "/glassartista/ceiling/ceiling-4.jpg"},
            {paragraph: "Der Schmetterling, auf den die kleinen Mädchen bestanden, verleiht dem Glasfenster eine liebevolle Verspieltheit.", src: "/glassartista/ceiling/ceiling-5.jpg"},
            {paragraph: "Unter einer solchen Bleiglas-Decke kann jede Mahlzeit zu einem Erlebnis werden und selbst die grauen Wochentage „aufblühen“.", src: "/glassartista/ceiling/ceiling-6.jpg"},
            {paragraph: "", src: "/glassartista/ceiling/ceiling-7.jpg"},
            {
                paragraph: "Tiffany-Technik mit speziellem Verstärkungssystem\nProjektübergabe: Februar 2024\nHerstellungszeit: 1,5 Monate\nGröße: 120×240 cm",
                src: "/glassartista/ceiling/ceiling-8.jpg"
            }
        ],
        ecclesial: [
            {title: "Kirchenfenster", src: "/glassartista/ecclesial/ecclesial-1.jpg"},
            { paragraph: "Wir können mit Sicherheit sagen, dass die Kirchenfenster die spektakulärsten in der Glaskunst sind. Sie zeichnen sich durch farbenprächtige Glasmalereikompositionen aus, die den Kirchengebäuden ein wunderbares Lichtspiel verleihen.",
                src: "/glassartista/ecclesial/ecclesial-2.jpg" },
            { paragraph: "Wir sind sowohl in der modernen als auch in der traditionellen Kirchenglaskunst zu Hause und fertigen nicht nur neue Fenster an, sondern restaurieren auch alte oder beschädigte Bleiglasfenster.",
                src: "/glassartista/ecclesial/ecclesial-3.jpg" },
            { paragraph: "In dieser Fotoserie siehst du Aufnahmen der Glasfenster, die für den Gebetsraum des Kindergartens Mariä Geburt in Diósgyőr angefertigt wurden.", src: "/glassartista/ecclesial/ecclesial-4.jpg" },
            { src: "/glassartista/ecclesial/ecclesial-5.jpg" },
            { src: "/glassartista/ecclesial/ecclesial-6.jpg" },
            { src: "/glassartista/ecclesial/ecclesial-7.jpg" },
            { src: "/glassartista/ecclesial/ecclesial-8.jpg" },
        ],
    },
    en: {
        dome: [
            {title: "Dome", src: "/glassartista/dome/dome-1.webp"},
            {
                paragraph: "The glass surface of the stained-glass dome shown here is 10.5 square meters. It is made of blown and hand-rolled cathedral glass manufactured specifically for this work by the German Glashütte Lamberts glass factory using the lead rail technique.",
                src: "/glassartista/dome/dome-2.webp"
            },
            {
                paragraph: "Besides the application of the lead rail technology, the stability of the dome is provided by the special bracing structure designed and manufactured by us.",
                src: "/glassartista/dome/dome-3.webp"
            },
            {
                paragraph: "The stainless-steel support structure holding the dome was also designed and got manufactured by our company.",
                src: "/glassartista/dome/dome-4.webp"
            },
            {
                paragraph: "The 24 parts of the stained-glass dome consist of 1,820 glass elements and are decorated with 144 polished crystal gemstones and countless faceted glass elements that make this piece special and unique.",
                src: "/glassartista/dome/dome-5.webp"
            },
            {paragraph: "Lead Rail technology", src: "/glassartista/dome/dome-6.webp"},
            {src: "/glassartista/dome/dome-7.webp"},
        ],
        canopy: [
            {title: "Canopy", src: "/glassartista/canopy/canopy-1.webp"},
            {
                paragraph: "This monumental canopy is decorated with 160 pieces of 37 x 37 cm leaded decorative glass cassettes made using the fusing technique. The decorative glass cassettes are housed in a 3-layer heat-insulated, tempered glass structure therefore they can withstand extreme weather.",
                src: "/glassartista/canopy/canopy-2.webp"
            },
            {
                paragraph: "The total size of the decorative glass inserts decorating the canopy is 22 square meters.",
                src: "/glassartista/canopy/canopy-3.webp"
            },
            {
                paragraph: "Our company designed the steel support structure as well.",
                src: "/glassartista/canopy/canopy-4.webp"
            },
            {
                paragraph: "Lead rail and Tiffany technique\n" +
                    "Projekt completion: November 2021\n" +
                    "Production time: 3 months from design to completion"
            },
        ],
        entrance: [
            {title: "Entrance", src: "/glassartista/entrance/entrance-1.webp"},
            {
                paragraph: "The main entrance portal shown here, including the glass elements, is more than 12.5 meters and two stories high.",
                src: "/glassartista/entrance/entrance-2.webp"
            },
            {
                paragraph: "The decorative glass windows are made of hand-rolled cathedral glass from the Glashütte Lamberts and Uroboros glass factories.",
                src: "/glassartista/entrance/entrance-3.webp"
            },
            {
                paragraph: "On the ground floor, next to the huge double-winged entrance door, visitors are greeted by one long and one shorter stained-glass panel on both sides.",
                src: "/glassartista/entrance/entrance-4.webp"
            },
            {
                paragraph: "The pattern of the decorative glass contains both classic and modern elements. The edge faceted elements provide impressive elegance for the decorative glass.",
                src: "/glassartista/entrance/entrance-5.webp"
            },
            {
                paragraph: "The pattern of the stained-glass structure upstairs represents a much freer, more playful style. We strove here for modern elegance as well and for harmony with the glass inserts on the ground floor.",
                src: "/glassartista/entrance/entrance-6.webp"
            },
            {
                paragraph: "The decorative glass family upstairs consist of 8 glass windows, the largest window element is more than 2×1 meters in size.",
                src: "/glassartista/entrance/entrance-7.webp"
            },
            {
                paragraph: "Due to its dimensions only lead rail technology could be considered, as this is the only way to ensure the appropriate stability of such a large glass surface.",
                src: "/glassartista/entrance/entrance-8.webp"
            },
            {
                paragraph: "The stained-glass windows upstairs were decorated with polished crystal stones, which provide the piece an incredibly generous, elegant look.",
                src: "/glassartista/entrance/entrance-9.webp"
            },
            {
                paragraph: "Lead came technique\n" +
                    "Project completion: Summer 2022\n" +
                    "Production time: 1 month", src: "/glassartista/entrance/entrance-10.webp"
            },
        ],
        window: [
            {title: "Window", src: "/glassartista/window/window-1.jpg"},
            {
                paragraph: "When we hear the word 'stained glass', we often think of traditional decorative or painted church windows.",
                src: "/glassartista/window/window-2.jpg"
            },
            {
                paragraph: "But how different and lighter in style is this stained glass window, isn’t it? It’s still made with the traditional lead came technique, but by using beautifully varied, transparent and colorless cathedral glass types, the result is a light, modern pattern.",
                src: "/glassartista/window/window-3.jpg"
            },
            {
                paragraph: "The stained glass window decorated with crystal gemstones consists of 8 glass panels and 552 decorative glass pieces, with a total surface area exceeding 7.5 square meters.",
                src: "/glassartista/window/window-4.jpg"
            },
            {
                paragraph: "After being crafted, the stained glass elements were built into insulated glass units at their final location.",
                src: "/glassartista/window/window-5.jpg"
            },
            {
                paragraph: "After designing the glass collection, engineering precision ensured that every single glass piece fit into its place with a tolerance of just tenths of a millimeter.",
                src: "/glassartista/window/window-6.jpg"
            },
            {
                paragraph: "The stained glass window collection was created using the magnificent cathedral glasses of the renowned German Lamberts Glashütte and the American Spectrum and Wissmach glassworks. The cut crystal gemstones make the artwork unique, lending a modern elegance to both the glass and the home.",
                src: "/glassartista/window/window-7.jpg"
            },
            {
                paragraph: "Who wouldn’t love to be greeted every day by such a breathtaking stained glass collection?",
                src: "/glassartista/window/window-8.jpg"
            },
            {
                paragraph: "Lead came technique\n" +
                    "Project start: February 2022\n" +
                    "Completion: Easter 2022\n", src: "/glassartista/window/window-9.jpg"
            },
            {paragraph: "", src: "/glassartista/window/window-10.jpg"},
            {paragraph: "", src: "/glassartista/window/window-11.jpg"},
            {paragraph: "", src: "/glassartista/window/window-12.jpg"},
            {paragraph: "", src: "/glassartista/window/window-13.jpg"},
            {paragraph: "", src: "/glassartista/window/window-14.jpg"},
        ],
        ceiling: [
            {title: "Ceiling", src: "/glassartista/ceiling/ceiling-1.mp4"},
            {paragraph: "This beautiful stained glass ceiling, titled “My Flower, My Flower,” was installed in the dining room of a newly built family home. Although the building and its furnishings are minimalist in style, the family insisted on including colorful floral motifs—and what a great decision that was!", src: "/glassartista/ceiling/ceiling-2.jpg"},
            {paragraph: "Each flower and leaf has a unique shape. By combining different types and colors of Tiffany glass, we created a special glass composition. The butterfly, which the little girls requested, adds a touch of playful charm to the design.", src: "/glassartista/ceiling/ceiling-3.jpg"},
            {paragraph: "Dining under such a stained glass ceiling turns every meal into an experience—it truly brightens up everyday life.", src: "/glassartista/ceiling/ceiling-4.jpg"},
            {paragraph: "Tiffany technique with special reinforcement system\n" +
                    "Project completion: February 2024\n" +
                    "Production time: 1.5 months\n" +
                    "Size: 120×240 cm ", src: "/glassartista/ceiling/ceiling-5.jpg"},
            {paragraph: "", src: "/glassartista/ceiling/ceiling-6.jpg"},
            {paragraph: "", src: "/glassartista/ceiling/ceiling-7.jpg"},
            {paragraph: "", src: "/glassartista/ceiling/ceiling-8.jpg"},
        ],
        ecclesial: [
            {title: "Ecclesial", src: "/glassartista/ecclesial/ecclesial-1.jpg"},
            { paragraph: "We can confidently say that in the world of glass art, church windows are the most spectacular. These painted, colorful glass compositions create a wonderful play of light within ecclesiastical buildings.",
                src: "/glassartista/ecclesial/ecclesial-2.jpg" },
            { paragraph: "We are experienced in both modern and traditional church glass art — not only creating but also restoring old or damaged stained glass windows.",
                src: "/glassartista/ecclesial/ecclesial-3.jpg" },
            { paragraph: "This photo series showcases the stained glass window made for the Prayer Room of the Diósgyőri Kisboldogasszony Kindergarten.",
                src: "/glassartista/ecclesial/ecclesial-4.jpg" },
            { src: "/glassartista/ecclesial/ecclesial-5.jpg" },
            { src: "/glassartista/ecclesial/ecclesial-6.jpg" },
            { src: "/glassartista/ecclesial/ecclesial-7.jpg" },
            { src: "/glassartista/ecclesial/ecclesial-8.jpg" },
        ],
    }
};

const DICTIONARY = {
    hu: {
        nextButton: "Következő projekt",
        prevButton: "Előző projekt"
    },
    de: {
        nextButton: "Nächstes Projekt",
        prevButton: "Vorheriges Projekt"
    },
    en: {
        nextButton: "Next project",
        prevButton: "Previous project"
    }
}

export default function GalleryPage({params}) {

    const resolvedParams = React.use ? React.use(params) : params;
    const langParam = resolvedParams?.lang;
    const lang = (langParam && LOCALES.includes(langParam)) ? langParam : DEFAULT_LOCALE;

    const PROJECTS = PROJECTS_META.map(meta => ({
        key: meta.key,
        slides: (TEXTS[lang] && TEXTS[lang][meta.key]) ? TEXTS[lang][meta.key] : (TEXTS[DEFAULT_LOCALE][meta.key] || []),
        icon: meta.icon,
        refIdx: meta.refIdx
    }));

    const sectionRefs = Array.from({length: PROJECTS.length}, (_, i) => useRef(null));
    const currentSection = useRef(0);
    const isThrottled = useRef(false);
    const [animate, setAnimate] = useState(false);
    const [carouselCurrents, setCarouselCurrents] = useState(
        PROJECTS.reduce((acc, project) => {
            acc[project.key] = 0;
            return acc;
        }, {})
    );

    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const idx = PROJECTS.findIndex(project => project.key === hash);
            if (idx !== -1 && sectionRefs[idx]?.current) {
                currentSection.current = idx;
                sectionRefs[idx].current.scrollIntoView({behavior: "smooth", block: "start"});
            }
        }
    }, [lang]); // re-run when locale changes to ensure hash mapping remains correct

    useEffect(() => {
        let touchStartY = null;

        const handleWheel = (e) => {
            e.preventDefault();
            e.stopPropagation()
            if (isThrottled.current) return;

            const direction = e.deltaY > 0 ? 1 : -1;
            navigateSection(direction);
        };

        const handleTouchStart = (e) => {
            e.preventDefault();
            e.stopPropagation()
            if (e.touches.length === 1) {
                touchStartY = e.touches[0].clientY;
            }
        };

        const handleTouchEnd = (e) => {
            e.preventDefault();
            if (touchStartY === null) return;
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY - touchEndY;
            if (Math.abs(deltaY) > 40 && !isThrottled.current) {
                const direction = deltaY > 0 ? 1 : -1;
                navigateSection(direction);
            }
            touchStartY = null;
        };

        const navigateSection = (direction) => {
            let nextSection = currentSection.current + direction;
            if (nextSection < 0 || nextSection >= sectionRefs.length) return;

            currentSection.current = nextSection;
            window.history.replaceState(null, '', `#${PROJECTS[nextSection].key}`);
            isThrottled.current = true;

            if (nextSection === 0) {
                window.scrollTo({top: 0, behavior: "smooth"});
            } else {
                sectionRefs[nextSection].current.scrollIntoView({behavior: "smooth", block: "start"});
            }

            setTimeout(() => {
                isThrottled.current = false;
            }, 700);
        };

        window.addEventListener("wheel", handleWheel, {passive: false});
        window.addEventListener("touchstart", handleTouchStart, {passive: false});
        window.addEventListener("touchend", handleTouchEnd, {passive: false});

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [lang]); // rebind listeners when language changes (ensures LAMPS and refs are correct)

    const setCurrent = (key, value) => {
        setCarouselCurrents(curr => ({
            ...curr,
            [key]: value,
        }));
    };

    const handlePreviousClick = (key, slides) => {
        setCurrent(
            key,
            carouselCurrents[key] - 1 < 0 ? slides.length - 1 : carouselCurrents[key] - 1
        );
    };

    const handleNextClick = (key, slides) => {
        setCurrent(
            key,
            carouselCurrents[key] + 1 === slides.length ? 0 : carouselCurrents[key] + 1
        );
    };

    useEffect(() => {
        const pulseOnce = () => {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 799);
        };
        pulseOnce();
        const interval = setInterval(pulseOnce, 15000);
        return () => clearInterval(interval);
    }, []);

    const CarouselControl = ({type, title, handleClick}) => {
        return (
            <button
                className={`w-10 h-10 flex cursor-pointer items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${type === "previous" ? "rotate-180" : ""}`}
                title={title}
                onClick={handleClick}>
                <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200"/>
            </button>
        );
    };

    return (
        <div className="overflow-x-hidden pb-12">
            {PROJECTS.map((project, idx) => (
                <div
                    id={project.key}
                    key={project.key}
                    ref={sectionRefs[project.refIdx]}
                    className={`w-screen h-screen-minus-navbar-desktop content-center justify-self-center ${idx > 0 ? "lg:pt-[64px]" : "lg:pb-[64px]"}`}
                >
                    <div className="w-full justify-self-center ">
                        <div className="relative  w-full h-full flex flex-col-reverse xl:flex-row gap-4 ">
                            <div className="xl:w-1/2 overflow-hidden">
                                <ImageCarousel
                                    slides={project.slides}
                                    current={carouselCurrents[project.key]}
                                    setCurrent={val => setCurrent(project.key, val)}
                                    handlePreviousClick={() => handlePreviousClick(project.key, project.slides)}
                                    handleNextClick={() => handleNextClick(project.key, project.slides)}
                                    icon={project.icon}
                                />
                            </div>
                            <div className="xl:w-1/2 overflow-hidden">
                                <TextCarousel
                                    slides={project.slides}
                                    current={carouselCurrents[project.key]}
                                    setCurrent={val => setCurrent(project.key, val)}
                                    icon={project.icon}
                                />
                            </div>
                        </div>
                        <div className="justify-center w-full flex animate__animated animate__fadeInUp">
                            <CarouselControl
                                type="previous"
                                title="Go to previous slide"
                                handleClick={() => handlePreviousClick(project.key, project.slides)}
                            />
                            <CarouselControl
                                type="next"
                                title="Go to next slide"
                                handleClick={() => handleNextClick(project.key, project.slides)}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <div className="fixed top-15 lg:top-16 left-1/2 -translate-x-1/2 z-51 animate__animated animate__fadeInUp">
                <Button
                    className="animate__animated animate__pulse animate__slow animate__infinite"
                    onPress={() => {
                        const prevSection = currentSection.current - 1;
                        if (sectionRefs[prevSection] && sectionRefs[prevSection].current) {
                            if (prevSection === 0) {
                                window.scrollTo({top: 0, behavior: "smooth"});
                                currentSection.current = prevSection;
                            } else {
                                currentSection.current = prevSection;
                                window.history.replaceState(null, '', `#${PROJECTS[prevSection].key}`);
                                sectionRefs[prevSection].current.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });
                            }
                        } else {
                            currentSection.current = PROJECTS.length - 1;
                            window.history.replaceState(null, '', `#${PROJECTS[PROJECTS.length - 1].key}`);
                            sectionRefs[PROJECTS.length - 1].current.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });
                        }
                    }}
                    variant="flat"
                    radius="full"
                    size="sm"
                    endContent={<FaArrowAltCircleUp size={18}/>}
                >
                    {DICTIONARY[lang]?.prevButton || DICTIONARY[DEFAULT_LOCALE].prevButton}
                </Button>
            </div>
            <div
                className="fixed bottom-7 lg:bottom-3 left-1/2 -translate-x-1/2 z-51 animate__animated animate__fadeInUp">
                <Button
                    className="animate__animated animate__pulse animate__slow animate__infinite"
                    onPress={() => {
                        const nextSection = currentSection.current + 1;
                        if (sectionRefs[nextSection] && sectionRefs[nextSection].current) {
                            currentSection.current = nextSection;
                            window.history.replaceState(null, '', `#${PROJECTS[nextSection].key}`);
                            sectionRefs[nextSection].current.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });
                        } else {
                            currentSection.current = 0;
                            window.history.replaceState(null, '', `#${PROJECTS[0].key}`);
                            window.scrollTo({top: 0, behavior: "smooth"});
                        }
                    }}
                    variant="flat"
                    radius="full"
                    size="sm"
                    endContent={<FaArrowAltCircleDown size={18}/>}
                >
                    {DICTIONARY[lang]?.nextButton || DICTIONARY[DEFAULT_LOCALE].nextButton}
                </Button>
            </div>
        </div>
    );

}
