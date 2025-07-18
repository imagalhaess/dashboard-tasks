"use client";
import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import TaskCard from "@/components/TaskCard";

export default function TaskList() {
  const [category, setCategory] = useState<string>("");
  const { tasks, loading, error, updateLocalTask } = useTasks(category);

  if (loading) return <p>Carregando tarefas...</p>;
  if (error) return <p className="text-red-500">Erro: {error}</p>;

  return (
    <div>
      {/* filtro */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value=" ">Todas</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Pessoal">Pessoal</option>
        <option value="Estudos">Estudos</option>
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusUpdate={updateLocalTask}
          />
        ))}
      </div>
    </div>
  );
}
