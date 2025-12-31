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
        "primary-bg": "#FFFEFA",
        "green-primary": "#1BB68A",
        "green-light": "#E8F8F3",
        "gray-light": "#4B5563",
        primary: "#E3B035",
        secondary: "#E85385",
        "text-primary": "#1A1A1A",
        "text-secondary": "#636F85",
        danger: "#F75555",
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
        "all-side":
          "0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)",
      },
    },
  },

  plugins: [],
} satisfies Config;
