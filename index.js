
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const button = document.querySelector('#Add_Button');
const deleteAllButton = document.querySelector('#DeleteAll_Button');
const title = document.querySelector('#title');
const priority = document.querySelector('#priority');
const filterSelect = document.querySelector('#filter');

const done_block = document.querySelector('#Done_block');
const process_block = document.querySelector('#Process_block');
const notdone_block = document.querySelector('#not_done_block');


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function clearTaskContainer(blockTasks) {
    blockTasks.innerHTML = '';
}


function UpdateContainer(block, titles) {
    clearTaskContainer(block);

    titles.forEach(t => {
        const taskHTML = document.createElement("div");
        taskHTML.classList.add("Task");
        taskHTML.draggable = true;
        taskHTML.dataset.index = tasks.indexOf(t);

        taskHTML.innerHTML = `
      <div class="Text">
        <p>${t[0]}</p>
        ${t[2] === "1" ? '<span class="priority-badge" style="color:#e18a00;">⬆</span>' : ''}
      </div>
      <button class="icon-btn left-btn" title="Move Left">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="icon-btn right-btn" title="Move Right">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <button class="icon-btn delete-btn" title="Delete Task">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;

        const leftBtn = taskHTML.querySelector('.left-btn');
        const rightBtn = taskHTML.querySelector('.right-btn');
        const deleteBtn = taskHTML.querySelector('.delete-btn');

        leftBtn.addEventListener("click", () => {
            if (t[1] > 0) t[1]--;
            RenderAll();
        });

        rightBtn.addEventListener("click", () => {
            if (t[1] < 2) t[1]++;
            RenderAll();
        });

        deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter(task => task !== t);
            RenderAll();
        });

        // --- Drag & Drop события ---
        taskHTML.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", tasks.indexOf(t));
            taskHTML.classList.add("dragging");
        });

        taskHTML.addEventListener("dragend", () => {
            taskHTML.classList.remove("dragging");
        });

        block.appendChild(taskHTML);
    });
}

// --- Главная функция отрисовки ---
function RenderAll() {
    const filterValue = filterSelect.value;
    let filtered = [...tasks];

    if (filterValue === "done") filtered = tasks.filter(t => t[1] === 2);
    if (filterValue === "not_done") filtered = tasks.filter(t => t[1] === 0);
    if (filterValue === "in_process") filtered = tasks.filter(t => t[1] === 1);
    if (filterValue === "Priority1") filtered = tasks.filter(t => t[2] === "1");
    if (filterValue === "Priority2") filtered = tasks.filter(t => t[2] === "2");

    const not_done_tasks = filtered.filter(t => t[1] === 0);
    const in_process_tasks = filtered.filter(t => t[1] === 1);
    const done_tasks = filtered.filter(t => t[1] === 2);

    UpdateContainer(notdone_block, not_done_tasks);
    UpdateContainer(process_block, in_process_tasks);
    UpdateContainer(done_block, done_tasks);

    saveTasks();
}

// --- Drag & Drop  ---
[notdone_block, process_block, done_block].forEach(block => {
    const parent = block.parentElement;

    // Когда таскаем над блоком
    block.addEventListener("dragover", e => {
        e.preventDefault(); // разрешаем сброс
        e.currentTarget.classList.add("drag-over");
    });

    // Когда курсор уходит
    block.addEventListener("dragleave", e => {
        e.currentTarget.classList.remove("drag-over");
    });

    // Когда отпускаем задачу
    block.addEventListener("drop", e => {
        e.preventDefault();
        e.currentTarget.classList.remove("drag-over");

        const index = e.dataTransfer.getData("text/plain");
        const newStatus = parseInt(parent.dataset.status);

        if (index !== "" && tasks[index]) {
            tasks[index][1] = newStatus;
            RenderAll();
        }
    });
});

// --- Добавление задачи ---
button.addEventListener("click", () => {
    const title_text = title.value.trim();
    let priority_text = priority.value.trim();
    if (priority_text === "") priority_text = "2";
    if (title_text !== "") {
        tasks.push([title_text, 0, priority_text]);
        title.value = "";
        RenderAll();
    }
});


deleteAllButton.addEventListener("click", () => {
    tasks = [];
    RenderAll();
});


filterSelect.addEventListener("change", RenderAll);

RenderAll();
