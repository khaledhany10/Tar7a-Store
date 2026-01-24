/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#d48c8e",
        "primary-dark": "#b06d6f",
        "background-light": "#fdf8f5",
        "background-dark": "#1a1214",
        "peach-soft": "#fff0e6",
        "beige-card": "#faf7f4",
      },
      fontFamily: {
        "display": ["Plus Jakarta Sans", "sans-serif"],
        "arabic": ["Noto Sans Arabic", "sans-serif"]
      },
      borderRadius: {
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1.5rem",
        "3xl": "2.5rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}