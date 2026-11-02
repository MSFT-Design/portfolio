import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050506",
        surface: "#0A0A0C",
        "surface-elevated": "#111114",
        "surface-hover": "#18181C",
        border: "#1A1A1F",
        "border-subtle": "#131316",
        accent: "#4A7BFF",
        "accent-hover": "#5A88FF",
        "accent-muted": "rgba(74, 123, 255, 0.08)",
        "accent-warm": "#FF6B4A",
        "text-primary": "#F0F0F2",
        "text-secondary": "#8A8A96",
        "text-tertiary": "#55555F",
        rec: "#FF3B3B",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-hero": ["clamp(3.5rem, 8vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.04em", fontWeight: "700" }],
        "display-xl": ["clamp(2.5rem, 5vw, 5rem)", { lineHeight: "1.0", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display": ["clamp(1.5rem, 3vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "heading-lg": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "heading": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body": ["1rem", { lineHeight: "1.7" }],
        "caption": ["0.875rem", { lineHeight: "1.5" }],
        "overline": ["0.6875rem", { lineHeight: "1.5", letterSpacing: "0.12em" }],
        "hud": ["0.625rem", { lineHeight: "1.4", letterSpacing: "0.1em" }],
      },
      spacing: {
        "scene": "100vh",
        "section": "8rem",
        "section-sm": "5rem",
      },
      maxWidth: {
        "content": "72rem",
        "prose": "42rem",
        "narrow": "56rem",
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.25rem",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "gradient": "gradient 8s ease infinite",
        "scan": "scan 4s ease-in-out infinite",
        "rec-blink": "recBlink 2s ease-in-out infinite",
        "grain": "grain 0.5s steps(6) infinite",
        "reveal-line": "revealLine 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        scan: {
          "0%, 100%": { transform: "translateY(-100%)" },
          "50%": { transform: "translateY(100%)" },
        },
        recBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "30%": { transform: "translate(3%, -15%)" },
          "50%": { transform: "translate(12%, 9%)" },
          "70%": { transform: "translate(9%, 4%)" },
          "90%": { transform: "translate(-1%, 7%)" },
        },
        revealLine: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
