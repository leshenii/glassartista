"use client";

import {useState, useRef, useId, useEffect} from "react";
import {FaRegHandPointDown} from "react-icons/fa";
import {Tooltip} from "@heroui/react";
import {IoCloseCircle} from "react-icons/io5";
import {Lens} from "@/app/components/lens";

const ImageSlide = ({
                        slide, index, current, handleSlideClick, icon: Icon, handleTouchEnd, handleTouchMove, handleTouchStart
                    }) => {
    const slideRef = useRef(null);

    const xRef = useRef(0);
    const yRef = useRef(0);
    const frameRef = useRef();

    const [showTooltip, setShowTooltip] = useState(false);
    const timeoutRef = useRef();

    useEffect(() => {
        if (current === index) {
            timeoutRef.current = setTimeout(() => setShowTooltip(true), 850); // match your transition duration
        } else {
            setShowTooltip(false);
            clearTimeout(timeoutRef.current);
        }
        return () => clearTimeout(timeoutRef.current);
    }, [current, index]);

    useEffect(() => {
        const animate = () => {
            if (!slideRef.current) return;

            const x = xRef.current;
            const y = yRef.current;

            slideRef.current.style.setProperty("--x", `${x}px`);
            slideRef.current.style.setProperty("--y", `${y}px`);

            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    const handleMouseMove = (event) => {
        const el = slideRef.current;
        if (!el) return;

        const r = el.getBoundingClientRect();
        xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
        yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
    };

    const handleMouseLeave = () => {
        xRef.current = 0;
        yRef.current = 0;
    };

    const imageLoaded = (event) => {
        event.currentTarget.style.opacity = "1";
    };

    const {src, position, title} = slide;

    return (<div
        className="[perspective:1200px] [transform-style:preserve-3d] animate__animated animate__fadeInLeftBig animate__slow">
        <li
            ref={slideRef}
            className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[60vmin] md:w-[40vmin] xl:w-[40vmin] h-[80vmin] md:h-[60vmin] xl:h-[60vmin] mx-[-2vmin] z-10 cursor-pointer"
            onClick={() => handleSlideClick(index)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => handleTouchEnd(index)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: current !== index ? "scale(0.7) rotateX(8deg)" : "scale(1) rotateX(0deg)",
                transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                transformOrigin: "center",
            }}>

            <div
                className="absolute top-0 left-0 w-full h-full bg-[#111111] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
                style={{
                    transform: current === index ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)" : "none",
                }}>

                {src ? (
                    <img
                        className="absolute inset-0 w-[100%] h-[100%] rounded-xl object-cover opacity-100 transition-opacity duration-600 ease-in-out"
                        style={{
                            opacity: current === index ? 1 : 0.1,
                            objectPosition: position || "bottom center",
                        }}
                        draggable={false}
                        alt={title}
                        src={src}
                        onLoad={imageLoaded}
                        loading="eager"
                        decoding="sync"
                    />
                ) : (
                    Icon && <div className="flex items-center justify-center w-full h-full">
                        <Icon size={30}/>
                    </div>
                )}

                {current === index && src && showTooltip && (<Tooltip content={
                    <span className="flex items-center gap-2">
                        A kép megtekintéséhez kattints!
                        <FaRegHandPointDown size={16}/>
                    </span>} showArrow={true} placement="top" offset={15} radius="full" color="foreground"
                >
                    <div className="absolute inset-0 bg-black/0 transition-all duration-1000"/>
                </Tooltip>)}
            </div>
        </li>
    </div>);
};

const TextSlide = ({
                       slide, index, current, handleSlideClick, icon: Icon, handleTouchEnd, handleTouchMove, handleTouchStart
                   }) => {
    const slideRef = useRef(null);

    const xRef = useRef(0);
    const yRef = useRef(0);
    const frameRef = useRef();


    const handleMouseMove = (event) => {
        const el = slideRef.current;
        if (!el) return;

        const r = el.getBoundingClientRect();
        xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
        yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
    };

    const handleMouseLeave = () => {
        xRef.current = 0;
        yRef.current = 0;
    };

    const {src, position, paragraph, title} = slide;
 
    return (<div
        className="[perspective:300px] [transform-style:preserve-3d] animate__animated animate__fadeInLeftBig animate__slow">
        <li
            className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[70vmin] xl:w-[50vmin] h-[70vmin] md:h-[30vmin] xl:h-[70vmin] z-10 mx-[2vmin] cursor-pointer"
            onClick={() => handleSlideClick(index)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => handleTouchEnd(index)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: current !== index ? "scale(0.98) rotateX(8deg)" : "scale(1) rotateX(0deg)",
                transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                transformOrigin: "bottom",
            }}>
            <div

                className="justify-items-center content-center absolute top-0 left-0 w-full h-full rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
                style={{
                    transform: current === index ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)" : "none",
                }}>
                <article
                    className={`relative  transition-opacity duration-1000 ease-in-out ${current === index ? "opacity-100 visible" : "opacity-10 visible"}`}>
                    {(title || paragraph) ? (
                        <div ref={slideRef} className="flex flex-col items-center gap-2 md:gap-4 lg:gap-8">
                            {title && (
                                <>
                                    {Icon && <Icon size={35} />}
                                    <h2 className="text-2xl md:lg:text-5xl lg:text-6xl text-center font-semibold relative allura-regular">
                                        {title}
                                    </h2>
                                </>
                            )}
                            {paragraph && (
                                <p
                                    className="text-sm md:text-lg text-justify inter-description relative"
                                    style={{whiteSpace: "pre-line"}}
                                >
                                    {paragraph}
                                </p>
                            )}
                        </div>
                    ) : (
                        Icon && <Icon size={30} />
                    )}

                </article>
            </div>
        </li>
    </div>);
};


