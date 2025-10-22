# 🚀 TaskFlow - Dashboard de Gestão de Tarefas

Uma aplicação web moderna e profissional para listar, filtrar e gerenciar tarefas com foco em produtividade, construída com Next.js, TypeScript e GraphQL.

[🌐 Acessar a Aplicação Publicada](https://dashboard-tasks-y8sz.vercel.app/)

---

## ✨ Destaques do Design

- **🎨 Design System Completo**: Paleta de cores cuidadosamente escolhida para promover foco e produtividade
- **🌙 Modo Escuro**: Toggle manual entre tema claro e escuro com persistência
- **📱 Totalmente Responsivo**: Funciona perfeitamente em mobile, tablet e desktop
- **⚡ Animações Suaves**: Feedback visual elegante sem distrações
- **♿ Acessível**: Seguindo boas práticas de acessibilidade web

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Design System](#design-system)
- [Como Rodar o Projeto Localmente](#como-rodar-o-projeto-localmente)
- [Como Rodar os Testes](#como-rodar-os-testes)
- [Abordagem Técnica](#abordagem-técnica)
- [Processo de Trabalho](#processo-de-trabalho)
- [Licença](#licença)

---

## Tecnologias Utilizadas

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **Estilização:** Tailwind CSS 4 com sistema de cores customizado
- **API:** GraphQL (com Apollo Server e dados mockados)
- **Testes:** Jest e React Testing Library
- **Deploy:** Vercel

---

## 🎨 Design System

### Filosofia de Design

O design foi criado especificamente para apps de **tarefas e foco**, usando psicologia das cores:

- **Cores Neutras** (cinza, branco): Base limpa que não distrai
- **Cores Quentes** (laranja, amarelo): Ação, motivação e prioridades
- **Cores Frias** (azul, verde): Calma, confiança e conclusão

### Características do Design

#### 🎯 Sistema de Cores Profissional

- Paleta neutra para fundos e textos
- Amarelo/Laranja para botões de ação e status pendentes
- Verde para tarefas concluídas
- Azul para elementos informativos

#### 🌗 Modo Claro e Escuro

- **Modo Claro**: Minimalista e focado (padrão)
- **Modo Escuro**: Profissional e reduz fadiga visual
- Transições suaves entre temas
- Preferência salva no navegador

#### 📊 Componentes Modernos

**Header com Identidade Visual**

- Logo com gradiente (laranja → amarelo)
- Nome do app: TaskFlow 🚀
- Toggle de tema no canto superior direito
- Header fixo com efeito de blur

**Cards de Tarefa**

- Badge de status visível (Pendente/Concluído)
- Badge colorido por categoria
- Informações com ícones SVG
- Hover effect (card levanta)
- Botão de ação com gradiente

**Painel de Filtros**

- Filtros por categoria com botões visuais + ícones
- Filtros por status (todas/pendentes/concluídas)
- Feedback visual claro do filtro ativo

**Dashboard de Estatísticas**

- Cards com total, pendentes e concluídas
- Cores diferentes para cada métrica
- Gradientes sutis de fundo

#### 📱 Responsividade Total

- Mobile First (1 coluna)
- Tablet (2 colunas)
- Desktop (3 colunas)
- Espaçamentos adaptáveis

#### ⚡ Animações e Feedback Visual

- Cards aparecem com delay escalonado
- Transições suaves em hovers
- Spinner de loading animado
- Estados visuais claros (hover, active, disabled)

### 📖 Documentação Completa

Para detalhes completos do design system, cores, componentes e boas práticas, consulte:

**[📄 Design System Completo](docs/DESIGN_SYSTEM.md)**

---

## Como Rodar o Projeto Localmente

### Pré-requisitos

- Node.js (versão LTS recomendada)
- Git

### Instruções

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/imagalhaess/dashboard-tasks.git
    ```

2.  **Navegue até a pasta do projeto:**

    ```bash
    cd dashboard-tasks
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Execute a aplicação em modo de desenvolvimento:**
    ```bash
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

[Acessar a Quadro Kanban do Projeto:](https://github.com/users/imagalhaess/projects/3)

---

## Licença

MIT © Isabela M.
