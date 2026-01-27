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
        // الخطوط الإنجليزية الحديثة
        "english-body": ["Inter", "Poppins", "sans-serif"], // للنصوص الإنجليزية
        "english-heading": ["Poppins", "Inter", "sans-serif"], // للعناوين الإنجليزية
        
        // الخطوط العربية الحديثة
        "arabic-body": ["IBM Plex Sans Arabic", "Cairo", "sans-serif"], // للنصوص العربية
        "arabic-heading": ["Cairo", "IBM Plex Sans Arabic", "sans-serif"], // للعناوين العربية
        
        // يمكنك الإبقاء على الخطوط القديمة للتوافق
        "display": ["Poppins", "Inter", "sans-serif"],
        "arabic": ["IBM Plex Sans Arabic", "Cairo", "sans-serif"]
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