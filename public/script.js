// Estado da aplicação
let tasks = [
    {
        id: '1',
        title: 'Revisar código do projeto',
        description: 'Fazer code review do PR #123',
        category: 'Trabalho',
        completed: false,
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        title: 'Comprar mantimentos',
        description: 'Lista: arroz, feijão, café',
        category: 'Pessoal',
        completed: false,
        createdAt: new Date().toISOString()
    },
    {
        id: '3',
        title: 'Estudar React',
        description: 'Terminar curso de hooks avançados',
        category: 'Estudos',
        completed: true,
        createdAt: new Date().toISOString()
    }
];

let currentStatusFilter = 'all';
let currentCategoryFilter = 'all';

// Renderizar tarefas
function renderTasks() {
    const container = document.getElementById('tasks-container');
    const emptyState = document.getElementById('empty-state');
    
    // Filtrar tarefas
    const filteredTasks = tasks.filter(task => {
        const statusMatch = 
            currentStatusFilter === 'all' ||
            (currentStatusFilter === 'active' && !task.completed) ||
            (currentStatusFilter === 'completed' && task.completed);
        
        const categoryMatch = 
            currentCategoryFilter === 'all' || 
            task.category === currentCategoryFilter;
        
        return statusMatch && categoryMatch;
    });

    // Atualizar contadores
    updateStats();
    document.getElementById('task-count').textContent = filteredTasks.length;

    // Mostrar empty state se não houver tarefas
    if (filteredTasks.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    container.style.display = 'grid';
    emptyState.style.display = 'none';

    // Renderizar cards
    container.innerHTML = filteredTasks.map(task => `
        <div class="task-card">
            <div class="task-header">
                <div class="task-checkbox ${task.completed ? 'completed' : ''}" 
                     onclick="toggleTask('${task.id}')">
                    ${task.completed ? '✓' : ''}
                </div>
                <span class="task-category category-${task.category.toLowerCase()}">
                    ${task.category}
                </span>
            </div>
            <h4 class="task-title ${task.completed ? 'completed' : ''}">
                ${task.title}
            </h4>
            ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
            <p class="task-date">
                ${new Date(task.createdAt).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}
            </p>
            <div class="task-actions">
                <button class="task-btn-edit">Editar</button>
                <button class="task-btn-delete" onclick="deleteTask('${task.id}')">Excluir</button>
            </div>
        </div>
    `).join('');
}

// Atualizar estatísticas
function updateStats() {
    const total = tasks.length;
    const pending = tasks.filter(t => !t.completed).length;
    const completed = tasks.filter(t => t.completed).length;

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-pending').textContent = pending;
    document.getElementById('stat-completed').textContent = completed;
    document.getElementById('pending-count').textContent = 
        `Você tem ${pending} ${pending === 1 ? 'tarefa pendente' : 'tarefas pendentes'} hoje`;
}

// Toggle tarefa
function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    renderTasks();
}

// Deletar tarefa
function deleteTask(id) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }
}

// Filtros
function setStatusFilter(status) {
    currentStatusFilter = status;
    
    // Atualizar botões
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === status);
    });
    
    renderTasks();
}

function setCategoryFilter(category) {
    currentCategoryFilter = category;
    
    // Atualizar botões
    document.querySelectorAll('[data-category]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
    
    renderTasks();
}

// Modal
function openModal() {
    document.getElementById('modal').classList.add('show');
}

function closeModal() {
    document.getElementById('modal').classList.remove('show');
    document.getElementById('task-form').reset();
}

// Fechar modal ao clicar fora
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal();
    }
});

// Adicionar tarefa
function handleSubmit(e) {
    e.preventDefault();
    
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const category = document.getElementById('task-category').value;
    
    const newTask = {
        id: Date.now().toString(),
        title,
        description,
        category,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.unshift(newTask);
    renderTasks();
    closeModal();
}

// Inicializar
renderTasks();

