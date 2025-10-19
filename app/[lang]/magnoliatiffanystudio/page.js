'use client'

import React, {useEffect, useRef, useState} from "react";
import {motion} from "motion/react";
import {ImageCarousel, TextCarousel} from "@/app/components/carousel";
import {IconArrowNarrowRight} from "@tabler/icons-react";

const LOCALES = ['hu', 'de', 'en'];
const DEFAULT_LOCALE = 'en';

const TEXTS = {
    hu: {
        slides: [
            {
                title: "Magnólia Tiffanystúdió",
                paragraph: "A Diósgyőri vár szomszédságában található Magnólia Tiffanystúdió több, mint 20 éve foglalkozik az építészethez kapcsolódó külső és belső tereket díszítő vagy elválasztó üvegművészeti alkotások tervezésével és kivitelezésével. Számos üvegablak, ajtóbetét, Tiffany lámpa elkészítése mellett, a régi üvegablakok, lámpák helyreállítása és restaurálása is a munkánk része.",
                src: "/magnoliatiffanystudio/magnolia/magnolia-3.jpg"
            },
            {
                title: "Tiffany lámpák Louis de Comfort Tiffany tervei alapján",
                paragraph: "Az itt látható lámpák különlegessége, hogy a híres Louis de Comfort Tiffany eredeti tervei alapján készülnek.",
                src: "/magnoliatiffanystudio/table/table-40.jpg"
            },
            {
                title: "",
                paragraph: "Ezek a lámpák a legmagasabb minőségű, kifejezetten lámpakészítésre gyártott színes Tiffany üvegből készülnek, mint pl. Uroboros, Youghiogheny, Bullseye, Kokomo. Ezek a csodaszép Tiffany-lámpák sokszor igen jelentős súllyal bírnak (hiszen vannak közöttük meglehetősen nagy 66-71 cm átmérővel rendelkezők is), ami megköveteli a bronz lámpatalp alkalmazását.",
                src: "/magnoliatiffanystudio/misc/misc-1.jpg"
            },
            {
                title: "",
                paragraph: "Stúdiónk által készített Tiffany-lámpáknál mindig ügyelünk arra, hogy az adott mintázatú lámpa csakis a hozzá tartozó bronz lámpatalpra kerüljön, hiszen így lesz teljes az összkép.",
                src: "/magnoliatiffanystudio/waterlily/waterlily-6.jpg"
            },
            {
                title: "",
                paragraph: "Az általunk készített lámpákat magánemberek, sokszor gyűjtők vásárolják.",
                src: "/magnoliatiffanystudio/chestnut/chestnut-4.jpg"
            },
            {
                title: "Tiffany-üveg",
                paragraph: "Louis Comfort Tiffany amerikai belsőépítész volt, akit különösen érdekelt az ólomüvegezés természete. 1878-ban nyitotta meg vállalkozását, Tiffany Studios, néven. Mivel nem talált az elképzeléseihez illő üveget, ezért saját üvegöntő műhelyt is fenntartott. Forradalmi újításokat vezetett be mind az üveggyártásban, mind az ablaküveg-készítés technológiájában.",
                src: "/magnoliatiffanystudio/misc/misc-2.jpg"
            },
            {
                title: "",
                paragraph: "Az egyik legnagyobb reform a forrasztásban jelentkezett, ugyanis a korábbi, ólomsínes technikával szemben ez a díszüveg alkalmas lett kisebb felületek létrehozására is, ráadásul az ólomüveggel így íveltebb felületeket is lehetett díszíteni.",
                src: "/magnoliatiffanystudio/goldblue/goldblue-3.jpg"
            },
            {
                title: "",
                paragraph: "A Tiffany-üveg érdekessége, hogy nem az üveg felületét festik meg, hanem a gyártás során, még folyékony állapotban, színező oxidokat (pl.: szelén, kobalt, arany) kevernek hozzájuk. Ezáltal nem csak a színük változik, hanem különböző mintázatok is keletkeznek az üvegen.",
                src: "/magnoliatiffanystudio/misc/misc-3.jpg"
            }
        ]
    },

    de: {
        slides: [
            {
                title: "Magnolia Tiffany Studio",
                paragraph: "Seit 2005 fertige ich außergewöhnliche Reproduktionen von Tiffany-Lampendesigns für meine Kunden weltweit, darunter Architekten, Innenarchitekten und Privatpersonen, die die Arbeiten der Tiffany Studios schätzen, aber nicht die unglaublich hohen Preise zahlen möchten, die originale antike Lampen erzielen.",
                src: "/magnoliatiffanystudio/magnolia/magnolia-3.jpg"
            },
            {
                title: "Tiffany-Lampen nach den Entwürfen von Louis de Comfort Tiffany",
                paragraph: "Das Besondere an den hier gezeigten Lampen ist, dass sie nach den Originalentwürfen des berühmten Louis de Comfort Tiffany gefertigt sind.",
                src: "/magnoliatiffanystudio/table/table-40.jpg"
            },
            {
                title: "",
                paragraph: "Diese Lampen bestehen aus hochwertigen farbigen Tiffany-Gläsern, die speziell für die Lampenherstellung hergestellt wurden, wie zum Beispiel Uroboros, Youghiogheny, Bullseye Oceana und Kokomo Gläser. Diese wunderschönen Tiffany-Lampen haben oft ein beträchtliches Gewicht (da es einige mit einem recht großen Durchmesser von 66–71 cm gibt), was die Verwendung eines bronzenen Lampenfußes erfordert.",
                src: "/magnoliatiffanystudio/misc/misc-1.jpg"
            },
            {
                title: "",
                paragraph: "Ich restauriere und repariere auch professionell originale Tiffany Studios Lampen. Sie können uns jederzeit per E-Mail kontaktieren, um sich nach verfügbaren, fertigen Lampen und Sonderanfertigungen zu erkundigen.",
                src: "/magnoliatiffanystudio/waterlily/waterlily-6.jpg"
            },
            {
                title: "",
                paragraph: "Viele der von uns hergestellten Lampen finden ihre Käufer bei Privatpersonen und Sammlern, die den Stil schätzen.",
                src: "/magnoliatiffanystudio/chestnut/chestnut-4.jpg"
            },
            {
                title: "Tiffany-Glas",
                paragraph: "Louis Comfort Tiffany war ein amerikanischer Innenarchitekt, der sich besonders für die Natur der Glasmalerei interessierte. 1878 eröffnete er sein Unternehmen Tiffany Studios. Da er kein Glas fand, das seinen Vorstellungen entsprach, betrieb er zusätzlich eine eigene Glasgießerei. Er führte revolutionäre Innovationen sowohl in der Glasproduktion als auch in der Fensterglasproduktionstechnologie ein.",
                src: "/magnoliatiffanystudio/misc/misc-2.jpg"
            },
            {
                title: "",
                paragraph: "Eine der größten Neuerungen betraf das Löten, da sich dieses dekorative Glas im Gegensatz zur bisherigen Bleischienentechnik für die Gestaltung kleinerer Flächen eignete und zudem gewölbte Oberflächen mit Buntglas verziert werden konnten.",
                src: "/magnoliatiffanystudio/goldblue/goldblue-3.jpg"
            },
            {
                title: "",
                paragraph: "Das Interessante an Tiffany-Glas ist, dass die Oberfläche des Glases nicht bemalt wird, sondern ihm während der Herstellung farbgebende Oxide (z. B. Selen, Kobalt, Gold) beigemischt werden, während es sich noch im flüssigen Zustand befindet. Dadurch entstehen verschiedene Muster im Glas.",
                src: "/magnoliatiffanystudio/misc/misc-3.jpg"
            }
        ]
    },

    en: {
        slides: [
            {
                title: "Magnolia Tiffany Studio",
                paragraph: "Magnolia Tiffany Studio has been producing Tiffany-style lamps and architectural glass works for many years. We create both bespoke pieces and reproductions for clients including architects, interior designers and private collectors.",
                src: "/magnoliatiffanystudio/magnolia/magnolia-3.jpg"
            },
            {
                title: "Tiffany lamps after designs by Louis Comfort Tiffany",
                paragraph: "The lamps shown here are made following the original designs of the famous Louis Comfort Tiffany.",
                src: "/magnoliatiffanystudio/table/table-40.jpg"
            },
            {
                title: "",
                paragraph: "These lamps are made from high-quality coloured Tiffany glass manufactured specifically for lamp-making, such as Uroboros, Youghiogheny, Bullseye and Kokomo. Many of these beautiful Tiffany lamps are quite heavy (some measure 66–71 cm in diameter), which requires a bronze lamp base.",
                src: "/magnoliatiffanystudio/misc/misc-1.jpg"
            },
            {
                title: "",
                paragraph: "We also professionally restore and repair original Tiffany Studios lamps. Please contact us by email at any time to enquire about available finished lamps or bespoke commissions.",
                src: "/magnoliatiffanystudio/waterlily/waterlily-6.jpg"
            },
            {
                title: "",
                paragraph: "The lamps we create are purchased by private customers, often collectors who appreciate the craftsmanship.",
                src: "/magnoliatiffanystudio/chestnut/chestnut-4.jpg"
            },
            {
                title: "Tiffany glass",
                paragraph: "Louis Comfort Tiffany was an American interior designer particularly interested in the nature of stained glass. In 1878 he founded his company, Tiffany Studios. Not finding glass that met his ideas, he also ran his own glass casting works and introduced revolutionary innovations in glass production and window glass technology.",
                src: "/magnoliatiffanystudio/misc/misc-2.jpg"
            },
            {
                title: "",
                paragraph: "One of the major innovations concerned soldering: unlike the earlier lead strip technique, this decorative glass became suitable for creating smaller areas and could be used to decorate curved surfaces.",
                src: "/magnoliatiffanystudio/goldblue/goldblue-3.jpg"
            },
            {
                title: "",
                paragraph: "The interesting feature of Tiffany glass is that the surface is not painted; colouring oxides (e.g. selenium, cobalt, gold) are mixed into the glass during manufacture while still molten, which not only changes the colour but also produces various patterns in the glass.",
                src: "/magnoliatiffanystudio/misc/misc-3.jpg"
            }
        ]
    }
};


