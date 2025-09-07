'use client'


import {FaAddressCard, FaFacebookSquare, FaPhoneAlt} from "react-icons/fa";
import {RiMailFill} from "react-icons/ri";
import {AiFillInstagram} from "react-icons/ai";
import {TbExternalLink} from "react-icons/tb";

export default function ContactPage() {
    return (
        <div className="flex flex-row gap-3 w-screen items-center h-screen-minus-navbar-desktop pb-16">
            <div className="flex flex-col gap-4 w-full justify-center items-start mx-60">
                <h2 className="text-5xl allura-regular underline decoration-2 underline-offset-8">Nyíri Eszter</h2>
                <div className="flex flex-row items-center gap-2 ">
                    <FaPhoneAlt size={25}/>
                    +36-70/360-0950
                </div>
                <div className="flex flex-row items-center gap-2 ">
                    <RiMailFill size={30}/>
                    m.tiffanystudio@gmail.com <TbExternalLink size={15}/>
                </div>
                <div className="flex flex-row items-center gap-2 ">
                    <AiFillInstagram size={30}/>
                    magnolia_tiffanystudio <TbExternalLink size={15}/>
                </div>
                <div className="flex flex-row items-center gap-2 ">
                    <FaFacebookSquare size={30}/>
                    Magnólia Tiffanystúdió <TbExternalLink size={15}/>
                </div>
            </div>
            <div className="flex flex-col w-full text-gray-600 items-start">
                e-mail küldési űrlap fejlesztés alatt
            </div>
        </div>
    )
}