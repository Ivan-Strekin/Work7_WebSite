let tasks = [];
const button = document.querySelector('#Add_Button');
const title = document.querySelector('#title');
const filterSelect = document.querySelector('#filter');

const done_block = document.querySelector('#Done_block');
const filter_block = document.querySelector('#Filter_block');
const process_block = document.querySelector('#Process_block');
const notdone_block = document.querySelector('#not_done_block');

// Очистка блока
function clearTaskContainer(blockTasks) {
    blockTasks.innerHTML = '';
}

// Функция обновления блока
function UpdateContainer(block, titles) {
    clearTaskContainer(block);
    for (let i = 0; i < titles.length; i++) {
        const taskHTML = document.createElement("div");
        taskHTML.classList.add("Task");
        taskHTML.innerHTML = `
      <div class="Text"><p>${titles[i][0]}</p></div>
      <button class="Check_btn" name="Check_Yes_btn">
        <img src="img/png-transparent-check-mark-fotolia-green-leaf-text-grass-line-area.png" class="check_mark">
      </button>
      <button class="Check_btn" name="Check_No_btn">
        <img src="img/Flag_of_the_Kingdom_of_Kongo_according_to_Giovanni_Cavazzi_da_Montecuccolo.svg.png" class="check_mark">
      </button>
    `;

        // События на кнопки
        const yesBtn = taskHTML.querySelector('[name="Check_Yes_btn"]');
        const noBtn = taskHTML.querySelector('[name="Check_No_btn"]');

        yesBtn.addEventListener("click", () => {
            if (titles[i][1] < 2) titles[i][1]++;
            RenderAll();
        });

        noBtn.addEventListener("click", () => {
            if (titles[i][1] > 0) titles[i][1]--;
            RenderAll();
        });

        block.appendChild(taskHTML);
    }
}

// Главная функция отрисовки всех блоков
function RenderAll() {
    const not_done_tasks = tasks.filter(t => t[1] === 0);
    const in_process_tasks = tasks.filter(t => t[1] === 1);
    const done_tasks = tasks.filter(t => t[1] === 2);

    UpdateContainer(notdone_block, not_done_tasks);
    UpdateContainer(process_block, in_process_tasks);
    UpdateContainer(done_block, done_tasks);

    // Фильтр блок
    const filterValue = filterSelect.value;
    let filtered = [];
    if (filterValue === "all") filtered = tasks;
    if (filterValue === "done") filtered = done_tasks;
    if (filterValue === "not_done") filtered = not_done_tasks;
    if (filterValue === "in_process") filtered = in_process_tasks;
    UpdateContainer(filter_block, filtered);
}

// Добавление задачи
button.addEventListener("click", () => {
    const title_text = title.value.trim();
    if (title_text !== "") {
        tasks.push([title_text, 0]);
        title.value = "";
        RenderAll();
    }
});

// Фильтр
filterSelect.addEventListener("change", () => {
    RenderAll();
});

RenderAll();