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
                  'bg-primary': '#0D1117',
                  'bg-secondary': '#161B22',
                  'bg-tertiary': '#21262D',
                  
                  // Cyan shades
                  'cyan-50': '#ECFEFF',
                  'cyan-100': '#CFFAFE',
                  'cyan-200': '#A5F3FC',
                  'cyan-300': '#67E8F9',
                  'cyan-400': '#22D3EE',
                  'cyan-500': 'rgb(6 182 212 / <alpha-value>)',  // Primary with opacity support
                  'cyan-600': '#0891B2',
                  'cyan-700': '#0E7490',
                  'cyan-800': '#155E75',
                  'cyan-900': '#164E63',
                  
                  // Amber shades
                  'amber-50': '#FFFBEB',
                  'amber-100': '#FEF3C7',
                  'amber-200': '#FDE68A',
                  'amber-300': '#FCD34D',
                  'amber-400': '#FBBF24',
                  'amber-500': 'rgb(245 158 11 / <alpha-value>)',  // Primary with opacity support
                  'amber-600': '#D97706',
                  'amber-700': '#B45309',
                  'amber-800': '#92400E',
                  'amber-900': '#78350F',
                  
                  // Emerald shades
                  'emerald-50': '#ECFDF5',
                  'emerald-100': '#D1FAE5',
                  'emerald-200': '#A7F3D0',
                  'emerald-300': '#6EE7B7',
                  'emerald-400': '#34D399',
                  'emerald-500': 'rgb(16 185 129 / <alpha-value>)',  // Primary with opacity support
                  'emerald-600': '#059669',
                  'emerald-700': '#047857',
                  'emerald-800': '#065F46',
                  'emerald-900': '#064E3B',
                  
                  // Glass effects
                  'glass-bg': 'rgba(255, 255, 255, 0.05)',
                  'glass-border': 'rgba(6, 182, 212, 0.2)',
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