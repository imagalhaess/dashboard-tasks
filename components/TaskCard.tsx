"use client";

import React, { useState, useEffect } from "react";
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

  // detecta a URL base (localhost ou domínio em produção)
  const [baseUrl, setBaseUrl] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      {/* título como link */}
      <h3 className="text-lg font-semibold">
        <a
          href={`${baseUrl}/task/${task.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-blue-600"
        >
          {task.title}
        </a>
      </h3>

      {/* status e autor */}
      <div className="mt-2 text-sm space-y-1">
        <div>
          <span className="font-medium">Status:</span> {task.status}
        </div>
        <div>
          <span className="font-medium">Autor:</span> {task.user.firstName}{" "}
          {task.user.lastName}
        </div>
      </div>

      {/* botão de ação */}
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
