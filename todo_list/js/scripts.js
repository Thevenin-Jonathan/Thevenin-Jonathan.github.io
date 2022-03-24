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
    todoElement.classList.add("todo", `todo-${index}`);
    todoElement.innerHTML = `
        <div class="todo__header">
            <h2 class="todo__header-title">${todo.title}</h2>
            <span class="todo__header-edit icon-header icon"></span>
            <span class="todo__header-close icon-header icon"></span>
        </div>
        <div class="todo__content">
            ${createHTMLTaskListElement(todo)}
        </div>
    `;
    return todoElement;
}

const createHTMLTaskListElement = (todo) => {
    const tasksListElement = document.createElement("ul");
    tasksListElement.classList.add("tasks-list");
    const taskElements = todo.tasks.map((task, index) => {
        return createTaskElement(task, index);
    });    
    const addTaskButtonElement = createAddTaskButton();
    tasksListElement.append(...taskElements, addTaskButtonElement);
    return tasksListElement.outerHTML;
}

const createTaskElement = (task, index) => {
    const taskElement = document.createElement("li");
    taskElement.classList.add("task", `task-${index}`);
    taskElement.innerHTML = `
    <span class="${task.done ? "task__checkbox--done" : "task__checkbox"} icon-task icon"></span>
    <span class="task__separator icon-separator icon"></span>
    <p class="task__name">${task.text}</p>
    <span class="task__separator icon-separator icon"></span>
    <span class="task__up icon-task icon"></span>
    <span class="task__down icon-task icon"></span>
    <span class="task__edit icon-task icon"></span>
    <span class="task__close icon-task icon"></span>
    `;
    return taskElement;
}

const createAddTaskButton = () => {
    const addTaskButtonElement = document.createElement("li");
    addTaskButtonElement.classList.add("task-add");
    addTaskButtonElement.innerHTML = `<button class="task-add__button">Add task</button>`;
    return addTaskButtonElement;
}

displayTodos();