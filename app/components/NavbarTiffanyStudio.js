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
    Tooltip, DropdownSection,
} from "@heroui/react";

import Link from "next/link";

import {
    FaArrowAltCircleLeft,
    FaChevronDown, FaChevronUp,
    FaFacebook,
    FaFacebookSquare,
    FaInstagram,
    FaPhoneAlt
} from "react-icons/fa";

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
import {usePathname, useRouter} from "next/navigation";

export default function NavbarTiffanyStudio() {

    const [isTiffanyLampsOpen, setTiffanyLampsIsOpen] = useState(false);
    const [isAvailableLampsOpen, setAvailableLampsIsOpen] = useState(false);
    const [isLampBasesOpen, setLampBasesIsOpen] = useState(false);
    const pathname = usePathname();

    const router = useRouter();

    const handleLampDropdownClick = (key) => {
        if (key === 'magnolia') {
            router.push('/magnoliatiffanystudio/tiffanylamps');
        } else {
            router.push(`/magnoliatiffanystudio/tiffanylamps#${key}`);
        }
        setTiffanyLampsIsOpen(false);
    };

    const handleAvailableLampDropdownClick = (key) => {
        if (key === 'geometric') {
            router.push('/magnoliatiffanystudio/tiffanylampsavailable');
        } else {
            router.push(`/magnoliatiffanystudio/tiffanylampsavailable#${key}`);
        }
        setTiffanyLampsIsOpen(false);
    };

    const getNavbarLabel = () => {
        switch (pathname) {
            case '/magnoliatiffanystudio':
                return 'Főoldal';
            case '/magnoliatiffanystudio/tiffanylamps':
                return 'Tiffany lámpák';
            case '/magnoliatiffanystudio/tiffanylampsavailable':
                return 'Rendelhető Tiffany lámpák';
            case '/magnoliatiffanystudio/contact':
                return 'Kapcsolat';
            default:
                return '';
        }
    };

    return (
        <>
            <Navbar position="sticky"
                    className="xl:hidden"
                    classNames={{base: "animate__animated animate__fadeInDown bg-transparent select-none uppercase antonio-navbar"}}>
                <NavbarBrand>
                    <div className="flex items-center gap-3">
                        <img
                            draggable={false}
                            alt="Magnólia Tiffanystudió logó"
                            src="/design/tiffanystudiologotext.png"
                            loading="eager"
                            decoding="sync"
                            width={50}/>
                    </div>
                </NavbarBrand>
                <NavbarContent justify="center">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                className="px-3 bg-transparent data-[hover=true]:bg-transparent text-medium md:text-xl uppercase antonio-navbar"
                                radius="full"
                                endContent={
                                    <FaChevronDown
                                        size={15}
                                        className={`mt-1 transition-transform duration-300 ${isTiffanyLampsOpen ? 'rotate-180' : ''}`}
                                    />
                                }
                            >
                                {getNavbarLabel()}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Dropdown menu">
                            <DropdownSection showDivider>
                                <DropdownItem key="landing_page"
                                              onPress={() => router.push('/', {shallow: true})}>
                                <span
                                    className='hover:underline hover:decoration-dashed'>
                                    Kezdőlap
                                </span>
                                </DropdownItem>
                                <DropdownItem key="main_page"
                                              onPress={() => router.push('/magnoliatiffanystudio', {shallow: true})}>
                                <span
                                    className={`${pathname === '/magnoliatiffanystudio' ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                                    Főoldal
                                </span>
                                </DropdownItem>
                                <DropdownItem key="contact"
                                              onPress={() => router.push('/magnoliatiffanystudio/contact', {shallow: true})}>
                                <span
                                    className={`${pathname === '/magnoliatiffanystudio/contact' ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                                    Kapcsolat
                                </span>
                                </DropdownItem>
                            </DropdownSection>
                            <DropdownSection showDivider title="Tiffany lámpák">
                                <DropdownItem key="magnolia" startContent={<PiFlowerFill size={20}/>}
                                              onClick={() => handleLampDropdownClick('magnolia')}>28" Magnólia Tiffany
                                    Lámpa</DropdownItem>
                                <DropdownItem key="goldblue" startContent={<GiDragonfly size={20}/>}
                                              onClick={() => handleLampDropdownClick('goldblue')}>Gold-Blue Dragonfly
                                    Tiffany
                                    Lámpa</DropdownItem>
                                <DropdownItem key="peony" startContent={<IoRose size={20}/>}
                                              onClick={() => handleLampDropdownClick('peony')}>Peony Tiffany
                                    Lámpa</DropdownItem>
                                <DropdownItem key="acorn" startContent={<PiAcornFill size={20}/>}
                                              onClick={() => handleLampDropdownClick('acorn')}>Acorn Tiffany
                                    Lámpa</DropdownItem>
                                <DropdownItem key="waterlily" startContent={<GiLilyPads size={20}/>}
                                              onClick={() => handleLampDropdownClick('waterlily')}>Waterlily Tiffany
                                    Lámpa</DropdownItem>
                                <DropdownItem key="chestnut" startContent={<GiChestnutLeaf size={20}/>}
                                              onClick={() => handleLampDropdownClick('chestnut')}>Chestnut Tiffany
                                    Lámpa</DropdownItem>
                                <DropdownItem key="vine" startContent={<GiCurlingVines size={20}/>}
                                              onClick={() => handleLampDropdownClick('vine')}>Vine Ornament Tiffany
                                    Lámpa</DropdownItem>
                                <DropdownItem key="dragonfly" startContent={<GiFairyWings size={20}/>}
                                              onClick={() => handleLampDropdownClick('dragonfly')}>Dragonfly Tiffany
                                    Lámpa</DropdownItem>
                                <DropdownItem key="tulip" startContent={<PiFlowerTulipFill size={20}/>}
                                              onClick={() => handleLampDropdownClick('tulip')}>Tulipános Tiffany
                                    Lámpa</DropdownItem>
                            </DropdownSection>
                            <DropdownSection showDivider title="Rendelhető Tiffany lámpák">
                                <DropdownItem startContent={<IoIosGrid size={20}/>}
                                              onClick={() => handleAvailableLampDropdownClick('geometric')}>Rendelhető
                                    geometrikus Tiffany
                                    lámpák</DropdownItem>
                                <DropdownItem startContent={<LuLamp size={20}/>}
                                              onClick={() => handleAvailableLampDropdownClick('table')}>Rendelhető
                                    asztali
                                    Tiffany
                                    lámpák</DropdownItem>
                                <DropdownItem startContent={<LuLampFloor size={20}/>}
                                              onClick={() => handleAvailableLampDropdownClick('standing')}>Rendelhető
                                    álló
                                    Tiffany
                                    lámpák</DropdownItem>
                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <div className="flex flex-row gap-3 pt-1">
                            <a href="mailto:m.tiffanystudio@gmail.com"
                               className="text-xl font-light antonio-navbar text-white">
                                <RiMailFill size="25px"/>
                            </a>
                            <Link href="https://www.instagram.com/magnolia_tiffanystudio/" target="_blank"
                                  className="text-xl font-light antonio-navbar text-white">
                                <AiFillInstagram size="26px"/>
                            </Link>
                            <Link href="https://www.facebook.com/profile.php?id=100054201323550#" target="_blank"
                                  className="text-xl font-light antonio-navbar text-white">
                                <FaFacebookSquare size="23px"/>
                            </Link>
                        </div>
                    </NavbarItem>

                </NavbarContent>
            </Navbar>
            <Navbar position="sticky" maxWidth="full" className="hidden xl:block"
                    classNames={{base: "animate__animated animate__fadeInDown bg-transparent select-none uppercase antonio-navbar"}}>
                <NavbarBrand>
                    <div className="flex items-center gap-3">
                        <img
                            draggable={false}
                            alt="Magnólia Tiffanystudió logó"
                            src="/design/tiffanystudiologo.png"
                            loading="eager"
                            decoding="sync"
                            width={36}/>
                        <p className="text-2xl pt-1 allura-regular normal-case bg-gradient-to-r from-[#896b60] to-[#ce9c72] inline-block text-transparent bg-clip-text">
                            Magnólia Tiffanystúdió
                        </p>
                    </div>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4 " justify="center">
                    <NavbarItem>
                        <Tooltip content="Vissza a kezdőlapra" placement="bottom" showArrow={true} radius="full"
                                 color="foreground" size="sm">
                            <Link href="/"><FaArrowAltCircleLeft color="white" className="pt-1" size={27}/></Link>
                        </Tooltip>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar"
                            radius="full"
                            onPress={() => router.push('/magnoliatiffanystudio', {shallow: true})}
                        >
                                    <span
                                        className={`${pathname === '/magnoliatiffanystudio' ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                                        Főoldal
                                    </span>
                        </Button>
                    </NavbarItem>
                    <Dropdown isOpen={isTiffanyLampsOpen}
                              onMouseEnter={() => setTiffanyLampsIsOpen(true)}
                              onMouseLeave={() => setTiffanyLampsIsOpen(false)}>
                        <NavbarItem onMouseEnter={() => setTiffanyLampsIsOpen(true)}
                                    onMouseLeave={() => setTiffanyLampsIsOpen(false)}
                                    className="py-2 cursor-pointer">
                            <DropdownTrigger>
                                <Button
                                    className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar cursor-default"
                                    radius="full"
                                    disableRipple={true}
                                    endContent={
                                        <FaChevronDown
                                            size={15}
                                            className={`mt-1 transition-transform duration-300 ${isTiffanyLampsOpen ? 'rotate-180' : ''}`}
                                        />
                                    }>
                                    <span
                                        className={`${pathname === '/magnoliatiffanystudio/tiffanylamps' ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                                        Tiffany lámpák
                                    </span>
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu className="" aria-label="Tiffany lámpák menü">
                            <DropdownItem key="magnolia" startContent={<PiFlowerFill size={20}/>}
                                          onClick={() => handleLampDropdownClick('magnolia')}>28" Magnólia Tiffany
                                Lámpa</DropdownItem>
                            <DropdownItem key="goldblue" startContent={<GiDragonfly size={20}/>}
                                          onClick={() => handleLampDropdownClick('goldblue')}>Gold-Blue Dragonfly
                                Tiffany
                                Lámpa</DropdownItem>
                            <DropdownItem key="peony" startContent={<IoRose size={20}/>}
                                          onClick={() => handleLampDropdownClick('peony')}>Peony Tiffany
                                Lámpa</DropdownItem>
                            <DropdownItem key="acorn" startContent={<PiAcornFill size={20}/>}
                                          onClick={() => handleLampDropdownClick('acorn')}>Acorn Tiffany
                                Lámpa</DropdownItem>
                            <DropdownItem key="waterlily" startContent={<GiLilyPads size={20}/>}
                                          onClick={() => handleLampDropdownClick('waterlily')}>Waterlily Tiffany
                                Lámpa</DropdownItem>
                            <DropdownItem key="chestnut" startContent={<GiChestnutLeaf size={20}/>}
                                          onClick={() => handleLampDropdownClick('chestnut')}>Chestnut Tiffany
                                Lámpa</DropdownItem>
                            <DropdownItem key="vine" startContent={<GiCurlingVines size={20}/>}
                                          onClick={() => handleLampDropdownClick('vine')}>Vine Ornament Tiffany
                                Lámpa</DropdownItem>
                            <DropdownItem key="dragonfly" startContent={<GiFairyWings size={20}/>}
                                          onClick={() => handleLampDropdownClick('dragonfly')}>Dragonfly Tiffany
                                Lámpa</DropdownItem>
                            <DropdownItem key="tulip" startContent={<PiFlowerTulipFill size={20}/>}
                                          onClick={() => handleLampDropdownClick('tulip')}>Tulipános Tiffany
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
                                    className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar cursor-default"
                                    endContent={<FaChevronDown size={15}
                                                               className={`mt-1 transition-transform duration-300 ${isAvailableLampsOpen ? 'rotate-180' : ''}`}/>}
                                    radius="full"
                                    disableRipple={true}
                                    variant="light">
                                    <span
                                        className={`${pathname === '/magnoliatiffanystudio/tiffanylampsavailable' ? 'underline ' : 'hover:underline hover:decoration-dashed '}`}>
                                        Rendelhető Tiffany lámpák
                                    </span>
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>

                        <DropdownMenu className="" aria-label="Rendelhető Tiffany lámpák kategóriák">
                            <DropdownItem startContent={<IoIosGrid size={20}/>}
                                          onClick={() => handleAvailableLampDropdownClick('geometric')}>Rendelhető
                                geometrikus Tiffany
                                lámpák</DropdownItem>
                            <DropdownItem startContent={<LuLamp size={20}/>}
                                          onClick={() => handleAvailableLampDropdownClick('table')}>Rendelhető asztali
                                Tiffany
                                lámpák</DropdownItem>
                            <DropdownItem startContent={<LuLampFloor size={20}/>}
                                          onClick={() => handleAvailableLampDropdownClick('standing')}>Rendelhető álló
                                Tiffany
                                lámpák</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown isOpen={isLampBasesOpen} isDisabled
                              onMouseEnter={() => setLampBasesIsOpen(true)}
                              onMouseLeave={() => setLampBasesIsOpen(false)}>
                        <NavbarItem onMouseEnter={() => setLampBasesIsOpen(true)}
                                    onMouseLeave={() => setLampBasesIsOpen(false)}
                                    className="py-2 cursor-pointer">
                            <DropdownTrigger>
                                <Button
                                    className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar"
                                    endContent={<FaChevronDown size={20} className="pt-1"/>}
                                    radius="sm"
                                    variant="light"
                                >
                                    Lámpatalpak
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                    </Dropdown>

                    <NavbarItem>
                        <Button
                            className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar"
                            radius="full"
                            onPress={() => router.push('/magnoliatiffanystudio/contact', {shallow: true})}
                        >
                        <span
                            className={`${pathname === '/magnoliatiffanystudio/contact' ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                            Kapcsolat
                        </span>
                        </Button>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <div className="flex flex-row gap-3 pt-1">
                            <div className="flex flex-row gap-1 items-center justify-center pb-1">
                                <Tooltip content="Hívj bátran!" showArrow={true} radius="full" color="foreground"
                                         placement="bottom">
                                    <Link href="tel:+36-70/360-0950"
                                          target="_blank"
                                          className="text-xl font-light antonio-navbar text-white"><FaPhoneAlt size="16px"/></Link>
                                </Tooltip>
                                <span className="select-all">+36-70/360-0950</span>
                            </div>
                            <Tooltip content="Keress e-mailben!" placement="bottom" showArrow={true} radius="full"
                                     color="foreground">
                                <Link href="mailto:m.tiffanystudio@gmail.com"
                                      target="_blank"
                                      className="text-xl font-light antonio-navbar text-white"><RiMailFill
                                    size="25px"/></Link>
                            </Tooltip>
                            <Tooltip content="Kövess Instagramon!" placement="bottom" showArrow={true} radius="full"
                                     color="foreground">
                                <Link href="https://www.instagram.com/magnolia_tiffanystudio/" target="_blank"
                                      className="text-xl font-light antonio-navbar text-white"><AiFillInstagram
                                    size="26px"/></Link>
                            </Tooltip>
                            <Tooltip content="Kövess Facebookon!" placement="bottom" showArrow={true} radius="full"
                                     color="foreground">
                                <Link href="https://www.facebook.com/profile.php?id=100054201323550#" target="_blank"
                                      className="text-xl font-light antonio-navbar text-white"><FaFacebookSquare
                                    size="23px"/></Link>
                            </Tooltip>
                        </div>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </>
    );
}
