/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  // Configuração para modo escuro manual (via classe 'dark' no HTML)
  darkMode: "class",
  theme: {
    extend: {
      // Sistema de cores personalizado para o app de tarefas
      colors: {
        // Cores neutras (base da aplicação)
        neutral: {
          50: "#fafafa", // branco quase puro
          100: "#f5f5f5", // cinza muito claro
          200: "#e5e5e5", // cinza claro
          300: "#d4d4d4", // cinza médio-claro
          400: "#a3a3a3", // cinza médio
          500: "#737373", // cinza
          600: "#525252", // cinza escuro
          700: "#404040", // cinza muito escuro
          800: "#262626", // quase preto
          900: "#171717", // preto
        },
        // Cores quentes (ação, prioridade, alertas)
        warm: {
          yellow: "#f59e0b", // amarelo para concentração
          orange: "#f97316", // laranja para ação/motivação
          red: "#ef4444", // vermelho para alertas
        },
        // Cores frias (calma, confiança, conclusão)
        cool: {
          blue: "#3b82f6", // azul para criatividade
          green: "#10b981", // verde para conclusão
          teal: "#14b8a6", // azul-verde para projetos
        },
      },
      // Animações suaves
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