export function ImageCarousel({slides, current, setCurrent, handlePreviousClick, handleNextClick, icon}) {
    const [modalOpen, setModalOpen] = useState(false);
    const isScrolling = useRef(false);
    const containerRef = useRef(null);
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchStartY, setTouchStartY] = useState(null);
    const [touchEndX, setTouchEndX] = useState(null);
    const [touchEndY, setTouchEndY] = useState(null);

    const handleSlideClick = (index) => {
        if (current !== index) {
            setCurrent(index);
        } else if (slides[index]?.src) {
            setModalOpen(true);
        }
    };

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
        setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.touches[0].clientX);
        setTouchEndY(e.touches[0].clientY);
    };

    const handleTouchEnd = (index) => {
        if (touchStartX === null || touchEndX === null) {
            if (current !== index) {
                setCurrent(index);
            } else if (slides[index]?.src) {
                setModalOpen(true);
            }
            return
        }
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10) {
            // Tap
            if (current !== index) {
                setCurrent(index);
            } else if (slides[index]?.src) {
                setModalOpen(true);
            }

        } else if (diffX > 50) {
            // Swipe left
            handleNextClick && handleNextClick();
        } else if (diffX < -50) {
            // Swipe right
            handlePreviousClick && handlePreviousClick();
        }
        setTouchStartX(null);
        setTouchEndX(null);
        setTouchStartY(null);
        setTouchEndY(null);
    };

    const handleWheel = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (isScrolling.current) return;
        isScrolling.current = true;

        if (event.deltaY < 0) {
            handlePreviousClick();
        } else if (event.deltaY > 0) {
            handleNextClick(slides);
        }

        // Wait for the transition to finish before allowing another scroll
        setTimeout(() => {
            isScrolling.current = false;
        }, 600); // Match your transition duration (in ms)
    };

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;
        node.addEventListener("wheel", handleWheel, {passive: false});
        return () => node.removeEventListener("wheel", handleWheel, {passive: false});
    }, [current, slides]);

    const handleModalClose = () => setModalOpen(false);

    const id = useId();

    return (<div
        className="relative w-[60vmin] md:w-[40vmin] xl:w-[40vmin] h-[80vmin] md:h-[60vmin] xl:h-[60vmin] mx-auto xl:pl-16 mb-3 select-none"
        aria-labelledby={`carousel-heading-${id}`}>

        <ul
            ref={containerRef}
            className="absolute flex mx-[4vmin] transition-transform duration-1000 ease-in-out xl:py-3"
            style={{
                transform: `translateX(-${current * (100 / slides.length)}%)`,
            }}
            onWheel={handleWheel}
            tabIndex={0}
        >
            {slides.map((slide, index) => (<ImageSlide
                key={index}
                slide={slide}
                index={index}
                current={current}
                handleSlideClick={handleSlideClick}
                handleTouchStart={handleTouchStart}
                handleTouchMove={handleTouchMove}
                handleTouchEnd={handleTouchEnd}
                icon={icon}
            />))}
        </ul>

        <ImageModal
            src={slides[current].src}
            alt={slides[current].title}
            open={modalOpen}
            onClose={handleModalClose}
        />
    </div>);
}

