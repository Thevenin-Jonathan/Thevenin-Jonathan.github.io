const todoList = [];
const todoContainerElement = document.querySelector(".todos-container");

const addTodoElement = document.querySelector(".header__add-container");
addTodoElement.addEventListener("click", () => {
    updTodoClassAndNumber();
    createTodo();
    reDrawTodosList();
})

function createTodo() {
    const todo = {
        element: document.createElement("div"),
        number: todoList.length + 1,
        tasks: [],
        toDelete: false,
    }
    todo.element.classList.add("todo", `list-${todo.number}`);

    const topContainerElement = document.createElement("div");
    const inputTitleElement = document.createElement("input");
    const titleElement = document.createElement("h2");
    const iconCloseElement = document.createElement("div");
    const taskListElement = document.createElement("ul");

    topContainerElement.classList.add("todo__top-container");
    inputTitleElement.classList.add("top-container__input-title", "hidden");
    titleElement.classList.add("top-container__title");
    titleElement.innerText = `Title list`;
    iconCloseElement.classList.add("todo__icon", "todo__icon--close-list");
    taskListElement.classList.add("todo__task-list");

    
    inputTitleElement.addEventListener("focusout", () => {
        titleElement.innerText = inputTitleElement.value !== "" ? inputTitleElement.value : titleElement.textContent;
        titleElement.classList.toggle("hidden");
        inputTitleElement.classList.toggle("hidden");
    })
    document.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            titleElement.innerText = inputTitleElement.value !== "" ? inputTitleElement.value : titleElement.textContent;
            titleElement.classList.toggle("hidden");
            inputTitleElement.classList.toggle("hidden");
        }       
    })
    titleElement.addEventListener("click", () => {
        titleElement.classList.toggle("hidden");
        inputTitleElement.classList.toggle("hidden");
        inputTitleElement.focus();
        inputTitleElement.setSelectionRange(inputTitleElement.value.length, inputTitleElement.value.length);

    })
    iconCloseElement.addEventListener("click", (e) => {
        todo.toDelete = true;
        reDrawTodosList();
        e.stopPropagation();
    })

    topContainerElement.appendChild(inputTitleElement);
    topContainerElement.appendChild(titleElement);
    topContainerElement.appendChild(iconCloseElement);
    todo.element.appendChild(topContainerElement);
    todo.element.appendChild(taskListElement);

    todoList.push(todo);
    todo.tasks.push(createTask());
    todo.tasks.push(createTask());
    todo.tasks.push(createTask());
}

function createTask() {
    const task = {
        element: document.createElement("li"),
        toDelete: false
    }

    const mainContainerElement = document.createElement("div");
    const leftContainerElement = document.createElement("div");
    const middleContainerElement = document.createElement("div");
    const rightContainerElement = document.createElement("div");
    const iconUncheckElement = document.createElement("div");
    const contentElement = document.createElement("p");
    const iconUpElement = document.createElement("div");
    const iconDownElement = document.createElement("div");
    const iconEditElement = document.createElement("div");
    const iconCloseElement = document.createElement("div");
    const separatorElement = document.createElement("div");

    task.element.classList.add("task");
    mainContainerElement.classList.add("task__main-container");
    leftContainerElement.classList.add("task__left-container");
    middleContainerElement.classList.add("task__middle-container");
    rightContainerElement.classList.add("task__right-container");
    iconUncheckElement.classList.add("todo__icon", "todo__icon--uncheck");
    contentElement.classList.add("task__content");
    iconUpElement.classList.add("todo__icon", "todo__icon--up");
    iconDownElement.classList.add("todo__icon", "todo__icon--down");
    iconEditElement.classList.add("todo__icon", "todo__icon--edit");
    iconCloseElement.classList.add("todo__icon", "todo__icon--close");
    separatorElement.classList.add("task__separator");

    iconCloseElement.addEventListener("click", (e) => {
        task.toDelete = true;
        reDrawTodosList();
        e.stopPropagation();
    })

    task.element.appendChild(mainContainerElement);
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
    rightContainerElement.appendChild(iconCloseElement);

    return task;
}

function updTodoClassAndNumber() {
    todoList.forEach((todo, index) => {
        const newNumber = index + 1;
        todo.number = newNumber;
        todo.element.classList = "";
        todo.element.classList.add("todo", `list-${newNumber}`);
    });
}

function deleteMarkedOrDeleteTodo() {
    todoList.forEach((todo, index) => {
        if (todo.toDelete) {
            todoList.splice(index, 1);
            return;
        }
        todo.tasks.forEach((task, index) => {
            if (task.toDelete) {
                todo.tasks.splice(index, 1);
                const taskListElement = document.querySelector(`.list-${todo.number} .todo__task-list`);
                taskListElement.innerHTML = "";
            }
        })
        if (todo.tasks.length < 1) todoList.splice(index, 1);
    })
}

function deleteHTMLList() {
    todoContainerElement.innerHTML = "";
}

function drawTodosList() {
    for (const todo of todoList) {
        todoContainerElement.appendChild(todo.element);
        
        const taskListElement = document.querySelector(`.list-${todo.number} .todo__task-list`);
        for (const task of todo.tasks) {
            taskListElement.appendChild(task.element);
        }
    }
}

function reDrawTodosList() {
    deleteMarkedOrDeleteTodo();
    deleteHTMLList();
    drawTodosList();
}