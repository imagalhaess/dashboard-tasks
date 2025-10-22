"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import TaskCard from "@/components/TaskCard";

interface TaskListProps {
  searchQuery?: string;
}

/**
 * TaskList - Lista de tarefas com design moderno
 * 
 * Features:
 * - Filtros visuais com badges
 * - Grid responsivo
 * - Animações suaves
 * - Loading e error states bonitos
 */
export default function TaskList({ searchQuery = "" }: TaskListProps) {
  const [category, setCategory] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "completed">("all");
  
  const { tasks, loading, error, updateLocalTask } = useTasks(category);

  // Filtrar tarefas
  const filteredTasks = tasks.filter((task) => {
    // Filtro de status
    if (statusFilter !== "all" && task.status !== statusFilter) return false;
    
    // Filtro de busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  // Stats
  const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === "pending").length,
    completed: tasks.filter(t => t.status === "completed").length,
  };

  // Loading
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-600 font-medium">Carregando tarefas...</p>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-2xl p-6 text-center shadow-lg">
          <div className="text-5xl mb-3">⚠️</div>
          <h3 className="text-xl font-bold text-red-900 mb-2">
            Ops! Algo deu errado
          </h3>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="group bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Total</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                {stats.total}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center shadow-lg shadow-slate-500/20 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-700 mb-1">Pendentes</p>
              <p className="text-3xl font-bold text-amber-600">
                {stats.pending}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="group bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-700 mb-1">Concluídas</p>
              <p className="text-3xl font-bold text-emerald-600">
                {stats.completed}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-slate-700">Filtrar:</span>
          
          {/* Filtros de status */}
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              statusFilter === "all"
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Todas
          </button>
          
          <button
            onClick={() => setStatusFilter("pending")}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              statusFilter === "pending"
                ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/30"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Pendentes
          </button>
          
          <button
            onClick={() => setStatusFilter("completed")}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              statusFilter === "completed"
                ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Concluídas
          </button>

          <div className="w-px h-6 bg-slate-300 ml-2"></div>

          {/* Filtros de categoria */}
          <button
            onClick={() => setCategory("")}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              category === ""
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Todas Categorias
          </button>
          
          <button
            onClick={() => setCategory("Trabalho")}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              category === "Trabalho"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            💼 Trabalho
          </button>
          
          <button
            onClick={() => setCategory("Pessoal")}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              category === "Pessoal"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            🏠 Pessoal
          </button>
          
          <button
            onClick={() => setCategory("Estudos")}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
              category === "Estudos"
                ? "bg-indigo-600 text-white shadow-lg"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            📚 Estudos
          </button>
        </div>
      </div>

      {/* Grid de tarefas */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TaskCard task={task} onStatusUpdate={updateLocalTask} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-7xl mb-4 animate-bounce">📝</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            Nenhuma tarefa encontrada
          </h3>
          <p className="text-slate-600 mb-6">
            {searchQuery 
              ? `Nenhum resultado para "${searchQuery}"`
              : "Comece adicionando uma nova tarefa ou ajuste os filtros."}
          </p>
          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 transition-all">
            + Adicionar Tarefa
          </button>
        </div>
      )}
    </div>
  );
}
