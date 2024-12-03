import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config =  {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        screens: {
            xs: "475px",
        },
        colors: {
            primary: {
                "500": "#BED7DC",
                DEFAULT: "#B3C8CF",
            },
            secondary: {
                "300":"#F1EEDC",
                DEFAULT: "#E5DDC5"


            },
            black: {
                "100": "#333333",
                "200": "#141413",
                "300": "#7D8087",
                DEFAULT: "#000000",
            },
            white: {
                "100": "#F7F7F7",
                DEFAULT: "#FFFFFF",
            },
        },
        fontFamily: {
            "work-sans": ["var(--font-work-sans)","sans-serif"],
        },
        borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
        },
        boxShadow: {
      '100': '2px 2px 0px 0px rgb(0, 0, 0)',
      '200': '2px 2px 0px 2px rgb(0, 0, 0)',
      '300': '2px 2px 0px 2px rgb(249,105,0)'
    }
    },
  },
  plugins: [tailwindcssAnimate,typography],
};

export default config;