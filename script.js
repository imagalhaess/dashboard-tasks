// ========================================
// ESTRUTURA DE DADOS E ESTADO DA APLICAÇÃO
// ========================================

/**
 * Array que armazena todas as tarefas
 * Cada tarefa é um objeto com: id, title, description, date, priority, category, completed
 */
let tasks = [];

/**
 * ID incremental para garantir que cada tarefa tenha um identificador único
 */
let taskIdCounter = 1;

/**
 * Filtros ativos: armazena qual visualização/filtro está sendo usado
 */
let currentView = "all";
let currentPriority = null;
let currentCategory = null;

/**
 * ID da tarefa sendo editada (null quando estamos criando uma nova)
 */
let editingTaskId = null;

// ========================================
// INICIALIZAÇÃO: Executa quando a página carrega
// ========================================

/**
 * DOMContentLoaded: Evento que dispara quando o HTML está completamente carregado
 * Aqui configuramos todos os event listeners e carregamos dados salvos
 */
document.addEventListener("DOMContentLoaded", function () {
  // Carregar tarefas salvas no localStorage (armazenamento local do navegador)
  loadTasksFromStorage();

  // Configurar todos os event listeners (cliques, submits, etc)
  initEventListeners();

  // Renderizar as tarefas na tela
  renderTasks();

  // Atualizar contadores da sidebar
  updateTaskCounts();
});

// ========================================
// EVENT LISTENERS: Configuração de todos os eventos
// ========================================

/**
 * Função que configura todos os event listeners da aplicação
 * Event Listener = "ouvinte de evento" - fica esperando o usuário fazer algo
 */
function initEventListeners() {
  // Botões de adicionar tarefa
  document
    .getElementById("addTaskBtn")
    .addEventListener("click", openTaskModal);
  document
    .getElementById("addTaskBtnEmpty")
    .addEventListener("click", openTaskModal);

  // Fechar modal
  document
    .getElementById("modalClose")
    .addEventListener("click", closeTaskModal);
  document
    .getElementById("modalOverlay")
    .addEventListener("click", closeTaskModal);
  document
    .getElementById("cancelBtn")
    .addEventListener("click", closeTaskModal);

  // Submissão do formulário
  document
    .getElementById("taskForm")
    .addEventListener("submit", handleTaskSubmit);

  // Menu hamburguer (mobile)
  document
    .getElementById("menuToggle")
    .addEventListener("click", toggleSidebar);

  // Campo de busca
  document
    .getElementById("searchInput")
    .addEventListener("input", handleSearch);

  // Ordenação
  document.getElementById("sortSelect").addEventListener("change", renderTasks);

  // Navegação na sidebar - usa event delegation
  // Event delegation = colocar um listener no elemento pai ao invés de em cada item
  document
    .querySelector(".sidebar-nav")
    .addEventListener("click", handleNavigation);
}

// ========================================
// FUNÇÕES DO MODAL (Formulário de tarefa)
// ========================================

/**
 * Abre o modal para criar ou editar uma tarefa
 * @param {number|null} taskId - ID da tarefa para editar, ou null para criar nova
 */
function openTaskModal(taskId = null) {
  const modal = document.getElementById("taskModal");
  const modalTitle = document.getElementById("modalTitle");
  const form = document.getElementById("taskForm");

  // Limpar o formulário
  form.reset();

  if (taskId && typeof taskId === "number") {
    // MODO EDIÇÃO: Preencher formulário com dados da tarefa existente
    editingTaskId = taskId;
    modalTitle.textContent = "Editar Tarefa";

    // Buscar a tarefa no array
    const task = tasks.find((t) => t.id === taskId);

    if (task) {
      // Preencher cada campo do formulário
      document.getElementById("taskTitle").value = task.title;
      document.getElementById("taskDescription").value = task.description || "";
      document.getElementById("taskDate").value = task.date;
      document.getElementById("taskPriority").value = task.priority;
      document.getElementById("taskCategory").value = task.category;
    }
  } else {
    // MODO CRIAÇÃO: Formulário vazio
    editingTaskId = null;
    modalTitle.textContent = "Nova Tarefa";

    // Definir data padrão como hoje
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("taskDate").value = today;
  }

  // Mostrar o modal adicionando a classe 'show'
  modal.classList.add("show");

  // Focar no campo de título para melhor UX
  setTimeout(() => {
    document.getElementById("taskTitle").focus();
  }, 100);
}

/**
 * Fecha o modal de tarefa
 */
function closeTaskModal() {
  const modal = document.getElementById("taskModal");
  modal.classList.remove("show");
  editingTaskId = null;
}

/**
 * Manipula a submissão do formulário (criar ou atualizar tarefa)
 * @param {Event} event - Evento de submit do formulário
 */
