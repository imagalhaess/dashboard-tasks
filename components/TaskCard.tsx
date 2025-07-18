"use client";

import React from "react";
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
      // error já é tratado no hook
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      {/* 1. Título */}
      <h3 className="text-lg font-semibold">{task.title}</h3>

      {/* 2. Descrição (se existir) */}
      {task.description && (
        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      )}

      {/* 3. Detalhes */}
      <div className="mt-2 text-sm space-y-1">
        <div>
          <span className="font-medium">Categoria:</span> {task.category}
        </div>
        <div>
          <span className="font-medium">Status:</span> {task.status}
        </div>
        <div>
          <span className="font-medium">Criado em:</span>{" "}
          {new Date(task.createdAt).toLocaleString()}
        </div>
        <div>
          <span className="font-medium">Autor:</span> {task.user.firstName}{" "}
          {task.user.lastName}
        </div>
      </div>

      {/* 4. Botão de toggle */}
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`
          mt-4 px-3 py-1 rounded text-white 
          ${
            task.status === "pending"
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-green-500 hover:bg-green-600"
          } 
          ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
        `}
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
