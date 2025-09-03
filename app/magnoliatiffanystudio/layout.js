import NavbarTiffanyStudio from "@/app/components/NavbarTiffanyStudio";

export default function TiffanyStudioLayout(props) {

    const { children } = props;

    return (
        <section className="min-h-screen max-w-screen">
            <div>
                <NavbarTiffanyStudio />
                {children}
            </div>
        </section>
    );
}
