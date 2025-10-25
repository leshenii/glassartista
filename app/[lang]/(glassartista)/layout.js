import NavbarGlassArtista from "@/app/components/NavbarGlassArtista";

export default function GlassArtistaLayout(props) {

    const { children } = props;

    return (
        <section className="min-h-screen max-w-screen">
            <div>
                <NavbarGlassArtista />
                {children}

            </div>
        </section>
    );
}
