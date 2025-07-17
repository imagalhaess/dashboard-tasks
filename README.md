# Dashboard de Gestão de Tarefas

Uma aplicação simples para listar, filtrar e atualizar o status de tarefas, consumindo uma API GraphQL em TypeScript e estilizada com Tailwind CSS.

> **MVP 20/80:**
>
> 1. Listagem das 10 tarefas mais recentes
> 2. Filtro por categoria
> 3. Botão de Concluir/Reabrir (toggle de status)
> 4. Feedback instantâneo na UI (sem reload)
> 5. Deploy automático em Vercel
> 6. README com instruções básicas

---

## Tecnologias

* **Frontend:** Next.js (App Router) + TypeScript
* **Estilização:** Tailwind CSS
* **API:** GraphQL em TypeScript (mock em memória)
* **Testes:** Jest + React Testing Library
* **Deploy:** Vercel (preview deploys em cada PR, produção na `main`)
* **Ferramentas auxiliares:** Node.js, Git

---

## Como rodar localmente

### Pré-requisitos

* Node.js (versão LTS recomendada)
* Git

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/dashboard-tasks.git
cd dashboard-tasks

# 2. Crie e acesse a branch da POC
git checkout -b poc-inicial

# 3. Instale dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## Testes

Para executar os testes de unidade e integração:

```bash
npm test
```

* **TaskList.test.tsx**: verifica renderização e filtro
* **TaskCard.test.tsx**: verifica ação de status

---

## Deploy

O deploy está configurado via Vercel:

1. Conecte seu repositório ao Vercel.
2. Configure variáveis de ambiente (nenhuma obrigatória para o mock).
3. Cada PR gera um *Preview Deploy*; merges na `main` rodam o *Production Deploy*.

---

## Estrutura de Pastas

```
dashboard-tasks/
├── app/
│   ├── api/
│   │   └── graphql/
│   │       ├── route.ts       # API GraphQL
│   │       └── schema.graphql # SDL do schema
│   ├── components/
│   │   ├── TaskCard.tsx
│   │   └── TaskList.tsx
│   └── page.tsx               # Página principal de listagem
├── docs/
│   └── modelagem.md           # Diagrama conceitual de entidades
├── public/
├── styles/
│   └── globals.css            # Import de Tailwind
├── jest.config.js
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## Kanban & Processo de Trabalho

Usei um **GitHub Project** com colunas:

* **Backlog**: cards da POC inicial
* **In Progress**: tarefas em desenvolvimento
* **Done**: concluídas

Cards principais da POC:

* Setup inicial
* Schema & Mock
* API Route GraphQL
* Client: fetchTasks & Listagem
* Filtro por categoria
* Ações Concluir/Reabrir

---

## Contribuindo

1. Fork este repositório
2. Crie uma branch `feature/xx`
3. Faça commits pequenos e descritivos (`feat: listagem básica`)
4. Abra um Pull Request para `main`
5. Espere revisão e aprovação

---

## 📜 Licença

MIT © Isabela M.
