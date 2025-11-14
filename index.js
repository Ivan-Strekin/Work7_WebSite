 let tasks = [];
const button = document.querySelector('#Add_Button');
const title = document.querySelector('#title');
const priority = document.querySelector('#priority');
const filterSelect = document.querySelector('#filter');

const done_block = document.querySelector('#Done_block');
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
        if (titles[i][2]==="1"){
        taskHTML.innerHTML = `
      <div class="Text"><p>${titles[i][0]}</p>
      <span class="sub-task-icon priority-badge" style="background: #e18a00"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up icon-14"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg></span>
       
      </div>
      <button class="Check_btn" name="Check_Yes_btn">
        <img src="img/png-transparent-check-mark-fotolia-green-leaf-text-grass-line-area.png" class="check_mark">
      </button>
      <button class="Check_btn" name="Check_No_btn">
        <img src="img/Flag_of_the_Kingdom_of_Kongo_according_to_Giovanni_Cavazzi_da_Montecuccolo.svg.png" class="check_mark">
      </button>
    `;}
        else{
            taskHTML.innerHTML = `
      <div class="Text"><p>${titles[i][0]}</p>
      </div>
      <button class="Check_btn" name="Check_Yes_btn">
        <img src="img/png-transparent-check-mark-fotolia-green-leaf-text-grass-line-area.png" class="check_mark">
      </button>
      <button class="Check_btn" name="Check_No_btn">
        <img src="img/Flag_of_the_Kingdom_of_Kongo_according_to_Giovanni_Cavazzi_da_Montecuccolo.svg.png" class="check_mark">
      </button>
    `;}


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
    let not_done_tasks = tasks.filter(t => t[1] === 0);
    let in_process_tasks = tasks.filter(t => t[1] === 1);
    let done_tasks = tasks.filter(t => t[1] === 2);

    UpdateContainer(notdone_block, not_done_tasks);
    UpdateContainer(process_block, in_process_tasks);
    UpdateContainer(done_block, done_tasks);

    // Фильтр блок
    const filterValue = filterSelect.value;
    let filtered = [];
    if (filterValue === "all") {
        filtered = tasks;


    }
    if (filterValue === "done")
    {
        filtered = done_tasks;
        UpdateContainer(done_block, filtered);
        clearTaskContainer(process_block);
        clearTaskContainer(notdone_block);
    }
    if (filterValue === "not_done") {
        filtered = not_done_tasks;
        UpdateContainer(notdone_block, filtered);
        clearTaskContainer(process_block);
        clearTaskContainer(done_block);


    }
    if (filterValue === "in_process"){
        filtered = in_process_tasks;
        UpdateContainer(process_block, filtered);
        clearTaskContainer(done_block);
        clearTaskContainer(notdone_block);

    }
    if (filterValue === "Priority1"){
            filtered = tasks.filter(t => t[2] === "1");
    }
    if (filterValue === "Priority2"){
            filtered = tasks.filter(t => t[2] === "2");
    }
    if (filterValue === "Priority1" || filterValue === "Priority2") {
        not_done_tasks = filtered.filter(t => t[1] === 0);
        in_process_tasks = filtered.filter(t => t[1] === 1);
        done_tasks = filtered.filter(t => t[1] === 2);
        UpdateContainer(done_block, done_tasks);
        UpdateContainer(notdone_block, not_done_tasks);
        UpdateContainer(process_block, in_process_tasks);
    }
}

// Добавление задачи
button.addEventListener("click", () => {
    const title_text = title.value.trim();
    let priority_text = priority.value.trim();
    if (priority_text===""){
        priority_text="3";
    }
    if (title_text !== "") {
        tasks.push([title_text, 0,priority_text]);
        title.value = "";
        RenderAll();
    }
});

// Фильтр
filterSelect.addEventListener("change", () => {
    RenderAll();
});

RenderAll();