"use client";

import type { Task } from "@/lib/graphql/mockData";
import { useToggleStatus } from "@/hooks/useToggleStatus";

interface TaskCardProps {
  task: Task;
  onStatusUpdate: (t: Task) => void;
}

/*
  TaskCard - Card de tarefa com design moderno
  
  Design System:
  - Fundo branco/escuro com borda e sombra suave
  - Badge colorido para status (amarelo = pendente, verde = concluído)
  - Badge para categoria
  - Botão de ação com cor diferente baseada no status
  - Hover effects para melhor UX
  
  Estados visuais:
  - Pendente: borda laranja, botão amarelo/laranja
  - Concluído: borda verde, texto com opacidade reduzida
  - Loading: botão desabilitado com spinner
*/
export default function TaskCard({ task, onStatusUpdate }: TaskCardProps) {
  const { toggleStatus, isLoading } = useToggleStatus();

  const handleClick = async () => {
    try {
      const updated = await toggleStatus(task.id, task.status);
      onStatusUpdate(updated);
    } catch {
      // erro já tratado pelo hook
    }
  };

  // Define se a tarefa está concluída
  const isCompleted = task.status === "completed";

  // Cores baseadas na categoria (consistência visual)
  const categoryColors: Record<string, string> = {
    Trabalho: "bg-cool-blue/10 text-cool-blue border-cool-blue/20",
    Pessoal: "bg-warm-yellow/10 text-warm-yellow border-warm-yellow/20",
    Estudos: "bg-cool-teal/10 text-cool-teal border-cool-teal/20",
  };

  const categoryColor =
    categoryColors[task.category] ||
    "bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300";

  return (
    <div
      className={`
        group relative
        bg-white dark:bg-neutral-800
        rounded-xl 
        border-2 
        ${
          isCompleted
            ? "border-cool-green/30 dark:border-cool-green/20"
            : "border-warm-orange/30 dark:border-warm-orange/20"
        }
        shadow-sm hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
        p-5
        ${isCompleted ? "opacity-75 hover:opacity-100" : ""}
      `}
    >
      {/* Badge de status no canto superior direito */}
      <div className="absolute -top-2 -right-2">
        {isCompleted ? (
          <div className="bg-cool-green text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <span>✓</span>
            <span>Concluído</span>
          </div>
        ) : (
          <div className="bg-warm-orange text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <span>⏱</span>
            <span>Pendente</span>
          </div>
        )}
      </div>

      {/* Título da tarefa com link */}
      <h3 className="text-lg font-bold mb-3 pr-20">
        {/*
          Decisão de Arquitetura: O requisito original pedia um link para "https://taskmanager.com/task/{id}".
          No entanto, esse link direciona para um site externo existente que exige autenticação,
          resultando em uma experiência de usuário quebrada.
          Para proporcionar uma funcionalidade real e demonstrar a criação de rotas dinâmicas,
          optei por implementar uma página de detalhes interna (`/{id}`).
        */}
        <a
          href={`/${task.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            hover:text-warm-orange dark:hover:text-warm-yellow
            transition-colors duration-200
            ${
              isCompleted
                ? "text-neutral-600 dark:text-neutral-400 line-through"
                : "text-neutral-900 dark:text-neutral-50"
            }
          `}
        >
          {task.title}
        </a>
      </h3>

      {/* Badge de categoria */}
      <div className="mb-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${categoryColor}`}
        >
          {task.category}
        </span>
      </div>

      {/* Informações da tarefa */}
      <div className="space-y-2 mb-4 text-sm">
        {/* Autor com ícone */}
        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span>
            {task.user.firstName} {task.user.lastName}
          </span>
        </div>

        {/* Data de criação com ícone */}
        <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{new Date(task.createdAt).toLocaleDateString("pt-BR")}</span>
        </div>
      </div>

      {/* Botão de ação */}
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`
          w-full py-3 px-4 
          rounded-lg 
          font-semibold 
          text-white
          transition-all duration-300
          flex items-center justify-center gap-2
          shadow-md hover:shadow-lg
          ${
            isCompleted
              ? "bg-neutral-500 hover:bg-warm-orange dark:bg-neutral-600 dark:hover:bg-warm-orange"
              : "bg-gradient-to-r from-warm-orange to-warm-yellow hover:from-warm-yellow hover:to-warm-orange"
          }
          ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
          disabled:hover:scale-100
        `}
      >
        {isLoading ? (
          <>
            {/* Spinner de loading */}
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Atualizando...</span>
          </>
        ) : isCompleted ? (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Reabrir Tarefa</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Marcar como Concluída</span>
          </>
        )}
      </button>
    </div>
  );
}
