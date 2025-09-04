'use client'

import {ImageModal} from '../../components/carousel';
import {useState} from "react";
import {IoIosGrid} from "react-icons/io";
import {LuLamp, LuLampFloor} from "react-icons/lu";
import {FaRegHandPointDown} from "react-icons/fa";
import {Tooltip} from "@heroui/react";

const GEOMETRIC_LAMPS = [
    {
        index: 1,
        name: '10” GEOMETRIC Tiffany geometrikus lámpa',
        src: '/magnoliatiffanystudio/geometric/geometric-1.jpg',
        radius: 25
    },
    {
        index: 2,
        name: '12” GEOMETRIC Tiffany geometrikus lámpa',
        src: '/magnoliatiffanystudio/geometric/geometric-2.jpg',
        radius: 30
    },
    {
        index: 3,
        name: '15” LOTUS BELL Tiffany geometrikus lámpa',
        src: '/magnoliatiffanystudio/geometric/geometric-3.jpg',
        radius: 36
    },
    {
        index: 4,
        name: '15” SPIDER Tiffany geometrikus lámpa',
        src: '/magnoliatiffanystudio/geometric/geometric-4.jpg',
        radius: 36
    },
    {
        index: 5,
        name: '16” ACORN Tiffany geometrikus lámpa',
        src: '/magnoliatiffanystudio/geometric/geometric-5.jpg',
        radius: 40
    },
    {
        index: 6,
        name: '16” MUSHROOM Tiffany geometrikus lámpa',
        src: '/magnoliatiffanystudio/geometric/geometric-6.png',
        radius: 40
    },
    {
        index: 7,
        name: '16” PARASOL Tiffany geometrikus lámpa',
        src: '/magnoliatiffanystudio/geometric/geometric-7.jpg',
        radius: 40
    },
    {
        index: 8,
        name: '16” POMEGRANATE Tiffany geometrikus lámpa',
        src: '/magnoliatiffanystudio/geometric/geometric-8.jpg',
        radius: 40
    },
    {
        index: 9,
        name: '16” TURTLEBACK-GOLD Tiffany geometrikus lámpa',
        src: '/magnoliatiffanystudio/geometric/geometric-9.jpg',
        radius: 40
    },
    {
        index: 10,
        name: '16” TURTLEBACK-GREEN Tiffany geometrikus lámpa',
        src: '/magnoliatiffanystudio/geometric/geometric-10.jpg',
        radius: 40
    },
    {
        index: 11,
        name: '24” PARASOL Tiffany geometrikus lámpa',
        src: '/magnoliatiffanystudio/geometric/geometric-11.jpg',
        radius: 60
    },
    {
        index: 12,
        name: '27” LOTUS LEAF Tiffany geometrikus lámpa',
        src: '/magnoliatiffanystudio/geometric/geometric-12.jpg',
        radius: 68
    },
    {
        index: 13,
        name: 'NAUTILUS Tiffany geometrikus lámpa',
        src: '/magnoliatiffanystudio/geometric/geometric-13.jpg',
    }
];
const TABLE_LAMPS = [
    {
        index: 1,
        name: '12” APPLE LOSSOM Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-1.jpeg',
        radius: 30
    },
    {
        index: 2,
        name: '12” CHESTNUT Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-2.jpg',
        radius: 30
    },
    {
        index: 3,
        name: '12” DOGWOOD Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-3.jpg',
        radius: 30
    },
    {
        index: 4,
        name: '14” CROCUS Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-4.jpg',
        radius: 36
    },
    {
        index: 5,
        name: '14” DAFFODYL Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-5.jpg',
        radius: 36
    },
    {
        index: 6,
        name: '14” DAGONFLY Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-6.jpg',
        radius: 36
    },
    {
        index: 7,
        name: '14” PEONY Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-7.jpg',
        radius: 36
    },
    {
        index: 8,
        name: '14” TULIP Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-8.jpg',
        radius: 36
    },
    {
        index: 9,
        name: '16” ACORN Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-9.jpg',
        radius: 40
    },
    {
        index: 10,
        name: '16” BAMBOO Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-10.jpg',
        radius: 40
    },
    {
        index: 11,
        name: '16” BANDED DAFFODIL Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-11.jpg',
        radius: 40
    },
    {
        index: 12,
        name: '16” BLACK-EYED SUSAN Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-12.jpg',
        radius: 40
    },
    {
        index: 13,
        name: '16” DOGWOOD Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-13.jpg',
        radius: 40
    },
    {
        index: 14,
        name: '16” DRAGONFLY Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-14.jpg',
        radius: 40
    },
    {
        index: 15,
        name: '16” FISH Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-15.jpg',
        radius: 40
    },
    {
        index: 16,
        name: '16” GERANIUM Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-16.webp',
        radius: 40
    },
    {
        index: 17,
        name: '16” HIDRANGEA Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-17.jpg',
        radius: 40
    },
    {
        index: 18,
        name: '16” PANSY Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-18.jpg',
        radius: 40
    },
    {
        index: 19,
        name: '16” PEACOCK Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-19.jpg',
        radius: 40
    },
    {
        index: 20,
        name: '16” POINSETTIA Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-20.jpg',
        radius: 40
    },
    {
        index: 21,
        name: '16” POPPY Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-21.jpg',
        radius: 40
    },
    {
        index: 22,
        name: '16” VINE ORNAMENT Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-22.jpg',
        radius: 40
    },
    {
        index: 23,
        name: '16” WILD ROSE Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-23.jpg',
        radius: 40
    },
    {
        index: 24,
        name: '16” WOODBINE Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-24.jpg',
        radius: 40
    },
    {
        index: 25,
        name: '18” FLOWERING LOTUS Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-25.jpg',
        radius: 45
    },
    {
        index: 26,
        name: '18” PEACOCK Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-26.jpg',
        radius: 45
    },
    {
        index: 27,
        name: '18” PEONY Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-27.jpg',
        radius: 45
    },
    {
        index: 28,
        name: '18” TRUMPET VINE Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-28.jpg',
        radius: 45
    },
    {
        index: 29,
        name: '18” TULIP Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-29.jpg',
        radius: 45
    },
    {
        index: 30,
        name: '18” WISTERIA Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-30.jpg',
        radius: 45
    },
    {
        index: 31,
        name: '18” ORIENTAL POPPY Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-31.jpg',
        radius: 45
    },
    {
        index: 32,
        name: '20” DAFFODIL Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-32.jpg',
        radius: 50
    },
    {
        index: 33,
        name: '20” DRAGONFLY Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-33.jpg',
        radius: 50
    },
    {
        index: 34,
        name: '20” POPPY Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-34.jpg',
        radius: 50
    },
    {
        index: 35,
        name: '20” WATERLILY Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-35.jpg',
        radius: 50
    },
    {
        index: 36,
        name: '22” DRAGONFLY Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-36.jpg',
        radius: 55
    },
    {
        index: 37,
        name: '22” ELABORATE PEONYTiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-37.jpg',
        radius: 55
    },
    {
        index: 38,
        name: '22” LABURNUM Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-38.jpg',
        radius: 55,
    },
    {
        index: 39,
        name: '22” PEONY Tiffany asztali lámpa',
        src: '/magnoliatiffanystudio/table/table-39.jpg',
        radius: 55
    },
];
const STANDING_LAMPS = [
    {
        index: 1,
        name: '22” DRAGONFLY Tiffany álló lámpa',
        src: '/magnoliatiffanystudio/standing/standing-1.jpg',
        radius: 55
    },
    {
        index: 2,
        name: '22” LABURNUM Tiffany álló lámpa',
        src: '/magnoliatiffanystudio/standing/standing-2.jpg',
        radius: 55
    },
    {
        index: 3,
        name: '24” BORDER PEONY Tiffany álló lámpa',
        src: '/magnoliatiffanystudio/standing/standing-3.jpg',
        radius: 60
    },
    {
        index: 4,
        name: '24” CURTAIN BORDER Tiffany álló lámpa',
        src: '/magnoliatiffanystudio/standing/standing-4.jpg',
        radius: 61
    },
    {
        index: 5,
        name: '25” HYDRANGEA Tiffany álló lámpa',
        src: '/magnoliatiffanystudio/standing/standing-5.jpg',
        radius: 63
    },
    {
        index: 6,
        name: '26” ORIANTAL POPPY Tiffany álló lámpa',
        src: '/magnoliatiffanystudio/standing/standing-6.jpg',
        radius: 66
    },
    {
        index: 7,
        name: '26” ORIENTAL POPPY-RED Tiffany álló lámpa',
        src: '/magnoliatiffanystudio/standing/standing-7.jpg',
        radius: 66
    },
    {
        index: 8,
        name: '28” MAGNÓLIA Tiffany álló lámpa',
        src: '/magnoliatiffanystudio/standing/standing-8.jpg',
        radius: 71
    },
];

