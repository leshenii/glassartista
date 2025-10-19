'use client'

import {ImageModal} from '@/app/components/carousel';
import React, {useState} from "react";
import {IoIosGrid} from "react-icons/io";
import {LuLamp, LuLampFloor} from "react-icons/lu";
import {FaRegHandPointDown} from "react-icons/fa";
import {Tooltip} from "@heroui/react";
import Image from 'next/image'

const LOCALES = ['hu', 'de', 'en'];
const DEFAULT_LOCALE = 'en';

// metadata (shared across locales)
const GEOMETRIC_META = [
    { index: 1, src: '/tiffanystudio/geometric/geometric-1.jpg', radius: 25 },
    { index: 2, src: '/tiffanystudio/geometric/geometric-2.jpg', radius: 30 },
    { index: 3, src: '/tiffanystudio/geometric/geometric-3.jpg', radius: 36 },
    { index: 4, src: '/tiffanystudio/geometric/geometric-4.jpg', radius: 36 },
    { index: 5, src: '/tiffanystudio/geometric/geometric-5.jpg', radius: 40 },
    { index: 6, src: '/tiffanystudio/geometric/geometric-6.png', radius: 40 },
    { index: 7, src: '/tiffanystudio/geometric/geometric-7.jpg', radius: 40 },
    { index: 8, src: '/tiffanystudio/geometric/geometric-8.jpg', radius: 40 },
    { index: 9, src: '/tiffanystudio/geometric/geometric-9.jpg', radius: 40 },
    { index: 10, src: '/tiffanystudio/geometric/geometric-10.jpg', radius: 40 },
    { index: 11, src: '/tiffanystudio/geometric/geometric-11.jpg', radius: 60 },
    { index: 12, src: '/tiffanystudio/geometric/geometric-12.jpg', radius: 68 },
    { index: 13, src: '/tiffanystudio/geometric/geometric-13.jpg' },
];

const TABLE_META = [
    { index: 1, src: '/tiffanystudio/table/table-1.jpeg', radius: 30 },
    { index: 2, src: '/tiffanystudio/table/table-2.jpg', radius: 30 },
    { index: 3, src: '/tiffanystudio/table/table-3.jpg', radius: 30 },
    { index: 4, src: '/tiffanystudio/table/table-4.jpg', radius: 36 },
    { index: 5, src: '/tiffanystudio/table/table-5.jpg', radius: 36 },
    { index: 6, src: '/tiffanystudio/table/table-6.jpg', radius: 36 },
    { index: 7, src: '/tiffanystudio/table/table-7.jpg', radius: 36 },
    { index: 8, src: '/tiffanystudio/table/table-8.jpg', radius: 36 },
    { index: 9, src: '/tiffanystudio/table/table-9.jpg', radius: 40 },
    { index: 10, src: '/tiffanystudio/table/table-10.jpg', radius: 40 },
    { index: 11, src: '/tiffanystudio/table/table-11.jpg', radius: 40 },
    { index: 12, src: '/tiffanystudio/table/table-12.jpg', radius: 40 },
    { index: 13, src: '/tiffanystudio/table/table-13.jpg', radius: 40 },
    { index: 14, src: '/tiffanystudio/table/table-14.jpg', radius: 40 },
    { index: 15, src: '/tiffanystudio/table/table-15.jpg', radius: 40 },
    { index: 16, src: '/tiffanystudio/table/table-16.webp', radius: 40 },
    { index: 17, src: '/tiffanystudio/table/table-17.jpg', radius: 40 },
    { index: 18, src: '/tiffanystudio/table/table-18.jpg', radius: 40 },
    { index: 19, src: '/tiffanystudio/table/table-19.jpg', radius: 40 },
    { index: 20, src: '/tiffanystudio/table/table-20.jpg', radius: 40 },
    { index: 21, src: '/tiffanystudio/table/table-21.jpg', radius: 40 },
    { index: 22, src: '/tiffanystudio/table/table-22.jpg', radius: 40 },
    { index: 23, src: '/tiffanystudio/table/table-23.jpg', radius: 40 },
    { index: 24, src: '/tiffanystudio/table/table-24.jpg', radius: 40 },
    { index: 25, src: '/tiffanystudio/table/table-25.jpg', radius: 45 },
    { index: 26, src: '/tiffanystudio/table/table-26.jpg', radius: 45 },
    { index: 27, src: '/tiffanystudio/table/table-27.jpg', radius: 45 },
    { index: 28, src: '/tiffanystudio/table/table-28.jpg', radius: 45 },
    { index: 29, src: '/tiffanystudio/table/table-29.jpg', radius: 45 },
    { index: 30, src: '/tiffanystudio/table/table-30.jpg', radius: 45 },
    { index: 31, src: '/tiffanystudio/table/table-31.jpg', radius: 45 },
    { index: 32, src: '/tiffanystudio/table/table-32.jpg', radius: 50 },
    { index: 33, src: '/tiffanystudio/table/table-33.jpg', radius: 50 },
    { index: 34, src: '/tiffanystudio/table/table-34.jpg', radius: 50 },
    { index: 35, src: '/tiffanystudio/table/table-35.jpg', radius: 50 },
    { index: 36, src: '/tiffanystudio/table/table-36.jpg', radius: 55 },
    { index: 37, src: '/tiffanystudio/table/table-37.jpg', radius: 55 },
    { index: 38, src: '/tiffanystudio/table/table-38.jpg', radius: 55 },
    { index: 39, src: '/tiffanystudio/table/table-39.jpg', radius: 55 },
];

