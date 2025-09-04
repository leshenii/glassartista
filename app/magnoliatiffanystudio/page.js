'use client'

import {useEffect, useRef, useState} from "react";

export default function TiffanyStudioPage() {
    const sectionRefs = Array.from({length: 8}, () => useRef(null));
    const currentSection = useRef(0);
    const isThrottled = useRef(false);
    const [activeSection, setActiveSection] = useState(0);

    const content = [
        {
            title: "Magnólia Tiffanystúdió",
            description:
                "A Diósgyőri vár szomszédságában található Magnólia Tiffanystúdió több, mint 20 éve foglalkozik az építészethez kapcsolódó külső és belső tereket díszítő vagy elválasztó üvegművészeti alkotások tervezésével és kivitelezésével. Számos üvegablak, ajtóbetét, Tiffany lámpa elkészítése mellett, a régi üvegablakok, lámpák helyreállítása és restaurálása is a munkánk része.",
            image: "/magnoliatiffanystudio/magnolia/magnolia-3.jpg",
            ref: sectionRefs[0]
        },
        {
            title: "Tiffany lámpák Louis de Comfort Tiffany tervei alapján",
            description:
                "Az itt látható lámpák különlegessége, hogy a híres Louis de Comfort Tiffany eredeti tervei alapján készülnek.",
            image: "/magnoliatiffanystudio/table/table-40.jpg",
            ref: sectionRefs[1]
        },
        {
            title: "",
            description:
                "Ezek a lámpák a legmagasabb minőségű, kifejezetten lámpakészítésre gyártott színes Tiffany üvegből készülnek, mint pl. Uroboros, Youghiogheny, Bullseye, Kokomo. Ezek a csodaszép Tiffany-lámpák sokszor igen jelentős súllyal bírnak (hiszen vannak közöttük meglehetősen nagy 66-71 cm átmérővel rendelkezők is), ami megköveteli a bronz lámpatalp alkalmazását.",
            image: "/magnoliatiffanystudio/misc/misc-1.jpg",
            ref: sectionRefs[2]
        },
        {
            title: "",
            description: "Stúdiónk által készített Tiffany-lámpáknál mindig ügyelünk arra, hogy az adott mintázatú lámpa csakis a hozzá tartozó bronz lámpatalpra kerüljön, hiszen így lesz teljes az összkép.",
            image: "/magnoliatiffanystudio/waterlily/waterlily-6.jpg",
            ref: sectionRefs[3]
        },
        {
            title: "",
            description: "Az általunk készített lámpákat magánemberek, sokszor gyűjtők vásárolják.",
            image: "/magnoliatiffanystudio/chestnut/chestnut-4.jpg",
            ref: sectionRefs[4]
        },
        {
            title: "Tiffany-üveg",
            description: "Louis Comfort Tiffany amerikai belsőépítész volt, akit különösen érdekelt az ólomüvegezés természete. 1878-ban nyitotta meg vállalkozását, Tiffany Studios, néven. Mivel nem talált az elképzeléseihez illő üveget, ezért saját üvegöntő műhelyt is fenntartott. Forradalmi újításokat vezetett be mind az üveggyártásban, mind az ablaküveg-készítés technológiájában.",
            image: "/magnoliatiffanystudio/misc/misc-2.jpg",
            ref: sectionRefs[5]
        },
        {
            title: "",
            description: "Az egyik legnagyobb reform a forrasztásban jelentkezett, ugyanis a korábbi, ólomsínes technikával szemben ez a díszüveg alkalmas lett kisebb felületek létrehozására is, ráadásul az ólomüveggel így íveltebb felületeket is lehetett díszíteni.",
            image: "/magnoliatiffanystudio/goldblue/goldblue-3.jpg",
            ref: sectionRefs[6]
        },
        {
            title: "",
            description: "A Tiffany-üveg érdekessége, hogy nem az üveg felületét festik meg, hanem a gyártás során, még folyékony állapotban, színező oxidokat (pl.: szelén, kobalt, arany) kevernek hozzájuk. Ezáltal nem csak a színük változik, hanem különböző mintázatok is keletkeznek az üvegen.",
            image: "/magnoliatiffanystudio/misc/misc-3.jpg",
            ref: sectionRefs[7]
        }
    ];

    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();
            if (isThrottled.current) return;

            const direction = e.deltaY > 0 ? 1 : -1;
            let nextSection = currentSection.current + direction;

            if (nextSection < 0 || nextSection >= sectionRefs.length) return;

            currentSection.current = nextSection;
            setActiveSection(nextSection);
            isThrottled.current = true;

            if (nextSection === 0) {
                window.scrollTo({top: 0, behavior: "smooth"});
            } else {
                sectionRefs[nextSection].current.scrollIntoView({behavior: "smooth", block: "start"});
            }

            setTimeout(() => {
                isThrottled.current = false;
            }, 300);
        };

        window.addEventListener("wheel", handleWheel, {passive: false});

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);

    return (
        <div className=" h-min items-center justify-center">
            <div className="flex flex-row gap-5 w-10/12 items-center justify-center mx-auto">

                <div className="w-5/12 flex flex-col items-center justify-center  animate__animated animate__fadeInLeft">
                    <div className="w-[60vmin] flex flex-col gap-10 mt-20 items-center justify-center">
                        {content.map((item, idx) => (
                            <div
                                key={item.title + idx}
                                ref={sectionRefs[idx]}
                                className="max-w-md scroll-mt-40 items-center justify-center"
                            >
                                <div className={`flex flex-col ${item.title ? 'gap-10' : ''}`}>
                                <h2 className={`font-bold ${activeSection === idx ? "text-white" : "opacity-20"} ${item.title === "Magnólia Tiffanystúdió" ? "text-5xl allura-regular" : "text-4xl"}`}>
                                    {item.title}
                                </h2>
                                <p className={`text-lg text-justify ${activeSection === idx ? "text-white" : "opacity-20"}`}>
                                    {item.description}
                                </p></div>
                            </div>
                        ))}
                        <div className="h-[90vh]" />
                    </div>
                </div>

                <div className="pl-5 w-[40vmin] ">
                    <img
                        src={content[activeSection].image}
                        width={10000}
                        height={10000}
                        className="animate__animated animate__fadeInRight w-[40vmin] h-[60vmin] fixed top-20 mt-20 object-cover rounded-lg shadow-lg max-h-[80vh]"
                        alt="current section"
                    />
                </div>
            </div>
        </div>
    );
}
