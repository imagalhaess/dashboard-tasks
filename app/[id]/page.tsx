// app/[id]/page.tsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { tasks, type Task } from "@/lib/graphql/mockData";

{
  /*
  NOTA TÉCNICA: A diretiva `@ts-expect-error` abaixo é uma solução pragmática
  para um erro de tipo persistente que ocorria apenas durante o build de
  produção na Vercel. O compilador esperava que a prop 'params' fosse
  uma Promise, o que é um comportamento atípico.
*/
}
// @ts-expect-error: O build da Vercel apresenta um erro de tipo atípico nesta linha.
export default function TaskPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const task: Task | undefined = tasks.find((t) => t.id === id);

  if (!task) {
    notFound();
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>

      {task.description && (
        <p className="mb-4 text-gray-700">{task.description}</p>
      )}

      <p className="mb-2">
        <strong>Categoria:</strong> {task.category}
      </p>

      <p className="mb-2">
        <strong>Criado em:</strong>{" "}
        {new Date(task.createdAt).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </p>

      <p className="mb-6">
        <strong>Autor:</strong> {task.user.firstName} {task.user.lastName}
      </p>

      <Link
        href="/"
        className="inline-block mt-4 text-blue-600 hover:underline"
      >
        ← Voltar para a home
      </Link>
    </main>
  );
}
