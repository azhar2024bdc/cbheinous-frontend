import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#FBEFE7",
        "green-primary": "#1BB68A",
        "green-light": "#E8F8F3",
        "gray-light": "#4B5563",
        primary: "#E3B035",
        secondary: "#E85385",
        "text-primary": "#1A1A1A",
        "text-secondary": "#636F85",
        danger: "#FF4C52",
        "border-color": "#DADADA",
      },
      container: {
        screens: {
          DEFAULT: "1440px",
        },
        center: true,
        padding: "1.2rem",
      },
      screens: {
        xs: "540px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        geist: ["Geist Sans", "sans-serif"],
        geistMono: ["Geist Mono", "monospace"],
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        allSide:
          "0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)",
      },
    },
  },

  plugins: [],
} satisfies Config;
