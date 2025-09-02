"use client";
import React, {useEffect, useRef, useState} from "react";
import {useMotionValueEvent, useScroll} from "motion/react";
import {motion} from "motion/react";
import {cn} from "../lib/utils";

export const StickyScroll = ({
                                 content,
                                 contentClassName,
                             }) => {
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef(null);
    const {scrollYProgress} = useScroll({
        // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
        // target: ref
        container: ref,
        offset: ["start start", "end start"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        //const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const cardsBreakpoints = [0, 0.105, 0.225, 0.337, 0.400, 0.460, 0.570, 0.684];
        /*const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
            const distance = Math.abs(latest - breakpoint);
            if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                return index;
            }
            return acc;
        }, 0);*/
        setActiveCard(
            cardsBreakpoints.reduce((acc, breakpoint, index) => {
                if (latest >= breakpoint) {
                    return index;
                }
                return acc;
            }, 0)
        );
        //);
        console.log(content[activeCard].content);
    });

    const backgroundColors = [
        "#000000", // black
        "#170008",
        "#0f172a", // slate-900
        "#171717", // neutral-900
        "#171200",
        "#001702"
    ];


    return (
        <>

            <motion.div
                initial={{
                    background: "linear-gradient(to bottom, #111111 0%, #000000 50%, #000000 100%)",
                }}
                animate={{
                    background: `linear-gradient(to bottom, #111111 0%, ${backgroundColors[activeCard % backgroundColors.length]} 50%, ${backgroundColors[activeCard % backgroundColors.length]} 100%)`,
                }}
                className=" overflow-hidden max-w-screen relative flex max-h-screen h-screen-minus-navbar-desktop justify-center space-x-10 overflow-y-auto rounded-md"
                ref={ref}>
                <div className="div relative flex items-start px-4 animate__animated animate__delay-1s animate__fadeInLeft">
                    <div className="max-w-md">
                        {content.map((item, index) => (
                            <div key={item.title + index} className="my-20">
                                <motion.h2
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: activeCard === index ? 1 : 0.3,
                                    }}
                                    className={`font-bold text-slate-100 ${item.title === "Magnólia Tiffanystúdió" ? "text-5xl allura-regular" : "text-4xl"}`}
                                >
                                    {item.title}
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: activeCard === index ? 1 : 0.3,
                                    }}
                                    className="text-lg text-justify mt-10 max-w-sm text-slate-300">
                                    {item.description}
                                </motion.p>
                            </div>
                        ))}
                        <div className="h-[50vh]"/>
                    </div>
                </div>
                <div
                    className={cn(
                        "sticky top-10 hidden w-[50vmin] h-[60vmin] overflow-hidden rounded-md bg-white lg:block my-auto animate__animated animate__fadeInRight",
                        contentClassName
                    )}>
                    {content[activeCard].content}
                </div>
            </motion.div>
        </>
    );
};
