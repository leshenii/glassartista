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
    Link, Image, Tooltip,
} from "@heroui/react";
import {FaChevronDown, FaFacebook, FaFacebookSquare, FaInstagram} from "react-icons/fa";

import {PiAcornFill, PiFlowerFill, PiFlowerTulipBold, PiFlowerTulipFill} from "react-icons/pi";
import {GiChestnutLeaf, GiCurlingVines, GiDragonfly, GiFairyWings, GiLilyPads} from "react-icons/gi";
import {IoRose} from "react-icons/io5";
import {LuLamp, LuLampFloor} from "react-icons/lu";
import {IoIosGrid} from "react-icons/io";
import {useState} from "react";

import {motion} from "motion/react"
import {AiFillInstagram} from "react-icons/ai";
import {RiFacebookBoxFill, RiInstagramFill, RiMailFill} from "react-icons/ri";
import {ImMail4} from "react-icons/im";

export default function NavbarTiffanyStudio() {

    const [isTiffanyLampsOpen, setTiffanyLampsIsOpen] = useState(false);
    const [isAvailableLampsOpen, setAvailableLampsIsOpen] = useState(false);

    return (
        <Navbar position="sticky" maxWidth="full"
                classNames={{base: "animate__animated animate__fadeInDown bg-transparent select-none uppercase antonio-navbar"}}>
            <NavbarBrand>
                <div className="flex items-center gap-3">
                    <Image
                        alt="Magnólia Tiffanystudió logó"
                        src="/tiffanystudiologo.png"
                        height={45}
                    />
                    <p className="text-2xl pt-1 allura-regular normal-case bg-gradient-to-r from-[#896b60] to-[#ce9c72] inline-block text-transparent bg-clip-text">Magnólia Tiffanystúdió</p>
                </div>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4 " justify="center">
                <NavbarItem>
                    <Link href="/tiffanystudio" className="text-xl uppercase antonio-navbar text-white">Főoldal</Link>
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
                                    className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar"
                                    radius="sm"
                                    endContent={<FaChevronDown/>}
                                >
                                    Tiffany lámpák
                                </Button>
                            </Link>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu className="" aria-label="Tiffany lámpák menü">
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
                                className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar"
                                endContent={<FaChevronDown/>}
                                radius="sm"
                                variant="light"
                            >
                                Rendelhető Tiffany lámpák
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>

                    <DropdownMenu className="" aria-label="Rendelhető Tiffany lámpák kategóriák">
                        <DropdownItem startContent={<IoIosGrid size={20}/>}>Rendelhető geometrikus Tiffany
                            lámpák</DropdownItem>
                        <DropdownItem startContent={<LuLamp size={20}/>}>Rendelhető asztali Tiffany
                            lámpák</DropdownItem>
                        <DropdownItem startContent={<LuLampFloor size={20}/>}>Rendelhető álló Tiffany
                            lámpák</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <NavbarItem>
                    <Link isDisabled href="" className="text-xl font-light antonio-navbar text-white">Lámpatalpak</Link>
                </NavbarItem>

                <NavbarItem>
                    <Link href="" className="text-xl font-light antonio-navbar text-white">Kapcsolat</Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <div className="flex flex-row gap-3 pt-1">
                        <Tooltip content="Írj nekem e-mailt!" placement="bottom">
                            <Link href="" target="_blank"
                                  className="text-xl font-light antonio-navbar text-white"><RiMailFill size="25px"/></Link>
                        </Tooltip>
                        <Tooltip content="Kövess Instagramon!" placement="bottom">
                            <Link href="" target="_blank"
                                  className="text-xl font-light antonio-navbar text-white"><AiFillInstagram size="25px"/></Link>
                        </Tooltip>
                        <Tooltip content="Kövess Facebookon!" placement="bottom">
                            <Link href="" target="_blank"
                                  className="text-xl font-light antonio-navbar text-white"><FaFacebookSquare size="25px"/></Link>
                        </Tooltip>
                    </div>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
