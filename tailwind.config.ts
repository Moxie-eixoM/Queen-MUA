import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0c0c0c",
        charcoal: "#151515",
        "dark-gray": "#222222",
        "light-gray": "#e6e6e6",
        muted: "#8e8e8e",
        champagne: "#FAF6F0",
        cream: "#FDFBF7",
        "accent-copper": "#c58b70",
        "accent-peach": "#e5b59e",
        "accent-gold": "#d4af37",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0, 0, 0, 0.03)",
        medium: "0 20px 40px rgba(0, 0, 0, 0.06)",
        heavy: "0 30px 60px rgba(0, 0, 0, 0.1)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.08)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      transitionDuration: {
        smooth: "400ms",
        fast: "200ms",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
