// JavaScript
'use client'

import React, {createRef, useEffect, useMemo, useRef, useState} from "react";
import {ImageCarousel, TextCarousel} from "@/app/components/carousel";
import {IconArrowNarrowRight} from "@tabler/icons-react";

import {PiAcornFill, PiFlowerFill, PiFlowerTulipBold, PiFlowerTulipFill} from "react-icons/pi";
import {GiChestnutLeaf, GiCurlingVines, GiDragonfly, GiFairyWings, GiLilyPads} from "react-icons/gi";
import {IoRose} from "react-icons/io5";
import {Button} from "@heroui/react";
import {FaArrowAltCircleDown, FaArrowAltCircleUp} from "react-icons/fa";
import {MdLocalFlorist} from "react-icons/md";

const LOCALES = ['hu', 'de', 'en'];
const DEFAULT_LOCALE = 'en';

// meta for lamps (icons + refIdx)
const LAMPS_META = [
    { key: "magnolia", icon: PiFlowerFill, refIdx: 0 },
    { key: "goldblue", icon: GiDragonfly, refIdx: 1 },
    { key: "peony", icon: IoRose, refIdx: 2 },
    { key: "acorn", icon: PiAcornFill, refIdx: 3 },
    { key: "waterlily", icon: GiLilyPads, refIdx: 4 },
    { key: "chestnut", icon: GiChestnutLeaf, refIdx: 5 },
    { key: "vine", icon: GiCurlingVines, refIdx: 6 },
    { key: "dragonfly", icon: GiFairyWings, refIdx: 7 },
    { key: "tulip", icon: PiFlowerTulipFill, refIdx: 8 },
    { key: "little_peony", icon: MdLocalFlorist, refIdx: 9 },
];

