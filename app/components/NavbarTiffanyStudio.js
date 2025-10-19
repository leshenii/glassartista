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
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {MdLocalFlorist} from "react-icons/md";

export default function NavbarTiffanyStudio() {

    const LOCALES = ['hu', 'de', 'en'];
    const DEFAULT_LOCALE = 'en';
    const COOKIE_NAME = 'NEXT_LOCALE';
    const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

    const TEXT = {
        hu: {
            landing: 'Kezdőlap',
            main: 'Főoldal',
            tiffanyLamps: 'Tiffany lámpák',
            availableLamps: 'Rendelhető Tiffany lámpák',
            lampBases: 'Lámpatalpak',
            contact: 'Kapcsolat',
            backTooltip: 'Vissza a kezdőlapra',
            callTooltip: 'Hívj bátran!',
            emailTooltip: 'Keress e-mailben!',
            instagramTooltip: 'Kövess Instagramon!',
            facebookTooltip: 'Kövess Facebookon!',
            branding: 'Magnólia Tiffanystúdió',
            // lamp names
            lampMagnolia: `28" Magnolia Tiffany lámpa`,
            lampGoldBlue: 'Gold-Blue Dragonfly Tiffany lámpa',
            lampPeony: 'Peony Tiffany lámpa',
            lampAcorn: 'Acorn Tiffany lámpa',
            lampWaterlily: 'Waterlily Tiffany lámpa',
            lampChestnut: 'Chestnut Tiffany lámpa',
            lampVine: 'Vine Ornament Tiffany lámpa',
            lampDragonfly: 'Dragonfly Tiffany lámpa',
            lampTulip: 'Tulip Tiffany lámpa',
            lampSmallPeony: 'Kis Peony Tiffany lámpa',
            // available categories
            availableGeometric: 'Rendelhető geometrikus Tiffany lámpák',
            availableTable: 'Rendelhető asztali Tiffany lámpák',
            availableStanding: 'Rendelhető álló Tiffany lámpák'
        },
        de: {
            landing: 'Landingpage',
            main: 'Hauptseite',
            tiffanyLamps: 'Tiffany-Lampen',
            availableLamps: 'Bestellbare Tiffany-Lampen',
            lampBases: 'Lampenfüße',
            contact: 'Kontakt',
            backTooltip: 'Zur Landingpage',
            callTooltip: 'Ruf uns an!',
            emailTooltip: 'Schreib uns per E-Mail!',
            instagramTooltip: 'Folge auf Instagram!',
            facebookTooltip: 'Folge auf Facebook!',
            branding: 'Magnolia Tiffany Studio',
            // lamp names
            lampMagnolia: `28" Magnolia Tiffany Lampe`,
            lampGoldBlue: 'Gold-Blau Libelle Tiffany Lampe',
            lampPeony: 'Peony Tiffany Lampe',
            lampAcorn: 'Eichel Tiffany Lampe',
            lampWaterlily: 'Seerose Tiffany Lampe',
            lampChestnut: 'Kastanie Tiffany Lampe',
            lampVine: 'Ranken-Ornament Tiffany Lampe',
            lampDragonfly: 'Libelle Tiffany Lampe',
            lampTulip: 'Tulip Tiffany Lampe',
            lampSmallPeony: 'Kleine Peony Tiffany Lampe',
            // available categories
            availableGeometric: 'Bestellbare geometrische Tiffany-Lampen',
            availableTable: 'Bestellbare Tisch-Tiffany-Lampen',
            availableStanding: 'Bestellbare Stehende Tiffany-Lampen'
        },
        en: {
            landing: 'Home',
            main: 'Main',
            tiffanyLamps: 'Tiffany Lamps',
            availableLamps: 'Available Tiffany Lamps',
            lampBases: 'Lamp bases',
            contact: 'Contact',
            backTooltip: 'Back to landing page',
            callTooltip: 'Call me!',
            emailTooltip: 'Contact by email!',
            instagramTooltip: 'Follow on me Instagram!',
            facebookTooltip: 'Follow on me Facebook!',
            branding: 'Magnolia Tiffany Studio',
            // lamp names
            lampMagnolia: `28" Magnolia Tiffany Lamp`,
            lampGoldBlue: 'Gold-Blue Dragonfly Tiffany Lamp',
            lampPeony: 'Peony Tiffany Lamp',
            lampAcorn: 'Acorn Tiffany Lamp',
            lampWaterlily: 'Waterlily Tiffany Lamp',
            lampChestnut: 'Chestnut Tiffany Lamp',
            lampVine: 'Vine Ornament Tiffany Lamp',
            lampDragonfly: 'Dragonfly Tiffany Lamp',
            lampTulip: 'Tulip Tiffany Lamp',
            lampSmallPeony: 'Small Peony Tiffany Lamp',
            // available categories
            availableGeometric: 'Available geometric Tiffany lamps',
            availableTable: 'Available table Tiffany lamps',
            availableStanding: 'Available standing Tiffany lamps'
        }
    };

    const [isTiffanyLampsOpen, setTiffanyLampsIsOpen] = useState(false);
    const [isAvailableLampsOpen, setAvailableLampsIsOpen] = useState(false);
    const [isLampBasesOpen, setLampBasesIsOpen] = useState(false);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    function stripLocaleFromPath(path) {
        const p = (path || '/').split('/');
        if (p.length > 1 && LOCALES.includes(p[1])) {
            p.splice(1, 1);
            const joined = p.join('/');
            return joined === '' ? '/' : joined;
        }
        return path || '/';
    }

    function getLocaleFromPath(path) {
        const parts = (path || '/').split('/');
        return (parts.length > 1 && LOCALES.includes(parts[1])) ? parts[1] : null;
    }

    function setLocaleCookie(locale) {
        if (typeof document === 'undefined') return;
        document.cookie = `${COOKIE_NAME}=${locale}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`;
    }

    const getLocaleFromCookie = () => {
        if (typeof document === 'undefined') return undefined;
        const m = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]+)/);
        return m ? m[1] : undefined;
    };

    const currentLocale = getLocaleFromPath(pathname) || getLocaleFromCookie() || DEFAULT_LOCALE;
    const search = searchParams ? `?${searchParams.toString()}` : '';

    // build localized path for navigation
    const localized = (targetPath) => {
        if (!targetPath.startsWith('/')) targetPath = `/${targetPath}`;
        return `/${currentLocale}${targetPath}`;
    };

    const changeLocale = (locale) => {
        if (!LOCALES.includes(locale)) return;
        setLocaleCookie(locale);
        const basePath = stripLocaleFromPath(pathname || '/');
        const hash = (typeof window !== 'undefined' && window.location.hash) ? window.location.hash : '';
        const to = `/${locale}${basePath}${search}${hash}`;
        router.push(to);
    };

    const handleLampDropdownClick = (key) => {
        if (key === 'magnolia') {
            router.push(localized('/magnoliatiffanystudio/tiffanylamps'));
        } else {
            router.push(localized(`/magnoliatiffanystudio/tiffanylamps#${key}`));
        }
        setTiffanyLampsIsOpen(false);
    };

    const handleAvailableLampDropdownClick = (key) => {
        if (key === 'geometric') {
            router.push(localized('/magnoliatiffanystudio/tiffanylampsavailable'));
        } else {
            router.push(localized(`/magnoliatiffanystudio/tiffanylampsavailable#${key}`));
        }
        setTiffanyLampsIsOpen(false);
    };

    const handleNavPush = (path) => {
        router.push(localized(path));
    };

    const getNavbarLabel = () => {
        const stripped = (pathname || '/').split('/').slice(2).join('/');
        const route = `/${stripped}` === '/magnoliatiffanystudio' || pathname === `/` ? `/magnoliatiffanystudio` : `/${stripped}`;
        const t = TEXT[currentLocale] || TEXT[DEFAULT_LOCALE];
        switch (route) {
            case '/magnoliatiffanystudio':
                return t.main;
            case '/magnoliatiffanystudio/tiffanylamps':
                return t.tiffanyLamps;
            case '/magnoliatiffanystudio/tiffanylampsavailable':
                return t.availableLamps;
            case '/magnoliatiffanystudio/contact':
                return t.contact;
            default:
                return '';
        }
    };

    const t = TEXT[currentLocale] || TEXT[DEFAULT_LOCALE];
    const baseBtnClass = "p-0 bg-transparent border-0 cursor-pointer hover:text-gray-200 transition-colors";

    return (
        <>
            <Navbar position="sticky"
                    className="xl:hidden"
                    classNames={{base: "!px-0 animate__animated animate__fadeInDown bg-transparent select-none uppercase antonio-navbar"}}>
                <NavbarBrand>
                    <img
                        draggable={false}
                        alt="Magnólia Tiffanystudió logó"
                        src="/design/tiffanystudiologotext.png"
                        loading="eager"
                        decoding="sync"
                        width={50}
                    />
                </NavbarBrand>
                <NavbarContent justify="center">
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                className="bg-transparent data-[hover=true]:bg-transparent text-lg md:text-xl uppercase antonio-navbar"
                                radius="none"
                                size="sm"
                                style={{padding: 0}}
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
                                              onPress={() => router.push(localized('/'))}>
                                <span
                                    className='hover:underline hover:decoration-dashed'>
                                    {t.landing}
                                </span>
                                </DropdownItem>
                                <DropdownItem key="main_page"
                                              onPress={() => handleNavPush('/magnoliatiffanystudio')}>
                                <span
                                    className={`${pathname === '/magnoliatiffanystudio' ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                                    {t.main}
                                </span>
                                </DropdownItem>
                                <DropdownItem key="contact"
                                              onPress={() => handleNavPush('/magnoliatiffanystudio/contact')}>
                                <span
                                    className={`${pathname && pathname.endsWith('/magnoliatiffanystudio/contact') ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                                    {t.contact}
                                </span>
                                </DropdownItem>
                            </DropdownSection>
                            <DropdownSection showDivider title={t.tiffanyLamps}>
                                <DropdownItem key="magnolia" startContent={<PiFlowerFill size={20}/>}
                                              onClick={() => handleLampDropdownClick('magnolia')}>{t.lampMagnolia}</DropdownItem>
                                <DropdownItem key="goldblue" startContent={<GiDragonfly size={20}/>}
                                              onClick={() => handleLampDropdownClick('goldblue')}>{t.lampGoldBlue}</DropdownItem>
                                <DropdownItem key="peony" startContent={<IoRose size={20}/>}
                                              onClick={() => handleLampDropdownClick('peony')}>{t.lampPeony}</DropdownItem>
                                <DropdownItem key="acorn" startContent={<PiAcornFill size={20}/>}
                                              onClick={() => handleLampDropdownClick('acorn')}>{t.lampAcorn}</DropdownItem>
                                <DropdownItem key="waterlily" startContent={<GiLilyPads size={20}/>}
                                              onClick={() => handleLampDropdownClick('waterlily')}>{t.lampWaterlily}</DropdownItem>
                                <DropdownItem key="chestnut" startContent={<GiChestnutLeaf size={20}/>}
                                              onClick={() => handleLampDropdownClick('chestnut')}>{t.lampChestnut}</DropdownItem>
                                <DropdownItem key="vine" startContent={<GiCurlingVines size={20}/>}
                                              onClick={() => handleLampDropdownClick('vine')}>{t.lampVine}</DropdownItem>
                                <DropdownItem key="dragonfly" startContent={<GiFairyWings size={20}/>}
                                              onClick={() => handleLampDropdownClick('dragonfly')}>{t.lampDragonfly}</DropdownItem>
                                <DropdownItem key="tulip" startContent={<PiFlowerTulipFill size={20}/>}
                                              onClick={() => handleLampDropdownClick('tulip')}>{t.lampTulip}</DropdownItem>
                                <DropdownItem key="small_peony" startContent={<MdLocalFlorist  size={20}/>}
                                              onClick={() => handleLampDropdownClick('small_peony')}>{t.lampSmallPeony}</DropdownItem>
                            </DropdownSection>
                            <DropdownSection showDivider title={t.availableLamps}>
                                <DropdownItem startContent={<IoIosGrid size={20}/>}
                                              onClick={() => handleAvailableLampDropdownClick('geometric')}>{t.availableGeometric}</DropdownItem>
                                <DropdownItem startContent={<LuLamp size={20}/>}
                                              onClick={() => handleAvailableLampDropdownClick('table')}>{t.availableTable}</DropdownItem>
                                <DropdownItem startContent={<LuLampFloor size={20}/>}
                                              onClick={() => handleAvailableLampDropdownClick('standing')}>{t.availableStanding}</DropdownItem>
                            </DropdownSection>
                            <DropdownSection classNames={{
                                group: "flex flex-row w-fit gap-4 mx-auto text-neutral-400",
                            }}
                            >

                                    <DropdownItem
                                        aria-label="Magyar"
                                        aria-current={currentLocale === 'hu' ? 'true' : undefined}
                                        onClick={() => changeLocale('hu')}
                                        className={`${baseBtnClass} ${currentLocale === 'hu' ? 'underline' : ''}`}
                                    >
                                        magyar
                                    </DropdownItem>
                                    <DropdownItem
                                        aria-label="Deutsch"
                                        aria-current={currentLocale === 'de' ? 'true' : undefined}
                                        onClick={() => changeLocale('de')}
                                        className={`${baseBtnClass} ${currentLocale === 'de' ? 'underline' : ''}`}
                                    >
                                        deutsch
                                    </DropdownItem>
                                    <DropdownItem
                                        aria-label="English"
                                        aria-current={currentLocale === 'en' ? 'true' : undefined}
                                        onClick={() => changeLocale('en')}
                                        className={`${baseBtnClass} ${currentLocale === 'en' ? 'underline' : ''}`}
                                    >
                                        english
                                    </DropdownItem>

                            </DropdownSection>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <div className="flex flex-row gap-1 md:gap-3 pt-1">
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
                            {t.branding}
                        </p>
                    </div>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4 " justify="center">
                    <NavbarItem>
                        <Tooltip content={t.backTooltip} placement="bottom" showArrow={true} radius="full"
                                 color="foreground" size="sm">
                            <Link href={localized('/')}><FaArrowAltCircleLeft color="white" className="pt-1" size={27}/></Link>
                        </Tooltip>
                    </NavbarItem>
                    <NavbarItem>
                        <Button
                            className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar"
                            radius="full"
                            onPress={() => handleNavPush('/magnoliatiffanystudio')}
                        >
                                    <span
                                        className={`${pathname && pathname.endsWith('/magnoliatiffanystudio') ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                                        {t.main}
                                    </span>
                        </Button>
                    </NavbarItem>
                    <Dropdown isOpen={isTiffanyLampsOpen}
                              onMouseEnter={() => setTiffanyLampsIsOpen(true)}
                              onMouseLeave={() => setTiffanyLampsIsOpen(false)}
                    >
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
                                        className={`${pathname && pathname.endsWith('/magnoliatiffanystudio/tiffanylamps') ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                                        {t.tiffanyLamps}
                                    </span>
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu aria-label="Tiffany lámpák menü">
                            <DropdownItem key="magnolia" startContent={<PiFlowerFill size={20}/>}
                                          onClick={() => handleLampDropdownClick('magnolia')}>{t.lampMagnolia}</DropdownItem>
                            <DropdownItem key="goldblue" startContent={<GiDragonfly size={20}/>}
                                          onClick={() => handleLampDropdownClick('goldblue')}>{t.lampGoldBlue}</DropdownItem>
                            <DropdownItem key="peony" startContent={<IoRose size={20}/>}
                                          onClick={() => handleLampDropdownClick('peony')}>{t.lampPeony}</DropdownItem>
                            <DropdownItem key="acorn" startContent={<PiAcornFill size={20}/>}
                                          onClick={() => handleLampDropdownClick('acorn')}>{t.lampAcorn}</DropdownItem>
                            <DropdownItem key="waterlily" startContent={<GiLilyPads size={20}/>}
                                          onClick={() => handleLampDropdownClick('waterlily')}>{t.lampWaterlily}</DropdownItem>
                            <DropdownItem key="chestnut" startContent={<GiChestnutLeaf size={20}/>}
                                          onClick={() => handleLampDropdownClick('chestnut')}>{t.lampChestnut}</DropdownItem>
                            <DropdownItem key="vine" startContent={<GiCurlingVines size={20}/>}
                                          onClick={() => handleLampDropdownClick('vine')}>{t.lampVine}</DropdownItem>
                            <DropdownItem key="dragonfly" startContent={<GiFairyWings size={20}/>}
                                          onClick={() => handleLampDropdownClick('dragonfly')}>{t.lampDragonfly}</DropdownItem>
                            <DropdownItem key="tulip" startContent={<PiFlowerTulipFill size={20}/>}
                                          onClick={() => handleLampDropdownClick('tulip')}>{t.lampTulip}</DropdownItem>
                            <DropdownItem key="small_peony" startContent={<MdLocalFlorist  size={20}/>}
                                          onClick={() => handleLampDropdownClick('small_peony')}>{t.lampSmallPeony}</DropdownItem>
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
                                        className={`${pathname === localized('/magnoliatiffanystudio/tiffanylampsavailable') ? 'underline ' : 'hover:underline hover:decoration-dashed '}`}>
                                        {t.availableLamps}
                                    </span>
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>

                        <DropdownMenu className="" aria-label="Rendelhető Tiffany lámpák kategóriák">
                            <DropdownItem startContent={<IoIosGrid size={20}/>}
                                          onClick={() => handleAvailableLampDropdownClick('geometric')}>{t.availableGeometric}</DropdownItem>
                            <DropdownItem startContent={<LuLamp size={20}/>}
                                          onClick={() => handleAvailableLampDropdownClick('table')}>{t.availableTable}</DropdownItem>
                            <DropdownItem startContent={<LuLampFloor size={20}/>}
                                          onClick={() => handleAvailableLampDropdownClick('standing')}>{t.availableStanding}</DropdownItem>
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
                                    {t.lampBases}
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                    </Dropdown>

                    <NavbarItem>
                        <Button
                            className="px-3 bg-transparent data-[hover=true]:bg-transparent text-xl uppercase antonio-navbar"
                            radius="full"
                            onPress={() => handleNavPush('/magnoliatiffanystudio/contact')}
                        >
                        <span
                            className={`${pathname && pathname.endsWith('/magnoliatiffanystudio/contact') ? 'underline' : 'hover:underline hover:decoration-dashed'}`}>
                            {t.contact}
                        </span>
                        </Button>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <div className="flex flex-row gap-3 pt-1">
                            <div className="flex flex-row gap-1 items-center justify-center pb-1">
                                <Tooltip content={t.callTooltip} showArrow={true} radius="full" color="foreground"
                                         placement="bottom">
                                    <Link href="tel:+36-70/360-0950"
                                          target="_blank"
                                          className="text-xl font-light antonio-navbar text-white"><FaPhoneAlt
                                        size="16px"/></Link>
                                </Tooltip>
                                <span className="select-all">+36-70/360-0950</span>
                            </div>
                            <Tooltip content={t.emailTooltip} placement="bottom" showArrow={true} radius="full"
                                     color="foreground">
                                <Link href="mailto:m.tiffanystudio@gmail.com"
                                      target="_blank"
                                      className="text-xl font-light antonio-navbar text-white"><RiMailFill
                                    size="25px"/></Link>
                            </Tooltip>
                            <Tooltip content={t.instagramTooltip} placement="bottom" showArrow={true} radius="full"
                                     color="foreground">
                                <Link href="https://www.instagram.com/magnolia_tiffanystudio/" target="_blank"
                                      className="text-xl font-light antonio-navbar text-white"><AiFillInstagram
                                    size="26px"/></Link>
                            </Tooltip>
                            <Tooltip content={t.facebookTooltip} placement="bottom" showArrow={true} radius="full"
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