export default function TiffanyLampsAvailablePage() {

    const [clickedImageSrc, setClickedImageSrc] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const handleModalClose = () => setModalOpen(false);
    const handleImageClick = (src) => {
        setClickedImageSrc(src);
        setModalOpen(true);
    };

    return (
        <div id="geometric"
             className="max-w-screen h-fit overflow-hidden flex flex-col gap-20 items-center justify-center my-4 ">

            <div className="flex flex-col items-center justify-center overflow-hidden">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-5xl allura-regular ">Rendelhető geometrikus Tiffany lámpák</h1>
                    <IoIosGrid size={35} className="mt-6 mb-10"/>
                </div>
                <div className="grid grid-cols-3 gap-12 mx-12">
                    {GEOMETRIC_LAMPS.map((lamp) => (
                        <div key={lamp.index} className="flex flex-col items-center gap-1">
                            <Tooltip content={<span className="flex items-center gap-2">
                                A kép megtekintéséhez kattins!<FaRegHandPointDown size={16}/></span>}
                                     showArrow={true} placement="top" offset={15} radius="full" color="foreground">
                                <img src={lamp.src}
                                     alt={lamp.name}
                                     className="w-[80%] h-auto mb-2 rounded-lg shadow-lg select-none cursor-pointer"
                                     draggable={false}
                                     onClick={() => handleImageClick(lamp.src)}
                                />
                            </Tooltip>
                            <p className="text-center text-2xl antonio-navbar">{lamp.name}</p>
                            {lamp.radius &&
                                <p className="text-center text-xl antonio-navbar">{`${lamp.radius} cm átmérő`}</p>
                            }
                        </div>
                    ))}
                </div>
            </div>

            <div id="table" className="scroll-mt-20 flex flex-col items-center justify-center overflow-hidden">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-5xl allura-regular ">Rendelhető asztali Tiffany lámpák</h1>
                    <LuLamp size={35} className="mt-6 mb-10"/>
                </div>
                <div className="grid grid-cols-3 gap-12 mx-12">
                    {TABLE_LAMPS.map((lamp) => (
                        <div key={lamp.index} className="flex flex-col items-center gap-1">
                            <img src={lamp.src}
                                 alt={lamp.name}
                                 className="w-[80%] h-[100%] object-cover mb-2 rounded-lg shadow-lg select-none cursor-pointer"
                                 draggable={false}
                                 onClick={() => handleImageClick(lamp.src)}
                            />
                            <p className="text-center text-2xl antonio-navbar">{lamp.name}</p>
                            {lamp.radius &&
                                <p className="text-center text-xl antonio-navbar">{`${lamp.radius} cm átmérő`}</p>
                            }
                        </div>
                    ))}
                </div>
            </div>

            <div id="standing" className="scroll-mt-20 flex flex-col items-center justify-center overflow-hidden">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-5xl allura-regular ">Rendelhető álló Tiffany lámpák</h1>
                    <LuLampFloor size={35} className="mt-6 mb-10"/>
                </div>
                <div className="grid grid-cols-3 gap-12 mx-12">
                    {STANDING_LAMPS.map((lamp) => (
                        <div key={lamp.index} className="flex flex-col items-center gap-1">
                            <img src={lamp.src}
                                 alt={lamp.name}
                                 className="w-[80%] h-[100%] object-cover mb-2 rounded-lg shadow-lg select-none cursor-pointer"
                                 draggable={false}
                                 onClick={() => handleImageClick(lamp.src)}
                            />
                            <p className="text-center text-2xl antonio-navbar">{lamp.name}</p>
                            {lamp.radius &&
                                <p className="text-center text-xl antonio-navbar">{`${lamp.radius} cm átmérő`}</p>
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


