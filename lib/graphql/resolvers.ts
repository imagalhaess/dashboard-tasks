import { tasks, Task } from "./mockData";

export const resolvers = {
  Query: {
    gestTasks: (_parent: any, args: { category?: string; take?: number }) => {
      // 1. Filtra as tarefas pela categoria, se fornecida
      let result = tasks;
      if (args.category) {
        result = result.filter((t) => t.category === args.category);
      }
      // 2. Ordena por createdAt (mais recente primeiro)
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      // 3. Limita a quantidade
      return args.take ? result.slice(0, args.take) : result;
    },
  },
  Mutation: {
    updateTaskStatus: (_parent: any, args: { id: string; status: string }) => {
      const idx = tasks.findIndex((t) => t.id === args.id);
      if (idx < 0) {
        throw new Error("Task not found");
      }
      tasks[idx].status = args.status as Task["status"];
      return tasks[idx];
    },
  },
};
