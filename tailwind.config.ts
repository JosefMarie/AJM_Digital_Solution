import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Tw Cen MT"', 'Century Gothic', 'Futura', 'sans-serif'],
            },
            colors: {
                // The deep, dark base colors
                void: {
                    900: "#020617", // Near black navy
                    800: "#0f172a", // Deep slate
                },
                // The vibrant purple/indigo tones
                electric: {
                    purple: "var(--secondary-color)",
                    violet: "#4c1d95",
                    indigo: "#3730a3",
                },
                // The bright cyan highlights
                neon: {
                    cyan: "var(--accent-color)",
                    sky: "#0ea5e9",
                },
            },
            backgroundImage: {
                // A custom gradient that mimics the fluid aesthetic
                'fluid-gradient': "linear-gradient(to bottom right, #020617, #3730a3, var(--secondary-color), var(--accent-color))",
            },
            animation: {
                'blob': 'blob 7s infinite',
                'float': 'float 6s ease-in-out infinite',
                'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
            },
            keyframes: {
                blob: {
                    '0%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                    '33%': {
                        transform: 'translate(30px, -50px) scale(1.1)',
                    },
                    '66%': {
                        transform: 'translate(-20px, 20px) scale(0.9)',
                    },
                    '100%': {
                        transform: 'translate(0px, 0px) scale(1)',
                    },
                },
                float: {
                    '0%, 100%': {
                        transform: 'translateY(0px)',
                    },
                    '50%': {
                        transform: 'translateY(-20px)',
                    },
                },
                'pulse-glow': {
                    '0%, 100%': {
                        opacity: '1',
                    },
                    '50%': {
                        opacity: '0.5',
                    },
                },
            },
        },
    },
    plugins: [],
};
export default config;
