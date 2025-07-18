import { useState, useEffect } from "react";
import { fetchTasks } from "@/lib/graphql/client";
import type { Task } from "@/lib/graphql/mockData";

export function useTasks(category?: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchTasks(category)
      .then(setTasks)
      .catch((err) => setError(err.message || "Erro ao buscar tasks"))
      .finally(() => setLoading(false));
  }, [category]);

  return { tasks, loading, error };
}
