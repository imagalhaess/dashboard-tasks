# Dash de Gestão de Tarefas

Uma aplicação web simples para listar, filtrar e gerenciar tarefas, construída com Next.js, TypeScript e GraphQL como parte de um desafio técnico para a empresa Chave7.

---

## Acessar a Aplicação Publicada

[https://dashboard-tasks-y8sz.vercel.app/]

---

## Sumário

- Tecnologias Utilizadas
- Como Rodar o Projeto Localmente
- Como Rodar os Testes
- Abordagem Técnica
- Processo de Trabalho
- Licença

---

## Tecnologias Utilizadas

Frontend: Next.js (App Router), React, TypeScript
Estilização: Tailwind CSS
API: GraphQL (com Apollo Server e dados mockados)
Testes: Jest e React Testing Library
Deploy: Vercel

---

## Como Rodar o Projeto Localmente

### Pré-requisitos

- Node.js (versão LTS recomendada)
- Git

### Instruções

```bash
    git clone https://github.com/imagalhaess/dashboard-tasks.git
    cd dashboard-tasks
    npm install
    npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

---

## Como Rodar os Testes

Para executar os testes unitários que garantem o funcionamento dos componentes principais, utilize o comando:

```bash
    npm test
```

---

## Abordagem Técnica

A arquitetura foi construída com Next.js e o App Router para aproveitar os Server Components e a organização de rotas baseada em pastas. A comunicação com o backend foi feita via GraphQL, uma escolha que permite ao frontend requisitar exatamente os dados de que precisa, evitando over-fetching.

Para um detalhamento mais aprofundado das decisões técnicas e dos desafios encontrados durante o desenvolvimento, consulte o Registro de Decisões de Arquitetura em `docs/modelagem.md`.

---

## Processo de Trabalho

O desenvolvimento foi gerenciado utilizando um quadro Kanban no GitHub Projects para organizar as tarefas desde o backlog até a conclusão, seguindo um fluxo de trabalho ágil.

Acessar o Quadro Kanban do Projeto: https://github.com/users/imagalhaess/projects/3

---

## Licença

MIT © Isabela M.
