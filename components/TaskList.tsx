"use client";
import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import TaskCard from "@/components/TaskCard";

/*
  TaskList - Lista de tarefas com filtros elegantes
  
  Funcionalidades:
  1. Filtro por categoria com botões visuais (não dropdown)
  2. Filtro por status (todas, pendentes, concluídas)
  3. Contador de tarefas
  4. Estados de loading e erro bem desenhados
  5. Mensagem quando não há tarefas
  
  UX:
  - Filtros visuais e interativos
  - Feedback visual claro do filtro ativo
  - Grid responsivo que se adapta ao tamanho da tela
*/
export default function TaskList() {
  const [category, setCategory] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "completed"
  >("all");
  const { tasks, loading, error, updateLocalTask } = useTasks(category);

  // Filtra tarefas por status
  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === "all") return true;
    return task.status === statusFilter;
  });

  // Calcula estatísticas
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;

  // Categorias disponíveis
  const categories = [
    { value: "", label: "Todas", icon: "📋" },
    { value: "Trabalho", label: "Trabalho", icon: "💼" },
    { value: "Pessoal", label: "Pessoal", icon: "🏠" },
    { value: "Estudos", label: "Estudos", icon: "📚" },
  ];

  // Estado de loading
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative w-16 h-16">
          {/* Spinner animado */}
          <div className="absolute inset-0 border-4 border-neutral-200 dark:border-neutral-700 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-warm-orange border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 font-medium">
          Carregando suas tarefas...
        </p>
      </div>
    );
  }

  // Estado de erro
  if (error) {
    return (
      <div className="bg-warm-red/10 border-2 border-warm-red/20 rounded-xl p-6 text-center">
        <div className="text-4xl mb-3">⚠️</div>
        <h3 className="text-lg font-semibold text-warm-red mb-2">
          Ops! Algo deu errado
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Painel de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card Total */}
        <div className="bg-gradient-to-br from-cool-blue/10 to-cool-blue/5 dark:from-cool-blue/20 dark:to-cool-blue/10 border border-cool-blue/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                Total
              </p>
              <p className="text-3xl font-bold text-cool-blue">{totalTasks}</p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </div>

        {/* Card Pendentes */}
        <div className="bg-gradient-to-br from-warm-orange/10 to-warm-orange/5 dark:from-warm-orange/20 dark:to-warm-orange/10 border border-warm-orange/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                Pendentes
              </p>
              <p className="text-3xl font-bold text-warm-orange">
                {pendingTasks}
              </p>
            </div>
            <div className="text-4xl">⏱</div>
          </div>
        </div>

        {/* Card Concluídas */}
        <div className="bg-gradient-to-br from-cool-green/10 to-cool-green/5 dark:from-cool-green/20 dark:to-cool-green/10 border border-cool-green/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                Concluídas
              </p>
              <p className="text-3xl font-bold text-cool-green">
                {completedTasks}
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-4">
        {/* Filtro por categoria */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
            📁 Filtrar por categoria
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`
                  px-4 py-2 rounded-lg font-medium
                  transition-all duration-200
                  flex items-center gap-2
                  ${
                    category === cat.value
                      ? "bg-warm-orange text-white shadow-md scale-105"
                      : "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                  }
                `}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filtro por status */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
            🎯 Filtrar por status
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter("all")}
              className={`
                px-4 py-2 rounded-lg font-medium
                transition-all duration-200
                ${
                  statusFilter === "all"
                    ? "bg-cool-blue text-white shadow-md scale-105"
                    : "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                }
              `}
            >
              Todas
            </button>
            <button
              onClick={() => setStatusFilter("pending")}
              className={`
                px-4 py-2 rounded-lg font-medium
                transition-all duration-200
                ${
                  statusFilter === "pending"
                    ? "bg-warm-orange text-white shadow-md scale-105"
                    : "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                }
              `}
            >
              Pendentes
            </button>
            <button
              onClick={() => setStatusFilter("completed")}
              className={`
                px-4 py-2 rounded-lg font-medium
                transition-all duration-200
                ${
                  statusFilter === "completed"
                    ? "bg-cool-green text-white shadow-md scale-105"
                    : "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                }
              `}
            >
              Concluídas
            </button>
          </div>
        </div>
      </div>

      {/* Grid de tarefas */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task, index) => (
            <div
              key={task.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <TaskCard task={task} onStatusUpdate={updateLocalTask} />
            </div>
          ))}
        </div>
      ) : (
        // Mensagem quando não há tarefas
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
            Nenhuma tarefa encontrada
          </h3>
          <p className="text-neutral-500 dark:text-neutral-400">
            {statusFilter === "completed" && totalTasks > 0
              ? "Você ainda não concluiu nenhuma tarefa. Vamos lá!"
              : statusFilter === "pending" && totalTasks > 0
              ? "Parabéns! Você não tem tarefas pendentes! 🎊"
              : "Aproveite seu tempo livre ou adicione novas tarefas."}
          </p>
        </div>
      )}
    </div>
  );
}
