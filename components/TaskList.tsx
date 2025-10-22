"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/useTasks";
import TaskCard from "@/components/TaskCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/**
 * TaskList Component
 * 
 * Responsabilidades:
 * - Gerenciar estado de filtros
 * - Buscar e filtrar tarefas
 * - Renderizar estatísticas e lista
 * 
 * Segue princípios:
 * - Single Responsibility
 * - Clean Code
 * - Componentização
 */
export default function TaskList() {
  const [category, setCategory] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "completed">("all");
  
  const { tasks, loading, error, updateLocalTask } = useTasks(category);

  // Aplicar filtros
  const filteredTasks = tasks.filter((task) => {
    if (statusFilter !== "all" && task.status !== statusFilter) return false;
    return true;
  });

  // Calcular estatísticas
  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  // Estado de loading
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Carregando tarefas...</p>
        </div>
      </div>
    );
  }

  // Estado de erro
  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive text-center">Erro: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Concluídas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {/* Filtros de Status */}
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              Todas
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("pending")}
            >
              Pendentes
            </Button>
            <Button
              variant={statusFilter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("completed")}
            >
              Concluídas
            </Button>

            <div className="w-px h-8 bg-border mx-2"></div>

            {/* Filtros de Categoria */}
            <Button
              variant={category === "" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory("")}
            >
              Todas Categorias
            </Button>
            <Button
              variant={category === "Trabalho" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory("Trabalho")}
            >
              💼 Trabalho
            </Button>
            <Button
              variant={category === "Pessoal" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory("Pessoal")}
            >
              🏠 Pessoal
            </Button>
            <Button
              variant={category === "Estudos" ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory("Estudos")}
            >
              📚 Estudos
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Tarefas */}
      {filteredTasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onStatusUpdate={updateLocalTask} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold mb-2">Nenhuma tarefa encontrada</h3>
            <p className="text-muted-foreground">
              Adicione uma nova tarefa ou ajuste os filtros
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
