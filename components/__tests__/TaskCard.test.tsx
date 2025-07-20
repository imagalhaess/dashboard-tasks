import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "../TaskCard";
import { useToggleStatus } from "@/hooks/useToggleStatus";
import type { Task } from "@/lib/graphql/mockData";

// 1. Mock do Hook: Isola o componente da lógica da API.
jest.mock("@/hooks/useToggleStatus");

// 2. Mock de Dados: Cria uma tarefa padrão para usar nos testes.
const mockTask: Task = {
  id: "1",
  title: "Testar componente Card",
  description: "Uma descrição de teste",
  status: "pending",
  category: "Estudos",
  createdAt: new Date("2025-07-20T12:00:00Z").toISOString(),
  user: { firstName: "João", lastName: "Teste" },
};

// 3. Mock da função que seria passada pelo componente pai (TaskList)
const mockOnStatusUpdate = jest.fn();

describe("TaskCard", () => {
  // Reset dos mocks antes de cada teste para garantir que eles estejam limpos.
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar todos os detalhes da tarefa corretamente, incluindo o link", () => {
    // Define o retorno do hook mockado para este teste específico
    (useToggleStatus as jest.Mock).mockReturnValue({
      toggleStatus: jest.fn(),
      isLoading: false,
    });

    render(<TaskCard task={mockTask} onStatusUpdate={mockOnStatusUpdate} />);

    // Verifica o título como um link
    const link = screen.getByRole("link", { name: /Testar componente Card/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/1");
    expect(link).toHaveAttribute("target", "_blank");

    // Verifica os outros novos detalhes
    expect(screen.getByText("Estudos")).toBeInTheDocument(); // Categoria
    expect(screen.getByText("João Teste")).toBeInTheDocument(); // Nome completo do usuário
    expect(screen.getByText("20/07/2025")).toBeInTheDocument(); // Data de criação (formato dd/mm/yyyy)

    // Verifica o status e o botão
    expect(screen.getByText("pending")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Concluir" })
    ).toBeInTheDocument();
  });

  it('deve chamar toggleStatus e onStatusUpdate ao clicar em "Concluir"', async () => {
    const mockToggleStatus = jest
      .fn()
      .mockResolvedValue({ ...mockTask, status: "completed" });
    (useToggleStatus as jest.Mock).mockReturnValue({
      toggleStatus: mockToggleStatus,
      isLoading: false,
    });

    render(<TaskCard task={mockTask} onStatusUpdate={mockOnStatusUpdate} />);

    const completeButton = screen.getByRole("button", { name: "Concluir" });
    await fireEvent.click(completeButton);

    // Verifica se a função do hook foi chamada com os argumentos corretos
    expect(mockToggleStatus).toHaveBeenCalledTimes(1);
    expect(mockToggleStatus).toHaveBeenCalledWith("1", "pending");

    // Verifica se a função do pai (TaskList) foi chamada com a tarefa atualizada
    expect(mockOnStatusUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnStatusUpdate).toHaveBeenCalledWith({
      ...mockTask,
      status: "completed",
    });
  });

  it('deve renderizar o botão como "Reabrir" e chamar a função corretamente para uma tarefa completa', async () => {
    const completedTask = { ...mockTask, status: "completed" as const };
    const mockToggleStatus = jest
      .fn()
      .mockResolvedValue({ ...completedTask, status: "pending" });

    (useToggleStatus as jest.Mock).mockReturnValue({
      toggleStatus: mockToggleStatus,
      isLoading: false,
    });

    render(
      <TaskCard task={completedTask} onStatusUpdate={mockOnStatusUpdate} />
    );

    const reopenButton = screen.getByRole("button", { name: "Reabrir" });
    await fireEvent.click(reopenButton);

    expect(mockToggleStatus).toHaveBeenCalledWith("1", "completed");
    expect(mockOnStatusUpdate).toHaveBeenCalledWith({
      ...completedTask,
      status: "pending",
    });
  });

  it('deve desabilitar o botão e mostrar "Atualizando..." durante o carregamento', () => {
    (useToggleStatus as jest.Mock).mockReturnValue({
      toggleStatus: jest.fn(),
      isLoading: true, // Simulando o estado de loading
    });

    render(<TaskCard task={mockTask} onStatusUpdate={mockOnStatusUpdate} />);

    const button = screen.getByRole("button", { name: "Atualizando..." });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