function handleTaskSubmit(event) {
  // Prevenir o comportamento padrão (que recarregaria a página)
  event.preventDefault();

  // Coletar os dados do formulário
  const taskData = {
    title: document.getElementById("taskTitle").value.trim(),
    description: document.getElementById("taskDescription").value.trim(),
    date: document.getElementById("taskDate").value,
    priority: document.getElementById("taskPriority").value,
    category: document.getElementById("taskCategory").value,
  };

  if (editingTaskId) {
    // ATUALIZAR tarefa existente
    updateTask(editingTaskId, taskData);
  } else {
    // CRIAR nova tarefa
    createTask(taskData);
  }

  // Fechar modal
  closeTaskModal();
}

// ========================================
// CRUD DE TAREFAS (Create, Read, Update, Delete)
// ========================================

/**
 * Cria uma nova tarefa
 * @param {Object} taskData - Dados da tarefa
 */
function createTask(taskData) {
  const newTask = {
    id: taskIdCounter++,
    ...taskData,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  // Adicionar ao array de tarefas
  tasks.push(newTask);

  // Salvar no localStorage
  saveTasksToStorage();

  // Atualizar a interface
  renderTasks();
  updateTaskCounts();

  // Feedback visual (opcional - pode adicionar uma notificação aqui)
  console.log("Tarefa criada:", newTask);
}

/**
 * Atualiza uma tarefa existente
 * @param {number} taskId - ID da tarefa
 * @param {Object} taskData - Novos dados da tarefa
 */
function updateTask(taskId, taskData) {
  const taskIndex = tasks.findIndex((t) => t.id === taskId);

  if (taskIndex !== -1) {
    // Atualizar mantendo id, completed e createdAt originais
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...taskData,
      updatedAt: new Date().toISOString(),
    };

    saveTasksToStorage();
    renderTasks();
    updateTaskCounts();

    console.log("Tarefa atualizada:", tasks[taskIndex]);
  }
}

/**
 * Exclui uma tarefa
 * @param {number} taskId - ID da tarefa a ser excluída
 */
function deleteTask(taskId) {
  // Confirmação antes de excluir
  if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
    tasks = tasks.filter((t) => t.id !== taskId);

    saveTasksToStorage();
    renderTasks();
    updateTaskCounts();

    console.log("Tarefa excluída:", taskId);
  }
}

/**
 * Alterna o status de conclusão de uma tarefa
 * @param {number} taskId - ID da tarefa
 */
function toggleTaskComplete(taskId) {
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date().toISOString() : null;

    saveTasksToStorage();
    renderTasks();
    updateTaskCounts();
  }
}

// ========================================
// RENDERIZAÇÃO: Atualiza a interface com base nos dados
// ========================================

/**
 * Renderiza todas as tarefas na tela conforme filtros ativos
 */
function renderTasks() {
  const container = document.getElementById("tasksContainer");
  const emptyState = document.getElementById("emptyState");

  // Filtrar tarefas
  let filteredTasks = getFilteredTasks();

  // Ordenar tarefas
  filteredTasks = sortTasks(filteredTasks);

  // Verificar se há tarefas para mostrar
  if (filteredTasks.length === 0) {
    container.innerHTML = "";
    emptyState.classList.add("show");
    return;
  }

  emptyState.classList.remove("show");

  // Gerar HTML para cada tarefa
  container.innerHTML = filteredTasks
    .map((task) => createTaskCardHTML(task))
    .join("");

  // Adicionar event listeners aos cards criados
  attachTaskCardListeners();
}

/**
 * Filtra tarefas com base nos filtros ativos
 * @returns {Array} Array de tarefas filtradas
 */
function getFilteredTasks() {
  let filtered = [...tasks];

  // Filtro de busca
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  if (searchTerm) {
    filtered = filtered.filter(
      (task) =>
        task.title.toLowerCase().includes(searchTerm) ||
        (task.description &&
          task.description.toLowerCase().includes(searchTerm))
    );
  }

  // Filtro de visualização
  if (currentView === "today") {
    const today = new Date().toISOString().split("T")[0];
    filtered = filtered.filter((task) => task.date === today);
  } else if (currentView === "week") {
    const today = new Date();
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    filtered = filtered.filter((task) => {
      const taskDate = new Date(task.date);
      return taskDate >= today && taskDate <= weekFromNow;
    });
  } else if (currentView === "completed") {
    filtered = filtered.filter((task) => task.completed);
  }

  // Filtro de prioridade
  if (currentPriority) {
    filtered = filtered.filter((task) => task.priority === currentPriority);
  }

  // Filtro de categoria
  if (currentCategory) {
    filtered = filtered.filter((task) => task.category === currentCategory);
  }

  return filtered;
}

