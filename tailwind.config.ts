import type { Config } from "tailwindcss";

export default {
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
      colors: {
        dtoad: {
          primary: "#00ff00",
          secondary: "#064E3B",
          accent: "#A3E635",
          background: "#0d0d0d",
          "background-light": "#121212",
          "background-dark": "#0a0a0a",
          text: "#ffffff",
          "text-secondary": "#cccccc",
        },
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
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "patrol-left": {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(100px, -100px) rotate(10deg)" },
          "100%": { transform: "translate(0, 0) rotate(0deg)" },
        },
        "patrol-right": {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(-100px, 100px) rotate(-10deg)" },
          "100%": { transform: "translate(0, 0) rotate(0deg)" },
        },
        glow: {
          "0%": {
            boxShadow: "0 0 5px rgba(0,255,0,0.5)",
          },
          "100%": {
            boxShadow: "0 0 20px rgba(0,255,0,0.8)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gradient-y": "gradient-y 15s ease infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "patrol-left": "patrol-left 10s ease-in-out infinite",
        "patrol-right": "patrol-right 10s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
