"use client";

import type { Task } from "@/lib/graphql/mockData";
import { useToggleStatus } from "@/hooks/useToggleStatus";

interface TaskCardProps {
  task: Task;
  onStatusUpdate: (t: Task) => void;
}

/**
 * TaskCard - Card de tarefa com design moderno e elegante
 * 
 * Features:
 * - Glassmorphism effect
 * - Gradientes suaves
 * - Animações fluidas
 * - Badge de status colorido
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

  // Estilos por categoria
  const categoryStyles: Record<string, { bg: string; text: string; border: string; icon: string }> = {
    Trabalho: {
      bg: "from-blue-500 to-cyan-600",
      text: "text-blue-700",
      border: "border-blue-200",
      icon: "💼"
    },
    Pessoal: {
      bg: "from-purple-500 to-pink-600",
      text: "text-purple-700",
      border: "border-purple-200",
      icon: "🏠"
    },
    Estudos: {
      bg: "from-indigo-500 to-purple-600",
      text: "text-indigo-700",
      border: "border-indigo-200",
      icon: "📚"
    }
  };

  const categoryStyle = categoryStyles[task.category] || categoryStyles.Trabalho;

  return (
    <div className={`
      group relative
      bg-gradient-to-br from-white to-slate-50
      rounded-2xl border border-slate-200
      p-6 shadow-sm hover:shadow-xl
      transition-all duration-300
      hover:-translate-y-2
      ${isCompleted ? "opacity-60" : ""}
    `}>
      {/* Badge de categoria no topo */}
      <div className="absolute -top-3 left-6">
        <div className={`
          px-4 py-1.5 rounded-full
          bg-gradient-to-r ${categoryStyle.bg}
          shadow-lg shadow-${categoryStyle.bg}/30
          flex items-center gap-2
        `}>
          <span className="text-white text-sm font-semibold">
            {categoryStyle.icon} {task.category}
          </span>
        </div>
      </div>

      {/* Badge de status */}
      {isCompleted && (
        <div className="absolute -top-3 right-6">
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30">
            <span className="text-white text-xs font-bold flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Concluída
            </span>
          </div>
        </div>
      )}

      {/* Conteúdo */}
      <div className="mt-4 space-y-4">
        {/* Checkbox + Título */}
        <div className="flex items-start gap-3">
          <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`
              flex-shrink-0 mt-1
              w-6 h-6 rounded-lg border-2
              transition-all duration-200
              ${isCompleted
                ? "bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-500"
                : "border-slate-300 hover:border-blue-500 hover:bg-blue-50"
              }
              ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-110"}
              flex items-center justify-center
            `}
          >
            {isCompleted && (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3 className={`
              font-bold text-lg leading-tight mb-2
              ${isCompleted
                ? "line-through text-slate-500"
                : "text-slate-900"
              }
            `}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className="text-sm text-slate-600 line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium">
              {task.user.firstName} {task.user.lastName}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">
              {new Date(task.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "short"
              })}
            </span>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex items-center gap-2 pt-2">
          <button className="flex-1 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm transition-all hover:scale-105 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Editar
          </button>
          
          <button className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-medium text-sm transition-all hover:scale-105 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Efeito de brilho no hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"></div>
    </div>
  );
}
