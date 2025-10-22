"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import TaskCard from "@/components/TaskCard";

export default function TaskList() {
  const [category, setCategory] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "completed">("all");
  
  const { tasks, loading, error, updateLocalTask } = useTasks(category);

  // Filtrar tarefas
  const filteredTasks = tasks.filter((task) => {
    if (statusFilter !== "all" && task.status !== statusFilter) return false;
    return true;
  });

  // Stats simples
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter(t => t.status === "pending").length;
  const completedTasks = tasks.filter(t => t.status === "completed").length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando tarefas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-800">Erro: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Total</p>
          <p className="text-3xl font-bold text-gray-900">{totalTasks}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Pendentes</p>
          <p className="text-3xl font-bold text-orange-600">{pendingTasks}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Concluídas</p>
          <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
        </div>
      </div>

      {/* Filtros Simples */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === "pending"
                ? "bg-orange-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setStatusFilter("completed")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              statusFilter === "completed"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Concluídas
          </button>

          <div className="w-px bg-gray-300 mx-2"></div>

          <button
            onClick={() => setCategory("")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              category === ""
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Todas Categorias
          </button>
          <button
            onClick={() => setCategory("Trabalho")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              category === "Trabalho"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            💼 Trabalho
          </button>
          <button
            onClick={() => setCategory("Pessoal")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              category === "Pessoal"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🏠 Pessoal
          </button>
          <button
            onClick={() => setCategory("Estudos")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              category === "Estudos"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📚 Estudos
          </button>
        </div>
      </div>

      {/* Lista de Tarefas */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onStatusUpdate={updateLocalTask} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-6xl mb-4">📝</p>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Nenhuma tarefa encontrada
          </h3>
          <p className="text-gray-600">
            Adicione uma nova tarefa ou ajuste os filtros
          </p>
        </div>
      )}
    </div>
  );
}
