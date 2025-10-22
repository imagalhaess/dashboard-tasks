/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Mantém cores padrão do Tailwind (gray, blue, emerald, etc)
      animation: {
        spin: "spin 1s linear infinite",
      },
    },
  },
  plugins: [],
};
