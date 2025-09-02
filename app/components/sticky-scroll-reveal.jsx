"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

export const StickyScroll = ({
                                 content,
                                 contentClassName
                             }) => {
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
        // target: ref
        container: ref,
        offset: ["start start", "end start"],
    });
    const cardLength = content.length;

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
        <motion.div
            animate={{
                backgroundColor: backgroundColors[activeCard % backgroundColors.length],
            }}
            className="relative flex h-screen-minus-navbar-desktop justify-center space-x-10 overflow-y-auto rounded-md p-10"
            ref={ref}>
            <div className="div relative flex items-start px-4">
                <div className="max-w-md">
                    {content.map((item, index) => (
                        <div key={item.title + index} className="my-20">
                            <motion.h2
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className="text-4xl font-bold text-slate-100">
                                {item.title}
                            </motion.h2>
                            <motion.p
                                initial={{
                                    opacity: 0,
                                }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.3,
                                }}
                                className="text-lg text-justify mt-10 max-w-sm text-slate-300">
                                {item.description}
                            </motion.p>
                        </div>
                    ))}
                    <div className="h-[50vh]" />
                </div>
            </div>
            <div
                className={cn(
                    "sticky top-10 hidden w-[50vmin] h-[60vmin] overflow-hidden rounded-md bg-white lg:block",
                    contentClassName
                )}>
                {content[activeCard].content}
            </div>
        </motion.div>
    );
};
