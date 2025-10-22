"use client";

import { useState } from "react";

/**
 * Tipos de dados
 */
type Task = {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  createdAt: string;
};

/**
 * Dados de exemplo (mock)
 */
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Revisar código do projeto",
    description: "Fazer code review do PR #123",
    category: "Trabalho",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Comprar mantimentos",
    description: "Lista: arroz, feijão, café",
    category: "Pessoal",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Estudar React",
    description: "Terminar curso de hooks avançados",
    category: "Estudos",
    completed: true,
    createdAt: new Date().toISOString(),
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "Trabalho",
  });

  // Filtrar tarefas
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active" && task.completed) return false;
    if (filter === "completed" && !task.completed) return false;
    if (categoryFilter !== "all" && task.category !== categoryFilter) return false;
    return true;
  });

  // Estatísticas
  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  // Adicionar tarefa
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks([task, ...tasks]);
    setNewTask({ title: "", description: "", category: "Trabalho" });
    setShowModal(false);
  };

  // Toggle tarefa
  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // Deletar tarefa
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">✓</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">TaskFlow</h1>
                <p className="text-sm text-gray-500">Organize suas tarefas</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
            >
              + Nova Tarefa
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo! 👋</h2>
          <p className="text-gray-600">Gerencie suas tarefas de forma simples e eficiente</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border p-6">
            <p className="text-sm text-gray-500 mb-1">Total</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <p className="text-sm text-gray-500 mb-1">Pendentes</p>
            <p className="text-3xl font-bold text-orange-600">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <p className="text-sm text-gray-500 mb-1">Concluídas</p>
            <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {/* Status */}
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "active"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Pendentes
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === "completed"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Concluídas
            </button>

            <div className="w-px bg-gray-300 mx-2"></div>

            {/* Category */}
            <button
              onClick={() => setCategoryFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                categoryFilter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Todas Categorias
            </button>
            <button
              onClick={() => setCategoryFilter("Trabalho")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                categoryFilter === "Trabalho"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              💼 Trabalho
            </button>
            <button
              onClick={() => setCategoryFilter("Pessoal")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                categoryFilter === "Pessoal"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              🏠 Pessoal
            </button>
            <button
              onClick={() => setCategoryFilter("Estudos")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                categoryFilter === "Estudos"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              📚 Estudos
            </button>
          </div>
        </div>

        {/* Tasks */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-lg border p-6 hover:shadow-lg transition"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition ${
                      task.completed
                        ? "bg-green-600 border-green-600"
                        : "border-gray-300 hover:border-blue-600"
                    }`}
                  >
                    {task.completed && <span className="text-white text-xs">✓</span>}
                  </button>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      task.category === "Trabalho"
                        ? "bg-blue-100 text-blue-700"
                        : task.category === "Pessoal"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-indigo-100 text-indigo-700"
                    }`}
                  >
                    {task.category}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    task.completed ? "line-through text-gray-400" : "text-gray-900"
                  }`}
                >
                  {task.title}
                </h3>

                {/* Description */}
                {task.description && (
                  <p className="text-sm text-gray-600 mb-4">{task.description}</p>
                )}

                {/* Date */}
                <p className="text-xs text-gray-400 mb-4">
                  {new Date(task.createdAt).toLocaleDateString("pt-BR")}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition">
                    Editar
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhuma tarefa encontrada</h3>
            <p className="text-gray-600">Adicione uma nova tarefa ou ajuste os filtros</p>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Nova Tarefa</h2>
            <form onSubmit={handleAddTask}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Ex: Fazer compras"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Detalhes da tarefa..."
                  rows={3}
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoria
                </label>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Trabalho">💼 Trabalho</option>
                  <option value="Pessoal">🏠 Pessoal</option>
                  <option value="Estudos">📚 Estudos</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
