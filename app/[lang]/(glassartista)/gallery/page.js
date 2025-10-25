// JavaScript
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
        magnolia: [
            {title: "Magnólia Tiffany-Lampe", src: "/tiffanystudio/magnolia/magnolia-1.jpg"},
            {
                paragraph: "Die „Magnolia“ Tiffany-Lampe ist ein wahres Kunstwerk und eines der größten und spektakulärsten Stücke unter den Tiffany-Lampen.",
                src: "/tiffanystudio/magnolia/magnolia-2.jpg"
            },
            {
                paragraph: "Sie wurde nach Originalentwürfen von Louis Comfort Tiffany gefertigt und zeigt das wunderschöne Muster der Magnolienblüten.",
                src: "/tiffanystudio/magnolia/magnolia-3.jpg"
            },
            {
                paragraph: "Der Durchmesser der Tiffany-Lampe ist beeindruckend, mit 71 cm (28 Inch), was diesem Meisterwerk allein schon eine beachtliche Größe verleiht.",
                src: "/tiffanystudio/magnolia/magnolia-4.jpg"
            },
            {
                paragraph: "Das Besondere an meiner Lampe ist, dass ich einen Teil der Blütenblätter aus dem sogenannten Drapery Tiffany-Glas gefertigt habe, das mit seiner gewellten Oberfläche die natürliche Bewegung der Blüten wiedergibt.",
                src: "/tiffanystudio/magnolia/magnolia-5.jpg"
            },
            {
                paragraph: "Die Lampe besteht aus insgesamt 1260 sorgfältig ausgewählten Tiffany-Glasstücken von Youghiogheny, Uroboros und Bullseye, sodass das Spiel von Licht und Farben in jedem Detail zu beobachten ist.",
                src: "/tiffanystudio/magnolia/magnolia-6.jpg"
            },
            {src: "/tiffanystudio/magnolia/magnolia-7.jpg"},
            {src: "/tiffanystudio/magnolia/magnolia-8.jpg"},
            {src: "/tiffanystudio/magnolia/magnolia-9.jpg"}
        ],
        goldblue: [
            {title: "Gold-Blue Dragonfly Tiffany-Lampe", src: "/tiffanystudio/goldblue/goldblue-1.jpg"},
            {
                paragraph: "Die Gold-Blaue „Libelle“ Tiffany Lampe ist ein wahres Schmuckstück unter den Tiffany Lampen, das in der faszinierenden Harmonie von Gold- und Blautönen erstrahlt. Die Besonderheit der Lampe liegt in dem Libellenmuster, das nach Originalentwürfen von Louis Comfort Tiffany gefertigt wurde und somit die Eleganz des Tiffany-Stils authentisch widerspiegelt.",
                src: "/tiffanystudio/goldblue/goldblue-2.jpg"
            },
            {
                paragraph: "Die farblich passenden Glassteine verstärken das luxuriöse Erscheinungsbild der Lampe zusätzlich und verleihen ihr Eleganz und ein besonderes Lichtspiel.",
                src: "/tiffanystudio/goldblue/goldblue-3.jpg"
            },
            {
                paragraph: " Der Schirm der Tiffany Lampe hat einen Durchmesser von 50 cm und besteht aus 406 sorgfältig platzierten Youghiogheny- und Uroboros-Glasstücken, die zusammen das atemberaubende Muster der Lampe schaffen. Die Gesamthöhe des Kunstwerks erreicht zusammen mit dem bronzenen Lampenfuß „Twisted Vine“ 76 cm und ist somit ein echter Hingucker in jedem Raum.",
                src: "/tiffanystudio/goldblue/goldblue-4.jpg"
            },
            {
                paragraph: "Diese Lampe ist nicht nur eine Lichtquelle, sondern ein Kunstwerk, das die Schönheit der Natur und den klassischen Charme der Tiffany-Lampen vereint. Die faszinierende Kombination aus goldenen und blauen Farbtönen sowie die detailreiche Verarbeitung der Lampe schaffen eine besondere, gemütliche Atmosphäre.",
                src: "/tiffanystudio/goldblue/goldblue-5.jpg"
            }
        ],
        peony: [
            {title: "Peony Tiffany-Lampe", src: "/tiffanystudio/peony/peony-1.jpg"},
            {
                paragraph: "Die Tiffany-Lampe „Peony“ bringt die beeindruckende Schönheit der Pfingstrose in Ihr Zuhause.",
                src: "/tiffanystudio/peony/peony-2.jpg"
            },
            {
                paragraph: "Sie wurde nach den Originalentwürfen von Louis Comfort Tiffany gefertigt und jedes Detail spiegelt die Eleganz und den künstlerischen Anspruch des Tiffany-Stils wider.",
                src: "/tiffanystudio/peony/peony-3.jpg"
            },
            {
                paragraph: "Der Lampenschirm der Tiffany-Lampe besteht aus 513 handgeschnittenen Stücken hochwertigen Youghiogheny- und Uroboros-Tiffany-Glases, die mit ihrer besonderen Farbgebung die Pracht der Pfingstrosenblüte zum Leben erwecken.",
                src: "/tiffanystudio/peony/peony-4.jpg"
            },
            {src: "/tiffanystudio/peony/peony-5.jpg"},
            {src: "/tiffanystudio/peony/peony-6.jpg"},
            {src: "/tiffanystudio/peony/peony-7.jpg"},
            {src: "/tiffanystudio/peony/peony-8.jpg"}
        ],
        acorn: [
            {title: "Acorn Tiffany-Lampe", src: "/tiffanystudio/acorn/acorn-1.jpg"},
            {
                paragraph: "Die „Acorn“ Tiffany-Lampe besticht durch ihr solid, aber raffiniertes Muster, das auf Originalentwürfen des ikonischen Louis Comfort Tiffany basiert.",
                src: "/tiffanystudio/acorn/acorn-2.jpg"
            },
            {
                paragraph: "Für die Herstellung der Lampe wurden hochwertige Youghiogheny- und Bullseye-Tiffany-Gläser mit einer wunderschönen Farbpalette verwendet, die die Essenz des Tiffany-Stils perfekt wiedergeben.",
                src: "/tiffanystudio/acorn/acorn-3.jpg"
            }
        ],
        waterlily: [
            {title: "Waterlily Tiffany-Lampe", src: "/tiffanystudio/waterlily/waterlily-1.jpg"},
            {
                paragraph: "Die „Waterlily“ Tiffany-Lampe ist ein wahres Meisterwerk, das an die anmutige Schönheit der Seerosen erinnert. Sie wurde nach Originalentwürfen von Louis Comfort Tiffany gefertigt und spiegelt so die feine Eleganz des Tiffany-Stils originalgetreu wider.",
                src: "/tiffanystudio/waterlily/waterlily-2.jpg"
            },
            {
                paragraph: "Das Besondere an der Lampe ist der wunderschöne Schirm aus Youghiogheny- und Uroboros-Tiffany-Gläser, der auf einzigartige Weise die Harmonie und Farbenpracht der Natur widerspiegelt.",
                src: "/tiffanystudio/waterlily/waterlily-3.jpg"
            },
            {
                paragraph: "Die Lampe hat einen Durchmesser von 50 cm, was allein schon eine beeindruckende Größe ist, aber ihre Höhe von 70 cm unterstreicht ihre Präsenz im Raum noch zusätzlich.",
                src: "/tiffanystudio/waterlily/waterlily-4.jpg"
            },
            {
                paragraph: "Der Schirm der Tiffany-Lampe besteht aus 420 handgeschnittenen Glaselementen, die sorgfältig zusammengesetzt das Seerosenmuster bilden.",
                src: "/tiffanystudio/waterlily/waterlily-5.jpg"
            },
            {
                paragraph: "Der Bronzelampenfuß, der ebenfalls den Namen „Waterlily“ trägt, ergänzt das naturnahe Erscheinungsbild der Lampe perfekt und bietet ihr eine stabile und elegante Basis.",
                src: "/tiffanystudio/waterlily/waterlily-6.jpg"
            },
            {
                paragraph: "Diese Lampe ist nicht nur ein Beleuchtungselement, sondern eine Augenweide, ein Kunstwerk, das jeden Raum mit einer eleganten, beruhigenden Atmosphäre erfüllt.",
                src: "/tiffanystudio/waterlily/waterlily-7.jpg"
            }
        ],
        chestnut: [
            {title: "Chestnut Tiffany-Lampe", src: "/tiffanystudio/chestnut/chestnut-1.jpg"},
            {
                paragraph: "Die Besonderheit der „Chestnut“ Tiffany-Lampe liegt in ihrem von Kastanienblättern inspirierten Muster und der ungewöhnlichen, wellenförmigen Form des Lampenschirms, die einen ganz einzigartigen Anblick bietet.",
                src: "/tiffanystudio/chestnut/chestnut-2.jpg"
            },
            {
                paragraph: "Sie wurde nach den ursprünglichen Entwürfen von Louis Comfort Tiffany gefertigt und gibt so die Schönheit der Natur und die besondere Eleganz von Tiffanys Stil treu wieder.",
                src: "/tiffanystudio/chestnut/chestnut-3.jpg"
            },
            {
                paragraph: "Der Tiffany-Lampenschirm hat einen Durchmesser von 30 cm und besteht aus 219 sorgfältig zusammengefügten Glasstücken von Youghiogheny und Bullseye, die in wunderbaren Farben erstrahlen und das Muster der Kastanienblätter zum Leben erwecken.",
                src: "/tiffanystudio/chestnut/chestnut-4.jpg"
            },
            {
                paragraph: "Die wellenförmigen Linien der Tiffany-Lampe und ihre naturnahen Farben schaffen eine besondere Atmosphäre und heben sich durch ihre einzigartige Formensprache von anderen Lampen ab.",
                src: "/tiffanystudio/chestnut/chestnut-5.jpg"
            },
            {
                paragraph: "Die „Chesnut“ Tiffany-Lampe ist nicht nur ein Beleuchtungselement, sondern ein Kunstwerk, das das perfekte Beispiel für die Begegnung von Natur und Kunst darstellt.",
                src: "/tiffanystudio/chestnut/chestnut-6.jpg"
            },
            {
                paragraph: "Ihre Einzigartigkeit und ihr besonderes Erscheinungsbild verleihen jedem Raum eine gemütlichere und elegantere Ausstrahlung.",
                src: "/tiffanystudio/chestnut/chestnut-7.jpg"
            }
        ],
        vine: [
            {title: "Vine Ornament Tiffany-Lampe", src: "/tiffanystudio/vine/vine-1.jpg"},
            {
                paragraph: "Die „Vine Ornament” Tiffany-Lampe ist ein echtes Kunstwerk, das die bezaubernden Farben des Herbstes in die Haushalte bringt. Sie wurde nach den originalen Entwürfen von Louis Comfort Tiffany gefertigt und spiegelt somit die einzigartige Eleganz des berühmten Tiffany-Stils wider.",
                src: "/tiffanystudio/vine/vine-2.jpg"
            },
            {
                paragraph: "Der Schirm der Lampe besteht aus hochwertigem Youghiogheny- und Bullseye-Glas, dessen Schönheit und lebendige Farbwelt dieses Stück besonders macht. Die Lampe hat einen Durchmesser von 40 cm und besteht aus 432 handgeschnittenen, sorgfältig zusammengesetzten Glaselementen. Jedes Glaselement passt präzise ineinander, um die vielfältigen, warmen Farben des Herbstes zur Geltung zu bringen.",
                src: "/tiffanystudio/vine/vine-3.jpg"
            },
            {
                paragraph: "Diese Tiffany-Lampe ist nicht nur ein dekorativer Gegenstand, sondern verkörpert den ewigen Kreislauf der Jahreszeiten. Sie zaubert Gemütlichkeit und eine naturnahe Atmosphäre in jeden Raum.",
                src: "/tiffanystudio/vine/vine-4.jpg"
            }
        ],
        dragonfly: [
            {title: "Dragonfly Tiffany-Lampe", src: "/tiffanystudio/dragonfly/dragonfly-1.jpg"},
            {
                paragraph: "Die „Dragonfly“ Tiffany-Lampe trägt einen besonderen Zauber in sich, denn sie verewigt die feine, luftige Schönheit der Libelle nach Originalentwürfen von Louis Comfort Tiffany.",
                src: "/tiffanystudio/dragonfly/dragonfly-2.jpg"
            },
            {
                paragraph: "Die Verwendung von Uroboros- und Bullseye-Tiffany-Gläsern bereichert die Lampe mit einem beeindruckenden Lichtspiel und einer faszinierenden Farbwelt und hebt die für den Tiffany-Stil typischen einzigartigen Details und die Eleganz hervor.",
                src: "/tiffanystudio/dragonfly/dragonfly-3.jpg"
            },
            {
                paragraph: "Der Tiffany-Lampenschirm hat einen Durchmesser von 40 cm, was die perfekte Größe ist, um die Lampe zum Mittelpunkt eines jeden Raumes zu machen, ohne die Umgebung zu sehr zu dominieren. Die sorgfältige Anordnung der Glaselemente sowie die feinen Details des Libellenmusters machen dieses Stück wirklich einzigartig.",
                src: "/tiffanystudio/dragonfly/dragonfly-4.jpg"
            },
            {
                paragraph: "Diese Tiffany-Lampe ist nicht nur ein Leuchtmittel, sondern auch ein künstlerischer Ausdruck, der den Zauber der Natur mit der meisterhaften Ausführung der Glaskunst verbindet.",
                src: "/tiffanystudio/dragonfly/dragonfly-5.jpg"
            },
            {
                paragraph: "Die „Dragonfly“ Tiffany-Lampe verströmt ein warmes, sanftes Licht und zaubert gleichzeitig die Anmut und Leichtigkeit der Libelle in Ihr Zuhause.",
                src: "/tiffanystudio/dragonfly/dragonfly-6.jpg"
            }
        ],
        tulip: [
            {title: "Tulip Tiffany-Lampe", src: "/tiffanystudio/tulip/tulip-1.jpg"},
            {
                paragraph: "Diese Tiffany-Lampe mit Tulpenmotiv ist ein bezauberndes und elegantes Stück, das die Anmut und Schönheit von Tulpen verewigt.",
                src: "/tiffanystudio/tulip/tulip-2.jpg"
            },
            {
                paragraph: "Die wunderschönen Farbtöne der Lampe werden durch das hochwertige Uroboros Tiffany-Glas gewährleistet, dass das Licht sanft nuanciert und eine warme Atmosphäre im Raum verbreitet.",
                src: "/tiffanystudio/tulip/tulip-3.jpg"
            },
            {
                paragraph: "Die Lampe hat einen Durchmesser von 36 cm und es steht auf einem wunderschönen Lampenfuß aus Bronze. Diese kleine Tiffany-Lampe mit ihren Tulpenmotiven vereint die Frische des Frühlings und die zeitlose Schönheit des Tiffany-Stils.",
                src: "/tiffanystudio/tulip/tulip-4.jpg"
            },
        ],
        little_peony: [
            {title: "Kleine Peony Tiffany-Lampe", src: "/tiffanystudio/little_peony/little_peony-1.jpg"},
            {
                paragraph: "Wunderschöne, farbige Gläser zeichnen diese Tiffany-Lampe mit Pfingstrosenmuster aus.",
                src: "/tiffanystudio/little_peony/little_peony-2.jpg"
            },
            {
                paragraph: "Die Lampe ist aus Youghiogheny- und Bullseye-Glas gefertigt und gehört mit einem Durchmesser von 36 cm zu den kleineren Tiffany-Lampen.",
                src: "/tiffanystudio/little_peony/little_peony-3.jpg"
            },
            {
                paragraph: "Die Tischleuchte mit dem bronzenen Lampenfuß mit Blumenmuster bietet einen besonderen Anblick.",
                src: "/tiffanystudio/little_peony/little_peony-4.jpg"
            },
        ],
    },
    en: {
        magnolia: [
            {title: "Magnolia Tiffany Lamp", src: "/tiffanystudio/magnolia/magnolia-1.jpg"},
            {
                paragraph: "The “Magnolia” Tiffany lamp is a true work of art and one of the largest and most spectacular Tiffany lamps. It was made after Louis Comfort Tiffany's original designs and displays the beautiful pattern of magnolia blossoms. The lamp measures 71 cm (28 inches) in diameter.",
                src: "/tiffanystudio/magnolia/magnolia-2.jpg"
            },
            {
                paragraph: "A special feature of this lamp is that some petals were made from Drapery Tiffany glass, whose wavy surface reproduces the natural movement of the flowers. The lamp is composed of 1,260 carefully selected Youghiogheny, Uroboros and Bullseye glass pieces, creating a rich play of light and color.",
                src: "/tiffanystudio/magnolia/magnolia-3.jpg"
            },
            {
                paragraph: "The bronze \"Senior Floor\" base provides stability; the complete piece stands 207 cm tall, making it a dramatic floor lamp as well as a light source.",
                src: "/tiffanystudio/magnolia/magnolia-4.jpg"
            },
            {
                paragraph: "This lamp is a rarity often found in collectors' holdings or museums. Its intricate pattern and high-quality glass make it one of the most valuable Tiffany reproductions.",
                src: "/tiffanystudio/magnolia/magnolia-5.jpg"
            },
            {src: "/tiffanystudio/magnolia/magnolia-6.jpg"},
            {src: "/tiffanystudio/magnolia/magnolia-7.jpg"},
            {src: "/tiffanystudio/magnolia/magnolia-8.jpg"},
            {src: "/tiffanystudio/magnolia/magnolia-9.jpg"}
        ],
        goldblue: [
            {title: "Gold-Blue “Dragonfly” Tiffany Lamp", src: "/tiffanystudio/goldblue/goldblue-1.jpg"},
            {
                paragraph: "The Gold-Blue “Dragonfly” is a jewel among Tiffany lamps, shining in a striking harmony of gold and blue tones.",
                src: "/tiffanystudio/goldblue/goldblue-2.jpg"
            },
            {
                paragraph: "Its dragonfly motif follows Louis Comfort Tiffany's original designs. Matching glass accents enhance the luxurious appearance and special light effects.",
                src: "/tiffanystudio/goldblue/goldblue-3.jpg"
            },
            {
                paragraph: "The shade is 50 cm in diameter and made of 406 carefully placed Youghiogheny and Uroboros pieces. With the bronze “Twisted Vine” base the total height is 76 cm.",
                src: "/tiffanystudio/goldblue/goldblue-4.jpg"
            },
            {
                paragraph: "More than a light, this lamp is an artwork combining natural beauty and classic Tiffany charm.",
                src: "/tiffanystudio/goldblue/goldblue-5.jpg"
            }
        ],
        peony: [
            {title: "Peony Tiffany Lamp", src: "/tiffanystudio/peony/peony-1.jpg"},
            {
                paragraph: "The “Peony” lamp brings the impressive beauty of the peony into the home. Made after Louis Comfort Tiffany's originals, each detail reflects Tiffany elegance and craftsmanship.",
                src: "/tiffanystudio/peony/peony-2.jpg"
            },
            {
                paragraph: "The shade consists of 513 hand-cut Youghiogheny and Uroboros pieces whose colors recreate the bloom's splendour.",
                src: "/tiffanystudio/peony/peony-3.jpg"
            },
            {
                paragraph: "At 45 cm diameter and about 80 cm tall with the “Lady” bronze base, it serves as an elegant focal piece.",
                src: "/tiffanystudio/peony/peony-4.jpg"
            },
            {
                paragraph: "The “Peony” is both a lighting fixture and a unique work of art that brings warmth and style to any corner of the home.",
                src: "/tiffanystudio/peony/peony-5.jpg"
            },
            {src: "/tiffanystudio/peony/peony-6.jpg"},
            {src: "/tiffanystudio/peony/peony-7.jpg"},
            {src: "/tiffanystudio/peony/peony-8.jpg"}
        ],
        acorn: [
            {title: "Acorn Tiffany Lamp", src: "/tiffanystudio/acorn/acorn-1.jpg"},
            {
                paragraph: "The “Acorn” lamp charms with its simple yet refined pattern based on Louis Comfort Tiffany's designs. High-quality Youghiogheny and Bullseye glasses with beautiful colors were used.",
                src: "/tiffanystudio/acorn/acorn-2.jpg"
            },
            {
                paragraph: "The shade is 40 cm in diameter and made from 468 hand-cut pieces. The bronze “Acorn” base was crafted specifically for this lamp.",
                src: "/tiffanystudio/acorn/acorn-3.jpg"
            }
        ],
        waterlily: [
            {title: "Waterlily Tiffany Lamp", src: "/tiffanystudio/waterlily/waterlily-1.jpg"},
            {
                paragraph: "The “Waterlily” Tiffany lamp is a true masterpiece evoking the graceful beauty of water lilies. Made after Louis Comfort Tiffany's originals, it faithfully reproduces Tiffany's refined elegance.",
                src: "/tiffanystudio/waterlily/waterlily-2.jpg"
            },
            {
                paragraph: "Its beautiful shade is made from Youghiogheny and Uroboros glass, uniquely reflecting nature's harmony and color.",
                src: "/tiffanystudio/waterlily/waterlily-3.jpg"
            },
            {
                paragraph: "With a 50 cm diameter and 70 cm height, the lamp has an impressive presence in any room.",
                src: "/tiffanystudio/waterlily/waterlily-4.jpg"
            },
            {
                paragraph: "The shade is composed of 420 hand-cut elements, and the bronze “Waterlily” base provides a stable, elegant foundation.",
                src: "/tiffanystudio/waterlily/waterlily-5.jpg"
            },
            {
                paragraph: "This lamp is more than illumination — it's an eye-catching artwork that fills a space with calm elegance.",
                src: "/tiffanystudio/waterlily/waterlily-6.jpg"
            },
            {src: "/tiffanystudio/waterlily/waterlily-7.jpg"}
        ],
        chestnut: [
            {title: "Chestnut Tiffany Lamp", src: "/tiffanystudio/chestnut/chestnut-1.jpg"},
            {
                paragraph: "The “Chestnut” lamp features a pattern inspired by chestnut leaves and an unusual wavy shade shape that creates a unique visual.",
                src: "/tiffanystudio/chestnut/chestnut-2.jpg"
            },
            {
                paragraph: "Made after Louis Comfort Tiffany's originals, it faithfully reflects natural beauty and Tiffany elegance.",
                src: "/tiffanystudio/chestnut/chestnut-3.jpg"
            },
            {
                paragraph: "The shade is 30 cm in diameter and consists of 219 carefully assembled Youghiogheny and Bullseye pieces in wonderful colors.",
                src: "/tiffanystudio/chestnut/chestnut-4.jpg"
            },
            {
                paragraph: "The lamp's wavy lines and natural tones create a special atmosphere and stand out among other lamps.",
                src: "/tiffanystudio/chestnut/chestnut-5.jpg"
            },
            {
                paragraph: "The “Chestnut” lamp is a work of art that blends nature and craftsmanship, giving any room a cozier and more elegant feel.",
                src: "/tiffanystudio/chestnut/chestnut-6.jpg"
            },
            {src: "/tiffanystudio/chestnut/chestnut-7.jpg"}
        ],
        vine: [
            {title: "Vine Ornament Tiffany Lamp", src: "/tiffanystudio/vine/vine-1.jpg"},
            {
                paragraph: "The “Vine Ornament” lamp is an artwork that brings the charming colors of autumn into the home. Made after original Louis Comfort Tiffany designs, it reflects the unique elegance of Tiffany style.",
                src: "/tiffanystudio/vine/vine-2.jpg"
            },
            {
                paragraph: "The shade is made from high-quality Youghiogheny and Bullseye glass; the lamp is 40 cm in diameter and composed of 432 hand-cut elements.",
                src: "/tiffanystudio/vine/vine-3.jpg"
            },
            {
                paragraph: "More than decorative, this piece embodies the cyclical nature of seasons and adds warmth to any interior.",
                src: "/tiffanystudio/vine/vine-4.jpg"
            }
        ],
        dragonfly: [
            {title: "Dragonfly Tiffany Lamp", src: "/tiffanystudio/dragonfly/dragonfly-1.jpg"},
            {
                paragraph: "The “Dragonfly” lamp captures the delicate, airy beauty of the dragonfly from Louis Comfort Tiffany's original designs.",
                src: "/tiffanystudio/dragonfly/dragonfly-2.jpg"
            },
            {
                paragraph: "Uroboros and Bullseye glasses create a stunning play of light and color that highlights Tiffany's characteristic details and elegance.",
                src: "/tiffanystudio/dragonfly/dragonfly-3.jpg"
            },
            {
                paragraph: "At 40 cm diameter it is an ideal focal point for a room without overpowering its surroundings.",
                src: "/tiffanystudio/dragonfly/dragonfly-4.jpg"
            },
            {
                paragraph: "This lamp is both a light source and an artistic expression combining nature's charm with masterful glass craftsmanship.",
                src: "/tiffanystudio/dragonfly/dragonfly-5.jpg"
            },
            {src: "/tiffanystudio/dragonfly/dragonfly-6.jpg"}
        ],
        tulip: [
            {title: "Tulip Tiffany Lamp", src: "/tiffanystudio/tulip/tulip-1.jpg"},
            {
                paragraph: "This tulip-patterned Tiffany lamp is a charming and elegant piece that captures the grace and beauty of tulips.",
                src: "/tiffanystudio/tulip/tulip-2.jpg"
            },
            {
                paragraph: "The lamp is made from beautifully colored Uroboros and Youghiogheny Tiffany glass. This 36 cm diameter Tiffany lamp stands on a stunning bronze lamp base.",
                src: "/tiffanystudio/tulip/tulip-3.jpg"
            },
            {
                paragraph: "This small tulip-motif Tiffany lamp combines the freshness of spring with the timeless beauty of the Tiffany style.",
                src: "/tiffanystudio/tulip/tulip-4.jpg"
            }
        ],
        little_peony: [
            {title: "Little Peony Tiffany Lamp", src: "/tiffanystudio/little_peony/little_peony-1.jpg"},
            {
                paragraph: "This Tiffany lamp with a peony pattern is characterized by beautiful colorful glass.",
                src: "/tiffanystudio/little_peony/little_peony-2.jpg"
            },
            {
                paragraph: "The lamp is made from Youghiogheny and Bullseye glass, with a diameter of 36 cm, making it one of the smaller Tiffany lamps.",
                src: "/tiffanystudio/little_peony/little_peony-3.jpg"
            },
            {
                paragraph: "With its flower-patterned bronze lamp base, this table lamp offers a special visual appeal.",
                src: "/tiffanystudio/little_peony/little_peony-4.jpg"
            },
        ]
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

export default function TiffanyLampsPage({params}) {

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
