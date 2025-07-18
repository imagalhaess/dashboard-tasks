"use client";

import TaskList from "@/components/TaskList";

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      {/* Título da dashboard */}
      <h1 className="text-3xl font-bold mb-6">Dashboard de Tarefas</h1>
      {/* Componente que faz fetch e renderiza os cards */}
      <TaskList />
    </main>
  );
}