const STANDING_META = [
    { index: 1, src: '/tiffanystudio/standing/standing-1.jpg', radius: 55 },
    { index: 2, src: '/tiffanystudio/standing/standing-2.jpg', radius: 60 },
    { index: 3, src: '/tiffanystudio/standing/standing-3.jpg', radius: 60 },
    { index: 4, src: '/tiffanystudio/standing/standing-4.jpg', radius: 61 },
    { index: 5, src: '/tiffanystudio/standing/standing-5.jpg', radius: 63 },
    { index: 6, src: '/tiffanystudio/standing/standing-6.jpg', radius: 66 },
    { index: 7, src: '/tiffanystudio/standing/standing-7.jpg', radius: 66 },
    { index: 8, src: '/tiffanystudio/standing/standing-8.jpg', radius: 71 },
];

// localized names + small UI strings
const TEXTS = {
    hu: {
        titleGeometric: 'Rendelhető geometrikus Tiffany lámpák',
        geometric: [
            { name: '10” GEOMETRIC Tiffany geometrikus lámpa' },
            { name: '12” GEOMETRIC Tiffany geometrikus lámpa' },
            { name: '15” LOTUS BELL Tiffany geometrikus lámpa' },
            { name: '15” SPIDER Tiffany geometrikus lámpa' },
            { name: '16” ACORN Tiffany geometrikus lámpa' },
            { name: '16” MUSHROOM Tiffany geometrikus lámpa' },
            { name: '16” PARASOL Tiffany geometrikus lámpa' },
            { name: '16” POMEGRANATE Tiffany geometrikus lámpa' },
            { name: '16” TURTLEBACK-GOLD Tiffany geometrikus lámpa' },
            { name: '16” TURTLEBACK-GREEN Tiffany geometrikus lámpa' },
            { name: '24” PARASOL Tiffany geometrikus lámpa' },
            { name: '27” LOTUS LEAF Tiffany geometrikus lámpa' },
            { name: 'NAUTILUS Tiffany geometrikus lámpa' },
        ],
        titleTable: 'Rendelhető asztali Tiffany lámpák',
        table: TABLE_META.map((m, i) => ({ name: [
                '12” APPLE LOSSOM Tiffany asztali lámpa',
                '12” CHESTNUT Tiffany asztali lámpa',
                '12” DOGWOOD Tiffany asztali lámpa',
                '14” CROCUS Tiffany asztali lámpa',
                '14” DAFFODYL Tiffany asztali lámpa',
                '14” DRAGONFLY Tiffany asztali lámpa',
                '14” PEONY Tiffany asztali lámpa',
                '14” TULIP Tiffany asztali lámpa',
                '16” ACORN Tiffany asztali lámpa',
                '16” BAMBOO Tiffany asztali lámpa',
                '16” BANDED DAFFODIL Tiffany asztali lámpa',
                '16” BLACK-EYED SUSAN Tiffany asztali lámpa',
                '16” DOGWOOD Tiffany asztali lámpa',
                '16” DRAGONFLY Tiffany asztali lámpa',
                '16” FISH Tiffany asztali lámpa',
                '16” GERANIUM Tiffany asztali lámpa',
                '16” HIDRANGEA Tiffany asztali lámpa',
                '16” PANSY Tiffany asztali lámpa',
                '16” PEACOCK Tiffany asztali lámpa',
                '16” POINSETTIA Tiffany asztali lámpa',
                '16” POPPY Tiffany asztali lámpa',
                '16” VINE ORNAMENT Tiffany asztali lámpa',
                '16” WILD ROSE Tiffany asztali lámpa',
                '16” WOODBINE Tiffany asztali lámpa',
                '18” FLOWERING LOTUS Tiffany asztali lámpa',
                '18” PEACOCK Tiffany asztali lámpa',
                '18” PEONY Tiffany asztali lámpa',
                '18” TRUMPET VINE Tiffany asztali lámpa',
                '18” TULIP Tiffany asztali lámpa',
                '18” WISTERIA Tiffany asztali lámpa',
                '18” ORIENTAL POPPY Tiffany asztali lámpa',
                '20” DAFFODIL Tiffany asztali lámpa',
                '20” DRAGONFLY Tiffany asztali lámpa',
                '20” POPPY Tiffany asztali lámpa',
                '20” WATERLILY Tiffany asztali lámpa',
                '22” DRAGONFLY Tiffany asztali lámpa',
                '22” ELABORATE PEONY Tiffany asztali lámpa',
                '22” LABURNUM Tiffany asztali lámpa',
                '22” PEONY Tiffany asztali lámpa'
            ][i] })),
        titleStanding: 'Rendelhető álló Tiffany lámpák',
        standing: [
            { name: '22” DRAGONFLY Tiffany álló lámpa' },
            { name: '22” LABURNUM Tiffany álló lámpa' },
            { name: '24” BORDER PEONY Tiffany álló lámpa' },
            { name: '24” CURTAIN BORDER Tiffany álló lámpa' },
            { name: '25” HYDRANGEA Tiffany álló lámpa' },
            { name: '26” ORIENTAL POPPY Tiffany álló lámpa' },
            { name: '26” ORIENTAL POPPY-RED Tiffany álló lámpa' },
            { name: '28” MAGNÓLIA Tiffany álló lámpa' },
        ],
        tooltip: 'A kép megtekintéséhez kattints!',
        diameter: 'cm átmérő'
    },

    de: {
        titleGeometric: 'Bestellbare Geometrische Tiffany Lampen',
        geometric: [
            { name: '10” Geometrische Tiffany-Lampe (25 cm)' },
            { name: '12” Geometrische Tiffany-Lampe (30 cm)' },
            { name: '15” LOTUS BELL Tiffany-Lampe (36 cm)' },
            { name: '15” SPIDER Tiffany-Lampe (36 cm)' },
            { name: '16” ACORN Tiffany-Lampe (40 cm)' },
            { name: '16” MUSHROOM Tiffany-Lampe (40 cm)' },
            { name: '16” PARASOL Tiffany-Lampe (40 cm)' },
            { name: '16” POMEGRANATE Tiffany-Lampe (40 cm)' },
            { name: '16” TURTLEBACK-GOLD Tiffany-Lampe (40 cm)' },
            { name: '16” TURTLEBACK-GREEN Tiffany-Lampe (40 cm)' },
            { name: '24” PARASOL Tiffany-Lampe (60 cm)' },
            { name: '27” LOTUS LEAF Tiffany-Lampe (68 cm)' },
            { name: 'NAUTILUS Tiffany-Lampe' },
        ],
        titleTable: 'Bestellbare Tiffany Tischlampen',
        table: TABLE_META.map((m, i) => ({ name: [
                '12” APPLE BLOSSOM Tiffany-Lampe (30 cm)',
                '12” CHESTNUT Tiffany-Lampe (30 cm)',
                '12” DOGWOOD Tiffany-Lampe (30 cm)',
                '14” CROCUS Tiffany-Lampe (36 cm)',
                '14” DAFFODIL Tiffany-Lampe (36 cm)',
                '14” DRAGONFLY Tiffany-Lampe (36 cm)',
                '14” PEONY Tiffany-Lampe (36 cm)',
                '14” TULIP Tiffany-Lampe (36 cm)',
                '16” ACORN Tiffany-Lampe (40 cm)',
                '16” BAMBOO Tiffany-Lampe (40 cm)',
                '16” BANDED DAFFODIL Tiffany-Lampe (40 cm)',
                '16” BLACK-EYED SUSAN Tiffany-Lampe (40 cm)',
                '16” DOGWOOD Tiffany-Lampe (40 cm)',
                '16” DRAGONFLY Tiffany-Lampe (40 cm)',
                '16” FISH Tiffany-Lampe (40 cm)',
                '16” GERANIUM Tiffany-Lampe (40 cm)',
                '16” HYDRANGEA Tiffany-Lampe (40 cm)',
                '16” PANSY Tiffany-Lampe (40 cm)',
                '16” PEACOCK Tiffany-Lampe (40 cm)',
                '16” POINSETTIA Tiffany-Lampe (40 cm)',
                '16” POPPY Tiffany-Lampe (40 cm)',
                '16” VINE ORNAMENT Tiffany-Lampe (40 cm)',
                '16” WILD ROSE Tiffany-Lampe (40 cm)',
                '16” WOODBINE Tiffany-Lampe (40 cm)',
                '18” FLOWERING LOTUS Tiffany-Lampe (45 cm)',
                '18” PEACOCK Tiffany-Lampe (45 cm)',
                '18” PEONY Tiffany-Lampe (45 cm)',
                '18” TRUMPET VINE Tiffany-Lampe (45 cm)',
                '18” TULIP Tiffany-Lampe (45 cm)',
                '18” WISTERIA Tiffany-Lampe (45 cm)',
                '18” ORIENTAL POPPY Tiffany-Lampe (45 cm)',
                '20” DAFFODIL Tiffany-Lampe (50 cm)',
                '20” DRAGONFLY Tiffany-Lampe (50 cm)',
                '20” POPPY Tiffany-Lampe (50 cm)',
                '20” WATERLILY Tiffany-Lampe (50 cm)',
                '22” DRAGONFLY Tiffany-Lampe (55 cm)',
                '22” ELABORATE PEONY Tiffany-Lampe (55 cm)',
                '22” LABURNUM Tiffany-Lampe (55 cm)',
                '22” PEONY Tiffany-Lampe (55 cm)'
            ][i] })),
        titleStanding: 'Bestellbare Tiffany Stehlampen',
        standing: [
            { name: '22” DRAGONFLY Tiffany-Stehlampe (55 cm)' },
            { name: '22” LABURNUM Tiffany-Stehlampe (55 cm)' },
            { name: '24” BORDER PEONY Tiffany-Stehlampe (61 cm)' },
            { name: '24” CURTAIN BORDER Tiffany-Stehlampe (61 cm)' },
            { name: '25” HYDRANGEA Tiffany-Stehlampe (63 cm)' },
            { name: '26” ORIENTAL POPPY Tiffany-Stehlampe (66 cm)' },
            { name: '26” ORIENTAL POPPY-RED Tiffany-Stehlampe (66 cm)' },
            { name: '28” MAGNOLIA Tiffany-Stehlampe (71 cm)' },
        ],
        tooltip: 'Zum Betrachten auf das Bild klicken!',
        diameter: 'cm Durchmesser'
    },

    en: {
        titleGeometric: 'Available geometric Tiffany lamps',
        geometric: [
            { name: '10” GEOMETRIC Tiffany lamp (25 cm)' },
            { name: '12” GEOMETRIC Tiffany lamp (30 cm)' },
            { name: '15” LOTUS BELL Tiffany lamp (36 cm)' },
            { name: '15” SPIDER Tiffany lamp (36 cm)' },
            { name: '16” ACORN Tiffany lamp (40 cm)' },
            { name: '16” MUSHROOM Tiffany lamp (40 cm)' },
            { name: '16” PARASOL Tiffany lamp (40 cm)' },
            { name: '16” POMEGRANATE Tiffany lamp (40 cm)' },
            { name: '16” TURTLEBACK-GOLD Tiffany lamp (40 cm)' },
            { name: '16” TURTLEBACK-GREEN Tiffany lamp (40 cm)' },
            { name: '24” PARASOL Tiffany lamp (60 cm)' },
            { name: '27” LOTUS LEAF Tiffany lamp (68 cm)' },
            { name: 'NAUTILUS Tiffany lamp' },
        ],
        titleTable: 'Available Tiffany table lamps',
        table: TABLE_META.map((m, i) => ({ name: [
                '12” APPLE BLOSSOM Tiffany table lamp (30 cm)',
                '12” CHESTNUT Tiffany table lamp (30 cm)',
                '12” DOGWOOD Tiffany table lamp (30 cm)',
                '14” CROCUS Tiffany table lamp (36 cm)',
                '14” DAFFODIL Tiffany table lamp (36 cm)',
                '14” DRAGONFLY Tiffany table lamp (36 cm)',
                '14” PEONY Tiffany table lamp (36 cm)',
                '14” TULIP Tiffany table lamp (36 cm)',
                '16” ACORN Tiffany table lamp (40 cm)',
                '16” BAMBOO Tiffany table lamp (40 cm)',
                '16” BANDED DAFFODIL Tiffany table lamp (40 cm)',
                '16” BLACK-EYED SUSAN Tiffany table lamp (40 cm)',
                '16” DOGWOOD Tiffany table lamp (40 cm)',
                '16” DRAGONFLY Tiffany table lamp (40 cm)',
                '16” FISH Tiffany table lamp (40 cm)',
                '16” GERANIUM Tiffany table lamp (40 cm)',
                '16” HYDRANGEA Tiffany table lamp (40 cm)',
                '16” PANSY Tiffany table lamp (40 cm)',
                '16” PEACOCK Tiffany table lamp (40 cm)',
                '16” POINSETTIA Tiffany table lamp (40 cm)',
                '16” POPPY Tiffany table lamp (40 cm)',
                '16” VINE ORNAMENT Tiffany table lamp (40 cm)',
                '16” WILD ROSE Tiffany table lamp (40 cm)',
                '16” WOODBINE Tiffany table lamp (40 cm)',
                '18” FLOWERING LOTUS Tiffany table lamp (45 cm)',
                '18” PEACOCK Tiffany table lamp (45 cm)',
                '18” PEONY Tiffany table lamp (45 cm)',
                '18” TRUMPET VINE Tiffany table lamp (45 cm)',
                '18” TULIP Tiffany table lamp (45 cm)',
                '18” WISTERIA Tiffany table lamp (45 cm)',
                '18” ORIENTAL POPPY Tiffany table lamp (45 cm)',
                '20” DAFFODIL Tiffany table lamp (50 cm)',
                '20” DRAGONFLY Tiffany table lamp (50 cm)',
                '20” POPPY Tiffany table lamp (50 cm)',
                '20” WATERLILY Tiffany table lamp (50 cm)',
                '22” DRAGONFLY Tiffany table lamp (55 cm)',
                '22” ELABORATE PEONY Tiffany table lamp (55 cm)',
                '22” LABURNUM Tiffany table lamp (55 cm)',
                '22” PEONY Tiffany table lamp (55 cm)'
            ][i] })),
        titleStanding: 'Available Tiffany floor lamps',
        standing: [
            { name: '22” DRAGONFLY Tiffany floor lamp (55 cm)' },
            { name: '22” LABURNUM Tiffany floor lamp (55 cm)' },
            { name: '24” BORDER PEONY Tiffany floor lamp (61 cm)' },
            { name: '24” CURTAIN BORDER Tiffany floor lamp (61 cm)' },
            { name: '25” HYDRANGEA Tiffany floor lamp (63 cm)' },
            { name: '26” ORIENTAL POPPY Tiffany floor lamp (66 cm)' },
            { name: '26” ORIENTAL POPPY-RED Tiffany floor lamp (66 cm)' },
            { name: '28” MAGNOLIA Tiffany floor lamp (71 cm)' },
        ],
        tooltip: 'Click to view image!',
        diameter: 'cm diameter'
    }
};

