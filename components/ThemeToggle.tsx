"use client";

import { useState, useEffect } from "react";

/*
  Componente ThemeToggle - Alterna entre modo claro e escuro
  
  Como funciona:
  1. Verifica se já existe uma preferência salva no localStorage
  2. Se não existir, usa o tema claro como padrão
  3. Quando o usuário clica, adiciona/remove a classe "dark" do HTML
  4. Salva a preferência no localStorage para persistir entre sessões
  
  Por que usar classe no HTML?
  - Permite que o Tailwind aplique os estilos dark: automaticamente
  - Afeta toda a aplicação de uma vez só
*/
export default function ThemeToggle() {
  // Estado para controlar se está no modo escuro ou não
  const [isDark, setIsDark] = useState(false);

  // useEffect roda quando o componente é montado (primeira vez que aparece na tela)
  useEffect(() => {
    // Verifica se já existe uma preferência salva
    const savedTheme = localStorage.getItem("theme");

    // Se estiver salvo como "dark", ativa o modo escuro
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []); // [] significa que só roda uma vez, quando o componente monta

  // Função que é chamada quando o usuário clica no botão
  const toggleTheme = () => {
    // Se está escuro, vai para claro. Se está claro, vai para escuro.
    if (isDark) {
      // Desativa modo escuro
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      // Ativa modo escuro
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        relative flex items-center justify-center
        w-14 h-14 
        rounded-full 
        bg-neutral-200 dark:bg-neutral-700
        hover:bg-neutral-300 dark:hover:bg-neutral-600
        transition-all duration-300
        shadow-md hover:shadow-lg
        group
      "
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      title={isDark ? "Modo Claro" : "Modo Escuro"}
    >
      {/* Ícone do sol (modo claro) */}
      <svg
        className={`
          absolute w-6 h-6 text-warm-yellow
          transition-all duration-300
          ${
            isDark
              ? "opacity-0 rotate-90 scale-0"
              : "opacity-100 rotate-0 scale-100"
          }
        `}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Ícone da lua (modo escuro) */}
      <svg
        className={`
          absolute w-6 h-6 text-cool-blue
          transition-all duration-300
          ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-0"
          }
        `}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  );
}
