# Dashboard de Gestão de Tarefas

Uma aplicação simples para listar, filtrar e atualizar o status de tarefas, consumindo uma API GraphQL em TypeScript e estilizada com Tailwind CSS.  

> **MVP 20/80:**  
> As 20% das funcionalidades que entregam 80% do valor:
> 1. Listagem das 10 tarefas mais recentes  
> 2. Filtro por categoria  
> 3. Botão de Concluir/Reabrir (toggle de status)  
> 4. Feedback instantâneo na UI (sem reload)  
> 5. Deploy automático em Vercel  
> 6. README com instruções básicas  

---

## Tecnologias

- **Frontend:** Next.js (App Router) + TypeScript  
- **Estilização:** Tailwind CSS  
- **API:** GraphQL em TypeScript (mock em memória)  
- **Testes:** Jest + React Testing Library  
- **Deploy:** Vercel (preview deploys em cada PR, produção na `main`)  
- **Ferramentas auxiliares:** Node.js, Git  

---

## Como rodar localmente

### Pré-requisitos

- Node.js (versão LTS recomendada)  
- Git  

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/dashboard-tasks.git
cd dashboard-tasks

# 2. Crie e acesse a branch da POC
git checkout -b poc-inicial

# 3. Instale dependências
npm install

# 4. Configure Tailwind (já pré-configurado)
#    - Verifique tailwind.config.js e imports em globals.css

# 5. Inicie o servidor de desenvolvimento
npm run dev
# Acesse http://localhost:3000
