'use client'

import { useEffect, useRef, useState } from "react";
import {ImageCarousel, TextCarousel} from "@/app/components/carousel";
import {IconArrowNarrowRight} from "@tabler/icons-react";

const slideDataMagnolia = [
    {
        title: "Magnólia Tiffany Lámpa",
        src: "/magnolia-1.jpg",
    },
    {
        paragraph: "A „Magnólia” Tiffany lámpa egy igazi műalkotás, amely a Tiffany lámpák egyik legnagyobb és leglátványosabb darabja. Louis Comfort Tiffany eredeti tervei alapján készült, és a magnólia virágainak gyönyörű mintázatát jeleníti meg. A tiffany lámpa átmérője lenyűgöző, 71 cm-es (28 inch), ami már önmagában is tekintélyes méretet kölcsönöz ennek a műremeknek.",
        position: "center",
        src: "/magnolia-2.jpg",
    },
    {
        paragraph: "Az általam készített lámpa különlegessége, hogy a virágszirmok egy részét a Drapery Tiffany üvegből alkottam meg, amely drapériaszerűen hullámzó felületével adja vissza a virágok természetes mozgását. A lámpa összesen 1260 darab, gondosan kiválogatott Youghiogheny, Uroboros és Bullseye Tiffany üvegből készült, így a fény és a színek játéka minden részletben megfigyelhető.",
        src: "/magnolia-3.jpg",
    },
    {
        paragraph: "A bronz „Senior Floor” lámpatalp, amely a tiffany lámpa stabil alapját adja, a Tiffany lámpatalpak egyik legritkább és legértékesebb darabja. Az egész tiffany lámpa magassága 207 cm, így nem csupán egy fényforrás, hanem egy igazán látványos állólámpa, amely bármely szobát díszíthet.",
        src: "/magnolia-4.jpg",
    },
    {
        paragraph: "Ez a lámpa igazi különlegesség a Tiffany művek között, és leginkább gyűjtők, múzeumok tulajdonában található meg. Az eredeti, 1900-as évek elején készült lámpák ritkaságnak számítanak, és gyakran felbukkannak aukciókon is, ahol jelentős összegekért cserélnek gazdát. A „Magnólia” Tiffany lámpa csodálatos és bonyolult mintázata, valamint a felhasznált kiváló minőségű üvegek miatt az egyik legértékesebb Tiffany lámpának tekinthető.",
        src: "/magnolia-5.jpg",
    },
    {
        src: "/magnolia-6.jpg",
    },
    {
        src: "/magnolia-7.jpg",
    },
    {
        src: "/magnolia-8.jpg",
    },
    {
        src: "/magnolia-9.jpg",
    },
];
const slideDataGoldBlue = [
    {
        title: "Gold-Blue Dragonfly Tiffany Lámpa",
        src: "/goldblue-1.jpg",
    },
    {
        paragraph: "A Gold-Blue „Dragonfly” Tiffany lámpa igazi ékkő a Tiffany lámpák között, amely az arany és kék színek lenyűgöző harmóniájában pompázik.",
        src: "/goldblue-2.jpg",
    },
    {
        paragraph: "A lámpa különlegességét a szitakötő mintázat adja, amely Louis Comfort Tiffany eredeti tervei alapján készült, így hűen tükrözi Tiffany stílusának eleganciáját. A színekben hozzá illő üvegkövek még inkább fokozzák a lámpa luxus megjelenését, eleganciát és különleges fényjátékot kölcsönözve neki.",
        src: "/goldblue-3.jpg",
    },
    {
        paragraph: "A Tiffany lámpa burája 50 cm átmérőjű, és 406 darab gondosan elhelyezett Youghiogheny és Uroboros üvegcséből áll, amelyek együttesen megteremtik a lámpa lélegzetelállító mintázatát. Az egész alkotás magassága a „Twisted Vine” bronz lámpatalppal együtt eléri a 76 cm-t, így igazi figyelemfelkeltő darab bármely térben.",
        src: "/goldblue-4.jpg",
    },
    {
        paragraph: "Ez a lámpa nem csupán fényforrás, hanem egy művészi alkotás, amely a természet szépségét és a Tiffany lámpák klasszikus varázsát ötvözi. Az arany és kék árnyalatok lenyűgöző kombinációja, valamint a lámpa részletgazdag kidolgozása különleges, meghitt hangulatot teremt.",
        src: "/goldblue-5.jpg",
    },
];

const CAROUSEL_KEYS = {
    magnolia: "magnolia",
    goldblue: "goldblue",
    // add more keys as needed
};

export default function TiffanyLampsPage() {

    const [carouselCurrents, setCarouselCurrents] = useState({
        [CAROUSEL_KEYS.magnolia]: 0,
        [CAROUSEL_KEYS.goldblue]: 0,
    });

    const sectionRefs = [useRef(null), useRef(null)];
    const currentSection = useRef(0);
    const isThrottled = useRef(false);

    useEffect(() => {
        const handleWheel = (e) => {
            if (isThrottled.current) return;

            const direction = e.deltaY > 0 ? 1 : -1;
            let nextSection = currentSection.current + direction;

            if (nextSection < 0 || nextSection >= sectionRefs.length) return;

            currentSection.current = nextSection;
            isThrottled.current = true;

            if (nextSection === 0) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                sectionRefs[nextSection].current.scrollIntoView({ behavior: "smooth" });
            }

            setTimeout(() => {
                isThrottled.current = false;
            }, 600);
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
            <div ref={sectionRefs[1]} className="w-screen h-screen-minus-navbar-desktop content-center justify-self-center">
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
        </div>
    );
}