"use client";

import TaskList from "@/components/TaskList";

/**
 * Página Principal - TaskOrganizer
 *
 * Design profissional com:
 * - Header fixo com logo e busca
 * - Layout responsivo mobile-first
 * - Cores neutras e calmantes
 * - Espaçamento adequado para leitura
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fixo no topo */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="h-full px-4 lg:px-6 flex items-center gap-6 max-w-full">
          {/* Logo */}
          <div>
            <h1 className="text-xl font-bold text-emerald-600">
              TaskOrganizer
            </h1>
          </div>

          {/* Busca - escondida no mobile */}
          <div className="hidden md:flex flex-1 max-w-lg">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar tarefas..."
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>

          {/* Botão adicionar */}
          <button className="ml-auto px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors whitespace-nowrap">
            + Nova Tarefa
          </button>
        </div>
      </header>

      {/* Container principal com sidebar + conteúdo */}
      <div className="pt-16 flex">
        <TaskList />
      </div>
    </div>
  );
}
