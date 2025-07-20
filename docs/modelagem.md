# Modelagem Arquitetural e Decisões de Projeto

Este documento detalha a arquitetura, o modelo de dados e as principais decisões técnicas tomadas durante o desenvolvimento do **Dash de Gestão de Tarefas**.

---

## 1. Visão Geral da Arquitetura

A aplicação segue uma arquitetura full-stack monolítica baseada em Next.js, com uma separação clara de responsabilidades:

- **Frontend (Camada de Apresentação)**

  - Construído com React e Next.js App Router.
  - Componentes de UI em `/components`.
  - Lógica de estado e busca de dados em Hooks customizados (`/hooks`).

- **Backend (Camada de API)**

  - API GraphQL implementada diretamente no Next.js via Route Handlers (`/app/api`).
  - Utiliza Apollo Server para processar queries e mutations.
  - Dados servidos a partir de mock estático em memória.

- **Camada de Dados**
  - Mock estático em `/lib/graphql/mockData.ts`, simulando fonte de dados real.

O fluxo de dados principal ocorre quando um componente do frontend, através de um Hook, usa o GraphQLClient para fazer requisição HTTP ao endpoint da API. O Route Handler invoca o resolver correspondente, acessa os dados mockados e retorna a resposta ao cliente.

---

## 2. Modelagem de Dados

As entidades principais do sistema foram modeladas para refletir uma aplicação de gerenciamento de tarefas simples.

| Entidade | Atributos Principais                               | Relacionamento          |
| :------- | :------------------------------------------------- | :---------------------- |
| **Task** | `id`, `title`, `description`, `status`, `category` | Pertence a 1 `User`     |
| **User** | `firstName`, `lastName`                            | Pode ter várias `Tasks` |

---

## 3. Contrato da API (Schema GraphQL)

O schema GraphQL é a fonte única da verdade para a comunicação entre o frontend e o backend. Ele define todas as operações de leitura (Query) e escrita (Mutation) disponíveis.

```graphql
# Define o tipo User, que agrupa primeiro e último nome
type User {
  firstName: String!
  lastName: String!
}

# Define o tipo Task, com todos os campos que a UI vai usar
type Task {
  id: ID!
  title: String!
  description: String
  status: String!
  category: String!
  createdAt: String!
  user: User!
}

type Query {
  # getTasks: retorna as tarefas com filtro opcional e limite de quantidade
  getTasks(category: String, take: Int): [Task!]!
}

type Mutation {
  # altera o status de uma tarefa pelo ID
  updateTaskStatus(id: ID!, status: String!): Task!
}
```

---

## 4. Registros de Decisões de Arquitetura (ADRs)

### ADR-001: Página de Detalhes Interna vs. Link Externo

- **Contexto**  
  O requisito inicial pedia um link para o domínio externo `https://taskmanager.com/task/{id}`.

- **Decisão**  
  Alteração para rota dinâmica interna (`/[id]`).

- **Justificativa**  
   O link externo direcionava para uma página de login, quebrando a experiência do usuário. A criação de uma página interna permitiu demonstrar a habilidade de construir rotas dinâmicas com Server Components no Next.js, entregando uma funcionalidade mais completa e relevante para o desafio.

---

### ADR-002: Resolução de Erros de Build na Vercel

- **Contexto**  
  O build de produção falhava na Vercel com erros de tipo que não ocorriam localmente.

- **Decisões**

  1. Refatoração da exportação da rota GraphQL para funções explícitas `GET(request)` / `POST(request)`, alinhando a assinatura de tipo com a expectativa do Next.js App Router.
  2. O componente da página de detalhes foi convertido de .tsx para .jsx para contornar um erro de tipo persistente e específico do ambiente de build.

- **Justificativa**  
  As decisões foram tomadas de forma pragmática para garantir a entrega funcional do projeto dentro do prazo fornecido.
- **Observação:** Com mais tempo, a abordagem ideal seria investigar a causa raiz, possivelmente atualizando as dependências do projeto, reverter o arquivo para .tsx e garantir 100% de segurança de tipos na aplicação.

---
