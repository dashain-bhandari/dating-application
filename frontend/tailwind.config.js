/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xm-sm': '600px', // Example: you can adjust this value
        'sm-md': '750px', // Example: you can adjust this value
        'md-lg': '900px', // Example: you can adjust this value
        'lg-xl': '1280px', // Example: you can adjust this value
        '5xl':'1900px',
      },
      fontFamily:{
        playfair: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        gradient24: "linear-gradient(135deg, var(--tw-gradient-stops))",
      },
      keyframes: {
        progressBarStep1: {
          "0%": { width: "0%" },
          "100%": { width: "22%" },
        },
        progressBarStep2: {
          "0%": { width: "22%" },
          "100%": { width: "42%" },
        },
        progressBarStep3: {
          "0%": { width: "42%" },
          "100%": { width: "62%" },
        },
        progressBarStep4: {
          "0%": { width: "62%" },
          "100%": { width: "82%" },
        },
        progressBarStep5: {
          "0%": { width: "82%" },
          "100%": { width: "100%" },
        },
        slideUp: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      animation: {
        progressStep1: "progressBarStep1 1s ease-in-out linear",
        progressStep2: "progressBarStep2 1s ease-in-out linear",
        progressStep3: "progressBarStep3 1s ease-in-out linear",
        progressStep4: "progressBarStep4 1s ease-in-out linear",
        progressStep5: "progressBarStep5 1s ease-in-out linear",
        slideUp: "slideUp 10s linear infinite",
      },
      colors: {
        screen: "var(--screen)",
        primary: "var(--primary)",
        delete: "var(--delete)",
        filter: "var(--filter)",
        secondary: "var(--secondary)",
        montserrat: "var(--mitr)",
      },
    },
  },
  plugins: [],
};
