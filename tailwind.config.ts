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
        primary: "#9F00E9",
        secondary: "#E85385",
        "text-primary": "#2D2D2D",
        "text-secondary": "#7C7D7F",
        danger: "#FF4C52",
        "border-color": "#DADADA",
      },
      container: {
        screens: {
          DEFAULT: "1290px",
        },
        center: true,
        padding: "1.2rem",
      },
      screens: {
        xs: "540px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },

  plugins: [],
} satisfies Config;
