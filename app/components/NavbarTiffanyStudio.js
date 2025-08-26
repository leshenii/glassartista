'use client'

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Link,
} from "@heroui/react";
import {FaChevronDown} from "react-icons/fa";

import {PiAcornFill, PiFlowerFill, PiFlowerTulipBold, PiFlowerTulipFill} from "react-icons/pi";
import {GiChestnutLeaf, GiCurlingVines, GiDragonfly, GiFairyWings, GiLilyPads} from "react-icons/gi";
import {IoRose} from "react-icons/io5";
import {LuLamp, LuLampFloor} from "react-icons/lu";
import {IoIosGrid} from "react-icons/io";
import {useState} from "react";

import {motion} from "motion/react"

export default function NavbarTiffanyStudio() {

    const [isTiffanyLampsOpen, setTiffanyLampsIsOpen] = useState(false);
    const [isAvailableLampsOpen, setAvailableLampsIsOpen] = useState(false);

    return (
        <Navbar maxWidth="full" shouldHideOnScroll classNames={{ base: "items-center bg-transparent golos-text-navbar" }}>
            <NavbarBrand className="brandAutoWidth">
                <p className="font-bold text-inherit">Tiffany</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4 centerContent" justify="center">
                <NavbarItem>
                    <Link href="/" className="text-xl golos-text-navbar text-white">Főoldal</Link>
                </NavbarItem>
                <Dropdown isOpen={isTiffanyLampsOpen}
                          onMouseEnter={() => setTiffanyLampsIsOpen(true)}
                          onMouseLeave={() => setTiffanyLampsIsOpen(false)}>
                    <NavbarItem onMouseEnter={() => setTiffanyLampsIsOpen(true)}
                                onMouseLeave={() => setTiffanyLampsIsOpen(false)}
                                className="py-2 cursor-pointer">
                        <DropdownTrigger>
                            <Link href="/tiffanystudio/tiffanylamps">
                                <Button
                                    className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl golos-text-navbar"
                                    radius="sm"
                                    variant="light"
                                    endContent={<FaChevronDown />}
                                >
                                    Tiffany lámpák
                                </Button>
                            </Link>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu className="light-component border-0" color="secondary" aria-label="Tiffany lámpák menü">
                        <DropdownItem key="magnolia" startContent={<PiFlowerFill size={20}/>}>28" Magnólia Tiffany
                            Lámpa</DropdownItem>
                        <DropdownItem key="goldblue" startContent={<GiDragonfly size={20}/>}>Gold-Blue Dragonfly Tiffany
                            Lámpa</DropdownItem>
                        <DropdownItem key="peony" startContent={<IoRose size={20}/>}>Peony Tiffany Lámpa</DropdownItem>
                        <DropdownItem key="acorn" startContent={<PiAcornFill size={20}/>}>Acorn Tiffany
                            Lámpa</DropdownItem>
                        <DropdownItem key="waterlily" startContent={<GiLilyPads size={20}/>}>Waterlily Tiffany
                            Lámpa</DropdownItem>
                        <DropdownItem key="chestnut" startContent={<GiChestnutLeaf size={20}/>}>Chestnut Tiffany
                            Lámpa</DropdownItem>
                        <DropdownItem key="vine" startContent={<GiCurlingVines size={20}/>}>Vine Ornament Tiffany
                            Lámpa</DropdownItem>
                        <DropdownItem key="dragonfly" startContent={<GiFairyWings size={20}/>}>Dragonfly Tiffany
                            Lámpa</DropdownItem>
                        <DropdownItem key="tulip" startContent={<PiFlowerTulipFill size={20}/>}>Tulipános Tiffany
                            Lámpa</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <Dropdown isOpen={isAvailableLampsOpen}
                          onMouseEnter={() => setAvailableLampsIsOpen(true)}
                          onMouseLeave={() => setAvailableLampsIsOpen(false)}>
                    <NavbarItem onMouseEnter={() => setAvailableLampsIsOpen(true)}
                                onMouseLeave={() => setAvailableLampsIsOpen(false)}
                                className="py-2 cursor-pointer">
                        <DropdownTrigger>
                            <Button
                                className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl golos-text-navbar"
                                endContent={<FaChevronDown/>}
                                radius="sm"
                                variant="light"
                            >
                                Rendelhető&nbsp;Tiffany&nbsp;lámpák
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>

                    <DropdownMenu className="light-component border-0" color="secondary" aria-label="Rendelhető Tiffany lámpák kategóriák">
                        <DropdownItem startContent={<IoIosGrid size={20}/>}>Rendelhető geometrikus Tiffany
                            lámpák</DropdownItem>
                        <DropdownItem startContent={<LuLamp size={20}/>}>Rendelhető asztali Tiffany
                            lámpák</DropdownItem>
                        <DropdownItem startContent={<LuLampFloor size={20}/>}>Rendelhető álló Tiffany
                            lámpák</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <NavbarItem>
                    <Link href="" className="text-xl golos-text-navbar text-white">Lámpatalpak</Link>
                </NavbarItem>

                <NavbarItem>
                    <Link href="" className="text-xl golos-text-navbar text-white">Kapcsolat</Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
