# TaskOrganizer - Organizador Pessoal de Tarefas

## Visão Geral

Um organizador de tarefas profissional, responsivo e altamente user-friendly. Interface limpa com foco em produtividade e facilidade de uso.

## Características Principais

### Design e UX

- **Layout Responsivo**: Design mobile-first que se adapta perfeitamente a qualquer dispositivo
- **Paleta de Cores**: Tons neutros para concentração, com cores vibrantes para destaques
- **Hierarquia Visual Clara**: Elementos organizados de forma intuitiva
- **Feedback Visual**: Estados claros para todas as interações do usuário
- **Acessibilidade**: Contraste adequado e navegação por teclado

### Funcionalidades

1. **Gestão de Tarefas**

   - Criar, editar e excluir tarefas
   - Marcar tarefas como concluídas
   - Campos: título, descrição, data, prioridade, categoria

2. **Organização**

   - Prioridades: Alta, Média, Baixa (com cores distintas)
   - Categorias: Trabalho, Pessoal, Estudos (personalizáveis)
   - Indicador visual de tarefas atrasadas

3. **Visualizações**

   - Todas as tarefas
   - Tarefas de hoje
   - Tarefas da semana
   - Tarefas concluídas

4. **Filtros e Busca**

   - Busca rápida por título ou descrição
   - Filtro por prioridade
   - Filtro por categoria
   - Contadores dinâmicos em cada filtro

5. **Ordenação**
   - Por data de vencimento
   - Por prioridade
   - Por nome (ordem alfabética)

## Estrutura do Projeto

```
dashboard-tasks/
├── index.html      # Estrutura HTML da aplicação
├── styles.css      # Estilos CSS com design responsivo
├── script.js       # Lógica JavaScript
└── README.md       # Documentação
```

## Como Usar

### 1. Abrir a Aplicação

Simplesmente abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Safari, Edge).

### 2. Adicionar uma Tarefa

1. Clique no botão "+ Nova Tarefa" no topo da página
2. Preencha os campos obrigatórios:
   - Título da tarefa
   - Data de vencimento
   - Prioridade
   - Categoria
3. Opcionalmente adicione uma descrição
4. Clique em "Salvar Tarefa"

### 3. Gerenciar Tarefas

- **Concluir**: Clique no checkbox ao lado da tarefa
- **Editar**: Clique no botão "Editar" no card da tarefa
- **Excluir**: Clique no botão "Excluir" (pedirá confirmação)

### 4. Filtrar e Buscar

- Use a barra de busca no topo para procurar tarefas
- Clique nos itens da sidebar para filtrar por visualização, prioridade ou categoria
- Use o dropdown "Ordenar por" para mudar a ordem de exibição

### 5. Mobile

- No mobile, clique no ícone de menu (hamburguer) para abrir a sidebar
- Todos os recursos estão disponíveis em telas pequenas

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Variáveis CSS, Flexbox, Grid, Media Queries
- **JavaScript (ES6+)**: Lógica moderna e funcional
- **LocalStorage**: Persistência de dados no navegador

## Paleta de Cores

| Cor               | Hex     | Uso                            |
| ----------------- | ------- | ------------------------------ |
| Verde (Principal) | #10b981 | Ações principais, estado ativo |
| Vermelho          | #ef4444 | Prioridade alta, exclusões     |
| Laranja           | #f59e0b | Prioridade média               |
| Azul              | #3b82f6 | Prioridade baixa               |
| Cinza Claro       | #f5f7fa | Fundo da página                |
| Branco            | #ffffff | Cards e elementos principais   |
| Cinza Escuro      | #1f2937 | Texto principal                |

## Breakpoints Responsivos

- **Mobile**: até 480px (menu compacto, layout vertical)
- **Tablet**: 481px a 768px (sidebar recolhível)
- **Desktop**: 769px a 1024px (layout completo)
- **Desktop Grande**: acima de 1024px (largura máxima do conteúdo)

## Armazenamento de Dados

As tarefas são salvas automaticamente no **localStorage** do navegador. Isso significa:

- ✅ Dados persistem mesmo após fechar o navegador
- ✅ Não precisa de servidor ou banco de dados
- ✅ Totalmente offline
- ⚠️ Dados são locais a cada dispositivo/navegador
- ⚠️ Limpar cache do navegador apaga as tarefas

## Boas Práticas Implementadas

### UX (Experiência do Usuário)

- Feedback visual imediato em todas as ações
- Confirmação antes de excluir tarefas
- Estados hover/focus claros em botões e links
- Loading states e animações suaves
- Foco automático em campos de formulário
- Mensagens de estado vazio amigáveis

### Design

- Mobile-first: desenvolvido primeiro para mobile, depois desktop
- Espaçamento consistente usando variáveis CSS
- Tipografia legível em todas as resoluções
- Cores com propósito semântico
- Contraste adequado para acessibilidade (WCAG)

### Código

- Comentários didáticos explicando cada seção
- Nomes de variáveis e funções descritivos
- Funções pequenas com responsabilidade única (SRP)
- Separação clara entre dados, lógica e apresentação
- Prevenção de XSS com escape de HTML
- Event delegation para melhor performance

## Possíveis Melhorias Futuras

- Adicionar modo escuro (dark mode)
- Permitir criar categorias personalizadas
- Adicionar subtarefas
- Implementar notificações de prazos
- Sincronização com a nuvem
- Exportar/importar tarefas (JSON, CSV)
- Arrastar e soltar para reordenar
- Estatísticas e gráficos de produtividade
- Recorrência de tarefas (diária, semanal, mensal)

## Navegadores Suportados

- Chrome/Edge (versão 90+)
- Firefox (versão 88+)
- Safari (versão 14+)
- Opera (versão 76+)

## Licença

Este projeto é de código aberto e pode ser usado livremente para fins educacionais e comerciais.

## Contato

Para dúvidas ou sugestões sobre o projeto, consulte a documentação ou analise o código-fonte comentado.

---

**Desenvolvido com foco em simplicidade, usabilidade e boas práticas de desenvolvimento web.**
