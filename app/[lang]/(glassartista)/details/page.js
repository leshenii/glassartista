'use client'

import React, {useEffect, useRef, useState} from "react";
import {ImageCarousel} from "@/app/components/carousel";
import {IconArrowNarrowRight} from "@tabler/icons-react";

import {IoHammerSharp} from "react-icons/io5";
import {Button} from "@heroui/react";
import {FaArrowAltCircleDown, FaArrowAltCircleUp, FaGem} from "react-icons/fa";
import {MdGridGoldenratio, MdVideoLibrary} from "react-icons/md";
import {LiaPencilRulerSolid} from "react-icons/lia";
import {PiCardsThreeFill} from "react-icons/pi";

const LOCALES = ['hu', 'de', 'en'];
const DEFAULT_LOCALE = 'en';

const PROJECTS_META = [
    {key: "engineeringDesign", icon: LiaPencilRulerSolid, refIdx: 0},
    {key: "glasses", icon: PiCardsThreeFill, refIdx: 1},
    {key: "leadRailTechnology", icon: MdGridGoldenratio, refIdx: 2},
    {key: "decoration", icon: FaGem, refIdx: 3},
    {key: "installation", icon: IoHammerSharp, refIdx: 4},
    {key: "videos", icon: MdVideoLibrary, refIdx: 5},
];

