'use client'

import { useEffect, useRef, useState } from "react";
import {ImageCarousel, TextCarousel} from "@/app/components/carousel";
import {IconArrowNarrowRight} from "@tabler/icons-react";

import {PiAcornFill, PiFlowerFill, PiFlowerTulipBold, PiFlowerTulipFill} from "react-icons/pi";
import {GiChestnutLeaf, GiCurlingVines, GiDragonfly, GiFairyWings, GiLilyPads} from "react-icons/gi";
import {IoRose} from "react-icons/io5";

const slideDataMagnolia = [
    {
        title: "Magnólia Tiffany Lámpa",
        src: "/magnoliatiffanystudio/magnolia/magnolia-1.jpg",
    },
    {
        paragraph: "A „Magnólia” Tiffany lámpa egy igazi műalkotás, amely a Tiffany lámpák egyik legnagyobb és leglátványosabb darabja. Louis Comfort Tiffany eredeti tervei alapján készült, és a magnólia virágainak gyönyörű mintázatát jeleníti meg. A tiffany lámpa átmérője lenyűgöző, 71 cm-es (28 inch), ami már önmagában is tekintélyes méretet kölcsönöz ennek a műremeknek.",
        position: "center",
        src: "/magnoliatiffanystudio/magnolia/magnolia-2.jpg",
    },
    {
        paragraph: "Az általam készített lámpa különlegessége, hogy a virágszirmok egy részét a Drapery Tiffany üvegből alkottam meg, amely drapériaszerűen hullámzó felületével adja vissza a virágok természetes mozgását. A lámpa összesen 1260 darab, gondosan kiválogatott Youghiogheny, Uroboros és Bullseye Tiffany üvegből készült, így a fény és a színek játéka minden részletben megfigyelhető.",
        src: "/magnoliatiffanystudio/magnolia/magnolia-3.jpg",
    },
    {
        paragraph: "A bronz „Senior Floor” lámpatalp, amely a tiffany lámpa stabil alapját adja, a Tiffany lámpatalpak egyik legritkább és legértékesebb darabja. Az egész tiffany lámpa magassága 207 cm, így nem csupán egy fényforrás, hanem egy igazán látványos állólámpa, amely bármely szobát díszíthet.",
        src: "/magnoliatiffanystudio/magnolia/magnolia-4.jpg",
    },
    {
        paragraph: "Ez a lámpa igazi különlegesség a Tiffany művek között, és leginkább gyűjtők, múzeumok tulajdonában található meg. Az eredeti, 1900-as évek elején készült lámpák ritkaságnak számítanak, és gyakran felbukkannak aukciókon is, ahol jelentős összegekért cserélnek gazdát. A „Magnólia” Tiffany lámpa csodálatos és bonyolult mintázata, valamint a felhasznált kiváló minőségű üvegek miatt az egyik legértékesebb Tiffany lámpának tekinthető.",
        src: "/magnoliatiffanystudio/magnolia/magnolia-5.jpg",
    },
    {
        src: "/magnoliatiffanystudio/magnolia/magnolia-6.jpg",
    },
    {
        src: "/magnoliatiffanystudio/magnolia/magnolia-7.jpg",
    },
    {
        src: "/magnoliatiffanystudio/magnolia/magnolia-8.jpg",
    },
    {
        src: "/magnoliatiffanystudio/magnolia/magnolia-9.jpg",
    },
];
const slideDataGoldBlue = [
    {
        title: "Gold-Blue Dragonfly Tiffany Lámpa",
        src: "/magnoliatiffanystudio/goldblue/goldblue-1.jpg",
    },
    {
        paragraph: "A Gold-Blue „Dragonfly” Tiffany lámpa igazi ékkő a Tiffany lámpák között, amely az arany és kék színek lenyűgöző harmóniájában pompázik.",
        src: "/magnoliatiffanystudio/goldblue/goldblue-2.jpg",
    },
    {
        paragraph: "A lámpa különlegességét a szitakötő mintázat adja, amely Louis Comfort Tiffany eredeti tervei alapján készült, így hűen tükrözi Tiffany stílusának eleganciáját. A színekben hozzá illő üvegkövek még inkább fokozzák a lámpa luxus megjelenését, eleganciát és különleges fényjátékot kölcsönözve neki.",
        src: "/magnoliatiffanystudio/goldblue/goldblue-3.jpg",
    },
    {
        paragraph: "A Tiffany lámpa burája 50 cm átmérőjű, és 406 darab gondosan elhelyezett Youghiogheny és Uroboros üvegcséből áll, amelyek együttesen megteremtik a lámpa lélegzetelállító mintázatát. Az egész alkotás magassága a „Twisted Vine” bronz lámpatalppal együtt eléri a 76 cm-t, így igazi figyelemfelkeltő darab bármely térben.",
        src: "/magnoliatiffanystudio/goldblue/goldblue-4.jpg",
    },
    {
        paragraph: "Ez a lámpa nem csupán fényforrás, hanem egy művészi alkotás, amely a természet szépségét és a Tiffany lámpák klasszikus varázsát ötvözi. Az arany és kék árnyalatok lenyűgöző kombinációja, valamint a lámpa részletgazdag kidolgozása különleges, meghitt hangulatot teremt.",
        src: "/magnoliatiffanystudio/goldblue/goldblue-5.jpg",
    },
];
const slideDataPeony = [
    {
        title: "Peony Tiffany Lámpa",
        src: "/magnoliatiffanystudio/peony/peony-1.jpg",
    },
    {
        paragraph: "A „Peony” Tiffany lámpa a pünkösdi rózsa lenyűgöző szépségét hozza el otthonokba. Az eredeti Louis Comfort Tiffany tervei alapján készült, és minden részlete a Tiffany stílus eleganciáját és művészi kifinomultságát tükrözi.",
        src: "/magnoliatiffanystudio/peony/peony-2.jpg",
    },
    {
        paragraph: "A tiffany lámpa burája 513 darab kézzel vágott, kiváló minőségű Youghiogheny és Uroboros Tiffany üvegből készült, amelyek különleges színvilágukkal életre keltik a pünkösdi rózsa virágzásának pompáját.",
        src: "/magnoliatiffanystudio/peony/peony-3.jpg",
    },
    {
        paragraph: "A tiffany lámpa 45 cm átmérőjű, ami impozáns méretet biztosít, míg magassága a „Lady” bronz lámpatalppal együtt eléri a 80 cm-t. Ez a méret igazán kiemeli a tiffany lámpa művészi megjelenését, és egy elegáns, mégis meghitt központi darabként funkcionál bármely szobában.",
        src: "/magnoliatiffanystudio/peony/peony-4.jpg",
    },
    {
        paragraph: "A „Peony” Tiffany lámpa nem csupán egy világító eszköz, hanem egyedi műalkotás is, amely a természet szépségét ötvözi a kiváló mestermunkával. A tiffany lámpa csodálatos fényjátéka és részletgazdag mintázata melegséget és stílust visz otthona bármely sarkába.",
        src: "/magnoliatiffanystudio/peony/peony-5.jpg",
    },
    {
        src: "/magnoliatiffanystudio/peony/peony-6.jpg",
    },
    {
        src: "/magnoliatiffanystudio/peony/peony-7.jpg",
    },
    {
        src: "/magnoliatiffanystudio/peony/peony-8.jpg",
    },
]

