// HTML elementlarni tanlab olish
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const searchInput = document.getElementById('searchInput');
const todoList = document.getElementById('todoList');
const filterBtns = document.querySelectorAll('.filter-btn');

// Vazifalarni saqlash uchun massiv
let tasks = [];
let currentFilter = 'all'; 
let searchQuery = '';

// Yangi vazifa qo'shish funksiyasi
addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text !== '') {
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = '';
        renderTasks();
    }
});

// Qidiruv ishlashi (Search)
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderTasks();
});

// Filter tugmalari ishlashi (All/Active/Done)
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Faol tugmaga stil berish
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        
        currentFilter = btn.getAttribute('data-filter');
        renderTasks();
    });
});

// Vazifani o'chirish
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Vazifani bajarilgan/bajarilmagan qilib belgilash
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
}

// Ekranga vazifalarni chizish funksiyasi (Asosiy mantiq shu yerda)
function renderTasks() {
    // 1. Qidiruv bo'yicha saralash
    let filteredTasks = tasks.filter(task => 
        task.text.toLowerCase().includes(searchQuery)
    );

    // 2. Holati bo'yicha (all/active/done) saralash
    if (currentFilter === 'active') {
        filteredTasks = filteredTasks.filter(task => !task.completed);
    } else if (currentFilter === 'done') {
        filteredTasks = filteredTasks.filter(task => task.completed);
    }

    // HTMLni tozalash
    todoList.innerHTML = '';

    // Saralangan natijalarni ekranga chiqarish
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                <span class="task-text">${task.text}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">O'chirish</button>
        `;
        todoList.appendChild(li);
    });
}