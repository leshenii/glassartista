"use client";

import {useState, useRef, useId, useEffect} from "react";
import {PiFlowerFill} from "react-icons/pi";
import {FaRegHandPointDown} from "react-icons/fa";
import {Tooltip} from "@heroui/react";

const ImageSlide = ({
                        slide, index, current, handleSlideClick
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

    return (<div className="[perspective:1200px] [transform-style:preserve-3d]">
        <li
            ref={slideRef}
            className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[40vmin] h-[60vmin] mx-[-2vmin] z-10 cursor-pointer"
            onClick={() => handleSlideClick(index)}
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

                <img
                    className="absolute inset-0 w-[100%] h-[100%] rounded-xl object-cover opacity-100 transition-opacity duration-600 ease-in-out"
                    style={{
                        opacity: current === index ? 1 : 0.1, objectPosition: position || "bottom center",
                    }}
                    alt={title}
                    src={src}
                    onLoad={imageLoaded}
                    loading="eager"
                    decoding="sync"/>

                {current === index && showTooltip && (<Tooltip content={
                    <span className="flex items-center gap-2">
                        A kép megtekintéséhez kattins!
                        <FaRegHandPointDown size={16}/>
                    </span>}
                    placement="top">
                    <div className="absolute inset-0 bg-black/0 transition-all duration-1000"/>
                </Tooltip>)}
            </div>
        </li>
    </div>);
};

const TextSlide = ({
                       slide, index, current, handleSlideClick
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

    const imageLoaded = (event) => {
        event.currentTarget.style.opacity = "1";
    };

    const {src, position, paragraph, title} = slide;

    return (<div className="[perspective:1200px] [transform-style:preserve-3d]">
        <li
            className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[50vmin] h-[60vmin] z-10 mx-[2vmin] cursor-pointer"
            onClick={() => handleSlideClick(index)}
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
                    {title ? (<div ref={slideRef} className="flex flex-col items-center gap-4">
                            <PiFlowerFill size={30}/>
                            <h2 className="text-lg md:text-lg lg:text-6xl text-center font-semibold relative allura-regular">
                                {title}
                            </h2>

                        </div>

                    ) : paragraph ? (
                        <p className="text-lg md:text-lg lg:text-md text-justify inter-description relative">
                            {paragraph}
                        </p>) : (<PiFlowerFill size={30}/>)}
                </article>
            </div>
        </li>
    </div>);
};


export function ImageCarousel({slides, current, setCurrent, handlePreviousClick, handleNextClick}) {
    const [modalOpen, setModalOpen] = useState(false);
    const isScrolling = useRef(false);
    const containerRef = useRef(null);

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
        className="relative w-[40vmin] h-[60vmin] mx-auto"
        aria-labelledby={`carousel-heading-${id}`}>


        <ul
            ref={containerRef}
            className="absolute flex mx-[4vmin] transition-transform duration-1000 ease-in-out py-3"
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

export function TextCarousel({slides, current, setCurrent}) {
    const [modalOpen, setModalOpen] = useState(false);
    const isScrolling = useRef(false);
    const containerRef = useRef(null);

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
        className=" relative w-[50vmin] h-[70vmin] mx-auto"
        aria-labelledby={`carousel-heading-${id}`}>
        <ul
            ref={containerRef}
            className="absolute flex mx-[-4vmin] transition-transform duration-1000 ease-in-out"
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
            />))}
        </ul>
    </div>);
}

function ImageModal({src, alt, open, onClose}) {
    if (!open) return null;
    return (<div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
        onClick={onClose}
    >
        <img
            src={src}
            alt={alt}
            className="max-w-[90vw] max-h-[90vh] rounded shadow-lg"
            onClick={e => e.stopPropagation()}
        />
    </div>);
}