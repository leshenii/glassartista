"use client"

import {FaCopyright} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="fixed bottom-0 pr-2 z-51 w-full items-center justify-center h-min mt-10 ">
                <div className="flex flex-row gap-2 my-2 items-center justify-end text-gray-500 text-xs">
                    <FaCopyright className="mb-[1px]" size={14} />
                    <p className="leading-4">
                        2022-2025 Magnólia TiffanyStúdió | Minden jog fenntartva.
                    </p>
                </div>
        </footer>
    )
}