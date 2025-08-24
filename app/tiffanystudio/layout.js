import React from "react";
import NavbarTiffanyStudio from "@/app/components/NavbarTiffanyStudio";

export default function TiffanyStudioLayout(props) {
    const { children } = props;
    return (
        <section className="flex flex-col items-center justify-center">
            <div>
                <NavbarTiffanyStudio />
                {children}
            </div>
        </section>
    );
}
