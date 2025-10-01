"use client"

import {FaCopyright} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="fixed bottom-0 lg:pr-2 z-53 w-screen lg:w-2/5 h-min mt-10 justify-self-end">
                <div className="flex flex-row gap-2 w-full my-2 items-center justify-center lg:justify-end text-gray-500 text-xs">
                    <FaCopyright className="mb-[1px]" size={14} />
                    <p className="leading-4">
                        2022-2025 Magnólia Tiffanystúdió | Minden jog fenntartva.
                    </p>
                </div>
        </footer>
    )
}