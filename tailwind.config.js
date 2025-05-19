/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { primary: "#4F46E5" /* indigo-600 */, secondary: "#10B981" /* green-500 */ },
      fontFamily: {
        custom: ["MyFont", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".btn": {
          padding: ".5rem 1rem",
          borderRadius: ".75rem",
          fontWeight: "600",
        },
        ".btn-primary": {
          "@apply btn bg-primary text-white hover:bg-primary/90": {},
        },
        ".btn-secondary": {
          "@apply btn bg-secondary text-white hover:bg-secondary/90": {},
        },
      });
    },
    function ({ addUtilities }) {
      addUtilities({
        // a reusable “glassmorphism” card
        ".glass-card": {
          "background-color": "rgba(255, 255, 255, 0.25)",
          "backdrop-filter": "blur(10px)",
          "-webkit-backdrop-filter": "blur(10px)",
          "border-radius": "1rem",
          "box-shadow": "0 8px 32px rgba(0,0,0,0.1)",
          "border": "1px solid rgba(255,255,255,0.3)",
        },
      });
    },
  ],
}