// localized texts (slides per lamp). Maintain same slide count/order as original Hungarian layout.
const TEXTS = {
    hu: {
        magnolia: [
            { title: "Magnólia Tiffany Lámpa", src: "/tiffanystudio/magnolia/magnolia-1.jpg" },
            { paragraph: "A „Magnólia” Tiffany lámpa egy igazi műalkotás, amely a Tiffany lámpák egyik legnagyobb és leglátványosabb darabja. Louis Comfort Tiffany eredeti tervei alapján készült, és a magnólia virágainak gyönyörű mintázatát jeleníti meg. A tiffany lámpa átmérője lenyűgöző, 71 cm-es (28 inch), ami már önmagában is tekintélyes méretet kölcsönöz ennek a műremeknek.", src: "/tiffanystudio/magnolia/magnolia-2.jpg" },
            { paragraph: "Az általam készített lámpa különlegessége, hogy a virágszirmok egy részét a Drapery Tiffany üvegből alkottam meg, amely drapériaszerűen hullámzó felületével adja vissza a virágok természetes mozgását. A lámpa összesen 1260 darab, gondosan kiválogatott Youghiogheny, Uroboros és Bullseye Tiffany üvegből készült, így a fény és a színek játéka minden részletben megfigyelhető.", src: "/tiffanystudio/magnolia/magnolia-3.jpg" },
            { paragraph: "A bronz „Senior Floor” lámpatalp, amely a tiffany lámpa stabil alapját adja, a Tiffany lámpatalpak egyik legritkább és legértékesebb darabja. Az egész tiffany lámpa magassága 207 cm, így nem csupán egy fényforrás, hanem egy igazán látványos állólámpa, amely bármely szobát díszíthet.", src: "/tiffanystudio/magnolia/magnolia-4.jpg" },
            { paragraph: "Ez a lámpa igazi különlegesség a Tiffany művek között, és leginkább gyűjtők, múzeumok tulajdonában található meg. Az eredeti, 1900-as évek elején készült lámpák ritkaságnak számítanak, és gyakran felbukkannak aukciókon is, ahol jelentős összegekért cserélnek gazdát. A „Magnólia” Tiffany lámpa csodálatos és bonyolult mintázata, valamint a felhasznált kiváló minőségű üvegek miatt az egyik legértékesebb Tiffany lámpának tekinthető.", src: "/tiffanystudio/magnolia/magnolia-5.jpg" },
            { src: "/tiffanystudio/magnolia/magnolia-6.jpg" },
            { src: "/tiffanystudio/magnolia/magnolia-7.jpg" },
            { src: "/tiffanystudio/magnolia/magnolia-8.jpg" },
            { src: "/tiffanystudio/magnolia/magnolia-9.jpg" }
        ],
        goldblue: [
            { title: "Gold-Blue Dragonfly Tiffany Lámpa", src: "/tiffanystudio/goldblue/goldblue-1.jpg" },
            { paragraph: "A Gold-Blue „Dragonfly” Tiffany lámpa igazi ékkő a Tiffany lámpák között, amely az arany és kék színek lenyűgöző harmóniájában pompázik.", src: "/tiffanystudio/goldblue/goldblue-2.jpg" },
            { paragraph: "A lámpa különlegességét a szitakötő mintázat adja, amely Louis Comfort Tiffany eredeti tervei alapján készült, így hűen tükrözi Tiffany stílusának eleganciáját. A színekben hozzá illő üvegkövek még inkább fokozzák a lámpa luxus megjelenését, eleganciát és különleges fényjátékot kölcsönözve neki.", src: "/tiffanystudio/goldblue/goldblue-3.jpg" },
            { paragraph: "A Tiffany lámpa burája 50 cm átmérőjű, és 406 darab gondosan elhelyezett Youghiogheny és Uroboros üvegcséből áll, amelyek együttesen megteremtik a lámpa lélegzetelállító mintázatát. Az egész alkotás magassága a „Twisted Vine” bronz lámpatalppal együtt eléri a 76 cm-t, így igazi figyelemfelkeltő darab bármely térben.", src: "/tiffanystudio/goldblue/goldblue-4.jpg" },
            { paragraph: "Ez a lámpa nem csupán fényforrás, hanem egy művészi alkotás, amely a természet szépségét és a Tiffany lámpák klasszikus varázsát ötvözi. Az arany és kék árnyalatok lenyűgöző kombinációja, valamint a lámpa részletgazdag kidolgozása különleges, meghitt hangulatot teremt.", src: "/tiffanystudio/goldblue/goldblue-5.jpg" }
        ],
        peony: [
            { title: "Peony Tiffany Lámpa", src: "/tiffanystudio/peony/peony-1.jpg" },
            { paragraph: "A „Peony” Tiffany lámpa a pünkösdi rózsa lenyűgöző szépségét hozza el otthonokba. Az eredeti Louis Comfort Tiffany tervei alapján készült, és minden részlete a Tiffany stílus eleganciáját és művészi kifinomultságát tükrözi.", src: "/tiffanystudio/peony/peony-2.jpg" },
            { paragraph: "A tiffany lámpa burája 513 darab kézzel vágott, kiváló minőségű Youghiogheny és Uroboros Tiffany üvegből készült, amelyek különleges színvilágukkal életre keltik a pünkösdi rózsa virágzásának pompáját.", src: "/tiffanystudio/peony/peony-3.jpg" },
            { paragraph: "A tiffany lámpa 45 cm átmérőjű, ami impozáns méretet biztosít, míg magassága a „Lady” bronz lámpatalppal együtt eléri a 80 cm-t. Ez a méret igazán kiemeli a tiffany lámpa művészi megjelenését, és egy elegáns, mégis meghitt központi darabként funkcionál bármely szobában.", src: "/tiffanystudio/peony/peony-4.jpg" },
            { paragraph: "A „Peony” Tiffany lámpa nem csupán egy világító eszköz, hanem egyedi műalkotás is, amely a természet szépségét ötvözi a kiváló mestermunkával. A tiffany lámpa csodálatos fényjátéka és részletgazdag mintázata melegséget és stílust visz otthona bármely sarkába.", src: "/tiffanystudio/peony/peony-5.jpg" },
            { src: "/tiffanystudio/peony/peony-6.jpg" },
            { src: "/tiffanystudio/peony/peony-7.jpg" },
            { src: "/tiffanystudio/peony/peony-8.jpg" }
        ],
        acorn: [
            { title: "Acorn Tiffany Lámpa", src: "/tiffanystudio/acorn/acorn-1.jpg" },
            { paragraph: "Az „Acorn” Tiffany lámpa egyszerű, mégis kifinomult mintázatával hódít, amely az ikonikus Louis Comfort Tiffany eredeti tervei alapján készült. A lámpa készítéséhez kiváló minőségű, csodálatos színvilágú Youghiogheny és Bullseye Tiffany üvegeket használtam, amelyek tökéletesen visszaadják a Tiffany stílus esszenciáját.", src: "/tiffanystudio/acorn/acorn-2.jpg" },
            { paragraph: "A lámpabura 40 cm átmérőjű, és 468 darab kézzel vágott, gondosan összeállított üvegelemből áll. A bronz talapzat, melynek neve szintén „Acorn”, kifejezetten ehhez a lámpához készült, hogy harmonizáljon a lámpa elegáns megjelenésével.", src: "/tiffanystudio/acorn/acorn-3.jpg" }
        ],
        waterlily: [
            { title: "Waterlily Tiffany Lámpa", src: "/tiffanystudio/waterlily/waterlily-1.jpg" },
            { paragraph: "A „Waterlily” Tiffany lámpa valódi mestermű, mely a vízililiomok kecses szépségét idézi. Eredeti Louis Comfort Tiffany tervei alapján készült, így hűen visszaadja a Tiffany stílusának finom eleganciáját.", src: "/tiffanystudio/waterlily/waterlily-2.jpg" },
            { paragraph: "A lámpa különlegessége a gyönyörű, Youghiogheny és Uroboros Tiffany üvegekből készült bura, amely egyedülálló módon tükrözi a természet harmóniáját és színpompáját.", src: "/tiffanystudio/waterlily/waterlily-3.jpg" },
            { paragraph: "A lámpa 50 cm átmérőjű, ami már önmagában is impozáns méret, azonban magassága, amely eléri a 70 cm-t, még inkább kiemeli jelenlétét a térben.", src: "/tiffanystudio/waterlily/waterlily-4.jpg" },
            { paragraph: "A tiffany lámpa burája 420 darab kézzel vágott üvegelemből áll, melyek gondosan összeállítva alkotják meg a vízililiom mintát. A bronz lámpatalp, amely szintén a „Waterlily” nevet viseli, tökéletesen kiegészíti a lámpa természetközeli megjelenését, stabil és elegáns alapot biztosítva számára.", src: "/tiffanystudio/waterlily/waterlily-5.jpg" },
            { paragraph: "Ez a lámpa nem csak egy megvilágító eszköz, hanem egy szemet gyönyörködtető, művészi darab, amely bármely helyiséget elegáns, nyugalmat árasztó hangulattal tölt meg.", src: "/tiffanystudio/waterlily/waterlily-6.jpg" },
            { src: "/tiffanystudio/waterlily/waterlily-7.jpg" }
        ],
        chestnut: [
            { title: "Chestnut Tiffany Lámpa", src: "/tiffanystudio/chestnut/chestnut-1.jpg" },
            { paragraph: "A „Chestnut” Tiffany lámpa különlegessége abban rejlik, hogy a gesztenyelevelek ihlette mintázata és a lámpabura szokatlan, hullámzó formája egészen egyedi látványt nyújt.", src: "/tiffanystudio/chestnut/chestnut-2.jpg" },
            { paragraph: "Louis Comfort Tiffany eredeti tervei alapján készült, így hűen visszaadja a természet szépségét és Tiffany stílusának különleges eleganciáját.", src: "/tiffanystudio/chestnut/chestnut-3.jpg" },
            { paragraph: "A Tiffany lámpabúra 30 cm átmérőjű, és 219 darab gondosan összeillesztett Youghiogheny és Bullseye üvegelemből áll, amelyek csodálatos színekben pompáznak, életre keltve a gesztenyelevél mintázatát.", src: "/tiffanystudio/chestnut/chestnut-4.jpg" },
            { paragraph: "A Tiffany lámpa hullámzó vonalai és természetközeli színei különleges hangulatot teremtenek, miközben a lámpák között is kiemelkedik egyedi formavilágával.", src: "/tiffanystudio/chestnut/chestnut-5.jpg" },
            { paragraph: "A „Chestnut” Tiffany lámpa nemcsak egy világító eszköz, hanem egy művészi alkotás, amely a természet és a művészet találkozásának tökéletes példája. Egyedisége és különleges megjelenése bármely térnek eleganciát kölcsönöz.", src: "/tiffanystudio/chestnut/chestnut-6.jpg" },
            { src: "/tiffanystudio/chestnut/chestnut-7.jpg" }
        ],
        vine: [
            { title: "Vine Ornament Tiffany Lámpa", src: "/tiffanystudio/vine/vine-1.jpg" },
            { paragraph: "A „Vine Ornament” Tiffany lámpa egy igazi műalkotás, mely az ősz varázslatos színeit hozza el otthonokba.", src: "/tiffanystudio/vine/vine-2.jpg" },
            { paragraph: "Az eredeti Louis Comfort Tiffany tervei alapján készült, így a híres Tiffany stílus egyedi eleganciáját tükrözi. A lámpa burája kiváló minőségű Youghiogheny és Bullseye üvegekből készült, amelyek szépsége és élénk színvilága különlegessé teszi ezt a darabot.", src: "/tiffanystudio/vine/vine-3.jpg" },
            { paragraph: "A lámpa 40 cm átmérőjű, és 432 darab kézzel vágott, gondosan összeállított üvegelemből áll. Minden egyes üvegelem precízen illeszkedik egymáshoz, hogy az ősz változatos, meleg színei érvényesüljenek.", src: "/tiffanystudio/vine/vine-4.jpg" }
        ],
        dragonfly: [
            { title: "Dragonfly Tiffany Lámpa", src: "/tiffanystudio/dragonfly/dragonfly-1.jpg" },
            { paragraph: "A „Dragonfly” Tiffany lámpa különleges varázslatot hordoz magában, hiszen a szitakötő finom, légies szépségét örökíti meg Louis Comfort Tiffany eredeti tervei alapján.", src: "/tiffanystudio/dragonfly/dragonfly-2.jpg" },
            { paragraph: "Az Uroboros és Bullseye Tiffany üvegek használata lenyűgöző fényjátékkal és színvilággal gazdagítja a lámpát, kiemelve a Tiffany stílusra jellemző egyedi részleteket és eleganciát.", src: "/tiffanystudio/dragonfly/dragonfly-3.jpg" },
            { paragraph: "A tiffany lámpabúra 40 cm átmérőjű, ami tökéletes méret ahhoz, hogy a lámpa bármely tér fókuszpontjává váljon, anélkül, hogy túlzottan dominálná a környezetét.", src: "/tiffanystudio/dragonfly/dragonfly-4.jpg" },
            { paragraph: "Ez a tiffany lámpa nem csupán világító eszköz, hanem művészi kifejezés is, amely a természet varázsát ötvözi az üveg kézművesség mesteri kivitelezésével. A „Dragonfly” Tiffany lámpa meleg, lágy fényt áraszt.", src: "/tiffanystudio/dragonfly/dragonfly-5.jpg" },
            { src: "/tiffanystudio/dragonfly/dragonfly-6.jpg" }
        ],
        tulip: [
            { title: "Tulip Tiffany Lámpa", src: "/tiffanystudio/tulip/tulip-1.jpg" },
            { paragraph: "Ez a tulipánmintás Tiffany lámpa egy elbűvölő és elegáns darab, amely a tulipánok kecsességét és szépségét örökíti meg.", src: "/tiffanystudio/tulip/tulip-2.jpg" },
            { paragraph: "A lámpa gyönyörű színárnyalatú Uroboros és Youghiogheny Tiffany lámpaüvegből készült. 36 cm átmérőjű tiffany lámpa egy csodaszép bronz lámpatalpon áll.", src: "/tiffanystudio/tulip/tulip-3.jpg" },
            { paragraph: "Ez a kis, tulipánmotívumos Tiffany-lámpa a tavasz frissességét és a Tiffany-stílus időtlen szépségét ötvözi.Ez a kis, tulipánmotívumos Tiffany-lámpa a tavasz frissességét és a Tiffany-stílus időtlen szépségét ötvözi.", src: "/tiffanystudio/tulip/tulip-4.jpg" },
        ],
        little_peony: [
            { title: "Kis Pünkösdirózsás Tiffany Lámpa", src: "/tiffanystudio/little_peony/little_peony-1.jpg" },
            { paragraph: "Csodaszép színes üvegek jellemzik ezt a pünkösdirózsa mintájú Tiffany lámpát.", src: "/tiffanystudio/little_peony/little_peony-2.jpg" },
            { paragraph: "A lámpa Youghiogheny és Bullseye üvegből készült, 36 cm-es átmérővel a kisebb méretű Tiffany lámpák közé tartozik.", src: "/tiffanystudio/little_peony/little_peony-3.jpg" },
            { paragraph: "A virágmintás bronz lámpatalppal különleges látványt nyújt ez az asztali lámpa.", src: "/tiffanystudio/little_peony/little_peony-4.jpg" },
        ],
    },
    de: {
        magnolia: [
            { title: "Magnólia Tiffany-Lampe", src: "/tiffanystudio/magnolia/magnolia-1.jpg" },
            { paragraph: "A „Magnólia” Tiffany lámpa egy igazi műalkotás, amely a Tiffany lámpák egyik legnagyobb és leglátványosabb darabja. Louis Comfort Tiffany eredeti tervei alapján készült, és a magnólia virágainak gyönyörű mintázatát jeleníti meg. A tiffany lámpa átmérője lenyűgöző, 71 cm-es (28 inch), ami már önmagában is tekintélyes méretet kölcsönöz ennek a műremeknek.", src: "/tiffanystudio/magnolia/magnolia-2.jpg" },
            { paragraph: "Az általam készített lámpa különlegessége, hogy a virágszirmok egy részét a Drapery Tiffany üvegből alkottam meg, amely drapériaszerűen hullámzó felületével adja vissza a virágok természetes mozgását. A lámpa összesen 1260 darab, gondosan kiválogatott Youghiogheny, Uroboros és Bullseye Tiffany üvegből készült, így a fény és a színek játéka minden részletben megfigyelhető.", src: "/tiffanystudio/magnolia/magnolia-3.jpg" },
            { paragraph: "A bronz „Senior Floor” lámpatalp, amely a tiffany lámpa stabil alapját adja, a Tiffany lámpatalpak egyik legritkább és legértékesebb darabja. Az egész tiffany lámpa magassága 207 cm, így nem csupán egy fényforrás, hanem egy igazán látványos állólámpa, amely bármely szobát díszíthet.", src: "/tiffanystudio/magnolia/magnolia-4.jpg" },
            { paragraph: "Ez a lámpa igazi különlegesség a Tiffany művek között, és leginkább gyűjtők, múzeumok tulajdonában található meg. Az eredeti, 1900-as évek elején készült lámpák ritkaságnak számítanak, és gyakran felbukkannak aukciókon is, ahol jelentős összegekért cserélnek gazdát. A „Magnólia” Tiffany lámpa csodálatos és bonyolult mintázata, valamint a felhasznált kiváló minőségű üvegek miatt az egyik legértékesebb Tiffany lámpának tekinthető.", src: "/tiffanystudio/magnolia/magnolia-5.jpg" },
            { src: "/tiffanystudio/magnolia/magnolia-6.jpg" },
            { src: "/tiffanystudio/magnolia/magnolia-7.jpg" },
            { src: "/tiffanystudio/magnolia/magnolia-8.jpg" },
            { src: "/tiffanystudio/magnolia/magnolia-9.jpg" }
        ],
        goldblue: [
            { title: "Gold-Blue Dragonfly Tiffany-Lampe", src: "/tiffanystudio/goldblue/goldblue-1.jpg" },
            { paragraph: "A Gold-Blue „Dragonfly” Tiffany lámpa igazi ékkő a Tiffany lámpák között, amely az arany és kék színek lenyűgöző harmóniájában pompázik.", src: "/tiffanystudio/goldblue/goldblue-2.jpg" },
            { paragraph: "A lámpa különlegességét a szitakötő mintázat adja, amely Louis Comfort Tiffany eredeti tervei alapján készült, így hűen tükrözi Tiffany stílusának eleganciáját. A színekben hozzá illő üvegkövek még inkább fokozzák a lámpa luxus megjelenését, eleganciát és különleges fényjátékot kölcsönözve neki.", src: "/tiffanystudio/goldblue/goldblue-3.jpg" },
            { paragraph: "A Tiffany lámpa burája 50 cm átmérőjű, és 406 darab gondosan elhelyezett Youghiogheny és Uroboros üvegcséből áll, amelyek együttesen megteremtik a lámpa lélegzetelállító mintázatát. Az egész alkotás magassága a „Twisted Vine” bronz lámpatalppal együtt eléri a 76 cm-t, így igazi figyelemfelkeltő darab bármely térben.", src: "/tiffanystudio/goldblue/goldblue-4.jpg" },
            { paragraph: "Ez a lámpa nem csupán fényforrás, hanem egy művészi alkotás, amely a természet szépségét és a Tiffany lámpák klasszikus varázsát ötvözi. Az arany és kék árnyalatok lenyűgöző kombinációja, valamint a lámpa részletgazdag kidolgozása különleges, meghitt hangulatot teremt.", src: "/tiffanystudio/goldblue/goldblue-5.jpg" }
        ],
        peony: [
            { title: "Peony Tiffany-Lampe", src: "/tiffanystudio/peony/peony-1.jpg" },
            { paragraph: "A „Peony” Tiffany lámpa a pünkösdi rózsa lenyűgöző szépségét hozza el otthonokba. Az eredeti Louis Comfort Tiffany tervei alapján készült, és minden részlete a Tiffany stílus eleganciáját és művészi kifinomultságát tükrözi.", src: "/tiffanystudio/peony/peony-2.jpg" },
            { paragraph: "A tiffany lámpa burája 513 darab kézzel vágott, kiváló minőségű Youghiogheny és Uroboros Tiffany üvegből készült, amelyek különleges színvilágukkal életre keltik a pünkösdi rózsa virágzásának pompáját.", src: "/tiffanystudio/peony/peony-3.jpg" },
            { paragraph: "A tiffany lámpa 45 cm átmérőjű, ami impozáns méretet biztosít, míg magassága a „Lady” bronz lámpatalppal együtt eléri a 80 cm-t. Ez a méret igazán kiemeli a tiffany lámpa művészi megjelenését, és egy elegáns, mégis meghitt központi darabként funkcionál bármely szobában.", src: "/tiffanystudio/peony/peony-4.jpg" },
            { paragraph: "A „Peony” Tiffany lámpa nem csupán egy világító eszköz, hanem egyedi műalkotás is, amely a természet szépségét ötvözi a kiváló mestermunkával. A tiffany lámpa csodálatos fényjátéka és részletgazdag mintázata melegséget és stílust visz otthona bármely sarkába.", src: "/tiffanystudio/peony/peony-5.jpg" },
            { src: "/tiffanystudio/peony/peony-6.jpg" },
            { src: "/tiffanystudio/peony/peony-7.jpg" },
            { src: "/tiffanystudio/peony/peony-8.jpg" }
        ],
        acorn: [
            { title: "Acorn Tiffany-Lampe", src: "/tiffanystudio/acorn/acorn-1.jpg" },
            { paragraph: "Az „Acorn” Tiffany lámpa egyszerű, mégis kifinomult mintázatával hódít, amely az ikonikus Louis Comfort Tiffany eredeti tervei alapján készült. A lámpa készítéséhez kiváló minőségű, csodálatos színvilágú Youghiogheny és Bullseye Tiffany üvegeket használtam, amelyek tökéletesen visszaadják a Tiffany stílus esszenciáját.", src: "/tiffanystudio/acorn/acorn-2.jpg" },
            { paragraph: "A lámpabura 40 cm átmérőjű, és 468 darab kézzel vágott, gondosan összeállított üvegelemből áll. A bronz talapzat, melynek neve szintén „Acorn”, kifejezetten ehhez a lámpához készült, hogy harmonizáljon a lámpa elegáns megjelenésével.", src: "/tiffanystudio/acorn/acorn-3.jpg" }
        ],
        waterlily: [
            { title: "Waterlily Tiffany-Lampe", src: "/tiffanystudio/waterlily/waterlily-1.jpg" },
            { paragraph: "A „Waterlily” Tiffany lámpa valódi mestermű, mely a vízililiomok kecses szépségét idézi. Eredeti Louis Comfort Tiffany tervei alapján készült, így hűen visszaadja a Tiffany stílusának finom eleganciáját.", src: "/tiffanystudio/waterlily/waterlily-2.jpg" },
            { paragraph: "A lámpa különlegessége a gyönyörű, Youghiogheny és Uroboros Tiffany üvegekből készült bura, amely egyedülálló módon tükrözi a természet harmóniáját és színpompáját.", src: "/tiffanystudio/waterlily/waterlily-3.jpg" },
            { paragraph: "A lámpa 50 cm átmérőjű, ami már önmagában is impozáns méret, azonban magassága, amely eléri a 70 cm-t, még inkább kiemeli jelenlétét a térben.", src: "/tiffanystudio/waterlily/waterlily-4.jpg" },
            { paragraph: "A tiffany lámpa burája 420 darab kézzel vágott üvegelemből áll, melyek gondosan összeállítva alkotják meg a vízililiom mintát. A bronz lámpatalp, amely szintén a „Waterlily” nevet viseli, tökéletesen kiegészíti a lámpa természetközeli megjelenését, stabil és elegáns alapot biztosítva számára.", src: "/tiffanystudio/waterlily/waterlily-5.jpg" },
            { paragraph: "Ez a lámpa nem csak egy megvilágító eszköz, hanem egy szemet gyönyörködtető, művészi darab, amely bármely helyiséget elegáns, nyugalmat árasztó hangulattal tölt meg.", src: "/tiffanystudio/waterlily/waterlily-6.jpg" },
            { src: "/tiffanystudio/waterlily/waterlily-7.jpg" }
        ],
        chestnut: [
            { title: "Chestnut Tiffany-Lampe", src: "/tiffanystudio/chestnut/chestnut-1.jpg" },
            { paragraph: "A „Chestnut” Tiffany lámpa különlegessége abban rejlik, hogy a gesztenyelevelek ihlette mintázata és a lámpabura szokatlan, hullámzó formája egészen egyedi látványt nyújt.", src: "/tiffanystudio/chestnut/chestnut-2.jpg" },
            { paragraph: "Louis Comfort Tiffany eredeti tervei alapján készült, így hűen visszaadja a természet szépségét és Tiffany stílusának különleges eleganciáját.", src: "/tiffanystudio/chestnut/chestnut-3.jpg" },
            { paragraph: "A Tiffany lámpabúra 30 cm átmérőjű, és 219 darab gondosan összeillesztett Youghiogheny és Bullseye üvegelemből áll, amelyek csodálatos színekben pompáznak, életre keltve a gesztenyelevél mintázatát.", src: "/tiffanystudio/chestnut/chestnut-4.jpg" },
            { paragraph: "A Tiffany lámpa hullámzó vonalai és természetközeli színei különleges hangulatot teremtenek, miközben a lámpák között is kiemelkedik egyedi formavilágával.", src: "/tiffanystudio/chestnut/chestnut-5.jpg" },
            { paragraph: "A „Chestnut” Tiffany lámpa nemcsak egy világító eszköz, hanem egy művészi alkotás, amely a természet és a művészet találkozásának tökéletes példája. Egyedisége és különleges megjelenése bármely térnek eleganciát kölcsönöz.", src: "/tiffanystudio/chestnut/chestnut-6.jpg" },
            { src: "/tiffanystudio/chestnut/chestnut-7.jpg" }
        ],
        vine: [
            { title: "Vine Ornament Tiffany-Lampe", src: "/tiffanystudio/vine/vine-1.jpg" },
            { paragraph: "A „Vine Ornament” Tiffany lámpa egy igazi műalkotás, mely az ősz varázslatos színeit hozza el otthonokba.", src: "/tiffanystudio/vine/vine-2.jpg" },
            { paragraph: "Az eredeti Louis Comfort Tiffany tervei alapján készült, így a híres Tiffany stílus egyedi eleganciáját tükrözi. A lámpa burája kiváló minőségű Youghiogheny és Bullseye üvegekből készült, amelyek szépsége és élénk színvilága különlegessé teszi ezt a darabot.", src: "/tiffanystudio/vine/vine-3.jpg" },
            { paragraph: "A lámpa 40 cm átmérőjű, és 432 darab kézzel vágott, gondosan összeállított üvegelemből áll. Minden egyes üvegelem precízen illeszkedik egymáshoz, hogy az ősz változatos, meleg színei érvényesüljenek.", src: "/tiffanystudio/vine/vine-4.jpg" }
        ],
        dragonfly: [
            { title: "Dragonfly Tiffany-Lampe", src: "/tiffanystudio/dragonfly/dragonfly-1.jpg" },
            { paragraph: "A „Dragonfly” Tiffany lámpa különleges varázslatot hordoz magában, hiszen a szitakötő finom, légies szépségét örökíti meg Louis Comfort Tiffany eredeti tervei alapján.", src: "/tiffanystudio/dragonfly/dragonfly-2.jpg" },
            { paragraph: "Az Uroboros és Bullseye Tiffany üvegek használata lenyűgöző fényjátékkal és színvilággal gazdagítja a lámpát, kiemelve a Tiffany stílusra jellemző egyedi részleteket és eleganciát.", src: "/tiffanystudio/dragonfly/dragonfly-3.jpg" },
            { paragraph: "A tiffany lámpabúra 40 cm átmérőjű, ami tökéletes méret ahhoz, hogy a lámpa bármely tér fókuszpontjává váljon, anélkül, hogy túlzottan dominálná a környezetét.", src: "/tiffanystudio/dragonfly/dragonfly-4.jpg" },
            { paragraph: "Ez a tiffany lámpa nem csupán világító eszköz, hanem művészi kifejezés is, amely a természet varázsát ötvözi az üveg kézművesség mesteri kivitelezésével. A „Dragonfly” Tiffany lámpa meleg, lágy fényt áraszt.", src: "/tiffanystudio/dragonfly/dragonfly-5.jpg" },
            { src: "/tiffanystudio/dragonfly/dragonfly-6.jpg" }
        ],
        tulip: [
            { title: "Tulip Tiffany-Lampe", src: "/tiffanystudio/tulip/tulip-1.jpg" },
            { paragraph: "Ez a tulipánmintás Tiffany lámpa egy elbűvölő és elegáns darab, amely a tulipánok kecsességét és szépségét örökíti meg.", src: "/tiffanystudio/tulip/tulip-2.jpg" },
            { paragraph: "A lámpa gyönyörű színárnyalatú Uroboros és Youghiogheny Tiffany lámpaüvegből készült. 36 cm átmérőjű tiffany lámpa egy csodaszép bronz lámpatalpon áll.", src: "/tiffanystudio/tulip/tulip-3.jpg" },
            { paragraph: "Ez a kis, tulipánmotívumos Tiffany-lámpa a tavasz frissességét és a Tiffany-stílus időtlen szépségét ötvözi.Ez a kis, tulipánmotívumos Tiffany-lámpa a tavasz frissességét és a Tiffany-stílus időtlen szépségét ötvözi.", src: "/tiffanystudio/tulip/tulip-4.jpg" },
        ],
        little_peony: [
            { title: "Kis Pünkösdirózsás Tiffany-Lampe", src: "/tiffanystudio/little_peony/little_peony-1.jpg" },
            { paragraph: "Csodaszép színes üvegek jellemzik ezt a pünkösdirózsa mintájú Tiffany lámpát.", src: "/tiffanystudio/little_peony/little_peony-2.jpg" },
            { paragraph: "A lámpa Youghiogheny és Bullseye üvegből készült, 36 cm-es átmérővel a kisebb méretű Tiffany lámpák közé tartozik.", src: "/tiffanystudio/little_peony/little_peony-3.jpg" },
            { paragraph: "A virágmintás bronz lámpatalppal különleges látványt nyújt ez az asztali lámpa.", src: "/tiffanystudio/little_peony/little_peony-4.jpg" },
        ],
    },
    en: {
        magnolia: [
            { title: "Magnolia Tiffany Lamp", src: "/tiffanystudio/magnolia/magnolia-1.jpg" },
            { paragraph: "The “Magnolia” Tiffany lamp is a true work of art and one of the largest and most spectacular Tiffany lamps. It was made after Louis Comfort Tiffany's original designs and displays the beautiful pattern of magnolia blossoms. The lamp measures 71 cm (28 inches) in diameter.", src: "/tiffanystudio/magnolia/magnolia-2.jpg" },
            { paragraph: "A special feature of this lamp is that some petals were made from Drapery Tiffany glass, whose wavy surface reproduces the natural movement of the flowers. The lamp is composed of 1,260 carefully selected Youghiogheny, Uroboros and Bullseye glass pieces, creating a rich play of light and color.", src: "/tiffanystudio/magnolia/magnolia-3.jpg" },
            { paragraph: "The bronze \"Senior Floor\" base provides stability; the complete piece stands 207 cm tall, making it a dramatic floor lamp as well as a light source.", src: "/tiffanystudio/magnolia/magnolia-4.jpg" },
            { paragraph: "This lamp is a rarity often found in collectors' holdings or museums. Its intricate pattern and high-quality glass make it one of the most valuable Tiffany reproductions.", src: "/tiffanystudio/magnolia/magnolia-5.jpg" },
            { src: "/tiffanystudio/magnolia/magnolia-6.jpg" },
            { src: "/tiffanystudio/magnolia/magnolia-7.jpg" },
            { src: "/tiffanystudio/magnolia/magnolia-8.jpg" },
            { src: "/tiffanystudio/magnolia/magnolia-9.jpg" }
        ],
        goldblue: [
            { title: "Gold-Blue “Dragonfly” Tiffany Lamp", src: "/tiffanystudio/goldblue/goldblue-1.jpg" },
            { paragraph: "The Gold-Blue “Dragonfly” is a jewel among Tiffany lamps, shining in a striking harmony of gold and blue tones.", src: "/tiffanystudio/goldblue/goldblue-2.jpg" },
            { paragraph: "Its dragonfly motif follows Louis Comfort Tiffany's original designs. Matching glass accents enhance the luxurious appearance and special light effects.", src: "/tiffanystudio/goldblue/goldblue-3.jpg" },
            { paragraph: "The shade is 50 cm in diameter and made of 406 carefully placed Youghiogheny and Uroboros pieces. With the bronze “Twisted Vine” base the total height is 76 cm.", src: "/tiffanystudio/goldblue/goldblue-4.jpg" },
            { paragraph: "More than a light, this lamp is an artwork combining natural beauty and classic Tiffany charm.", src: "/tiffanystudio/goldblue/goldblue-5.jpg" }
        ],
        peony: [
            { title: "Peony Tiffany Lamp", src: "/tiffanystudio/peony/peony-1.jpg" },
            { paragraph: "The “Peony” lamp brings the impressive beauty of the peony into the home. Made after Louis Comfort Tiffany's originals, each detail reflects Tiffany elegance and craftsmanship.", src: "/tiffanystudio/peony/peony-2.jpg" },
            { paragraph: "The shade consists of 513 hand-cut Youghiogheny and Uroboros pieces whose colors recreate the bloom's splendour.", src: "/tiffanystudio/peony/peony-3.jpg" },
            { paragraph: "At 45 cm diameter and about 80 cm tall with the “Lady” bronze base, it serves as an elegant focal piece.", src: "/tiffanystudio/peony/peony-4.jpg" },
            { paragraph: "The “Peony” is both a lighting fixture and a unique work of art that brings warmth and style to any corner of the home.", src: "/tiffanystudio/peony/peony-5.jpg" },
            { src: "/tiffanystudio/peony/peony-6.jpg" },
            { src: "/tiffanystudio/peony/peony-7.jpg" },
            { src: "/tiffanystudio/peony/peony-8.jpg" }
        ],
        acorn: [
            { title: "Acorn Tiffany Lamp", src: "/tiffanystudio/acorn/acorn-1.jpg" },
            { paragraph: "The “Acorn” lamp charms with its simple yet refined pattern based on Louis Comfort Tiffany's designs. High-quality Youghiogheny and Bullseye glasses with beautiful colors were used.", src: "/tiffanystudio/acorn/acorn-2.jpg" },
            { paragraph: "The shade is 40 cm in diameter and made from 468 hand-cut pieces. The bronze “Acorn” base was crafted specifically for this lamp.", src: "/tiffanystudio/acorn/acorn-3.jpg" }
        ],
        waterlily: [
            { title: "Waterlily Tiffany Lamp", src: "/tiffanystudio/waterlily/waterlily-1.jpg" },
            { paragraph: "The “Waterlily” Tiffany lamp is a true masterpiece evoking the graceful beauty of water lilies. Made after Louis Comfort Tiffany's originals, it faithfully reproduces Tiffany's refined elegance.", src: "/tiffanystudio/waterlily/waterlily-2.jpg" },
            { paragraph: "Its beautiful shade is made from Youghiogheny and Uroboros glass, uniquely reflecting nature's harmony and color.", src: "/tiffanystudio/waterlily/waterlily-3.jpg" },
            { paragraph: "With a 50 cm diameter and 70 cm height, the lamp has an impressive presence in any room.", src: "/tiffanystudio/waterlily/waterlily-4.jpg" },
            { paragraph: "The shade is composed of 420 hand-cut elements, and the bronze “Waterlily” base provides a stable, elegant foundation.", src: "/tiffanystudio/waterlily/waterlily-5.jpg" },
            { paragraph: "This lamp is more than illumination — it's an eye-catching artwork that fills a space with calm elegance.", src: "/tiffanystudio/waterlily/waterlily-6.jpg" },
            { src: "/tiffanystudio/waterlily/waterlily-7.jpg" }
        ],
        chestnut: [
            { title: "Chestnut Tiffany Lamp", src: "/tiffanystudio/chestnut/chestnut-1.jpg" },
            { paragraph: "The “Chestnut” lamp features a pattern inspired by chestnut leaves and an unusual wavy shade shape that creates a unique visual.", src: "/tiffanystudio/chestnut/chestnut-2.jpg" },
            { paragraph: "Made after Louis Comfort Tiffany's originals, it faithfully reflects natural beauty and Tiffany elegance.", src: "/tiffanystudio/chestnut/chestnut-3.jpg" },
            { paragraph: "The shade is 30 cm in diameter and consists of 219 carefully assembled Youghiogheny and Bullseye pieces in wonderful colors.", src: "/tiffanystudio/chestnut/chestnut-4.jpg" },
            { paragraph: "The lamp's wavy lines and natural tones create a special atmosphere and stand out among other lamps.", src: "/tiffanystudio/chestnut/chestnut-5.jpg" },
            { paragraph: "The “Chestnut” lamp is a work of art that blends nature and craftsmanship, giving any room a cozier and more elegant feel.", src: "/tiffanystudio/chestnut/chestnut-6.jpg" },
            { src: "/tiffanystudio/chestnut/chestnut-7.jpg" }
        ],
        vine: [
            { title: "Vine Ornament Tiffany Lamp", src: "/tiffanystudio/vine/vine-1.jpg" },
            { paragraph: "The “Vine Ornament” lamp is an artwork that brings the charming colors of autumn into the home. Made after original Louis Comfort Tiffany designs, it reflects the unique elegance of Tiffany style.", src: "/tiffanystudio/vine/vine-2.jpg" },
            { paragraph: "The shade is made from high-quality Youghiogheny and Bullseye glass; the lamp is 40 cm in diameter and composed of 432 hand-cut elements.", src: "/tiffanystudio/vine/vine-3.jpg" },
            { paragraph: "More than decorative, this piece embodies the cyclical nature of seasons and adds warmth to any interior.", src: "/tiffanystudio/vine/vine-4.jpg" }
        ],
        dragonfly: [
            { title: "Dragonfly Tiffany Lamp", src: "/tiffanystudio/dragonfly/dragonfly-1.jpg" },
            { paragraph: "The “Dragonfly” lamp captures the delicate, airy beauty of the dragonfly from Louis Comfort Tiffany's original designs.", src: "/tiffanystudio/dragonfly/dragonfly-2.jpg" },
            { paragraph: "Uroboros and Bullseye glasses create a stunning play of light and color that highlights Tiffany's characteristic details and elegance.", src: "/tiffanystudio/dragonfly/dragonfly-3.jpg" },
            { paragraph: "At 40 cm diameter it is an ideal focal point for a room without overpowering its surroundings.", src: "/tiffanystudio/dragonfly/dragonfly-4.jpg" },
            { paragraph: "This lamp is both a light source and an artistic expression combining nature's charm with masterful glass craftsmanship.", src: "/tiffanystudio/dragonfly/dragonfly-5.jpg" },
            { src: "/tiffanystudio/dragonfly/dragonfly-6.jpg" }
        ],
        tulip: [
            { title: "Tulip Tiffany Lamp", src: "/tiffanystudio/tulip/tulip-1.jpg" },
            { paragraph: "This tulip-patterned Tiffany lamp is a charming and elegant piece that captures the grace and beauty of tulips.", src: "/tiffanystudio/tulip/tulip-2.jpg" },
            { paragraph: "The lamp is made from beautifully colored Uroboros and Youghiogheny Tiffany glass. This 36 cm diameter Tiffany lamp stands on a stunning bronze lamp base.", src: "/tiffanystudio/tulip/tulip-3.jpg" },
            { paragraph: "This small tulip-motif Tiffany lamp combines the freshness of spring with the timeless beauty of the Tiffany style.", src: "/tiffanystudio/tulip/tulip-4.jpg" }
        ],
        little_peony: [
            { title: "Little Peony Tiffany Lamp", src: "/tiffanystudio/little_peony/little_peony-1.jpg" },
            { paragraph: "This Tiffany lamp with a peony pattern is characterized by beautiful colorful glass.", src: "/tiffanystudio/little_peony/little_peony-2.jpg" },
            { paragraph: "The lamp is made from Youghiogheny and Bullseye glass, with a diameter of 36 cm, making it one of the smaller Tiffany lamps.", src: "/tiffanystudio/little_peony/little_peony-3.jpg" },
            { paragraph: "With its flower-patterned bronze lamp base, this table lamp offers a special visual appeal.", src: "/tiffanystudio/little_peony/little_peony-4.jpg" },
        ]
    }
};

