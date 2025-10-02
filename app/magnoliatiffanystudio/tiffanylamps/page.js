'use client'

import {createRef, useEffect, useMemo, useRef, useState} from "react";
import {ImageCarousel, TextCarousel} from "@/app/components/carousel";
import {IconArrowNarrowRight} from "@tabler/icons-react";

import {PiAcornFill, PiFlowerFill, PiFlowerTulipBold, PiFlowerTulipFill} from "react-icons/pi";
import {GiChestnutLeaf, GiCurlingVines, GiDragonfly, GiFairyWings, GiLilyPads} from "react-icons/gi";
import {IoRose} from "react-icons/io5";
import {Button} from "@heroui/react";
import {FaArrowAltCircleDown} from "react-icons/fa";

const LAMPS = [
    {
        key: "magnolia",
        slides: [
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
        ],
        icon: PiFlowerFill,
        refIdx: 0,
    },
    {
        key: "goldblue",
        slides: [
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
        ],
        icon: GiDragonfly,
        refIdx: 1,
    },
    {
        key: "peony",
        slides: [
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
        ],
        icon: IoRose,
        refIdx: 2,
    },
    {
        key: "acorn",
        slides: [
            {
                title: "Acorn Tiffany Lámpa",
                src: "/magnoliatiffanystudio/acorn/acorn-1.jpg",
            },
            {
                paragraph: "Az „Acorn” Tiffany lámpa egyszerű, mégis kifinomult mintázatával hódít, amely az ikonikus Louis Comfort Tiffany eredeti tervei alapján készült.\n" +
                    "\n" +
                    "A lámpa készítéséhez kiváló minőségű, csodálatos színvilágú Youghiogheny és Bullseye Tiffany üvegeket használtam, amelyek tökéletesen visszaadják a Tiffany stílus esszenciáját.",
                src: "/magnoliatiffanystudio/acorn/acorn-2.jpg",
            },
            {
                paragraph: "A lámpabura 40 cm átmérőjű, és 468 darab kézzel vágott, gondosan összeállított üvegelemből áll.\n" +
                    "\n" +
                    "A bronz talapzat, melynek neve szintén „Acorn”, kifejezetten ehhez a lámpához készült, hogy harmonizáljon a lámpa elegáns megjelenésével.\n" +
                    "\n" +
                    "Számomra ez a tiffany lámpa nem csak egy dekorációs tárgy, hanem a stílus és a melegség megtestesítője, amely bármely helyiségben különleges hangulatot teremt.",
                src: "/magnoliatiffanystudio/acorn/acorn-3.jpg",
            }
        ],
        icon: PiAcornFill,
        refIdx: 3,
    },
    {
        key: "waterlily",
        slides: [
            {
                title: "Waterlily Tiffany Lámpa",
                src: "/magnoliatiffanystudio/waterlily/waterlily-1.jpg",
            },
            {
                paragraph: "A „Waterlily” Tiffany lámpa valódi mestermű, mely a vízililiomok kecses szépségét idézi. Eredeti Louis Comfort Tiffany tervei alapján készült, így hűen visszaadja a Tiffany stílusának finom eleganciáját.",
                src: "/magnoliatiffanystudio/waterlily/waterlily-2.jpg",
            },
            {
                paragraph: "A lámpa különlegessége a gyönyörű, Youghiogheny és Uroboros Tiffany üvegekből készült bura, amely egyedülálló módon tükrözi a természet harmóniáját és színpompáját.",
                src: "/magnoliatiffanystudio/waterlily/waterlily-3.jpg",
            },
            {
                paragraph: "A lámpa 50 cm átmérőjű, ami már önmagában is impozáns méret, azonban magassága, amely eléri a 70 cm-t, még inkább kiemeli jelenlétét a térben.",
                src: "/magnoliatiffanystudio/waterlily/waterlily-4.jpg",
            },
            {
                paragraph: "A tiffany lámpa burája 420 darab kézzel vágott üvegelemből áll, melyek gondosan összeállítva alkotják meg a vízililiom mintát. A bronz lámpatalp, amely szintén a „Waterlily” nevet viseli, tökéletesen kiegészíti a lámpa természetközeli megjelenését, stabil és elegáns alapot biztosítva számára.",
                src: "/magnoliatiffanystudio/waterlily/waterlily-5.jpg",
            },
            {
                paragraph: "Ez a lámpa nem csak egy megvilágító eszköz, hanem egy szemet gyönyörködtető, művészi darab, amely bármely helyiséget elegáns, nyugalmat árasztó hangulattal tölt meg.",
                src: "/magnoliatiffanystudio/waterlily/waterlily-6.jpg",
            },
            {
                src: "/magnoliatiffanystudio/waterlily/waterlily-7.jpg",
            }
        ],
        icon: GiLilyPads,
        refIdx: 4,
    },
    {
        key: "chestnut",
        slides: [
            {
                title: "Chestnut Tiffany Lámpa",
                src: "/magnoliatiffanystudio/chestnut/chestnut-1.jpg",
            },
            {
                paragraph: "A „Chestnut” Tiffany lámpa különlegessége abban rejlik, hogy a gesztenyelevelek ihlette mintázata és a lámpabúra szokatlan, hullámzó formája egészen egyedi látványt nyújt.",
                src: "/magnoliatiffanystudio/chestnut/chestnut-2.jpg",
            },
            {
                paragraph: "Louis Comfort Tiffany eredeti tervei alapján készült, így hűen visszaadja a természet szépségét és Tiffany stílusának különleges eleganciáját.",
                src: "/magnoliatiffanystudio/chestnut/chestnut-3.jpg",
            },
            {
                paragraph: "A Tiffany lámpabúra 30 cm átmérőjű, és 219 darab gondosan összeillesztett Youghiogheny és Bullseye üvegelemből áll, amelyek csodálatos színekben pompáznak, életre keltve a gesztenyelevél mintázatát.",
                src: "/magnoliatiffanystudio/chestnut/chestnut-4.jpg",
            },
            {
                paragraph: "A Tiffany lámpa hullámzó vonalai és természetközeli színei különleges hangulatot teremtenek, miközben a lámpák között is kiemelkedik egyedi formavilágával.",
                src: "/magnoliatiffanystudio/chestnut/chestnut-5.jpg",
            },
            {
                paragraph: "A „Chestnut” Tiffany lámpa nemcsak egy világító eszköz, hanem egy művészi alkotás, amely a természet és a művészet találkozásának tökéletes példája. Egyedisége és különleges megjelenése bármely helyiséget hangulatosabbá és elegánsabbá varázsolja.",
                src: "/magnoliatiffanystudio/chestnut/chestnut-6.jpg",
            },
            {
                src: "/magnoliatiffanystudio/chestnut/chestnut-7.jpg",
            }
        ],
        icon: GiChestnutLeaf,
        refIdx: 5,
    },
    {
        key: "vine",
        slides: [
            {
                title: "Vine Ornament Tiffany Lámpa",
                src: "/magnoliatiffanystudio/vine/vine-1.jpg",
            },
            {
                paragraph: "A „Vine Ornament” Tiffany lámpa egy igazi műalkotás, mely az ősz varázslatos színeit hozza el otthonokba.\n" +
                    "\n" +
                    "Az eredeti Louis Comfort Tiffany tervei alapján készült, így a híres Tiffany stílus egyedi eleganciáját tükrözi. A lámpa burája kiváló minőségű Youghiogheny és Bullseye üvegekből készült, amelyek szépsége és élénk színvilága különlegessé teszi ezt a darabot.",
                src: "/magnoliatiffanystudio/vine/vine-2.jpg",
            },
            {
                paragraph: "A lámpa 40 cm átmérőjű, és 432 darab kézzel vágott, gondosan összeállított üvegelemből áll.\n" +
                    "\n" +
                    "Minden egyes üvegelem precízen illeszkedik egymáshoz, hogy az ősz változatos, meleg színei érvényesüljenek.",
                src: "/magnoliatiffanystudio/vine/vine-3.jpg",
            },
            {
                paragraph: "Ez a tiffany lámpa nem csak egy dekoratív tárgy, hanem az évszakok örök körforgásának megtestesítője. Meghittséget és természetközeli hangulatot varázsol bármely helyiségbe.",
                src: "/magnoliatiffanystudio/vine/vine-4.jpg",
            }
        ],
        icon: GiCurlingVines,
        refIdx: 6,
    },
    {
        key: "dragonfly",
        slides: [
            {
                title: "Dragonfly Tiffany Lámpa",
                src: "/magnoliatiffanystudio/dragonfly/dragonfly-1.jpg",
            },
            {
                paragraph: "A „Dragonfly” Tiffany lámpa különleges varázslatot hordoz magában, hiszen a szitakötő finom, légies szépségét örökíti meg Louis Comfort Tiffany eredeti tervei alapján.",
                src: "/magnoliatiffanystudio/dragonfly/dragonfly-2.jpg",
            },
            {
                paragraph: "Az Uroboros és Bullseye Tiffany üvegek használata lenyűgöző fényjátékkal és színvilággal gazdagítja a lámpát, kiemelve a Tiffany stílusra jellemző egyedi részleteket és eleganciát.",
                src: "/magnoliatiffanystudio/dragonfly/dragonfly-3.jpg",
            },
            {
                paragraph: "A tiffany lámpabúra 40 cm átmérőjű, ami tökéletes méret ahhoz, hogy a lámpa bármely tér fókuszpontjává váljon, anélkül, hogy túlzottan dominálná a környezetét. Az üvegelemek gondos elrendezése, valamint a szitakötő mintázat finom részletei igazán egyedivé teszik ezt a darabot.",
                src: "/magnoliatiffanystudio/dragonfly/dragonfly-4.jpg",
            }
            ,
            {
                paragraph: "Ez a tiffany lámpa nem csupán világító eszköz, hanem művészi kifejezés is, amely a természet varázsát ötvözi az üveg kézművesség mesteri kivitelezésével. A „Dragonfly” Tiffany lámpa meleg, lágy fényt áraszt, miközben a szitakötő kecsességét és könnyedségét varázsolja otthonába.",
                src: "/magnoliatiffanystudio/dragonfly/dragonfly-5.jpg",
            }
            ,
            {
                src: "/magnoliatiffanystudio/dragonfly/dragonfly-6.jpg",
            }
        ],
        icon: GiFairyWings,
        refIdx: 7,
    },
    {
        key: "tulip",
        slides: [
            {
                title: "Tulip Tiffany Lámpa",
                src: "/magnoliatiffanystudio/tulip/tulip-1.jpg",
            },
            {
                paragraph: "A Tulipános Tiffany lámpa egy bájos és elegáns darab, amely a tulipánok kecsességét és szépségét örökíti meg.\n" +
                    "\n" +
                    "A lámpa gyönyörű, meleg színtónusait a kiváló minőségű Bullseye Tiffany üveg biztosítja, amelyek finoman árnyalják a fényt, és meleg hangulatot árasztanak a szobában.",
                src: "/magnoliatiffanystudio/tulip/tulip-2.jpg",
            },
            {
                paragraph: "A Tiffany lámpa magassága 35 cm, így kompakt méretének köszönhetően tökéletes választás egy kisebb asztalra vagy polcra is. Oldalainak szélessége 24 cm, így elegánsan illeszkedik bármely enteriőrbe anélkül, hogy túlzottan dominálna.\n" +
                    "\n" +
                    "Ez a kis Tiffany lámpa a tulipánmotívumaival a tavasz frissességét és a Tiffany stílus időtlen szépségét ötvözi. A lámpa nemcsak világító eszköz, hanem egy kis műalkotás is, amely bármely helyiséget otthonossá és stílusossá varázsol.",
            },
        ],
        icon: PiFlowerTulipFill,
        refIdx: 8,
    },
];

