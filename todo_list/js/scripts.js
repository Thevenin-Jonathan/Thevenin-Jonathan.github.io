const addTodoElement = document.querySelector(".header__add-container");
addTodoElement.addEventListener("click", () => {})

const todos = [
    {
        title: "todo 1",
        tasks: [
            {
                done: false,
                text: "une tache",
            },
            {
                done: false,
                text: "une tache",
            },
            {
                done: false,
                text: "une tache",
            }
        ],
    },
]

const displayTodos = () => {
    const todosNodes = todos.map((todo, index) => {
        return createTodoElement(todo, index);
    })
    const todosContainerElement = document.querySelector(".todos-container");
    todosContainerElement.append(...todosNodes);
}

const createTodoElement = (todo, index) => {
    const todoElement = document.createElement("div");
    todoElement.classList.add("todo");
    todoElement.innerHTML = `
        <div class="todo__header">
            <h2 class="todo__header-title">${todo.title}</h2>
            ${createHeaderEditElement(todo, index)}
            <button class="todo__header-btn-close btn"></button>
        </div>
        <div class="todo__content">
            ${createTaskListElement(todo)}
        </div>
    `;
    return todoElement;
}

const createTaskListElement = (todo) => {
    const tasksListElement = document.createElement("ul");
    tasksListElement.classList.add("tasks-list");
    const taskElements = todo.tasks.map((task, index) => {
        return createTaskElement(task, index);
    });    
    const addTaskButtonElement = createAddTaskButton();
    tasksListElement.append(...taskElements, addTaskButtonElement);
    return tasksListElement.outerHTML;
}

const createHeaderEditElement = (todo, index) => {
    // <span class="todo__header-btn-edit btn"></span>

}

const createTaskElement = (task, index) => {
    const taskElement = document.createElement("li");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
    <button class="${task.done ? "task__btn-checkbox--done" : "task__btn-checkbox"} btn"></button>
    <span class="task__separator icon-separator btn"></span>
    <p class="task__name">${task.text}</p>
    <span class="task__separator icon-separator btn"></span>
    <button class="task__btn-up btn"></button>
    <button class="task__btn-down btn"></button>
    <button class="task__btn-edit btn"></button>
    <button class="task__btn-close btn"></button>
    `;
    return taskElement;
}

const createAddTaskButton = () => {
    const addTaskButtonElement = document.createElement("li");
    addTaskButtonElement.classList.add("task-add");
    addTaskButtonElement.innerHTML = `<button class="task-add__btn">Add task</button>`;
    return addTaskButtonElement;
}

displayTodos();