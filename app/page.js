'use client'

import {Button, Link} from "@heroui/react";
import {BsLampFill} from "react-icons/bs";
import {GiWindowBars} from "react-icons/gi";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Home() {

    return (
        <div className="h-screen">
            <div className="flex flex-row text-white items-center justify-center h-full ">
                <div className="w-1/2 p-10 items-center bg-[url(/design/index-tiffany.webp)] bg-center bg-cover h-full relative overflow-hidden">
                    <div className="animate__animated animate__fadeInLeft animate__slow absolute w-screen inset-0 bg-gradient-to-r from-black/90 to-black/0 z-0" />
                    <div className="animate__animated animate__fadeIn animate__slow flex flex-col gap-4 justify-center h-full relative z-1">
                        <h1 className="text-5xl allura-regular">Magnólia Tiffanystúdió</h1>
                        <p className="text-justify paragraph--p1">A Diósgyőri vár szomszédságában található Magnólia Tiffanystúdió több, mint 20 éve foglalkozik az építészethez kapcsolódó külső és belső tereket díszítő vagy elválasztó üvegművészeti alkotások tervezésével és kivitelezésével. Számos üvegablak, ajtóbetét, Tiffany lámpa elkészítése mellett, a régi üvegablakok, lámpák helyreállítása és restaurálása is a munkánk része.</p>
                        <div><Link href="/magnoliatiffanystudio"><Button className="light" variant="faded" startContent={<BsLampFill size={20} />}>Tovább a weboldalra</Button></Link></div>
                    </div>
                </div>
                <div className="w-1/2 p-10 items-center bg-[url(/design/index-olomuveg.webp)] bg-center bg-cover h-full relative overflow-hidden">
                    <div className="animate__animated animate__fadeInRight animate__slow absolute w-screen inset-y-0 -inset-x-full  bg-gradient-to-l from-black/90 to-black/0 z-0" />
                    <div className="animate__animated animate__fadeIn animate__slow flex flex-col gap-4 justify-center h-full relative z-1">
                        <h1 className="text-4xl title--t1">Építészeti díszüveg</h1>
                        <p className="text-justify paragraph--p1">Cégünk teljeskörű megoldást kínál épület- és belsőépítészeti díszüveg készítésére a tervezéstől egészen a kivitelezésig. Ólomüveg kupolák, díszüveg előtetők, bejárati ajtók, felülvilágítók, modern üvegablakok mind a termékkörünk részét képezik. Minden munkánk a legmagasabb minőséget képviseli, több évtizedes szakmai múltra tekint vissza. Amit nyújtunk: mérnöki tervezés, legmagasabb minőségű művészeti üvegek és alapanyagok felhasználása, professzionális kivitelezés.</p>
                        <div><Button className="light" isDisabled variant="faded" startContent={<GiWindowBars size={20} />}>Fejlesztés alatt</Button></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