export default function TiffanyLampsAvailablePage({ params }) {

    const resolvedParams = React.use ? React.use(params) : params;
    const langParam = resolvedParams?.lang;
    const lang = (langParam && LOCALES.includes(langParam)) ? langParam : DEFAULT_LOCALE;

    const GEOMETRIC_LAMPS = GEOMETRIC_META.map((meta, idx) => ({
        ...meta,
        name: (TEXTS[lang]?.geometric?.[idx]?.name) || (TEXTS[DEFAULT_LOCALE]?.geometric?.[idx]?.name) || ''
    }));
    const TABLE_LAMPS = TABLE_META.map((meta, idx) => ({
        ...meta,
        name: (TEXTS[lang]?.table?.[idx]?.name) || (TEXTS[DEFAULT_LOCALE]?.table?.[idx]?.name) || ''
    }));
    const STANDING_LAMPS = STANDING_META.map((meta, idx) => ({
        ...meta,
        name: (TEXTS[lang]?.standing?.[idx]?.name) || (TEXTS[DEFAULT_LOCALE]?.standing?.[idx]?.name) || ''
    }));

    const [clickedImageSrc, setClickedImageSrc] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalClose = () => setModalOpen(false);
    const handleImageClick = (src) => {
        setClickedImageSrc(src);
        setModalOpen(true);
    };

    const tooltipText = TEXTS[lang]?.tooltip || TEXTS[DEFAULT_LOCALE].tooltip;
    const diameterLabel = TEXTS[lang]?.diameter || TEXTS[DEFAULT_LOCALE].diameter;

    return (
        <div id="geometric"
             className="max-w-screen h-fit overflow-hidden flex flex-col gap-20 items-center justify-center mt-4 mb-16 ">
            <div className="flex flex-col items-center justify-center overflow-hidden">
                <div className="flex flex-col items-center justify-center text-center animate__animated animate__fadeInDown">
                    <h1 className="text-3xl px-10 text-balance lg:text-5xl allura-regular ">{TEXTS[lang]?.titleGeometric || TEXTS[DEFAULT_LOCALE].titleGeometric}</h1>
                    <IoIosGrid size={35} className="mt-6 mb-10"/>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mx-12 animate__animated animate__fadeInUp">
                    {GEOMETRIC_LAMPS.map((lamp) => (
                        <div style={{position: "relative"}} key={lamp.index}
                             className="flex flex-col items-center gap-1">
                            <Tooltip content={<span className="flex items-center gap-2">
                                {tooltipText}<FaRegHandPointDown size={16}/></span>}
                                     showArrow={true} placement="top" offset={15} radius="full" color="foreground">
                                <Image
                                    src={lamp.src}
                                    alt={lamp.name}
                                    width={269}
                                    height={358}
                                    className="h-full  mb-2 rounded-lg shadow-lg select-none cursor-pointer"
                                    onClick={() => handleImageClick(lamp.src)}
                                    priority
                                    style={{objectFit: "cover"}}
                                />
                            </Tooltip>
                            <p className="text-center text-2xl antonio-navbar">{lamp.name}</p>
                            {lamp.radius &&
                                <p className="text-center text-xl antonio-navbar">{`${lamp.radius} ${diameterLabel}`}</p>
                            }
                        </div>
                    ))}
                </div>
            </div>

            <div id="table" className="scroll-mt-20 flex flex-col items-center justify-center overflow-hidden">
                <div className="flex flex-col items-center justify-center text-center animate__animated animate__fadeInDown">
                    <h1 className="text-3xl px-10 text-balance lg:text-5xl allura-regular ">{TEXTS[lang]?.titleTable || TEXTS[DEFAULT_LOCALE].titleTable}</h1>
                    <LuLamp size={35} className="mt-6 mb-10"/>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mx-12 animate__animated animate__fadeInUp">
                    {TABLE_LAMPS.map((lamp) => (
                        <div style={{position: "relative"}} key={lamp.index}
                             className="flex flex-col items-center gap-1">
                            <Tooltip content={<span className="flex items-center gap-2">
                                {tooltipText}<FaRegHandPointDown size={16}/></span>}
                                     showArrow={true} placement="top" offset={15} radius="full" color="foreground">
                                <Image
                                    src={lamp.src}
                                    alt={lamp.name}
                                    width={269}
                                    height={358}
                                    className="h-full mb-2 rounded-lg shadow-lg select-none cursor-pointer"
                                    onClick={() => handleImageClick(lamp.src)}
                                    priority
                                    style={{objectFit: "cover"}}
                                />
                            </Tooltip>
                            <p className="text-center text-2xl antonio-navbar">{lamp.name}</p>
                            {lamp.radius &&
                                <p className="text-center text-xl antonio-navbar">{`${lamp.radius} ${diameterLabel}`}</p>
                            }
                        </div>
                    ))}
                </div>
            </div>

            <div id="standing" className="scroll-mt-20 flex flex-col items-center justify-center overflow-hidden">
                <div className="flex flex-col items-center justify-center text-center animate__animated animate__fadeInDown">
                    <h1 className="text-3xl px-10 text-balance lg:text-5xl allura-regular ">{TEXTS[lang]?.titleStanding || TEXTS[DEFAULT_LOCALE].titleStanding}</h1>
                    <LuLampFloor size={35} className="mt-6 mb-10"/>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mx-12 animate__animated animate__fadeInUp">
                    {STANDING_LAMPS.map((lamp) => (
                        <div style={{position: "relative"}} key={lamp.index}
                             className="flex flex-col items-center gap-1">
                            <Tooltip content={<span className="flex items-center gap-2">
                                {tooltipText}<FaRegHandPointDown size={16}/></span>}
                                     showArrow={true} placement="top" offset={15} radius="full" color="foreground">
                                <Image
                                    src={lamp.src}
                                    alt={lamp.name}
                                    width={269}
                                    height={537}
                                    className="h-full mb-2 rounded-lg shadow-lg select-none cursor-pointer"
                                    onClick={() => handleImageClick(lamp.src)}
                                    priority
                                    style={{objectFit: "cover"}}
                                />
                            </Tooltip>
                            <p className="text-center text-2xl antonio-navbar">{lamp.name}</p>
                            {lamp.radius &&
                                <p className="text-center text-xl antonio-navbar">{`${lamp.radius} ${diameterLabel}`}</p>
                            }
                        </div>
                    ))}
                </div>
            </div>

            <ImageModal
                src={clickedImageSrc}
                alt={clickedImageSrc}
                open={modalOpen}
                onClose={handleModalClose}
            />
        </div>
    );
}
