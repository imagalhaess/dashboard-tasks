"use client";

import TaskList from "@/components/TaskList";
import ThemeToggle from "@/components/ThemeToggle";

/*
  Página Principal - Dashboard de Tarefas
  
  Estrutura:
  1. Header fixo no topo com título e botão de tema
  2. Área principal com as tarefas
  
  Design:
  - Fundo neutro que muda com o tema
  - Header com sombra sutil para dar profundidade
  - Espaçamento responsivo (muda conforme o tamanho da tela)
*/
export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      {/* 
        Header fixo no topo
        - sticky: fica colado no topo quando rola a página
        - z-10: fica por cima de outros elementos
        - backdrop-blur: efeito de desfoque no fundo (moderno!)
      */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-700 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Lado esquerdo: Logo e título */}
            <div className="flex items-center gap-3">
              {/* Ícone decorativo (foguete = produtividade) */}
              <div className="w-10 h-10 bg-gradient-to-br from-warm-orange to-warm-yellow rounded-lg flex items-center justify-center shadow-md">
                <span className="text-2xl">🚀</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-50">
                  TaskFlow
                </h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 hidden sm:block">
                  Organize suas tarefas com foco
                </p>
              </div>
            </div>

            {/* Lado direito: Toggle de tema */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 
        Área principal de conteúdo
        - container: centraliza e limita a largura máxima
        - mx-auto: centraliza horizontalmente
        - px/py: espaçamento interno responsivo
      */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seção de boas-vindas */}
        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
            Bem-vindo de volta! 👋
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Aqui estão suas tarefas. Vamos ser produtivos hoje!
          </p>
        </div>

        {/* Componente com a lista de tarefas */}
        <TaskList />
      </main>

      {/* Footer simples */}
      <footer className="mt-16 py-6 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
            Feito com 💜 para aumentar sua produtividade
          </p>
        </div>
      </footer>
    </div>
  );
}