export default function TiffanyStudioPage({ params }) {
    const resolvedParams = React.use ? React.use(params) : params;
    const langParam = resolvedParams?.lang;
    const lang = (langParam && LOCALES.includes(langParam)) ? langParam : DEFAULT_LOCALE;
    const t = TEXTS[lang] || TEXTS[DEFAULT_LOCALE];

    const sectionRefs = Array.from({length: 8}, () => useRef(null));
    const currentSection = useRef(0);
    const isThrottled = useRef(false);
    const [activeSection, setActiveSection] = useState(0);
    const [carouselCurrents, setCarouselCurrents] = useState({ content: 0 });

    const contentMobile = {
        key: "content",
        slides: t.slides,
        refIdx: 0
    };

    const contentDesktop = t.slides.map((s, idx) => ({
        title: s.title || "",
        description: s.paragraph || "",
        image: s.src,
        ref: sectionRefs[idx]
    }));

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

    const backgroundColors = [
        "#000000",
        "#170008",
        "#0f172a",
        "#171717",
        "#171200",
        "#001702"
    ];

    useEffect(() => {
        if (window.innerWidth < 1280) { // xl breakpoint
            currentSection.current = carouselCurrents[contentMobile.key];
        }
    }, [carouselCurrents[contentMobile.key]]);


    return (
        <>
            <motion.div
                initial={{
                    background: "linear-gradient(to bottom, #111111 0%, #000000 50%, #000000 100%)",
                }}
                animate={{
                    background: `linear-gradient(to bottom, #111111 0%, ${backgroundColors[currentSection.current % backgroundColors.length]} 50%, ${backgroundColors[currentSection.current % backgroundColors.length]} 100%)`,
                }}
                className="fixed w-screen h-screen"></motion.div>
            <div className=" h-min items-center justify-center hidden xl:block">
                <div className="flex flex-row gap-5 w-10/12 items-center justify-center mx-auto">

                    <div
                        className="w-5/12 flex flex-col items-center justify-center  animate__animated animate__fadeInLeft">
                        <div className="w-[60vmin] flex flex-col gap-10 mt-20 items-center justify-center">
                            {contentDesktop.map((item, idx) => (
                                <div
                                    key={item.title + idx}
                                    ref={sectionRefs[idx]}
                                    className="max-w-md scroll-mt-40 items-center justify-center"
                                >
                                    <div className={`flex flex-col ${item.title ? 'gap-10' : ''}`}>
                                        <h2 className={`font-bold ${activeSection === idx ? "text-white" : "opacity-20"} ${item.title === "Magnólia Tiffanystúdió" || item.title === "Magnolia Tiffany Studio" ? "text-5xl allura-regular" : "text-4xl"}`}>
                                            {item.title}
                                        </h2>
                                        <p className={`text-lg text-justify ${activeSection === idx ? "text-white" : "opacity-20"}`}>
                                            {item.description}
                                        </p></div>
                                </div>
                            ))}
                            <div className="h-[90vh]"/>
                        </div>
                    </div>

                    <div className="pl-5 w-[40vmin] ">
                        <img
                            src={contentDesktop[activeSection].image}
                            width={10000}
                            height={10000}
                            className="animate__animated animate__fadeInRight w-[40vmin] h-[60vmin] fixed top-20 mt-20 object-cover rounded-lg shadow-lg max-h-[80vh]"
                            alt="current section"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full h-[80vh] xl:hidden justify-self-center">
                <div className="relative overflow-hidden w-fit h-full justify-center items-center flex flex-col gap-4">
                    <div className="w-screen overflow-hidden">
                        <TextCarousel
                            slides={contentMobile.slides}
                            current={carouselCurrents[contentMobile.key]}
                            setCurrent={val => setCurrent(contentMobile.key, val)}
                            icon={contentMobile.icon}
                            isMainPage={true}
                        />
                    </div>
                    <div className="w-screen overflow-hidden">
                        <ImageCarousel
                            slides={contentMobile.slides}
                            current={carouselCurrents[contentMobile.key]}
                            setCurrent={val => setCurrent(contentMobile.key, val)}
                            handlePreviousClick={() => handlePreviousClick(contentMobile.key, contentMobile.slides)}
                            handleNextClick={() => handleNextClick(contentMobile.key, contentMobile.slides)}
                            icon={contentMobile.icon}
                            isMainPage={true}
                        />
                    </div>
                </div>
                <div className="justify-center w-full flex mt-4 animate__animated animate__fadeInUp">
                    <CarouselControl
                        type="previous"
                        title="Go to previous slide"
                        handleClick={() => handlePreviousClick(contentMobile.key, contentMobile.slides)}
                    />
                    <CarouselControl
                        type="next"
                        title="Go to next slide"
                        handleClick={() => handleNextClick(contentMobile.key, contentMobile.slides)}
                    />
                </div>
            </div>
        </>
    );
}