/**
 * Ordena tarefas conforme critério selecionado
 * @param {Array} tasks - Array de tarefas a ordenar
 * @returns {Array} Array ordenado
 */
function sortTasks(tasks) {
  const sortBy = document.getElementById("sortSelect").value;

  const sorted = [...tasks];

  if (sortBy === "date") {
    sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
  } else if (sortBy === "priority") {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    sorted.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  } else if (sortBy === "name") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  return sorted;
}

/**
 * Gera o HTML de um card de tarefa
 * @param {Object} task - Objeto da tarefa
 * @returns {string} HTML do card
 */
function createTaskCardHTML(task) {
  const formattedDate = formatDate(task.date);
  const isOverdue = isTaskOverdue(task);

  return `
        <div class="task-card priority-${task.priority} ${
    task.completed ? "completed" : ""
  }" data-task-id="${task.id}">
            <div class="task-checkbox ${
              task.completed ? "checked" : ""
            }" data-task-id="${task.id}"></div>
            
            <div class="task-content">
                <div class="task-header">
                    <div>
                        <h3 class="task-title">${escapeHtml(task.title)}</h3>
                        ${
                          task.description
                            ? `<p class="task-description">${escapeHtml(
                                task.description
                              )}</p>`
                            : ""
                        }
                    </div>
                    
                    <div class="task-actions">
                        <button class="task-action-btn edit" data-task-id="${
                          task.id
                        }" title="Editar">
                            Editar
                        </button>
                        <button class="task-action-btn delete" data-task-id="${
                          task.id
                        }" title="Excluir">
                            Excluir
                        </button>
                    </div>
                </div>
                
                <div class="task-meta">
                    <span class="task-date ${isOverdue ? "overdue" : ""}">
                        ${formattedDate} ${isOverdue ? "(Atrasada)" : ""}
                    </span>
                    <span class="priority-badge-inline ${task.priority}">
                        ${getPriorityLabel(task.priority)}
                    </span>
                    <span class="task-category-label">
                        ${getCategoryLabel(task.category)}
                    </span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Adiciona event listeners aos elementos dos cards de tarefa
 */
function attachTaskCardListeners() {
  // Checkboxes
  document.querySelectorAll(".task-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      const taskId = parseInt(this.dataset.taskId);
      toggleTaskComplete(taskId);
    });
  });

  // Botões de editar
  document.querySelectorAll(".task-action-btn.edit").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const taskId = parseInt(this.dataset.taskId);
      openTaskModal(taskId);
    });
  });

  // Botões de excluir
  document.querySelectorAll(".task-action-btn.delete").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const taskId = parseInt(this.dataset.taskId);
      deleteTask(taskId);
    });
  });
}

// ========================================
// NAVEGAÇÃO E FILTROS
// ========================================

/**
 * Manipula cliques nos itens de navegação da sidebar
 * @param {Event} event - Evento de clique
 */
function handleNavigation(event) {
  // Encontrar o link clicado
  const navItem = event.target.closest(".nav-item");
  if (!navItem) return;

  event.preventDefault();

  // Remover classe 'active' de todos os itens
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Adicionar 'active' ao item clicado
  navItem.classList.add("active");

  // Resetar filtros
  currentView = "all";
  currentPriority = null;
  currentCategory = null;

  // Aplicar filtro baseado no que foi clicado
  if (navItem.dataset.view) {
    currentView = navItem.dataset.view;
  } else if (navItem.dataset.priority) {
    currentPriority = navItem.dataset.priority;
  } else if (navItem.dataset.category) {
    currentCategory = navItem.dataset.category;
  }

  // Atualizar título da seção
  updateContentTitle(navItem.textContent.trim());

  // Renderizar com novos filtros
  renderTasks();

  // Fechar sidebar em mobile
  if (window.innerWidth <= 768) {
    document.getElementById("sidebar").classList.remove("open");
  }
}

/**
 * Atualiza o título da seção de conteúdo
 * @param {string} title - Novo título
 */
function updateContentTitle(title) {
  const cleanTitle = title.replace(/\d+$/, "").trim();
  document.getElementById("contentTitle").textContent = cleanTitle;
}

/**
 * Manipula a busca de tarefas
 */
function handleSearch() {
  renderTasks();
}

/**
 * Toggle (abrir/fechar) da sidebar no mobile
 */
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

// ========================================
// CONTADORES: Atualiza os números ao lado de cada filtro
// ========================================

/**
 * Atualiza todos os contadores de tarefas na sidebar
 */
function updateTaskCounts() {
  const today = new Date().toISOString().split("T")[0];
  const weekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // Contadores de visualização
  document.getElementById("countAll").textContent = tasks.length;
  document.getElementById("countToday").textContent = tasks.filter(
    (t) => t.date === today
  ).length;
  document.getElementById("countWeek").textContent = tasks.filter((t) => {
    const taskDate = new Date(t.date);
    return taskDate >= new Date() && taskDate <= weekFromNow;
  }).length;
  document.getElementById("countCompleted").textContent = tasks.filter(
    (t) => t.completed
  ).length;

  // Contadores de prioridade
  document.getElementById("countHigh").textContent = tasks.filter(
    (t) => t.priority === "high"
  ).length;
  document.getElementById("countMedium").textContent = tasks.filter(
    (t) => t.priority === "medium"
  ).length;
  document.getElementById("countLow").textContent = tasks.filter(
    (t) => t.priority === "low"
  ).length;

  // Contadores de categoria
  document.getElementById("countWork").textContent = tasks.filter(
    (t) => t.category === "work"
  ).length;
  document.getElementById("countPersonal").textContent = tasks.filter(
    (t) => t.category === "personal"
  ).length;
  document.getElementById("countStudy").textContent = tasks.filter(
    (t) => t.category === "study"
  ).length;
}

// ========================================
// ARMAZENAMENTO LOCAL (LocalStorage)
// ========================================

/**
 * Salva as tarefas no localStorage do navegador
 * LocalStorage = armazenamento local que persiste mesmo após fechar o navegador
 */
function saveTasksToStorage() {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("taskIdCounter", taskIdCounter.toString());
  } catch (error) {
    console.error("Erro ao salvar tarefas:", error);
  }
}

/**
 * Carrega as tarefas salvas do localStorage
 */
function loadTasksFromStorage() {
  try {
    const savedTasks = localStorage.getItem("tasks");
    const savedCounter = localStorage.getItem("taskIdCounter");

    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
    }

    if (savedCounter) {
      taskIdCounter = parseInt(savedCounter);
    }
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
    tasks = [];
    taskIdCounter = 1;
  }
}

// ========================================
// FUNÇÕES UTILITÁRIAS (Helpers)
// ========================================

/**
 * Formata uma data para exibição amigável
 * @param {string} dateString - Data no formato YYYY-MM-DD
 * @returns {string} Data formatada
 */
function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskDate = new Date(date);
  taskDate.setHours(0, 0, 0, 0);

  // Calcular diferença em dias
  const diffTime = taskDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Amanhã";
  if (diffDays === -1) return "Ontem";
  if (diffDays > 1 && diffDays <= 7) return `Em ${diffDays} dias`;
  if (diffDays < -1) return `${Math.abs(diffDays)} dias atrás`;

  // Formato padrão para datas mais distantes
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Verifica se uma tarefa está atrasada
 * @param {Object} task - Objeto da tarefa
 * @returns {boolean} True se estiver atrasada
 */
function isTaskOverdue(task) {
  if (task.completed) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskDate = new Date(task.date + "T00:00:00");
  taskDate.setHours(0, 0, 0, 0);

  return taskDate < today;
}

/**
 * Retorna o rótulo em português da prioridade
 * @param {string} priority - Prioridade (low, medium, high)
 * @returns {string} Rótulo
 */
function getPriorityLabel(priority) {
  const labels = {
    high: "Alta",
    medium: "Média",
    low: "Baixa",
  };
  return labels[priority] || priority;
}

/**
 * Retorna o rótulo em português da categoria
 * @param {string} category - Categoria
 * @returns {string} Rótulo
 */
function getCategoryLabel(category) {
  const labels = {
    work: "Trabalho",
    personal: "Pessoal",
    study: "Estudos",
  };
  return labels[category] || category;
}

/**
 * Escapa HTML para prevenir XSS (Cross-Site Scripting)
 * @param {string} text - Texto a ser escapado
 * @returns {string} Texto seguro
 */
function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ========================================
// TAREFAS DE EXEMPLO (apenas para demonstração inicial)
// ========================================

/**
 * Adiciona algumas tarefas de exemplo se não houver nenhuma tarefa
 * Útil para demonstração e testes
 */
if (tasks.length === 0) {
  const exampleTasks = [
    {
      id: taskIdCounter++,
      title: "Revisar documentação do projeto",
      description:
        "Atualizar README com informações sobre o novo sistema de tarefas",
      date: new Date().toISOString().split("T")[0],
      priority: "high",
      category: "work",
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: taskIdCounter++,
      title: "Fazer compras no mercado",
      description: "Lista: leite, pão, frutas, legumes",
      date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      priority: "medium",
      category: "personal",
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: taskIdCounter++,
      title: "Estudar JavaScript avançado",
      description: "Focar em async/await e promises",
      date: new Date(Date.now() + 172800000).toISOString().split("T")[0],
      priority: "low",
      category: "study",
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ];

  tasks = exampleTasks;
  saveTasksToStorage();
}
