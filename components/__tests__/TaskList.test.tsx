import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "../TaskList";
import { useTasks } from "@/hooks/useTasks";
import type { Task } from "@/lib/graphql/mockData";

// 1. Mock do Hook useTasks
jest.mock("@/hooks/useTasks");

// 2. Mock de Dados: Um array de tarefas com categorias diferentes para testar o filtro.
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Tarefa de Estudos",
    status: "pending",
    category: "Estudos",
    createdAt: new Date().toISOString(),
    user: { firstName: "Ana", lastName: "Silva" },
  },
  {
    id: "2",
    title: "Tarefa de Trabalho",
    status: "completed",
    category: "Trabalho",
    createdAt: new Date().toISOString(),
    user: { firstName: "Beto", lastName: "Souza" },
  },
];

// 3. Tipamos nosso mock para ter controle total sobre ele nos testes
const mockUseTasks = useTasks as jest.Mock;

describe("TaskList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar a lista de tarefas quando o carregamento terminar", () => {
    // Simulamos o retorno do hook com os dados
    mockUseTasks.mockReturnValue({
      tasks: mockTasks,
      loading: false,
      error: null,
      updateLocalTask: jest.fn(),
    });

    render(<TaskList />);

    // Verifica se os títulos das tarefas estão na tela
    expect(screen.getByText("Tarefa de Estudos")).toBeInTheDocument();
    expect(screen.getByText("Tarefa de Trabalho")).toBeInTheDocument();
    // Verifica se a UI de carregamento NÃO está na tela
    expect(screen.queryByText(/Carregando tarefas/i)).not.toBeInTheDocument();
  });

  it("deve mostrar a mensagem de carregamento enquanto busca os dados", () => {
    // Simulamos o estado de loading
    mockUseTasks.mockReturnValue({
      tasks: [],
      loading: true,
      error: null,
      updateLocalTask: jest.fn(),
    });

    render(<TaskList />);

    expect(screen.getByText(/Carregando tarefas/i)).toBeInTheDocument();
  });

  it("deve mostrar uma mensagem de erro se a busca falhar", () => {
    // Simulamos um erro
    mockUseTasks.mockReturnValue({
      tasks: [],
      loading: false,
      error: "Falha ao buscar dados",
      updateLocalTask: jest.fn(),
    });

    render(<TaskList />);

    expect(
      screen.getByText(/Erro: Falha ao buscar dados/i)
    ).toBeInTheDocument();
  });

  it("deve chamar o hook useTasks com a categoria correta ao selecionar um filtro", async () => {
    mockUseTasks.mockReturnValue({
      tasks: mockTasks,
      loading: false,
      error: null,
      updateLocalTask: jest.fn(),
    });

    render(<TaskList />);

    // Verificamos a chamada inicial do hook (sem categoria)
    expect(mockUseTasks).toHaveBeenCalledWith("");

    // Simulamos a interação do usuário com o select
    const select = screen.getByRole("combobox");
    await fireEvent.change(select, { target: { value: "Estudos" } });

    // Verificamos se o hook foi chamado NOVAMENTE, agora com a categoria selecionada.
    // Isso confirma que o componente reage à mudança de filtro.
    expect(mockUseTasks).toHaveBeenCalledWith("Estudos");
  });
});