export function TextCarousel({slides, current, setCurrent, icon}) {
    const [modalOpen, setModalOpen] = useState(false);
    const isScrolling = useRef(false);
    const containerRef = useRef(null);
    const [touchStartX, setTouchStartX] = useState(null);
    const [touchEndX, setTouchEndX] = useState(null);

    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.touches[0].clientX);
    };

    const handleTouchEnd = (index) => {
        if (touchStartX === null || touchEndX === null) {
            if (current !== index) {
                setCurrent(index);
            }
            return
        }
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) < 10) {
            // Tap
            handleSlideClick(index);
        } else if (diff > 50) {
            // Swipe left
            handleNextClick && handleNextClick();
        } else if (diff < -50) {
            // Swipe right
            handlePreviousClick && handlePreviousClick();
        }
        setTouchStartX(null);
        setTouchEndX(null);
    };

    const handlePreviousClick = () => {
        const previous = current - 1;
        setCurrent(previous < 0 ? slides.length - 1 : previous);
    };

    const handleNextClick = () => {
        const next = current + 1;
        setCurrent(next === slides.length ? 0 : next);
    };

    const handleSlideClick = (index) => {
        if (current !== index) {
            setCurrent(index);
        } else {
            setModalOpen(true);
        }
    };

    const handleWheel = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (isScrolling.current) return;
        isScrolling.current = true;

        if (event.deltaY < 0) {
            handlePreviousClick();
        } else if (event.deltaY > 0) {
            handleNextClick(slides);
        }

        setTimeout(() => {
            isScrolling.current = false;
        }, 600);
    };

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;
        node.addEventListener("wheel", handleWheel, {passive: false});
        return () => node.removeEventListener("wheel", handleWheel, {passive: false});
    }, [current, slides]);

    const id = useId();

    return (<div
        className="relative w-[70vmin] xl:w-[50vmin] h-[70vmin] md:h-[30vmin] xl:h-[70vmin] mx-auto xl:ml-16"
        aria-labelledby={`carousel-heading-${id}`}>
        <ul
            ref={containerRef}
            className="absolute flex xl:mx-[-4vmin] transition-transform duration-1000 ease-in-out"
            style={{
                transform: `translateX(-${current * (100 / slides.length)}%)`,
            }}
            tabIndex={0}
        >
            {slides.map((slide, index) => (<TextSlide
                key={index}
                slide={slide}
                index={index}
                current={current}
                handleSlideClick={handleSlideClick}
                handleTouchStart={handleTouchStart}
                handleTouchMove={handleTouchMove}
                handleTouchEnd={handleTouchEnd}
                icon={icon}
            />))}
        </ul>
    </div>);
}

export function ImageModal({src, alt, open, onClose}) {
    if (!open) return null;
    return (

        <div
            className="fixed inset-0 z-52 flex items-center justify-center bg-black bg-opacity-80 select-none rounded-none"
            onClick={onClose}
        >
            <button
                className="absolute top-4 right-6 text-white text-3xl font-bold z-60 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/80 transition"
                onClick={e => {
                    e.stopPropagation();
                    onClose();
                }}
                onTouchEnd={e => {
                    e.stopPropagation();
                    onClose();
                }}
                aria-label="Close modal"
                tabIndex={0}
            >
                <IoCloseCircle size={30} className="cursor-pointer" />
            </button>
            <Lens>
            <img
                draggable={false}
                src={src}
                alt={alt}
                className="w-[90vw] h-[90vh] shadow-lg rounded-none"
                style={{objectFit: 'contain'}}
                onClick={e => e.stopPropagation()}
            />
            </Lens>
        </div>

    );
}
