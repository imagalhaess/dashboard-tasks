// Tipagem da entidade User
export interface User {
  firstName: string;
  lastName: string;
}

// Tipagem da entidade Task, refletindo o schema
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
  category: string;
  createdAt: string;
  user: User;
}

// Array em memória que simula o “banco de dados”
export const tasks: Task[] = [
  {
    id: "1",
    title: "Estudar GraphQL",
    description: "Ler documentação oficial e fazer exemplos práticos.",
    status: "pending",
    category: "Estudos",
    createdAt: new Date("2025-07-01T08:00:00Z").toISOString(),
    user: { firstName: "Ana", lastName: "Silva" },
  },
  {
    id: "2",
    title: "Reunião com o time",
    description: "Alinhar metas da próxima sprint.",
    status: "completed",
    category: "Trabalho",
    createdAt: new Date("2025-07-02T10:30:00Z").toISOString(),
    user: { firstName: "Carlos", lastName: "Pereira" },
  },
  {
    id: "3",
    title: "Jogo da Fúria",
    description: "Assitir a transmissão da partida de CS2 no Gaules.",
    status: "pending",
    category: "Pessoal",
    createdAt: new Date("2025-07-18T16:00:00Z").toISOString(),
    user: { firstName: "Isabela", lastName: "Mattos" },
  },
  {
    id: "4",
    title: "Estudar IA",
    description:
      "Aprofundar em machine learning e redes neurais com o curso da Alura.",
    status: "pending",
    category: "Estudos",
    createdAt: new Date("2025-07-20T14:00:00Z").toISOString(),
    user: { firstName: "Fernanda", lastName: "Lima" },
  },
  {
    id: "5",
    title: "Finalizar refatoração do módulo de autenticação",
    description: "Implementar os ajustes de performance sugeridos na review.",
    status: "completed",
    category: "Trabalho",
    createdAt: new Date("2025-07-15T09:00:00Z").toISOString(),
    user: { firstName: "Roberto", lastName: "Souza" },
  },
  {
    id: "6",
    title: "Passear com a Maitê (pinscher caramelo de 30cm)",
    description: "Dar uma volta no parque com a Maitê por 30 minutos.",
    status: "pending",
    category: "Pessoal",
    createdAt: new Date("2025-07-19T17:30:00Z").toISOString(),
    user: { firstName: "Mariana", lastName: "Costa" },
  },
  {
    id: "7",
    title: "Revisar relatório mensal",
    description: "Verificar dados e formatação antes de enviar para o líder.",
    status: "pending",
    category: "Trabalho",
    createdAt: new Date("2025-07-22T11:00:00Z").toISOString(),
    user: { firstName: "Pedro", lastName: "Alves" },
  },
  {
    id: "8",
    title: "Estudar conversação em inglês",
    description: "Participar da aula online com o professor particular.",
    status: "pending",
    category: "Estudos",
    createdAt: new Date("2025-07-21T19:00:00Z").toISOString(),
    user: { firstName: "Clara", lastName: "Santos" },
  },
  {
    id: "9",
    title: "Ligar para os pais",
    description: "Colocar o papo em dia e saber como estão as coisas.",
    status: "completed",
    category: "Pessoal",
    createdAt: new Date("2025-07-16T18:00:00Z").toISOString(),
    user: { firstName: "Gustavo", lastName: "Nunes" },
  },
  {
    id: "10",
    title: "Ver o final da novela",
    description: 'Assistir ao último capítulo de "Terra e Paixão".',
    status: "pending",
    category: "Lazer",
    createdAt: new Date("2025-07-23T21:00:00Z").toISOString(),
    user: { firstName: "Beatriz", lastName: "Gomes" },
  },
];
