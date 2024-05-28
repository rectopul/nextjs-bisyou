const { fontFamily } = require("tailwindcss/defaultTheme");
import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                sans: ["var(--font-sans)", ...fontFamily.sans],
                poppins: ["var(--font-poppins)", "sans-serif"],
            },
            maxWidth: {
                bisyouContainer: "1100px",
                bisyouContainerHome: "1270px",
            },
            fontSize: {
                "hd-1": "26px",
                "hd-2": "22px",
                "hd-3": "20px",
                "hd-4": "16px",
                "hd-5": "14px",
                "hd-sm": "12px",
                "hd-xs": "10px",
            },
            gridAutoRows: {
                1: "1fr",
            },
            colors: {
                alto: {
                    "50": "#f7f7f7",
                    "100": "#ededed",
                    "200": "#dcdcdc",
                    "300": "#c8c8c8",
                    "400": "#adadad",
                    "500": "#999999",
                    "600": "#888888",
                    "700": "#7b7b7b",
                    "800": "#676767",
                    "900": "#545454",
                    "950": "#363636",
                },
                koromiko: {
                    "50": "#fff9ed",
                    "100": "#fff1d4",
                    "200": "#ffdfa9",
                    "300": "#ffbd5a",
                    "400": "#fea439",
                    "500": "#fc8713",
                    "600": "#ed6b09",
                    "700": "#c55109",
                    "800": "#9c3f10",
                    "900": "#7e3610",
                    "950": "#441a06",
                },
                blue: {
                    gray: {
                        200: "#b0bec5",
                        500: "#607d8b",
                        900: "#263238",
                    },
                },
                bisyou: {
                    default: "#f4c2b9",
                    secondary: "#fdf6f6",
                    icon: "#a36157",
                    gray: "#e6e6e6",
                    font: "#6e4945",
                    fontLight: "#935f59",
                    orangeSd: "#fb861c",
                    green: "#55b100",
                    yellow: "#f3e5bb",
                    orange: "#ebe0cc",
                    greenBlack: "#428602",
                    secondaryText: "#dedcc2",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
