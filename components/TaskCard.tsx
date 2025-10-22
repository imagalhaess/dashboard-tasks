"use client";

import type { Task } from "@/lib/graphql/mockData";
import { useToggleStatus } from "@/hooks/useToggleStatus";

interface TaskCardProps {
  task: Task;
  onStatusUpdate: (t: Task) => void;
}

export default function TaskCard({ task, onStatusUpdate }: TaskCardProps) {
  const { toggleStatus, isLoading } = useToggleStatus();

  const handleToggle = async () => {
    try {
      const updated = await toggleStatus(task.id, task.status);
      onStatusUpdate(updated);
    } catch {
      // erro já tratado
    }
  };

  const isCompleted = task.status === "completed";

  // Cores por categoria - MAIS BONITAS
  const categoryStyles: Record<string, { bg: string; text: string; badge: string }> = {
    Trabalho: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      badge: "bg-blue-600"
    },
    Pessoal: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      badge: "bg-purple-600"
    },
    Estudos: {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      badge: "bg-indigo-600"
    }
  };

  const style = categoryStyles[task.category] || categoryStyles.Trabalho;

  return (
    <div className={`
      group relative
      bg-white rounded-2xl shadow-md hover:shadow-xl
      transition-all duration-300 hover:-translate-y-1
      p-6 border border-gray-100
      ${isCompleted ? "opacity-60" : ""}
    `}>
      {/* Badge de categoria BONITO */}
      <div className="absolute -top-3 left-6">
        <span className={`
          ${style.badge}
          px-4 py-1.5 rounded-full text-white text-sm font-semibold
          shadow-lg flex items-center gap-2
        `}>
          {task.category === "Trabalho" && "💼"}
          {task.category === "Pessoal" && "🏠"}
          {task.category === "Estudos" && "📚"}
          {task.category}
        </span>
      </div>

      {/* Badge de concluído */}
      {isCompleted && (
        <div className="absolute -top-3 right-6">
          <span className="bg-green-600 px-3 py-1 rounded-full text-white text-xs font-bold shadow-lg flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Concluída
          </span>
        </div>
      )}

      <div className="mt-4">
        {/* Checkbox + Título */}
        <div className="flex items-start gap-4 mb-4">
          <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`
              flex-shrink-0 w-6 h-6 rounded-lg border-2 mt-1
              transition-all duration-200
              ${isCompleted
                ? "bg-green-600 border-green-600"
                : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
              }
              ${isLoading ? "opacity-50" : "cursor-pointer hover:scale-110"}
              flex items-center justify-center
            `}
          >
            {isCompleted && (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <h3 className={`
            font-bold text-lg text-gray-900 leading-tight flex-1
            ${isCompleted ? "line-through text-gray-500" : ""}
          `}>
            {task.title}
          </h3>
        </div>

        {/* Descrição se houver */}
        {task.description && (
          <p className="text-sm text-gray-600 mb-4 ml-10 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Informações */}
        <div className="space-y-2 text-sm text-gray-600 mb-4 ml-10">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{task.user.firstName} {task.user.lastName}</span>
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{new Date(task.createdAt).toLocaleDateString("pt-BR")}</span>
          </div>
        </div>

        {/* Botões BONITOS */}
        <div className="flex gap-2 ml-10">
          <button className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all hover:scale-105 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar
          </button>
          <button className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-medium transition-all hover:scale-105 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
