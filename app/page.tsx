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
    if (categoryFilter !== "all" && task.category !== categoryFilter)
      return false;
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
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 to-orange-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <header className="bg-white border-b border-yellow-300 sticky top-0 z-40 shadow-sm py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center shadow-md text-white text-xl font-bold select-none">
                ✓
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-yellow-900">
                  TaskFlow
                </h1>
                <p className="text-sm text-yellow-700 font-medium">
                  Gerenciador de Tarefas
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white font-semibold shadow-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              + Nova Tarefa
            </button>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="py-8">
          {/* Welcome section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-2 text-yellow-900">
              Bem-vindo de volta 👋
            </h2>
            <p className="text-yellow-700 text-lg">
              Você tem {stats.active}{" "}
              {stats.active === 1 ? "tarefa pendente" : "tarefas pendentes"}{" "}
              hoje
            </p>
          </section>

          {/* Stats cards */}
          <section className="mb-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-8 border border-yellow-200 hover:border-yellow-400 hover:shadow-lg transition-shadow duration-300">
              <div className="text-yellow-600 text-3xl mb-4">📋</div>
              <p className="text-sm font-semibold text-yellow-800 mb-2">
                Total de Tarefas
              </p>
              <p className="text-4xl font-extrabold text-yellow-900">
                {stats.total}
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-yellow-200 hover:border-yellow-400 hover:shadow-lg transition-shadow duration-300">
              <div className="text-yellow-500 text-3xl mb-4">⏳</div>
              <p className="text-sm font-semibold text-yellow-800 mb-2">
                Pendentes
              </p>
              <p className="text-4xl font-extrabold text-yellow-900">
                {stats.active}
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-yellow-200 hover:border-yellow-400 hover:shadow-lg transition-shadow duration-300">
              <div className="text-yellow-700 text-3xl mb-4">✅</div>
              <p className="text-sm font-semibold text-yellow-800 mb-2">
                Concluídas
              </p>
              <p className="text-4xl font-extrabold text-yellow-900">
                {stats.completed}
              </p>
            </div>
          </section>

          {/* Filters */}
          <section className="mb-12">
            <h3 className="text-sm font-semibold text-yellow-700 uppercase tracking-wide mb-6">
              Filtros
            </h3>

            {/* Status filters */}
            <div className="mb-6">
              <p className="text-xs font-medium text-yellow-600 uppercase tracking-wider mb-3">
                Por Status
              </p>
              <div className="flex flex-wrap gap-3">
                {["all", "active", "completed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status as any)}
                    className={`px-5 py-2.5 rounded-lg font-semibold transition-colors duration-300 cursor-pointer select-none ${
                      filter === status
                        ? "bg-yellow-600 text-white shadow-lg"
                        : "bg-yellow-100 text-yellow-900 hover:bg-yellow-300"
                    }`}
                  >
                    {status === "all"
                      ? "Todas"
                      : status === "active"
                      ? "Pendentes"
                      : "Concluídas"}
                  </button>
                ))}
              </div>
            </div>

            {/* Category filters */}
            <div>
              <p className="text-xs font-medium text-yellow-600 uppercase tracking-wider mb-3">
                Por Categoria
              </p>
              <div className="flex flex-wrap gap-3">
                {["all", "Trabalho", "Pessoal", "Estudos"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-5 py-2.5 rounded-lg font-semibold transition-colors duration-300 cursor-pointer select-none ${
                      categoryFilter === cat
                        ? "bg-yellow-600 text-white shadow-lg"
                        : "bg-yellow-100 text-yellow-900 hover:bg-yellow-300"
                    }`}
                  >
                    {cat === "all"
                      ? "Todas"
                      : cat === "Trabalho"
                      ? "💼 Trabalho"
                      : cat === "Pessoal"
                      ? "🏠 Pessoal"
                      : "📚 Estudos"}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Tasks section */}
          <section>
            <h3 className="text-sm font-semibold text-yellow-700 uppercase tracking-wide mb-6">
              Suas Tarefas ({filteredTasks.length})
            </h3>

            {filteredTasks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-xl p-6 border border-yellow-200 hover:shadow-lg hover:border-yellow-400 transition-shadow duration-300 cursor-default"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <button
                        onClick={() => toggleTask(task.id)}
                        aria-label={`Marcar tarefa ${
                          task.completed ? "não concluída" : "concluída"
                        }`}
                        className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors duration-200 ${
                          task.completed
                            ? "bg-yellow-600 text-white"
                            : "border-2 border-yellow-300 hover:border-yellow-500"
                        } focus:outline-none focus:ring-2 focus:ring-yellow-500`}
                      >
                        {task.completed && <span>✓</span>}
                      </button>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          task.category === "Trabalho"
                            ? "bg-yellow-100 text-yellow-700"
                            : task.category === "Pessoal"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {task.category}
                      </span>
                    </div>

                    <h4
                      className={`text-lg font-semibold mb-3 ${
                        task.completed
                          ? "line-through text-yellow-700"
                          : "text-yellow-900"
                      }`}
                    >
                      {task.title}
                    </h4>

                    {task.description && (
                      <p className="text-sm text-yellow-800 mb-5 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    <p className="text-xs text-yellow-600 mb-5">
                      {new Date(task.createdAt).toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>

                    <div className="flex gap-3 pt-4 border-t border-yellow-200">
                      <button className="flex-1 px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-900 rounded-lg font-semibold transition-colors duration-200">
                        Editar
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold transition-colors duration-200"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-16 text-center border border-yellow-200">
                <div className="text-6xl mb-6">📝</div>
                <h3 className="text-xl font-semibold text-yellow-900 mb-3">
                  Nenhuma tarefa encontrada
                </h3>
                <p className="text-yellow-700">
                  Adicione uma nova tarefa ou ajuste os filtros acima
                </p>
              </div>
            )}
          </section>
        </main>

        {/* MODAL */}
        {showModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <div
              className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-extrabold text-yellow-900 mb-8">
                Criar Nova Tarefa
              </h2>

              <form onSubmit={handleAddTask} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-yellow-700 mb-3">
                    Título da Tarefa *
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    placeholder="Ex: Revisar relatório mensal"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-yellow-700 mb-3">
                    Descrição (opcional)
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Adicione mais detalhes sobre a tarefa..."
                    rows={4}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-yellow-700 mb-3">
                    Categoria
                  </label>
                  <select
                    value={newTask.category}
                    onChange={(e) =>
                      setNewTask({ ...newTask, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="Trabalho">💼 Trabalho</option>
                    <option value="Pessoal">🏠 Pessoal</option>
                    <option value="Estudos">📚 Estudos</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 bg-yellow-100 hover:bg-yellow-200 text-yellow-900 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors duration-200"
                  >
                    Criar Tarefa
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
