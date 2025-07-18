import { useState, useEffect, useCallback } from "react";
import { fetchTasks } from "@/lib/graphql/client";
import type { Task } from "@/lib/graphql/mockData";

export function useTasks(category?: string) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // carrega de fato do servidor apenas na montagem/categoria
  useEffect(() => {
    setLoading(true);
    fetchTasks(category)
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category]);

  const updateLocalTask = useCallback((updated: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }, []);

  return { tasks, loading, error, updateLocalTask };
}
