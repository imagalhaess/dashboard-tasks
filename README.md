# TaskFlow - Gerenciador de Tarefas Moderno 🚀

## 🎨 Design

Interface moderna e profissional inspirada em apps como **Notion**, **Linear** e **Todoist**.

### Características do Design

- ✨ **Glassmorphism** - Efeitos de vidro e blur
- 🌈 **Gradientes Suaves** - Cores vibrantes mas elegantes
- 🎭 **Animações Fluidas** - Micro-interações suaves
- 📱 **Mobile-First** - Responsivo em todos dispositivos
- 🎯 **Alta Usabilidade** - Interface intuitiva e limpa

## 🛠️ Tecnologias

- **Next.js 15** - Framework React moderno
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utility-first
- **GraphQL** - API de dados (mock)
- **Jest** - Testes

## 🚀 Como Rodar

### Desenvolvimento

```bash
npm install
npm run dev
```

Acesse http://localhost:3000

### Produção

```bash
npm run build
npm start
```

### Deploy

O projeto está configurado para deploy automático no **Vercel**.

## 📦 Estrutura

```
├── app/              # Páginas Next.js
├── components/       # Componentes React
├── hooks/            # Custom hooks
├── lib/              # Utilitários e GraphQL
└── styles/           # Estilos globais
```

## ✨ Funcionalidades

### Gestão de Tarefas

- ✅ Criar, editar e excluir tarefas
- ✅ Marcar como concluída
- ✅ Busca em tempo real
- ✅ Filtros por status e categoria

### Categorias

- 💼 **Trabalho** - Cor azul
- 🏠 **Pessoal** - Cor roxa
- 📚 **Estudos** - Cor índigo

### Estatísticas

- 📊 Total de tarefas
- ⏳ Tarefas pendentes
- ✅ Tarefas concluídas

## 🎨 Paleta de Cores

| Elemento    | Cor                     |
| ----------- | ----------------------- |
| Primário    | Blue 500 → Indigo 600   |
| Trabalho    | Blue 500 → Cyan 600     |
| Pessoal     | Purple 500 → Pink 600   |
| Estudos     | Indigo 500 → Purple 600 |
| Pendente    | Amber 500 → Orange 600  |
| Concluído   | Emerald 500 → Green 600 |

## 🔄 Estado da Aplicação

Os dados são gerenciados através de:

- **Custom Hooks** - useTasks, useToggleStatus
- **GraphQL Client** - Consultas e mutações
- **Mock Data** - Dados de exemplo para desenvolvimento

## 📝 Boas Práticas

✅ **Clean Code** - Nomes descritivos, funções pequenas
✅ **TypeScript** - Tipagem estrita
✅ **Componentização** - Componentes reutilizáveis
✅ **Comentários** - Documentação didática
✅ **Responsividade** - Mobile-first design
✅ **Acessibilidade** - ARIA labels, contraste

## 🎯 Performance

- ⚡ Build otimizado com Next.js
- 🎨 CSS-in-JS com Tailwind (purge automático)
- 📦 Code splitting automático
- 🖼️ Imagens otimizadas

## 📱 Navegadores Suportados

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 Licença

MIT - Projeto educacional

---

**Desenvolvido com ❤️ usando Next.js e Tailwind CSS**
