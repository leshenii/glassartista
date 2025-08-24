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
import {FaChevronDown, FaGem} from "react-icons/fa";

import {PiAcornFill, PiCardsThreeFill, PiFlowerFill, PiFlowerTulipBold, PiFlowerTulipFill} from "react-icons/pi";
import {
    GiChestnutLeaf,
    GiCurlingVines,
    GiDoorway,
    GiDragonfly,
    GiFairyWings, GiGems,
    GiHabitatDome,
    GiLilyPads, GiWindowBars
} from "react-icons/gi";
import {IoHammerSharp, IoRose} from "react-icons/io5";
import {LuLamp, LuLampFloor} from "react-icons/lu";
import {IoIosGrid} from "react-icons/io";
import {useState} from "react";
import {FaLandmarkDome} from "react-icons/fa6";
import {BiArch, BiVerticalTop} from "react-icons/bi";
import {TfiRulerPencil} from "react-icons/tfi";
import {MdGridGoldenratio, MdVideoLibrary} from "react-icons/md";
import {LiaPencilRulerSolid} from "react-icons/lia";

export default function NavbarGlassArtista() {

    const [isWorksOpen, setWorksIsOpen] = useState(false);
    const [isDetailsOpen, setDetailsIsOpen] = useState(false);

    return (
        <Navbar classNames={{ base: "bg-transparent" }}>
            <NavbarBrand>
                <p className="font-bold text-inherit">GlassArtista</p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-2" justify="center">
                <NavbarItem>
                    <Link href="/">Főoldal</Link>
                </NavbarItem>

                <Dropdown isOpen={isWorksOpen}
                          onMouseEnter={() => setWorksIsOpen(true)}
                          onMouseLeave={() => setWorksIsOpen(false)}>
                    <NavbarItem onMouseEnter={() => setWorksIsOpen(true)}
                                onMouseLeave={() => setWorksIsOpen(false)}
                    className="py-2 cursor-pointer">
                        <DropdownTrigger

                        >
                            <Button
                                className="px-3 bg-transparent data-[hover=true]:bg-transparent "
                                radius="sm"
                                variant="light"
                                endContent={<FaChevronDown />}
                            >
                                Munkáink
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                        aria-label="Works menu"
                        className="light"
                    >
                        <DropdownItem key="magnolia" startContent={<FaLandmarkDome size={20} />}>Kupola</DropdownItem>
                        <DropdownItem key="goldblue" startContent={<BiArch  size={20} />}>Előtető</DropdownItem>
                        <DropdownItem key="peony" startContent={<GiDoorway  size={20} />}>Bejárat</DropdownItem>
                        <DropdownItem key="acorn" startContent={<GiWindowBars size={20} />}>Ablak</DropdownItem>
                        <DropdownItem key="waterlily" startContent={<BiVerticalTop size={20} />}>Mennyezet</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <Dropdown isOpen={isDetailsOpen}
                          onMouseEnter={() => setDetailsIsOpen(true)}
                          onMouseLeave={() => setDetailsIsOpen(false)}>
                    <NavbarItem onMouseEnter={() => setDetailsIsOpen(true)}
                                onMouseLeave={() => setDetailsIsOpen(false)}
                                className="py-2 cursor-pointer">
                        <DropdownTrigger>
                            <Button
                                className="px-3 bg-transparent data-[hover=true]:bg-transparent"
                                endContent={<FaChevronDown />}
                                radius="sm"
                                variant="light"
                            >
                                Részletek
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu aria-label="Details menu">
                        <DropdownItem startContent={<LiaPencilRulerSolid size={20} />} >Mérnöki tervezés</DropdownItem>
                        <DropdownItem startContent={<PiCardsThreeFill size={20}/>}>Üvegek</DropdownItem>
                        <DropdownItem startContent={<MdGridGoldenratio size={20}/>}>Ólomsínes technológia</DropdownItem>
                        <DropdownItem startContent={<FaGem size={20}/>}>Egyedi díszítés</DropdownItem>
                        <DropdownItem startContent={<IoHammerSharp size={20}/>}>Beépítés</DropdownItem>
                        <DropdownItem startContent={<MdVideoLibrary size={20}/>}>Videók</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <NavbarItem>
                    <Link href="">Rólunk</Link>
                </NavbarItem>

                <NavbarItem>
                    <Link href="">Kapcsolat</Link>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
