"use client";

import type { Task } from "@/lib/graphql/mockData";
import { useToggleStatus } from "@/hooks/useToggleStatus";

interface TaskCardProps {
  task: Task;
  onStatusUpdate: (t: Task) => void;
}

/**
 * TaskCard - Card de tarefa com design limpo e horizontal
 *
 * Layout tipo lista com:
 * - Checkbox personalizado
 * - Título e metadados
 * - Badges de categoria e prioridade
 * - Botões de ação
 */
export default function TaskCard({ task, onStatusUpdate }: TaskCardProps) {
  const { toggleStatus, isLoading } = useToggleStatus();

  const handleToggle = async () => {
    try {
      const updated = await toggleStatus(task.id, task.status);
      onStatusUpdate(updated);
    } catch {
      // erro tratado pelo hook
    }
  };

  const isCompleted = task.status === "completed";

  // Cores por categoria
  const categoryStyles: Record<string, string> = {
    Trabalho: "bg-blue-100 text-blue-700 border-blue-200",
    Pessoal: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Estudos: "bg-purple-100 text-purple-700 border-purple-200",
  };

  const categoryStyle =
    categoryStyles[task.category] ||
    "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <div
      className={`
      bg-white rounded-lg border border-gray-200 p-4 
      hover:shadow-md transition-all duration-200
      ${isCompleted ? "opacity-60" : ""}
    `}
    >
      <div className="flex items-center gap-4">
        {/* Checkbox customizado */}
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={`
            flex-shrink-0 w-6 h-6 rounded-md border-2 transition-all
            flex items-center justify-center
            ${
              isCompleted
                ? "bg-emerald-600 border-emerald-600"
                : "border-gray-300 hover:border-emerald-500"
            }
            ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          {isCompleted && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>

        {/* Conteúdo principal */}
        <div className="flex-1 min-w-0">
          {/* Título */}
          <h3
            className={`
            font-semibold text-gray-900 mb-1
            ${isCompleted ? "line-through text-gray-500" : ""}
          `}
          >
            {task.title}
          </h3>

          {/* Metadados */}
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
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
              {task.user.firstName} {task.user.lastName}
            </span>

            <span className="flex items-center gap-1">
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
              {new Date(task.createdAt).toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>

        {/* Badge de categoria */}
        <div className="flex-shrink-0">
          <span
            className={`
            inline-block px-3 py-1 rounded-full text-xs font-semibold border
            ${categoryStyle}
          `}
          >
            {task.category}
          </span>
        </div>

        {/* Botões de ação */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <button
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Editar"
          >
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Excluir"
          >
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
