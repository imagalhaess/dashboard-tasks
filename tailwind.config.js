/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // seus paths aqui, exemplo:
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          50: "#fff9e5",
          100: "#fff3cc",
          200: "#ffdf80",
          300: "#f3d557",
          400: "#f0c016",
          500: "#dda500",
          600: "#b27b00",
          700: "#835c00",
          800: "#594100",
          900: "#422f00",
        },
        orange: {
          50: "#fff6ed",
          100: "#ffe9c7",
          200: "#ffcc6a",
          300: "#f7b93b",
          400: "#e0a011",
          500: "#c27d00",
          600: "#9e6000",
          700: "#7a4700",
          800: "#523000",
          900: "#3a2200",
        },
        red: {
          100: "#ffd9d9",
          200: "#ff8080",
        },
      },
    },
  },
  plugins: [],
};