# 📋 TaskFlow - Gerenciador de Tarefas

Aplicação web simples e funcional para gerenciar suas tarefas diárias.

**Tecnologias:** HTML5, CSS3 e JavaScript puro (Vanilla JS)

---

## 🎯 Funcionalidades

✅ Adicionar tarefas com título, descrição e categoria  
✅ Marcar tarefas como concluídas  
✅ Filtrar tarefas por status (todas, pendentes, concluídas)  
✅ Filtrar tarefas por categoria (trabalho, pessoal, estudos)  
✅ Excluir tarefas  
✅ Estatísticas em tempo real  
✅ Design responsivo (mobile e desktop)  
✅ Interface moderna e limpa  

---

## 📁 Estrutura do Projeto

```
dashboard-tasks/
│
├── public/                  # Arquivos da aplicação
│   ├── index.html          # Estrutura HTML
│   ├── styles.css          # Estilos CSS
│   └── script.js           # Lógica JavaScript
│
├── vercel.json             # Configuração Vercel
└── README.md               # Documentação
```

---

## 🚀 Como Usar

### **Online (Produção)**
Acesse: [https://dashboard-tasks.vercel.app](https://dashboard-tasks.vercel.app)

### **Local (Desenvolvimento)**

1. Clone o repositório:
```bash
git clone https://github.com/imagalhaess/dashboard-tasks.git
cd dashboard-tasks
```

2. Abra o arquivo diretamente no navegador:
```bash
# Abra: public/index.html
# Ou use um servidor local:
npx serve public
```

3. Acesse: `http://localhost:3000`

---

## 🎨 Características do Design

### **Interface Limpa**
- Fundo cinza claro (#f9fafb)
- Cards brancos com bordas suaves
- Espaçamento generoso entre elementos
- Hierarquia visual clara

### **Cores**
- **Primary:** Indigo (#4f46e5) - Botões principais
- **Laranja:** (#ea580c) - Tarefas pendentes
- **Verde:** (#16a34a) - Tarefas concluídas
- **Azul:** Categoria Trabalho
- **Roxo:** Categoria Pessoal
- **Índigo:** Categoria Estudos

### **Responsivo**
- Desktop: Grid de 3 colunas
- Tablet: Grid de 2 colunas
- Mobile: 1 coluna, stack vertical

---

## 💻 Arquivos Explicados

### **public/index.html**
Estrutura HTML da aplicação:
- Header com logo e botão "Nova Tarefa"
- Seção de boas-vindas
- Cards de estatísticas (total, pendentes, concluídas)
- Filtros por status e categoria
- Grid de tarefas
- Modal para adicionar tarefas

### **public/styles.css**
Estilos CSS organizados:
- Reset e base styles
- Header e navegação
- Botões e controles
- Cards de estatísticas
- Cards de tarefas
- Modal
- Estados hover e transições
- Media queries para responsividade

### **public/script.js**
Lógica JavaScript:
- Array de tarefas (estado)
- Funções de renderização
- Gerenciamento de filtros
- CRUD de tarefas (criar, ler, atualizar, deletar)
- Controle do modal
- Atualização de estatísticas

---

## 🔧 Como Funciona

### **Adicionar Tarefa**
1. Clique em "+ Nova Tarefa"
2. Preencha título (obrigatório)
3. Adicione descrição (opcional)
4. Selecione categoria
5. Clique em "Criar Tarefa"

### **Marcar como Concluída**
- Clique no checkbox (quadrado) no card da tarefa

### **Filtrar Tarefas**
- **Por Status:** Clique em "Todas", "Pendentes" ou "Concluídas"
- **Por Categoria:** Clique em "Todas", "Trabalho", "Pessoal" ou "Estudos"

### **Excluir Tarefa**
- Clique no botão "Excluir" no card da tarefa
- Confirme a exclusão

---

## 🌐 Deploy no Vercel

O projeto está configurado para deploy automático:

1. **Push para GitHub:**
```bash
git add .
git commit -m "Atualização"
git push origin main
```

2. **Vercel detecta e faz deploy automático**

3. **Acesse seu site em poucos minutos!**

---

## 📝 Próximas Melhorias

- [ ] Implementar funcionalidade de editar tarefas
- [ ] Adicionar data de vencimento
- [ ] Persistência em LocalStorage
- [ ] Drag and drop para reordenar
- [ ] Modo escuro (dark mode)
- [ ] Exportar tarefas (CSV/JSON)

---

## 👤 Autor

Desenvolvido com 💜 para organizar suas tarefas de forma simples e eficiente!

---

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente.
