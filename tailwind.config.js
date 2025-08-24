// tailwind.config.js
const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: ["class", "class"],
    plugins: [heroui({
        themes: {
            "asd": {
                extend: "light", // <- inherit default values from dark theme
                colors: {
                    background: "#F2F2F2",
                    foreground: "#000",
                    primary: {
                        50: "#00091a",
                        100: "#001a4d",
                        200: "#002b80",
                        300: "#003cb3",
                        400: "#004de6",
                        500: "#1a66ff",
                        600: "#4d88ff",
                        700: "#80aaff",
                        800: "#b3ccff",
                        900: "#e5eeff",
                        DEFAULT: "#003399",
                        foreground: "#ffffff",
                    },
                    secondary: {
                        50: "#1a0000",
                        100: "#4d0000",
                        200: "#800000",
                        300: "#b30000",
                        400: "#e60000",
                        500: "#ff1a1a",
                        600: "#ff4d4d",
                        700: "#ff8080",
                        800: "#ffb3b3",
                        900: "#ffe5e5",
                        DEFAULT: "#FFD700",
                        foreground: "#000000",
                        background: "#f2f2f2",
                    },
                    focus: "#ff4d82",
                },
                layout: {
                    disabledOpacity: "0.3",
                    radius: {
                        small: "8px",
                        medium: "6px",
                        large: "8px",
                    },
                    borderWidth: {
                        small: "1px",
                        medium: "2px",
                        large: "3px",
                    },
                },
            },
        },
    }),
    ],
};