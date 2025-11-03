let tasks = [];
const button = document.querySelector('#Add_Button');
const title = document.querySelector('#title');
const filterSelect = document.querySelector('#filter');

function clearTaskContainers() {
    const blocks_tasks = document.querySelectorAll('.Tasks_block');
    blocks_tasks.forEach(block => {
        if (block) {
            block.innerHTML = '';
        }
    });
}

function renderTasks() {
    const notDoneContainer = document.querySelector('.not_done_tasks');
    const inProcessContainer = document.querySelector('.in_process_tasks');
    const doneContainer = document.querySelector('.done_tasks');
    clearTaskContainers(notDoneContainer, inProcessContainer, doneContainer);
}

button.addEventListener("click", () => {
    const title_text = title.value;
    if (title_text !== "") {
        tasks.push([title_text, 0]);
    }
    title.value = "";
    clearTaskContainers();
});





