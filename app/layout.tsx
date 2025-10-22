import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "TaskOrganizer - Gerenciador de Tarefas",
  description:
    "Organize suas tarefas de forma simples e eficiente. Interface profissional e responsiva.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
