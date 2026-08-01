import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFD93D",
        secondary: "#FF6B6B",
        blue: "#4D96FF",
        green: "#6BCB77",
        purple: "#B084FF",
        ink: "#111111",
        cream: "#FFFDF5",
        surface: "var(--nb-surface)",
        canvas: "var(--nb-canvas)",
        line: "var(--nb-line)",
        body: "var(--nb-fg)",
        muted: "var(--nb-muted)",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brutal: "4px 4px 0 0 var(--nb-shadow)",
        "brutal-md": "6px 6px 0 0 var(--nb-shadow)",
        "brutal-lg": "9px 9px 0 0 var(--nb-shadow)",
        "brutal-xl": "13px 13px 0 0 var(--nb-shadow)",
        "brutal-inset": "inset 4px 4px 0 0 var(--nb-shadow)",
        none: "0 0 0 0 transparent",
      },
      borderRadius: {
        brutal: "2px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(28px)" },
          to: { opacity: "1", transform: "none" },
        },
        // Tanpa perubahan opacity agar elemen teks utama langsung terlihat (baik untuk LCP).
        "rise-solid": {
          from: { transform: "translateY(26px)" },
          to: { transform: "none" },
        },
        "page-in": {
          from: { transform: "translateY(22px)" },
          to: { transform: "none" },
        },
        "loader-bar": {
          from: { width: "0%" },
          to: { width: "100%" },
        },
        "loader-out": {
          "0%, 62%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-100%)" },
        },
      },
      animation: {
        marquee: "marquee 26s linear infinite",
        float: "float 6s ease-in-out infinite",
        blink: "blink 1.1s step-end infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        // Animasi masuk berbasis CSS agar konten hero tampil tanpa menunggu hydration.
        rise: "rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) both",
        "rise-solid": "rise-solid 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "page-in": "page-in 0.75s cubic-bezier(0.16, 1, 0.3, 1) both",
        "loader-bar": "loader-bar 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "loader-out": "loader-out 0.85s cubic-bezier(0.76, 0, 0.24, 1) forwards",
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};

export default config;
