"use client";

import React from "react";
import type { Task } from "@/lib/graphql/mockData";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="p-4 bg-white rounded shadow">
      {" "}
      {/* Card Tailwind */}
      <h3 className="text-lg font-semibold">{task.title}</h3> {/* Título */}
      {task.description && (
        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
      )}{" "}
      {/* Descrição */}
      <div className="mt-2 text-sm">
        <span className="font-medium">Categoria:</span> {task.category}
        <br />
        <span className="font-medium">Status:</span> {task.status}
        <br />
        <span className="font-medium">Criado em:</span>{" "}
        {new Date(task.createdAt).toLocaleString()}
        <br />
        <span className="font-medium">Autor:</span> {task.user.firstName}{" "}
        {task.user.lastName}
      </div>
      <button
        className="mt-3 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => {
          // placeholder para lógica de toggle
          console.log("Toggle status for", task.id);
        }}
      >
        {task.status === "pending" ? "Concluir" : "Reabrir"}
      </button>
    </div>
  );
}
