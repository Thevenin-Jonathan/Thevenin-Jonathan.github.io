const todoList = [];
const todoContainerElement = document.querySelector(".todos-container");

const addTodoElement = document.querySelector(".header__add-container");
addTodoElement.addEventListener("click", () => {
    createTodo();
    reDrawTodosList();
})

function createTodo() {
    const todo = {
        element: document.createElement("div"),
        number: todoList.length + 1,
        tasks: []
    }
    todo.element.classList.add("todo", `list-${todo.number}`);

    const topContainerElement = document.createElement("div");
    topContainerElement.classList.add("todo__top-container");
    const titleElement = document.createElement("h2");
    titleElement.classList.add("top-container__title");
    titleElement.innerText = `Liste ${todo.number}`;
    const iconCloseElement = document.createElement("div");
    iconCloseElement.classList.add("todo__icon", "todo__icon--close-list");
    const taskListElement = document.createElement("ul");
    taskListElement.classList.add("todo__task-list");

    topContainerElement.appendChild(titleElement);
    topContainerElement.appendChild(iconCloseElement);
    todo.element.appendChild(topContainerElement);
    todo.element.appendChild(taskListElement);

    todoList.push(todo);
    insertTaskInTodo(todo.number, createTask());
}

function createTask() {
    const taskElement = document.createElement("li");
    taskElement.classList.add("list__task");
    const mainContainerElement = document.createElement("div");
    mainContainerElement.classList.add("task__main-container");
    const leftContainerElement = document.createElement("div");
    leftContainerElement.classList.add("task__left-container");
    const middleContainerElement = document.createElement("div");
    middleContainerElement.classList.add("task__middle-container");
    const rightContainerElement = document.createElement("div");
    rightContainerElement.classList.add("task__right-container");
    const iconUncheckElement = document.createElement("div");
    iconUncheckElement.classList.add("todo__icon", "todo__icon--uncheck");
    const contentElement = document.createElement("p");
    contentElement.classList.add("task__content");
    const iconUpElement = document.createElement("div");
    iconUpElement.classList.add("todo__icon", "todo__icon--up");
    const iconDownElement = document.createElement("div");
    iconDownElement.classList.add("todo__icon", "todo__icon--down");
    const iconEditElement = document.createElement("div");
    iconEditElement.classList.add("todo__icon", "todo__icon--edit");
    const iconcloseElement = document.createElement("div");
    iconcloseElement.classList.add("todo__icon", "todo__icon--close");
    const separatorElement = document.createElement("div");
    separatorElement.classList.add("task__separator");

    taskElement.appendChild(mainContainerElement);
    mainContainerElement.appendChild(leftContainerElement);
    mainContainerElement.appendChild(separatorElement);
    mainContainerElement.appendChild(middleContainerElement);
    mainContainerElement.appendChild(separatorElement);
    mainContainerElement.appendChild(rightContainerElement);
    leftContainerElement.appendChild(iconUncheckElement);
    middleContainerElement.appendChild(contentElement);
    rightContainerElement.appendChild(iconUpElement);
    rightContainerElement.appendChild(iconDownElement);
    rightContainerElement.appendChild(iconEditElement);
    rightContainerElement.appendChild(iconcloseElement);

    return taskElement;
}

function insertTaskInTodo(todoNb, task) {
    todoList[todoNb-1].tasks.push(task);
}

function deleteHTMLList() {
    todoContainerElement.innerHTML = "";
}

function drawTodosList() {
    for (const todo of todoList) {
        todoContainerElement.appendChild(todo.element);
        const taskListElement = document.querySelector(`.list-${todo.number} .todo__task-list`);
        for (const task of todo.tasks) {
            taskListElement.appendChild(task);
        }
    }
}

function reDrawTodosList() {
    deleteHTMLList();
    drawTodosList();
}