export default function TiffanyLampsPage() {

    const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    const currentSection = useRef(0);
    const isThrottled = useRef(false);
    const [animate, setAnimate] = useState(false);
    const [carouselCurrents, setCarouselCurrents] = useState(
        LAMPS.reduce((acc, lamp) => {
            acc[lamp.key] = 0;
            return acc;
        }, {})
    );

    useEffect(() => {
        // On mount, check for hash and scroll to section if present
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            const idx = LAMPS.findIndex(lamp => lamp.key === hash);
            if (idx !== -1 && sectionRefs[idx]?.current) {
                currentSection.current = idx;
                sectionRefs[idx].current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, []);



    useEffect(() => {
        let touchStartY = null;

        const handleWheel = (e) => {
            e.preventDefault();
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
            e.stopPropagation()
            if (touchStartY === null) return;
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY - touchEndY;
            if (Math.abs(deltaY) > 40 && !isThrottled.current) { // threshold for swipe
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

    useEffect(() => {
        const pulseOnce = () => {
            setAnimate(true);
            setTimeout(() => setAnimate(false), 799); // match your custom duration
        };
        pulseOnce();
        const interval = setInterval(pulseOnce, 15000);
        return () => clearInterval(interval);
    }, []);

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
            {LAMPS.map((lamp, idx) => (
                <div
                    id={lamp.key}
                    key={lamp.key}
                    ref={sectionRefs[lamp.refIdx]}
                    className={`w-screen h-screen-minus-navbar-desktop content-center justify-self-center `}
                >
                    <div className="w-full justify-self-center ">
                        <div className="relative overflow-hidden w-full h-full flex flex-col-reverse xl:flex-row gap-4 ">
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
                            window.history.replaceState(null, '', `#magnolia`);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                    }}
                    variant="flat"
                    radius="full"
                    size="sm"
                    endContent={<FaArrowAltCircleDown size={18} />}
                >
                    Következő lámpa
                </Button>
            </div>


        </div>
    );

}