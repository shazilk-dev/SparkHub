import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssTypography from "@tailwindcss/typography";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "475px",
        compact: "1366px", // For your screen size optimization
      },
      colors: {
        // Glassmorphism Color Palette
        primary: {
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#60a5fa", // Main accent
          "500": "#3b82f6",
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a",
          DEFAULT: "#60a5fa",
        },
        secondary: {
          DEFAULT: "#38bdf8", // Sky blue
          "100": "#e0f2fe",
          "200": "#bae6fd",
          "300": "#7dd3fc",
          "400": "#38bdf8",
          "500": "#0ea5e9",
          "600": "#0284c7",
        },
        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          medium: "rgba(255, 255, 255, 0.15)",
          strong: "rgba(255, 255, 255, 0.2)",
          ultra: "rgba(255, 255, 255, 0.25)",
          border: "rgba(255, 255, 255, 0.2)",
          dark: "rgba(0, 0, 0, 0.1)",
          "gradient-start": "rgba(96, 165, 250, 0.1)",
          "gradient-end": "rgba(147, 197, 253, 0.1)",
        },
        dark: {
          "900": "#0f172a", // slate-900
          "800": "#1e293b", // slate-800
          "700": "#334155", // slate-700
          "600": "#475569", // slate-600
          "400": "#94a3b8", // slate-400
          "200": "#e2e8f0", // slate-200
        },
        black: {
          "100": "#64748b", // Lighter for better contrast
          "200": "#334155", // Medium gray
          "300": "#64748b", // Light gray for text
          DEFAULT: "#0f172a", // Dark background
        },
        white: {
          "100": "#f8fafc",
          DEFAULT: "#ffffff",
        },
      },
      fontFamily: {
        "work-sans": ["var(--font-work-sans)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-inset": "inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)",
        glow: "0 0 15px rgba(96, 165, 250, 0.2)", // Reduced intensity
        "glow-lg": "0 0 25px rgba(96, 165, 250, 0.25)", // Reduced intensity
        "glow-subtle": "0 0 10px rgba(96, 165, 250, 0.15)", // New subtle glow
        clean: "0 4px 16px rgba(0, 0, 0, 0.1)", // Clean shadow without glow
        "clean-lg": "0 8px 32px rgba(0, 0, 0, 0.15)", // Larger clean shadow
        100: "2px 2px 0px 0px rgb(0, 0, 0)",
        200: "2px 2px 0px 2px rgb(0, 0, 0)",
        300: "2px 2px 0px 2px rgb(238, 43, 105)",
      },
      backdropBlur: {
        xs: "2px",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        compact: "0.75rem", // For tight spacing on small screens
        "compact-sm": "0.5rem",
        "compact-xs": "0.25rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 3s ease-in-out infinite",
        "glass-shimmer": "glassShimmer 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(96, 165, 250, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(96, 165, 250, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
        glassShimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssTypography],
};

export default config;
