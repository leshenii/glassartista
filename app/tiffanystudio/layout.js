import React from "react";
import NavbarTiffanyStudio from "@/app/components/NavbarTiffanyStudio";

export default function TiffanyStudioLayout(props) {
    const { children } = props;
    return (
        <section className="min-h-screen w-11/12 justify-self-center">
            <div>
                <NavbarTiffanyStudio />
                {children}
            </div>
        </section>
    );
}
