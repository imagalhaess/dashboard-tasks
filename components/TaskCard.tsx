"use client";

import type { Task } from "@/lib/graphql/mockData";
import { useToggleStatus } from "@/hooks/useToggleStatus";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getCategoryColor, getCategoryIcon, formatDate } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onStatusUpdate: (t: Task) => void;
}

/**
 * TaskCard Component
 * 
 * Responsabilidade: Renderizar uma tarefa individual
 * 
 * Princípios aplicados:
 * - Single Responsibility
 * - Componente apresentacional
 * - Lógica separada em hooks
 */
export default function TaskCard({ task, onStatusUpdate }: TaskCardProps) {
  const { toggleStatus, isLoading } = useToggleStatus();

  const handleToggle = async () => {
    try {
      const updated = await toggleStatus(task.id, task.status);
      onStatusUpdate(updated);
    } catch {
      // Erro já tratado no hook
    }
  };

  const isCompleted = task.status === "completed";
  const categoryStyle = getCategoryColor(task.category);
  const categoryIcon = getCategoryIcon(task.category);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          {/* Checkbox */}
          <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`
              flex-shrink-0 w-5 h-5 rounded border-2 mt-0.5
              transition-all
              ${
                isCompleted
                  ? "bg-primary border-primary"
                  : "border-input hover:border-primary"
              }
              ${isLoading ? "opacity-50" : "cursor-pointer"}
              flex items-center justify-center
            `}
            aria-label={
              isCompleted ? "Marcar como pendente" : "Marcar como concluída"
            }
          >
            {isCompleted && (
              <svg
                className="w-3 h-3 text-primary-foreground"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          {/* Badge de Categoria */}
          <Badge className={categoryStyle.badge + " text-white"}>
            {categoryIcon} {task.category}
          </Badge>
        </div>

        {/* Título */}
        <h3
          className={`
            text-lg font-semibold mt-2
            ${isCompleted ? "line-through text-muted-foreground" : ""}
          `}
        >
          {task.title}
        </h3>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Descrição */}
        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Informações */}
        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
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

          <div className="flex items-center gap-2">
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
            <span>{formatDate(task.createdAt)}</span>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <svg
              className="w-4 h-4 mr-1"
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
            Editar
          </Button>
          <Button variant="destructive" size="sm">
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
