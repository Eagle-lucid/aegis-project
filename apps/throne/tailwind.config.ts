// apps/throne/tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ], 
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                display: ['var(--font-display)', 'system-ui', 'sans-serif'],
            },
            colors: {
                // Aegis Sovereign Palette
                throne: {
                    bg: {
                        primary: "#0D1117",
                        secondary: "#161B22",
                        tertiary: "#21262D",
                    },
                    cyan: {
                        50: "#ECFEFF",
                        100: "#CFFAFE",
                        200: "#A5F3FC",
                        300: "#67E8F9",
                        400: "#22D3EB",
                        500: "#06B6D4",  // Primary cyan
                        600: "#0891B2",
                        700: "#0E7490",
                        800: "#155E75",
                        900: "#164E63",
                        950: "#083344",
                    },
                    amber: {
                        50: "#FFFBEB",
                        100: "#FEF3C7",
                        200: "#FDE68A",
                        300: "#FCD34D",
                        400: "#FBBF24",
                        500: "#F59E0B",  // Primary amber
                        600: "#D97706",
                        700: "#B45309",
                        800: "#92400E",
                        900: "#78350F",
                        950: "#451A03",
                    },
                    glass: {
                        bg: 'rgba(255, 255, 255, 0.05)',
                        border: 'rgba(6, 182, 212, 0.2)'
                    },
                },
            },
            backdropBlur: {
                xs: '2px',
                sm: '4px',
                md: '8px',
                lg: '16px',
                xl: '32px',
                '2xl': '64px',
            },
        },
    },
    plugins: [
        typography,
    ],
}

export default config;