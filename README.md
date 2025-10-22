# 📋 TaskFlow - Organizador de Tarefas

Interface web moderna e responsiva para gerenciamento de tarefas pessoais, construída com **Next.js 15**, **React 19**, **TypeScript** e **Shadcn/ui**.

---

## 🏗️ Arquitetura do Projeto

O projeto segue princípios de **Clean Architecture** e **Clean Code**:

```
dashboard-tasks/
├── app/                      # Next.js App Router
│   ├── api/                  # API Routes (GraphQL)
│   ├── layout.tsx            # Layout raiz
│   └── page.tsx              # Página principal
│
├── components/               # Componentes React
│   ├── ui/                   # Componentes Shadcn/ui (reutilizáveis)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── badge.tsx
│   ├── TaskCard.tsx          # Card de tarefa individual
│   └── TaskList.tsx          # Lista e filtros de tarefas
│
├── hooks/                    # Custom Hooks (lógica de negócio)
│   ├── useTasks.ts           # Hook para buscar tarefas
│   └── useToggleStatus.ts    # Hook para alternar status
│
├── lib/                      # Bibliotecas e utilitários
│   ├── graphql/              # Schema e mock data GraphQL
│   └── utils.ts              # Funções utilitárias (formatação, cores, etc)
│
└── styles/                   # Estilos globais
    └── globals.css           # CSS global com Tailwind
```

---

## ✨ Princípios Aplicados

### 1. **Single Responsibility Principle (SRP)**
- Cada componente tem **uma única responsabilidade**
- `TaskCard`: renderiza UMA tarefa
- `TaskList`: gerencia LISTA e filtros
- `page.tsx`: estrutura o LAYOUT

### 2. **Separation of Concerns**
- **UI** (`components/ui/`): componentes visuais reutilizáveis
- **Lógica** (`hooks/`): regras de negócio separadas da apresentação
- **Dados** (`lib/graphql/`): camada de dados isolada

### 3. **DRY (Don't Repeat Yourself)**
- Funções utilitárias em `lib/utils.ts`
- Componentes UI reutilizáveis (Shadcn)
- Hooks customizados para lógica compartilhada

### 4. **Clean Code**
- Nomes descritivos e claros
- Funções pequenas e focadas
- Comentários didáticos
- TypeScript para type safety

---

## 🎨 Tecnologias

- **Next.js 15**: Framework React com App Router
- **React 19**: Biblioteca de UI
- **TypeScript**: Type safety
- **Shadcn/ui**: Sistema de componentes
- **Tailwind CSS**: Estilização
- **GraphQL**: API de dados
- **Apollo Server**: Servidor GraphQL

---

## 🚀 Como Executar

### 1. Instalar dependências
```bash
npm install
```

### 2. Rodar em desenvolvimento
```bash
npm run dev
```

### 3. Acessar
```
http://localhost:3000
```

---

## 📦 Scripts Disponíveis

```bash
npm run dev        # Desenvolvimento
npm run build      # Build para produção
npm run start      # Iniciar produção
npm run lint       # Verificar código
npm run test       # Rodar testes
```

---

## 🎯 Funcionalidades

✅ Listar tarefas  
✅ Filtrar por status (pendente/concluída)  
✅ Filtrar por categoria  
✅ Marcar tarefa como concluída  
✅ Estatísticas em tempo real  
✅ Design responsivo (mobile-first)  
✅ Interface moderna e acessível  

---

## 📝 Próximos Passos

- [ ] Adicionar tarefas
- [ ] Editar tarefas
- [ ] Excluir tarefas
- [ ] Busca por texto
- [ ] Ordenação personalizada
- [ ] Dark mode
- [ ] Persistência de dados real

---

## 👤 Autor

Desenvolvido com 💜 para organizar suas tarefas de forma eficiente!
