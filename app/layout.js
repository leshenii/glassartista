import "./globals.css";
import {Providers} from "@/app/components/Providers";

export const metadata = {
    title: "Magnólia Tiffanystúdió és építészeti díszüveg",
    description: "Tiffany lámpák, ólomüveg ablakok, építészeti díszüveg készítése",
};

export default function RootLayout({children}) {
    return (
        <html lang="hu" className="dark">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Allura&display=swap" rel="stylesheet" />
            <title>Magnólia Tiffanystúdió és építészeti díszüveg</title>
        </head>
        <body className="min-h-screen bg-gradient-to-b from-[#111111] to-[#383120]">
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
