'use client'

import {StickyScroll} from "@/app/components/sticky-scroll-reveal";

const content = [
    {
        title: "Magnólia Tiffanystúdió",
        description:
            "A Diósgyőri vár szomszédságában található Magnólia Tiffanystúdió több, mint 20 éve foglalkozik az építészethez kapcsolódó külső és belső tereket díszítő vagy elválasztó üvegművészeti alkotások tervezésével és kivitelezésével. Számos üvegablak, ajtóbetét, Tiffany lámpa elkészítése mellett, a régi üvegablakok, lámpák helyreállítása és restaurálása is a munkánk része.",
        content: (
            <div className="flex h-full w-full items-center justify-center text-white">
                <img
                    src="/magnoliatiffanystudio/magnolia/magnolia-1.jpg"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "Tiffany lámpák Louis de Comfort Tiffany tervei alapján",
        description:
            "Az itt látható lámpák különlegessége, hogy a híres Louis de Comfort Tiffany eredeti tervei alapján készülnek.",
        content: (
            <div className="flex h-full w-full items-center justify-center text-white">
                <img
                    src="/magnoliatiffanystudio/magnolia/magnolia-2.jpg"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "",
        description:
            "Ezek a lámpák a legmagasabb minőségű, kifejezetten lámpakészítésre gyártott színes Tiffany üvegből készülnek, mint pl. Uroboros, Youghiogheny, Bullseye, Kokomo. Ezek a csodaszép Tiffany-lámpák sokszor igen jelentős súllyal bírnak (hiszen vannak közöttük meglehetősen nagy 66-71 cm átmérővel rendelkezők is), ami megköveteli a bronz lámpatalp alkalmazását.",
        content: (
            <div className="flex h-full w-full items-center justify-center text-white">
                <img
                    src="/magnoliatiffanystudio/magnolia/magnolia-3.jpg"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "",
        description: "Stúdiónk által készített Tiffany-lámpáknál mindig ügyelünk arra, hogy az adott mintázatú lámpa csakis a hozzá tartozó bronz lámpatalpra kerüljön, hiszen így lesz teljes az összkép.",
        content: (
            <div className="flex h-full w-full items-center justify-center text-white">
                <img
                    src="/magnoliatiffanystudio/magnolia/magnolia-4.jpg"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "",
        description: "Az általunk készített lámpákat magánemberek, sokszor gyűjtők vásárolják.",
        content: (
            <div className="flex h-full w-full items-center justify-center text-white">
                <img
                    src="/magnoliatiffanystudio/magnolia/magnolia-5.jpg"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "Tiffany-üveg",
        description: "Louis Comfort Tiffany amerikai belsőépítész volt, akit különösen érdekelt az ólomüvegezés természete. 1878-ban nyitotta meg vállalkozását, Tiffany Studios, néven. Mivel nem talált az elképzeléseihez illő üveget, ezért saját üvegöntő műhelyt is fenntartott. Forradalmi újításokat vezetett be mind az üveggyártásban, mind az ablaküveg-készítés technológiájában.",
        content: (
            <div className="flex h-full w-full items-center justify-center text-white">
                <img
                    src="/magnoliatiffanystudio/magnolia/magnolia-6.jpg"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "",
        description: "Az egyik legnagyobb reform a forrasztásban jelentkezett, ugyanis a korábbi, ólomsínes technikával szemben ez a díszüveg alkalmas lett kisebb felületek létrehozására is, ráadásul az ólomüveggel így íveltebb felületeket is lehetett díszíteni.",
        content: (
            <div className="flex h-full w-full items-center justify-center text-white">
                <img
                    src="/magnoliatiffanystudio/magnolia/magnolia-7.jpg"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    },
    {
        title: "",
        description: "A Tiffany-üveg érdekessége, hogy nem az üveg felületét festik meg, hanem a gyártás során, még folyékony állapotban, színező oxidokat (pl.: szelén, kobalt, arany) kevernek hozzájuk. Ezáltal nem csak a színük változik, hanem különböző mintázatok is keletkeznek az üvegen.",
        content: (
            <div className="flex h-full w-full items-center justify-center text-white">
                <img
                    src="/magnoliatiffanystudio/magnolia/magnolia-8.jpg"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    alt="linear board demo"
                />
            </div>
        ),
    }
];

export default function TiffanyStudioPage() {

    return (
        <div className="w-full">
            <StickyScroll content={content} />
        </div>
    );
}