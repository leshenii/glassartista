import React from "react";
import NavbarTiffanyStudio from "@/app/components/NavbarTiffanyStudio";

export default function TiffanyStudioLayout(props) {
    const { children } = props;
    return (
        <section className="min-h-screen max-w-screen overflow-hidden">
            <div>
                <NavbarTiffanyStudio />
                {children}
            </div>
        </section>
    );
}
