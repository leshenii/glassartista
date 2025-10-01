// tailwind.config.js
const {heroui} = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            height: {
                'screen-minus-navbar-desktop': 'calc(100vh - 80px)', // adjust 80px to your navbar height
            },
        },
    },
    variants: {
        extend: {
            height: ['responsive'],
        },
    },
    darkMode: ["class", "class"],
    plugins: [heroui({


    }),
    ],
};