const CAROUSEL_KEYS = {
    magnolia: "magnolia",
    goldblue: "goldblue",
    peony: "peony",
};

export default function TiffanyLampsPage() {

    const [carouselCurrents, setCarouselCurrents] = useState({
        [CAROUSEL_KEYS.magnolia]: 0,
        [CAROUSEL_KEYS.goldblue]: 0,
        [CAROUSEL_KEYS.peony]: 0,
    });

    const sectionRefs = [useRef(null), useRef(null), useRef(null)];
    const currentSection = useRef(0);
    const isThrottled = useRef(false);

    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault()
            if (isThrottled.current) return;

            const direction = e.deltaY > 0 ? 1 : -1;
            let nextSection = currentSection.current + direction;

            if (nextSection < 0 || nextSection >= sectionRefs.length) return;

            currentSection.current = nextSection;
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

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, []);

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

    const CarouselControl = ({
                                 type,
                                 title,
                                 handleClick
                             }) => {
        return (
            <button
                className={`w-10 h-10 flex cursor-pointer items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
                    type === "previous" ? "rotate-180" : ""
                }`}
                title={title}
                onClick={handleClick}>
                <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200"/>
            </button>
        );
    };

    return (
        <div className="overflow-hidden">
            <div  className="w-screen h-screen-minus-navbar-desktop content-center justify-self-center">
                <div className="w-full justify-self-center ">
                    <div className="relative overflow-hidden w-full h-full flex flex-row gap-4 ">
                        <div className="w-1/2 overflow-hidden">
                            <ImageCarousel slides={slideDataMagnolia}
                                           current={carouselCurrents[CAROUSEL_KEYS.magnolia]}
                                           setCurrent={val => setCurrent(CAROUSEL_KEYS.magnolia, val)}
                                           handlePreviousClick={() => handlePreviousClick(CAROUSEL_KEYS.magnolia, slideDataMagnolia)}
                                           handleNextClick={() => handleNextClick(CAROUSEL_KEYS.magnolia, slideDataMagnolia)}
                            />
                        </div>
                        <div className="w-1/2 overflow-hidden">
                            <TextCarousel
                                slides={slideDataMagnolia}
                                current={carouselCurrents[CAROUSEL_KEYS.magnolia]}
                                setCurrent={val => setCurrent(CAROUSEL_KEYS.magnolia, val)}
                                icon={PiFlowerFill}
                            />
                        </div>
                    </div>
                    <div className="justify-center w-full flex">
                        <CarouselControl
                            type="previous"
                            title="Go to previous slide"
                            handleClick={() => handlePreviousClick(CAROUSEL_KEYS.magnolia, slideDataMagnolia)}
                        />
                        <CarouselControl
                            type="next"
                            title="Go to next slide"
                            handleClick={() => handleNextClick(CAROUSEL_KEYS.magnolia, slideDataMagnolia)}
                        />
                    </div>
                </div>
            </div>
            <div ref={sectionRefs[1]} className="w-screen h-screen content-center justify-self-center pt-[64px]">
                <div className="w-full justify-self-center ">
                    <div className="relative overflow-hidden w-full h-full flex flex-row gap-4 ">
                        <div className="w-1/2 overflow-hidden">
                            <ImageCarousel slides={slideDataGoldBlue}
                                           current={carouselCurrents[CAROUSEL_KEYS.goldblue]}
                                           setCurrent={val => setCurrent(CAROUSEL_KEYS.goldblue, val)}
                                           handlePreviousClick={() => handlePreviousClick(CAROUSEL_KEYS.goldblue, slideDataGoldBlue)}
                                           handleNextClick={() => handleNextClick(CAROUSEL_KEYS.goldblue, slideDataGoldBlue)}
                            />
                        </div>
                        <div className="w-1/2 overflow-hidden">
                            <TextCarousel
                                slides={slideDataGoldBlue}
                                current={carouselCurrents[CAROUSEL_KEYS.goldblue]}
                                setCurrent={val => setCurrent(CAROUSEL_KEYS.goldblue, val)}
                                icon={GiDragonfly}
                            />
                        </div>
                    </div>

                    <div className="justify-center w-full flex">
                        <CarouselControl
                            type="previous"
                            title="Go to previous slide"
                            handleClick={() => handlePreviousClick(CAROUSEL_KEYS.goldblue, slideDataGoldBlue)}
                        />
                        <CarouselControl
                            type="next"
                            title="Go to next slide"
                            handleClick={() => handleNextClick(CAROUSEL_KEYS.goldblue, slideDataGoldBlue)}
                        />
                    </div>
                </div>
            </div>
            <div ref={sectionRefs[2]} className="w-screen h-screen content-center justify-self-center pt-[64px]">
                <div className="w-full justify-self-center ">
                    <div className="relative overflow-hidden w-full h-full flex flex-row gap-4 ">
                        <div className="w-1/2 overflow-hidden">
                            <ImageCarousel slides={slideDataPeony}
                                           current={carouselCurrents[CAROUSEL_KEYS.peony]}
                                           setCurrent={val => setCurrent(CAROUSEL_KEYS.peony, val)}
                                           handlePreviousClick={() => handlePreviousClick(CAROUSEL_KEYS.peony, slideDataPeony)}
                                           handleNextClick={() => handleNextClick(CAROUSEL_KEYS.peony, slideDataPeony)}
                            />
                        </div>
                        <div className="w-1/2 overflow-hidden">
                            <TextCarousel
                                slides={slideDataPeony}
                                current={carouselCurrents[CAROUSEL_KEYS.peony]}
                                setCurrent={val => setCurrent(CAROUSEL_KEYS.peony, val)}
                                icon={IoRose}
                            />
                        </div>
                    </div>

                    <div className="justify-center w-full flex">
                        <CarouselControl
                            type="previous"
                            title="Go to previous slide"
                            handleClick={() => handlePreviousClick(CAROUSEL_KEYS.peony, slideDataPeony)}
                        />
                        <CarouselControl
                            type="next"
                            title="Go to next slide"
                            handleClick={() => handleNextClick(CAROUSEL_KEYS.peony, slideDataPeony)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}