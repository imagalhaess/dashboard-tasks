"use client";
import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import TaskCard from "@/components/TaskCard";

/**
 * TaskList - Sistema completo de gerenciamento de tarefas
 *
 * Layout:
 * - Sidebar fixa com filtros e navegação
 * - Área principal com grid de tarefas
 * - Responsivo: sidebar vira menu em mobile
 */
export default function TaskList() {
  const [view, setView] = useState<"all" | "today" | "week" | "completed">(
    "all"
  );
  const [priority, setPriority] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { tasks, loading, error, updateLocalTask } = useTasks();

  // Filtrar tarefas
  const filteredTasks = tasks.filter((task) => {
    // Filtro de visualização
    if (view === "completed" && task.status !== "completed") return false;
    if (view === "today") {
      const today = new Date().toDateString();
      const taskDate = new Date(task.createdAt).toDateString();
      if (today !== taskDate) return false;
    }

    // Filtro de categoria
    if (category && task.category !== category) return false;

    return true;
  });

  // Contadores
  const counts = {
    all: tasks.length,
    today: tasks.filter(
      (t) => new Date(t.createdAt).toDateString() === new Date().toDateString()
    ).length,
    week: tasks.length, // Simplificado
    completed: tasks.filter((t) => t.status === "completed").length,
    work: tasks.filter((t) => t.category === "Trabalho").length,
    personal: tasks.filter((t) => t.category === "Pessoal").length,
    study: tasks.filter((t) => t.category === "Estudos").length,
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-emerald-600"></div>
          <p className="mt-4 text-gray-600">Carregando tarefas...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Ops! Algo deu errado
          </h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Sidebar - Filtros e navegação */}
      <aside
        className={`
        fixed lg:sticky top-16 left-0 bottom-0 
        w-64 bg-white border-r border-gray-200 
        p-6 overflow-y-auto z-40
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Visualizações */}
        <div className="mb-8">
          <h2 className="text-xs font-bold uppercase text-gray-500 mb-3 tracking-wider">
            Visualizações
          </h2>
          <nav className="space-y-1">
            <button
              onClick={() => {
                setView("all");
                setPriority("");
                setCategory("");
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                view === "all" && !priority && !category
                  ? "bg-emerald-100 text-emerald-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-3">
                <span>📋</span>
                <span>Todas as Tarefas</span>
              </span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                {counts.all}
              </span>
            </button>

            <button
              onClick={() => {
                setView("today");
                setPriority("");
                setCategory("");
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                view === "today"
                  ? "bg-emerald-100 text-emerald-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-3">
                <span>📅</span>
                <span>Hoje</span>
              </span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                {counts.today}
              </span>
            </button>

            <button
              onClick={() => {
                setView("completed");
                setPriority("");
                setCategory("");
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                view === "completed"
                  ? "bg-emerald-100 text-emerald-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-3">
                <span>✓</span>
                <span>Concluídas</span>
              </span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                {counts.completed}
              </span>
            </button>
          </nav>
        </div>

        {/* Categorias */}
        <div>
          <h2 className="text-xs font-bold uppercase text-gray-500 mb-3 tracking-wider">
            Categorias
          </h2>
          <nav className="space-y-1">
            <button
              onClick={() => {
                setCategory("Trabalho");
                setView("all");
                setPriority("");
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                category === "Trabalho"
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span>Trabalho</span>
              </span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                {counts.work}
              </span>
            </button>

            <button
              onClick={() => {
                setCategory("Pessoal");
                setView("all");
                setPriority("");
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                category === "Pessoal"
                  ? "bg-emerald-100 text-emerald-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Pessoal</span>
              </span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                {counts.personal}
              </span>
            </button>

            <button
              onClick={() => {
                setCategory("Estudos");
                setView("all");
                setPriority("");
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                category === "Estudos"
                  ? "bg-purple-100 text-purple-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <span>Estudos</span>
              </span>
              <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                {counts.study}
              </span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Botão hamburguer mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed bottom-6 right-6 lg:hidden bg-emerald-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Área principal de conteúdo */}
      <main className="flex-1 p-6 lg:p-8 max-w-7xl">
        {/* Header da seção */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {view === "all" && !category
              ? "Todas as Tarefas"
              : view === "today"
              ? "Tarefas de Hoje"
              : view === "completed"
              ? "Tarefas Concluídas"
              : category
              ? category
              : "Tarefas"}
          </h2>
          <p className="text-gray-600">Gerencie suas atividades</p>
        </div>

        {/* Grid de tarefas */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusUpdate={updateLocalTask}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhuma tarefa encontrada
            </h3>
            <p className="text-gray-500">
              Comece adicionando uma nova tarefa ou ajuste os filtros.
            </p>
          </div>
        )}
      </main>
    </>
  );
}
