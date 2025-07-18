import { notFound } from "next/navigation"; // 1
import { tasks, type Task } from "@/lib/graphql/mockData"; // 2

interface TaskPageProps {
  params: { id: string };
}

export default async function TaskPage({ params }: TaskPageProps) {
  // Aguarda o objeto params
  const { id } = await params; // 3

  // Busca a tarefa no array mock
  const task: Task | undefined = tasks.find((t) => t.id === id);

  // Se não encontrar, exibe 404 do Next.js
  if (!task) {
    notFound();
  }

  // Renderiza detalhes
  return (
    <main className="p-8 max-w-2xl mx-auto">
      {/* Título em destaque */}
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>

      {/* Descrição opcional */}
      {task.description && (
        <p className="mb-4 text-gray-700">{task.description}</p>
      )}

      {/* Categoria */}
      <p className="mb-2">
        <strong>Categoria:</strong> {task.category}
      </p>

      {/* Data formatada dd/mm/aaaa */}
      <p className="mb-2">
        <strong>Criado em:</strong>{" "}
        {new Date(task.createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </p>

      {/* Autor */}
      <p className="mb-6">
        <strong>Autor:</strong> {task.user.firstName} {task.user.lastName}
      </p>

      {/* Link de retorno */}
      <a href="/" className="inline-block mt-4 text-blue-600 hover:underline">
        ← Voltar para a home
      </a>
    </main>
  );
}
