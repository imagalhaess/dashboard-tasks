import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "TaskFlow - Gerenciador de Tarefas Moderno",
  description:
    "Organize suas tarefas com estilo. Interface moderna, limpa e produtiva.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-orange-50 text-yellow-900 font-sans">
        {children}
      </body>
    </html>
  );
}
