"use client";

import { useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  createdAt: string;
};

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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active" && task.completed) return false;
    if (filter === "completed" && !task.completed) return false;
    if (categoryFilter !== "all" && task.category !== categoryFilter) return false;
    return true;
  });

  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

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

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ============= HEADER ============= */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">✓</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
                <p className="text-sm text-gray-500">Gerenciador de Tarefas</p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              + Nova Tarefa
            </button>
          </div>
        </div>
      </header>

      {/* ============= MAIN CONTENT ============= */}
      <main className="max-w-7xl mx-auto px-6">
        
        {/* Welcome Section - Espaçamento generoso */}
        <section className="py-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Bem-vindo de volta 👋
          </h2>
          <p className="text-lg text-gray-600">
            Você tem {stats.active} {stats.active === 1 ? "tarefa pendente" : "tarefas pendentes"} hoje
          </p>
        </section>

        {/* Stats Section - Cards com espaçamento */}
        <section className="mb-16">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">
            Resumo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📋</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-2">Total de Tarefas</p>
              <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
            </div>

            {/* Pendentes */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">⏳</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-2">Pendentes</p>
              <p className="text-4xl font-bold text-orange-600">{stats.active}</p>
            </div>

            {/* Concluídas */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-2">Concluídas</p>
              <p className="text-4xl font-bold text-green-600">{stats.completed}</p>
            </div>
          </div>
        </section>

        {/* Filters Section - Hierarquia clara */}
        <section className="mb-12">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">
            Filtros
          </h3>
          
          {/* Status Filters */}
          <div className="mb-6">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Por Status
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilter("all")}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  filter === "all"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-300"
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilter("active")}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  filter === "active"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-300"
                }`}
              >
                Pendentes
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  filter === "completed"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-300"
                }`}
              >
                Concluídas
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              Por Categoria
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  categoryFilter === "all"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-300"
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setCategoryFilter("Trabalho")}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  categoryFilter === "Trabalho"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-300"
                }`}
              >
                💼 Trabalho
              </button>
              <button
                onClick={() => setCategoryFilter("Pessoal")}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  categoryFilter === "Pessoal"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-300"
                }`}
              >
                🏠 Pessoal
              </button>
              <button
                onClick={() => setCategoryFilter("Estudos")}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  categoryFilter === "Estudos"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-indigo-300"
                }`}
              >
                📚 Estudos
              </button>
            </div>
          </div>
        </section>

        {/* Tasks Section */}
        <section className="pb-16">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">
            Suas Tarefas ({filteredTasks.length})
          </h3>

          {filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-indigo-200 transition-all duration-200"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-5">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-200 ${
                        task.completed
                          ? "bg-green-500"
                          : "border-2 border-gray-300 hover:border-indigo-500"
                      }`}
                    >
                      {task.completed && <span className="text-white text-sm font-bold">✓</span>}
                    </button>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        task.category === "Trabalho"
                          ? "bg-blue-50 text-blue-700"
                          : task.category === "Pessoal"
                          ? "bg-purple-50 text-purple-700"
                          : "bg-indigo-50 text-indigo-700"
                      }`}
                    >
                      {task.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h4
                    className={`text-lg font-semibold mb-3 ${
                      task.completed ? "line-through text-gray-400" : "text-gray-900"
                    }`}
                  >
                    {task.title}
                  </h4>

                  {/* Description */}
                  {task.description && (
                    <p className="text-sm text-gray-600 mb-5 leading-relaxed">
                      {task.description}
                    </p>
                  )}

                  {/* Date */}
                  <p className="text-xs text-gray-400 mb-5">
                    {new Date(task.createdAt).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t">
                    <button className="flex-1 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg font-medium transition-colors duration-200">
                      Editar
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors duration-200"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-16 text-center border border-gray-200">
              <div className="text-6xl mb-6">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Nenhuma tarefa encontrada
              </h3>
              <p className="text-gray-600">
                Adicione uma nova tarefa ou ajuste os filtros acima
              </p>
            </div>
          )}
        </section>
      </main>

      {/* ============= MODAL ============= */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-200"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Criar Nova Tarefa
            </h2>
            
            <form onSubmit={handleAddTask} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Título da Tarefa *
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="Ex: Revisar relatório mensal"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Descrição (opcional)
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Adicione mais detalhes sobre a tarefa..."
                  rows={4}
                ></textarea>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Categoria
                </label>
                <select
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="Trabalho">💼 Trabalho</option>
                  <option value="Pessoal">🏠 Pessoal</option>
                  <option value="Estudos">📚 Estudos</option>
                </select>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors duration-200"
                >
                  Criar Tarefa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
