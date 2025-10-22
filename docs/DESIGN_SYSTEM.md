# 🎨 Design System - TaskFlow

Documentação do sistema de design implementado no dashboard de tarefas.

## 📋 Índice

1. [Filosofia de Design](#filosofia-de-design)
2. [Paleta de Cores](#paleta-de-cores)
3. [Componentes](#componentes)
4. [Responsividade](#responsividade)
5. [Modo Escuro](#modo-escuro)
6. [Boas Práticas](#boas-práticas)

---

## 🎯 Filosofia de Design

O design foi criado para promover **foco e produtividade**, usando:

- **Cores neutras** como base (branco, cinza) para não distrair
- **Cores quentes** (amarelo, laranja) para ações e prioridades
- **Cores frias** (azul, verde) para calma e conclusão
- **Animações suaves** para feedback visual sem distrações
- **Espaçamento generoso** para facilitar a leitura

---

## 🎨 Paleta de Cores

### Cores Neutras (Base)

Usadas para fundos, textos e bordas:

```css
neutral-50:  #fafafa  (branco quase puro)
neutral-100: #f5f5f5  (cinza muito claro)
neutral-200: #e5e5e5  (cinza claro)
neutral-300: #d4d4d4  (cinza médio-claro)
neutral-400: #a3a3a3  (cinza médio)
neutral-500: #737373  (cinza)
neutral-600: #525252  (cinza escuro)
neutral-700: #404040  (cinza muito escuro)
neutral-800: #262626  (quase preto)
neutral-900: #171717  (preto)
```

**Quando usar:**

- Fundo principal: `neutral-50` (claro) / `neutral-900` (escuro)
- Fundo secundário: `neutral-100` (claro) / `neutral-800` (escuro)
- Texto primário: `neutral-900` (claro) / `neutral-50` (escuro)
- Texto secundário: `neutral-600` (claro) / `neutral-400` (escuro)

### Cores Quentes (Ação e Energia)

Usadas para botões de ação, prioridades e alertas:

```css
warm-yellow: #f59e0b  (concentração)
warm-orange: #f97316  (ação/motivação)
warm-red:    #ef4444  (alertas)
```

**Quando usar:**

- Botões de ação principais (concluir tarefa)
- Status "Pendente"
- Elementos que exigem atenção
- Hovers em elementos interativos

### Cores Frias (Calma e Confiança)

Usadas para fundos, ícones e elementos de conclusão:

```css
cool-blue:  #3b82f6  (criatividade)
cool-green: #10b981  (conclusão)
cool-teal:  #14b8a6  (projetos)
```

**Quando usar:**

- Status "Concluído" (verde)
- Badges de categoria
- Elementos informativos
- Estados de sucesso

---

## 🧩 Componentes

### ThemeToggle

Botão para alternar entre modo claro e escuro.

**Características:**

- Ícone animado (sol ↔ lua)
- Salva preferência no localStorage
- Transição suave de 300ms
- Feedback visual com hover e sombra

**Como funciona:**

1. Adiciona/remove classe `dark` no elemento `<html>`
2. O Tailwind aplica os estilos `dark:` automaticamente
3. Preferência persiste entre sessões

### TaskCard

Card individual de tarefa com design moderno.

**Elementos visuais:**

- Badge de status (pendente/concluído) no canto superior
- Badge de categoria com cor específica
- Ícones SVG para informações (autor, data)
- Botão de ação com gradiente
- Hover effect (levanta o card)
- Animação de entrada (fade-in-up)

**Estados:**

- **Pendente**: borda laranja, botão com gradiente amarelo→laranja
- **Concluído**: borda verde, texto riscado, opacidade reduzida
- **Loading**: botão desabilitado com spinner animado

**Código de exemplo:**

```tsx
<TaskCard task={task} onStatusUpdate={updateLocalTask} />
```

### TaskList

Lista de tarefas com filtros e estatísticas.

**Características:**

- Painel de estatísticas no topo (total, pendentes, concluídas)
- Filtros visuais por categoria (botões com ícones)
- Filtros por status (todas, pendentes, concluídas)
- Grid responsivo (1 coluna → 2 → 3)
- Estados de loading e erro bem desenhados
- Mensagens contextuais quando não há tarefas

**Animações:**

- Cards aparecem com delay escalonado (50ms entre cada)
- Transições suaves nos filtros

---

## 📱 Responsividade

O design é **mobile-first** e se adapta a todos os tamanhos de tela:

### Breakpoints do Tailwind

```css
sm:  640px   (tablets pequenos)
md:  768px   (tablets)
lg:  1024px  (desktops)
xl:  1280px  (desktops grandes)
```

### Grid Responsivo

```tsx
// 1 coluna no mobile, 2 no tablet, 3 no desktop
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
```

### Espaçamento Responsivo

```tsx
// Padding cresce conforme a tela aumenta
className = "px-4 sm:px-6 lg:px-8";
```

### Texto Responsivo

```tsx
// Texto menor no mobile, maior no desktop
className = "text-xl sm:text-2xl";
```

### Elementos Ocultos

```tsx
// Esconde no mobile, mostra no desktop
className = "hidden sm:block";
```

---

## 🌙 Modo Escuro

### Como funciona

1. Adicionamos `darkMode: "class"` no `tailwind.config.js`
2. Usamos CSS variables para transições suaves (globals.css)
3. O componente ThemeToggle adiciona/remove classe `dark` no HTML
4. Aplicamos estilos com prefixo `dark:` no Tailwind

### Exemplo de uso

```tsx
<div
  className="
  bg-white dark:bg-neutral-800
  text-neutral-900 dark:text-neutral-50
  border-neutral-200 dark:border-neutral-700
"
>
  Conteúdo que muda de cor
</div>
```

### CSS Variables (globals.css)

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #171717;
}

.dark {
  --bg-primary: #171717;
  --text-primary: #fafafa;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease;
}
```

---

## ✨ Boas Práticas

### 1. Consistência de Cores

- **Laranja/Amarelo**: sempre para ações principais
- **Verde**: sempre para conclusão/sucesso
- **Azul**: sempre para informações
- **Vermelho**: sempre para alertas/erros

### 2. Hierarquia Visual

- Títulos: `font-bold` e tamanhos maiores
- Subtítulos: `font-semibold`
- Texto normal: sem peso especial
- Texto secundário: opacidade reduzida ou cor mais clara

### 3. Espaçamento

- Use múltiplos de 4 (4px, 8px, 16px, 24px, 32px)
- Mais espaço = mais importância
- Agrupe elementos relacionados

### 4. Feedback Visual

- **Hover**: sempre mude algo (cor, sombra, escala)
- **Loading**: sempre mostre um spinner
- **Desabilitado**: reduza opacidade e mude cursor
- **Ativo**: use escala ou sombra maior

### 5. Animações

- Sempre use `transition-all` ou `transition-colors`
- Duração: 200ms (rápido) a 300ms (suave)
- Use `ease-in-out` ou `ease-out` para naturalidade

### 6. Acessibilidade

- Use `aria-label` em botões sem texto
- Mantenha contraste adequado (texto vs fundo)
- Teste navegação por teclado

---

## 🚀 Como Estender

### Adicionar nova cor

1. Adicione no `tailwind.config.js`:

```js
colors: {
  custom: {
    purple: "#a855f7",
  }
}
```

2. Use com Tailwind:

```tsx
className = "bg-custom-purple text-white";
```

### Criar novo componente

1. Use as cores do design system
2. Adicione versões `dark:` de todas as cores
3. Inclua estados hover e loading
4. Adicione comentários explicativos
5. Teste em mobile e desktop

### Adicionar animação

1. Defina no `tailwind.config.js`:

```js
animation: {
  "bounce-slow": "bounce 3s infinite",
}
```

2. Use no componente:

```tsx
className = "animate-bounce-slow";
```

---

## 📚 Referências

- [Tailwind CSS Docs](https://tailwindcss.com)
- [Color Psychology](https://www.colorpsychology.org/)
- [Material Design](https://material.io/design)

---

**Feito com 💜 para aumentar sua produtividade!**
