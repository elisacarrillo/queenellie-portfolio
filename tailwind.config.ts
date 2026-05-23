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
        syne: ["var(--font-syne)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        "queenellie-display": [
          "var(--font-queenellie-display)",
          "sans-serif",
        ],
      },
      colors: {
        pink: {
          DEFAULT: "#f0407a",
          dark: "#d03268",
        },
        ink: "#111111",
        muted: "#555555",
      },
    },
  },
  plugins: [],
};

export default config;
