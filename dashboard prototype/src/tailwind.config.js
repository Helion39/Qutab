/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      /* ================= FONT ================= */
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },

      /* ================= COLORS ================= */
      colors: {
        /* ===== BRAND (QURBAN GREEN) ===== */
        brand: "#84cc16", // lime-400 (LOGO & MAIN)
        brandHover: "#65a30d", // lime-600
        brandSoft: "#ecfccb", // lime-100

        /* ===== TEXT ===== */
        textMain: "#0f172a",
        textSub: "#64748b",
        textMuted: "#94a3b8",

        /* ===== BACKGROUND ===== */
        bgMain: "#ffffff",
        bgSoft: "#f8fafc",
        bgHover: "#f1f5f9",

        /* ===== BORDER ===== */
        borderSoft: "#e5e7eb",
        borderStrong: "#cbd5f5",

        /* ===== STATUS / BADGE ===== */
        statusGreen: "#22c55e",
        statusOrange: "#f59e0b",
        statusBlue: "#3b82f6",
        statusPurple: "#8b5cf6",
        statusRed: "#ef4444",
      },

      /* ================= RADIUS ================= */
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },

      /* ================= SHADOW ================= */
      boxShadow: {
        card: "0 4px 16px rgba(0,0,0,0.06)",
        soft: "0 2px 8px rgba(0,0,0,0.04)",
      },
    },
  },
  plugins: [],
};