const TEXTS = {
    hu: {
        engineeringDesign: [
            {title: "Mérnöki tervezés", src: "/glassartista/engineeringdesign/engineeringdesign-1.webp"},
            {
                paragraph: "Minden munkánk a megrendelővel történő egyeztetés és a megálmodás után mérnöki kezekbe kerül, AutoCAD program segítségével készítjük el a terveket. Ez által az elvégzett díszüvegmunka igényes és precíz lesz. Pl. egy ólomüvegkupola terveit 3D modellben is elkészítjük a megrendelő részére.",
                src: "/glassartista/engineeringdesign/engineeringdesign-2.webp"
            },
            {
                paragraph: "A 3 dimenziós díszüveg munkákhoz – mint pl. egy domború kupola- minden alkalommal méretpontos sablon készül, melyet szintén mérnöki tervezés alapján CNC marógép segítségével gyártanak le. A sablon lehetővé teszi, hogy minden egyes ólomüveg-elemet tizedmilliméter pontossággal készítsünk el és a kupolánál tartsuk a díszüveg-elem ívét.",
                src: "/glassartista/engineeringdesign/engineeringdesign-3.webp"
            },
            {
                src: "/glassartista/engineeringdesign/engineeringdesign-4.webp"
            },
            {
                src: "/glassartista/engineeringdesign/engineeringdesign-5.webp"
            },
        ],
        glasses: [
            {title: "Üvegek", src: "/glassartista/glasses/glasses-1.webp"},
            {
                paragraph: "Csakis a legmagasabb minőségő művészeti üvegekkel dolgozunk, melyek többségében 3-4 mm vastagságúak. Ezen üvegek vastagsága függ a gyártástól is: gépi húzott, vagy fúvott, illetve kézzel hengerelt üvegről beszélünk.",
                src: "/glassartista/glasses/glasses-2.webp"
            },
            {
                paragraph: "Üvegmárkáink: Glashütte Lamberts, Bullseye, Uroboros, Schott Glas, illetve szívesen dolgozunk a Spectrum gyár üvegtermékeivel is.",
                src: "/glassartista/glasses/glasses-3.webp"
            },
            {
                src: "/glassartista/glasses/glasses-4.webp"
            },
        ],
        leadRailTechnology: [
            {title: "Ólomsínes technológia", src: "/glassartista/leadRailTechnology/leadRailTechnology-1.webp"},
            {
                paragraph: "Az ólomsín az építészeti díszüvegmunkánál nagyon fontos, ez adja az üveg stabilitását, fokozza a teherbíróképességét. Egy munka alkalmával többféle típusú és méretű ólomsínnel dolgozunk. A készítendő díszüveg összmérete, a mintázat, az üveg vastagsága mind befolyásolja az ólomsínfélék felhasználását.",
                src: "/glassartista/leadRailTechnology/leadRailTechnology-2.webp"
            },
        ],
        decoration: [
            {title: "Egyedi díszítés", src: "/glassartista/decoration/decoration-2.mp4"},
            {
                paragraph: "Előszeretettel díszítjük az építészeti díszüvegjeinket különféle méretű és színű kristály ékszerüvegekkel, csiszolt, fúvott üvegelemekkel, nagy hangsúlyt fektetünk a díszüveg és a díszítő elemek összhangjára, és az eleganciára.",
                src: "/glassartista/decoration/decoration-1.webp"}
        ],
        installation: [
            {title: "Beépítés", src: "/glassartista/installation/installation-1.webp"},
            {
                paragraph: "Igény esetén cégünk az elkészült építészeti díszüveg beépítését is vállalja. Fontos megjegyezni, hogy e munkafolyamat az építkezésnél, illetve a felújításnál az utolsó lépés kell, hogy legyen, elkerülve a díszüveg esetleges sérülését, illetve így megvédhetjük a nagyobb szennyeződésektől.",
                src: "/glassartista/installation/installation-2.webp"
            },
            {
                src: "/glassartista/installation/installation-3.webp"
            },
            {
                src: "/glassartista/installation/installation-4.webp"
            },
        ],
        videos: [
            {title: "Videók", src: "/glassartista/videos/video-1.mp4"},
            {
                src: "/glassartista/videos/video-2.mp4",
                paragraph: "A videók megtekintéséhez kattints a képekre!"
            },
            {
                src: "/glassartista/videos/video-3.mp4"
            },
            {
                src: "/glassartista/videos/video-4.mp4"
            },
            {
                src: "/glassartista/videos/video-5.mp4"
            },
        ],
    },
    de: {
        engineeringDesign: [
            {title: "Ingenieure Planung", src: "/glassartista/engineeringdesign/engineeringdesign-1.webp"},
            {
                paragraph: " Nach der Abstimmung mit dem Auftraggeber und der Ideenfindung geht jede unserer Arbeiten in die Hände von Ingenieuren über. Wir erstellen die Pläne mit Hilfe von AutoCAD. Dadurch wird die ausgeführte Glasarbeit anspruchsvoll und präzise. Zum Beispiel erstellen wir die Pläne einer Bleiglas-Kuppel auch als 3D-Modell für den Auftraggeber.",
                src: "/glassartista/engineeringdesign/engineeringdesign-2.webp"
            },
            {
                paragraph: "Für die 3-dimensionalen Glasdekorarbeiten – wie z. B. eine gewölbte Kuppel – wird jedes Mal eine maßgenaue Schablone angefertigt, die ebenfalls auf der Grundlage einer technischen Planung mit Hilfe einer CNC-Fräsmaschine hergestellt wird. Die Schablone ermöglicht es, jedes einzelne Bleiglas-Element mit einer Genauigkeit von Zehntelmillimetern herzustellen und bei der Kuppel die Wölbung des Glasdekor-Elements beizubehalten.",
                src: "/glassartista/engineeringdesign/engineeringdesign-3.webp"
            },
            {
                src: "/glassartista/engineeringdesign/engineeringdesign-4.webp"
            },
            {
                src: "/glassartista/engineeringdesign/engineeringdesign-5.webp"
            },
        ],
        glasses: [
            {title: "Gläser", src: "/glassartista/glasses/glasses-1.webp"},
            {
                paragraph: "Wir arbeiten ausschließlich mit hochwertigsten Kunstgläsern, die meist 3-4 mm dick sind. Die Dicke dieser Gläser hängt auch von der Herstellung ab: maschinell gezogen, geblasen oder handgewalzt.",
                src: "/glassartista/glasses/glasses-2.webp"
            },
            {
                paragraph: "Unsere Glasmarken: Glashütte Lamberts, Wissmach, Bullseye, Uroboros, Schott Glas, und wir arbeiten auch gerne mit den Glasprodukten von Spectrumglass.",
                src: "/glassartista/glasses/glasses-3.webp"
            },
            {
                src: "/glassartista/glasses/glasses-4.webp"
            },
        ],
        leadRailTechnology: [
            {title: "Bleisglas-Technologie", src: "/glassartista/leadRailTechnology/leadRailTechnology-1.webp"},
            {
                paragraph: "Bleiprofile sind bei architektonischen Glasarbeiten sehr wichtig, da sie dem Glas Stabilität verleihen und seine Tragfähigkeit erhöhen. Bei einer Arbeit verwenden wir verschiedene Arten und Größen von Bleisprofielen . Die Gesamtgröße des herzustellenden Glases, das Muster und die Glasstärke beeinflussen die Verwendung der Bleiprofilarten.",
                src: "/glassartista/leadRailTechnology/leadRailTechnology-2.webp"
            },
        ],
        decoration: [
            {title: "Dekoration", src: "/glassartista/decoration/decoration-2.mp4"},
            {
                paragraph: "Wir legen großen Wert darauf, unsere dekorativen Architekturgläser mit Kristallgläsern in verschiedenen Größen und Farben, polierten und geblasenen Glaselementen zu schmücken. Dabei achten wir besonders auf die Harmonie zwischen Dekorglas und Zierelementen sowie auf Eleganz.",
                src: "/glassartista/decoration/decoration-1.webp"
            }
        ],
        installation: [
            {title: "Installierung", src: "/glassartista/installation/installation-1.webp"},
            {
                paragraph: "Auf Wunsch übernimmt unser Unternehmen auch den Einbau des fertigen architektonischen Kunstglases. Es ist wichtig zu beachten, dass dieser Arbeitsprozess bei Neubauten sowie bei Renovierungen der letzte Schritt sein sollte, um mögliche Beschädigungen des Kunstglases zu vermeiden und es somit auch vor größeren Verschmutzungen zu schützen.",
                src: "/glassartista/installation/installation-2.webp"
            },
            {
                src: "/glassartista/installation/installation-3.webp"
            },
            {
                src: "/glassartista/installation/installation-4.webp"
            },
        ],
        videos: [
            {title: "Videos", src: "/glassartista/videos/video-1.mp4"},
            {
                src: "/glassartista/videos/video-2.mp4",
                paragraph: "Um die Videos über unsere Arbeit anzusehen, klicken Sie bitte auf die Videominiaturen."
            },
            {
                src: "/glassartista/videos/video-3.mp4"
            },
            {
                src: "/glassartista/videos/video-4.mp4"
            },
            {
                src: "/glassartista/videos/video-5.mp4"
            },
        ],
    },
    en: {
        engineeringDesign: [
            {title: "Engineering design", src: "/glassartista/engineeringdesign/engineeringdesign-1.webp"},
            {
                paragraph: "After consultations with the customer of their expectations, every one of our workpieces is forwarded to engineers. We prepare the plans using the AutoCAD program. As a result, the decorative glass work produced will be demanding and precise. For instance, we create the designs of a stained-glass dome in a 3D model for the customer.",
                src: "/glassartista/engineeringdesign/engineeringdesign-2.webp"
            },
            {
                paragraph: "For 3-dimensional decorative glass works – such as a convex dome – a template is made every time with exact dimensions, which is manufactured based on engineering design using a CNC milling machine. The template makes it possible to make each stained-glass element with an accuracy of a tenth of a millimeter and to keep the curve of the decorative glass element at the dome.",
                src: "/glassartista/engineeringdesign/engineeringdesign-3.webp"
            },
            {
                src: "/glassartista/engineeringdesign/engineeringdesign-4.webp"
            },
            {
                src: "/glassartista/engineeringdesign/engineeringdesign-5.webp"
            },
        ],
        glasses: [
            {title: "Glasses", src: "/glassartista/glasses/glasses-1.webp"},
            {
                paragraph: "We only work with the highest quality art glass, which is mostly 3-4 mm thick. The thickness of these glasses also depends on their production: machine-drawn, blown or hand-rolled glass.",
                src: "/glassartista/glasses/glasses-2.webp"
            },
            {
                paragraph: "Our glass brands: Glashütte Lamberts, Bullseye, Uroboros, Schott Glas, and we are also pleased to work with glass products from the Spectrum factory as well.",
                src: "/glassartista/glasses/glasses-3.webp"
            },
            {
                src: "/glassartista/glasses/glasses-4.webp"
            },
        ],
        leadRailTechnology: [
            {title: "Lead rail technology", src: "/glassartista/leadRailTechnology/leadRailTechnology-1.webp"},
            {
                paragraph: "Lead rail is very important in architectural decorative glass work as it gives the glass its stability and increases its load-bearing capacity. We work with several types and sizes of lead rails during production. The overall size, the pattern and the thickness of the decorative glass to be made all influence the sorts of lead rails.",
                src: "/glassartista/leadRailTechnology/leadRailTechnology-2.webp"
            },
        ],
        decoration: [
            {title: "Decoration", src: "/glassartista/decoration/decoration-2.mp4"},
            {
                paragraph: "We are keen on ornamenting our decorative architectural glasses with crystal jewelry glasses of various sizes and colors, polished and blown glass elements. We place great emphasis on the harmony of decorative glass and decorative elements as well as on elegance.",
                src: "/glassartista/decoration/decoration-1.webp"}
        ],
        installation: [
            {title: "Installation", src: "/glassartista/installation/installation-1.webp"},
            {
                paragraph: "If required, our company also undertakes the installation of the completed architectural decorative glass. It is important to note that this work process should be the last step during construction or renovation to avoid possible damage to the decorative glass as well as to protect it from major contamination.",
                src: "/glassartista/installation/installation-2.webp"
            },
            {
                src: "/glassartista/installation/installation-3.webp"
            },
            {
                src: "/glassartista/installation/installation-4.webp"
            },
        ],
        videos: [
            {title: "Videos", src: "/glassartista/videos/video-1.mp4"},
            {
                src: "/glassartista/videos/video-2.mp4",
                paragraph: "To watch the videos about our work, please click on the video thumbnails."
            },
            {
                src: "/glassartista/videos/video-3.mp4"
            },
            {
                src: "/glassartista/videos/video-4.mp4"
            },
            {
                src: "/glassartista/videos/video-5.mp4"
            },
        ],
    },
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

export default function DetailsPage({params}) {

    const resolvedParams = React.use ? React.use(params) : params;
    const langParam = resolvedParams?.lang;
    const lang = (langParam && LOCALES.includes(langParam)) ? langParam : DEFAULT_LOCALE;


    const PROJECTS = PROJECTS_META.map(meta => ({
        key: meta.key,
        slides: (TEXTS[lang] && TEXTS[lang][meta.key]) ? TEXTS[lang][meta.key] : (TEXTS[DEFAULT_LOCALE][meta.key] || []),
        icon: meta.icon,
        refIdx: meta.refIdx
    }));

    useEffect(() => {
        console.log(PROJECTS);
    }, [PROJECTS]);

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
                            <div className="xl:w-1/2 h-full overflow-hidden text-center xl:my-auto pt-4 xl:pt-0 xl:pr-10 animate__animated animate__fadeInLeft ">
                                <article className="px-6 py-4">
                                    <h2 className="text-2xl font-semibold xl:text-left mb-3">
                                        {project.slides?.[0]?.title || project.key.charAt(0).toUpperCase() + project.key.slice(1)}
                                    </h2>
                                    <div className="prose max-w-none text-justify">
                                        {project.slides?.map((slide, i) => (
                                            slide.paragraph ? (
                                                <p key={`${project.key}-p-${i}`} className="mb-3">
                                                    {slide.paragraph}
                                                </p>
                                            ) : null
                                        ))}
                                    </div>
                                </article>
                            </div>
                        </div>
                        <div className="justify-center w-full flex animate__animated animate__fadeInDown">
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
            <div className="fixed top-15 lg:top-16 left-1/2 -translate-x-1/2 z-51 animate__animated animate__fadeInDown">
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
