"use client";

import TaskList from "@/components/TaskList";
import { Button } from "@/components/ui/button";

/**
 * Página Principal - TaskFlow
 * 
 * Responsabilidade: Layout e estrutura da aplicação
 * Segue princípio de Single Responsibility
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold">TaskFlow</h1>
              <p className="text-sm text-muted-foreground">
                Organize suas tarefas
              </p>
            </div>
          </div>

          <Button>+ Nova Tarefa</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Bem-vindo! 👋</h2>
          <p className="text-muted-foreground">
            Gerencie suas tarefas de forma simples e eficiente
          </p>
        </div>

        <TaskList />
      </main>
    </div>
  );
}