const DICTIONARY = {
    hu: {
        nextButton: "Következő lámpa",
        prevButton: "Előző lámpa"
    },
    de: {
        nextButton: "Nächste Lampe",
        prevButton: "Vorherige Lampe"
    },
    en: {
        nextButton: "Next lamp",
        prevButton: "Previous lamp"
    }
}

export default function TiffanyLampsPage({ params }) {

    const resolvedParams = React.use ? React.use(params) : params;
    const langParam = resolvedParams?.lang;
    const lang = (langParam && LOCALES.includes(langParam)) ? langParam : DEFAULT_LOCALE;

    // build localized lamps by merging meta with localized slides
    const LAMPS = LAMPS_META.map(meta => ({
        key: meta.key,
        slides: (TEXTS[lang] && TEXTS[lang][meta.key]) ? TEXTS[lang][meta.key] : (TEXTS[DEFAULT_LOCALE][meta.key] || []),
        icon: meta.icon,
        refIdx: meta.refIdx
    }));

    const sectionRefs = Array.from({length: LAMPS.length}, (_, i) => useRef(null));
    const currentSection = useRef(0);
    const isThrottled = useRef(false);
    const [animate, setAnimate] = useState(false);
    const [carouselCurrents, setCarouselCurrents] = useState(
        LAMPS.reduce((acc, lamp) => { acc[lamp.key] = 0; return acc; }, {})
    );

    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const idx = LAMPS.findIndex(lamp => lamp.key === hash);
            if (idx !== -1 && sectionRefs[idx]?.current) {
                currentSection.current = idx;
                sectionRefs[idx].current.scrollIntoView({ behavior: "smooth", block: "start" });
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
            window.history.replaceState(null, '', `#${LAMPS[nextSection].key}`);
            isThrottled.current = true;

            if (nextSection === 0) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                sectionRefs[nextSection].current.scrollIntoView({ behavior: "smooth", block: "start" });
            }

            setTimeout(() => {
                isThrottled.current = false;
            }, 700);
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: false });
        window.addEventListener("touchend", handleTouchEnd, { passive: false });

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

    const CarouselControl = ({ type, title, handleClick }) => {
        return (
            <button
                className={`w-10 h-10 flex cursor-pointer items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${ type === "previous" ? "rotate-180" : ""}`}
                title={title}
                onClick={handleClick}>
                <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200"/>
            </button>
        );
    };

    return (
        <div className="overflow-x-hidden pb-12">
            {LAMPS.map((lamp, idx) => (
                <div
                    id={lamp.key}
                    key={lamp.key}
                    ref={sectionRefs[lamp.refIdx]}
                    className={`w-screen h-screen-minus-navbar-desktop content-center justify-self-center ${idx > 0 ? "lg:pt-[64px]" : "lg:pb-[64px]"}`}
                >
                    <div className="w-full justify-self-center ">
                        <div className="relative  w-full h-full flex flex-col-reverse xl:flex-row gap-4 ">
                            <div className="xl:w-1/2 overflow-hidden">
                                <ImageCarousel
                                    slides={lamp.slides}
                                    current={carouselCurrents[lamp.key]}
                                    setCurrent={val => setCurrent(lamp.key, val)}
                                    handlePreviousClick={() => handlePreviousClick(lamp.key, lamp.slides)}
                                    handleNextClick={() => handleNextClick(lamp.key, lamp.slides)}
                                    icon={lamp.icon}
                                />
                            </div>
                            <div className="xl:w-1/2 overflow-hidden">
                                <TextCarousel
                                    slides={lamp.slides}
                                    current={carouselCurrents[lamp.key]}
                                    setCurrent={val => setCurrent(lamp.key, val)}
                                    icon={lamp.icon}
                                />
                            </div>
                        </div>
                        <div className="justify-center w-full flex animate__animated animate__fadeInUp">
                            <CarouselControl
                                type="previous"
                                title="Go to previous slide"
                                handleClick={() => handlePreviousClick(lamp.key, lamp.slides)}
                            />
                            <CarouselControl
                                type="next"
                                title="Go to next slide"
                                handleClick={() => handleNextClick(lamp.key, lamp.slides)}
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
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                currentSection.current = prevSection;
                            } else {
                                currentSection.current = prevSection;
                                window.history.replaceState(null, '', `#${LAMPS[prevSection].key}`);
                                sectionRefs[prevSection].current.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start"
                                });
                            }
                        } else {
                            currentSection.current = LAMPS.length-1;
                            window.history.replaceState(null, '', `#${LAMPS[LAMPS.length-1].key}`);
                            sectionRefs[LAMPS.length-1].current.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });
                        }
                    }}
                    variant="flat"
                    radius="full"
                    size="sm"
                    endContent={<FaArrowAltCircleUp size={18} />}
                >
                    {DICTIONARY[lang]?.prevButton || DICTIONARY[DEFAULT_LOCALE].prevButton}
                </Button>
            </div>
            <div className="fixed bottom-7 lg:bottom-3 left-1/2 -translate-x-1/2 z-51 animate__animated animate__fadeInUp">
                <Button
                    className="animate__animated animate__pulse animate__slow animate__infinite"
                    onPress={() => {
                        const nextSection = currentSection.current + 1;
                        if (sectionRefs[nextSection] && sectionRefs[nextSection].current) {
                            currentSection.current = nextSection;
                            window.history.replaceState(null, '', `#${LAMPS[nextSection].key}`);
                            sectionRefs[nextSection].current.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });
                        } else {
                            currentSection.current = 0;
                            window.history.replaceState(null, '', `#${LAMPS[0].key}`);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                    }}
                    variant="flat"
                    radius="full"
                    size="sm"
                    endContent={<FaArrowAltCircleDown size={18} />}
                >
                    {DICTIONARY[lang]?.nextButton || DICTIONARY[DEFAULT_LOCALE].nextButton}
                </Button>
            </div>
        </div>
    );

}
