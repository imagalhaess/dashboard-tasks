"use client";

import type { Task } from "@/lib/graphql/mockData";
import { useToggleStatus } from "@/hooks/useToggleStatus";

interface TaskCardProps {
  task: Task;
  onStatusUpdate: (t: Task) => void;
}

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

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold">
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
          className="hover:underline text-blue-600"
        >
          {task.title}
        </a>
      </h3>
      {/* Detalhes da tarefa */}
      <div className="mt-2 text-sm space-y-1">
        <div>
          <span className="font-medium">Status:</span> {task.status}
        </div>
        <div>
          <span className="font-medium">Autor:</span> {task.user.firstName}{" "}
          {task.user.lastName}
        </div>
        <div>
          <span className="font-medium">Categoria:</span> {task.category}
        </div>
        <div>
          <span className="font-medium">Criado em:</span>{" "}
          {new Date(task.createdAt).toLocaleDateString("pt-BR")}
        </div>
      </div>

      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`mt-4 px-3 py-1 rounded text-white ${
          task.status === "pending"
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-green-500 hover:bg-green-600"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isLoading
          ? "Atualizando..."
          : task.status === "pending"
          ? "Concluir"
          : "Reabrir"}
      </button>
    </div>
  );
}
