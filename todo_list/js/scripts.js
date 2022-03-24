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

const createTodo = () => {
    todos.push({
        title: `todo ${todos.length + 1}`,
        tasks: []
    });
}
const addTodoElement = document.querySelector(".header__add-btn");
addTodoElement.addEventListener("click", () => {
    createTodo();
    displayTodos();
});

const displayTodos = () => {
    const todosNodes = todos.map((todo, index) => {
        return createTodoElement(todo, index);
    })
    const todosContainerElement = document.querySelector(".todos-container");
    todosContainerElement.innerHTML = "";
    todosContainerElement.append(...todosNodes);
}

const createTodoElement = (todo, index) => {
    const todoElement = document.createElement("div");
    todoElement.classList.add("todo");
    const todoHeaderElement = document.createElement("div");
    todoHeaderElement.classList.add("todo__header");
    const todoContentElement = document.createElement("div");
    todoContentElement.classList.add("todo__content");
    const todoHeaderTitleElement = document.createElement("h2");
    todoHeaderTitleElement.classList.add("todo__header-title");
    todoHeaderTitleElement.innerText = todo.title;
    const headerEditBtnElement = createHeaderEditBtnElement(index);
    const headerCloseBtnElement = createHeaderCloseBtnElement(index);
    todoHeaderElement.append(todoHeaderTitleElement, headerEditBtnElement, headerCloseBtnElement);
    todoContentElement.append(createTaskListElement(todo, index));
    todoElement.append(todoHeaderElement, todoContentElement);
    return todoElement;
}

const createHeaderEditBtnElement = (index) => {
    const editBtnElement = document.createElement("button");
    editBtnElement.classList.add("todo__header-btn-edit", "btn");
    return editBtnElement;
}

const createHeaderCloseBtnElement = (index) => {
    const closeBtnElement = document.createElement("button");
    closeBtnElement.classList.add("todo__header-btn-close", "btn");
    closeBtnElement.addEventListener("click", () => {
        deleteTodo(index);
    })
    return closeBtnElement;
}

const createTaskListElement = (todo) => {
    const listElement = document.createElement("ul");
    listElement.classList.add("tasks-list");
    const taskElements = todo.tasks.map((task, index) => {
        return createTaskElement(task, index);
    });    
    const addBtnElement = createAddTaskButton();
    listElement.append(...taskElements, addBtnElement);
    return listElement;
}

const createAddTaskButton = () => {
    const addBtnElement = document.createElement("li");
    addBtnElement.classList.add("task-add");
    addBtnElement.innerHTML = `<button class="task-add__btn">Add task</button>`;
    return addBtnElement;
}

const deleteTodo = (index) => {
    todos.splice(index, 1);
    todos.forEach( (todo, index) => todo.title = `todo ${index + 1}`);
    displayTodos();
}

const createTaskElement = (task, index) => {
    const taskElement = document.createElement("li");
    taskElement.classList.add("task");
    const taskBtnCheckboxElement = createTaskBtnCheckboxElement(task);
    const taskNameElement = createTaskNameElement(task);
    const taskBtnUpElement = createTaskBtnUpElement();
    const taskBtnDownElement = createTaskBtnDownElement();
    const taskBtnEditElement = createTaskBtnEditElement();
    const taskBtnCloseElement = createTaskBtnCloseElement();
    taskElement.append(
        taskBtnCheckboxElement, taskNameElement, taskBtnUpElement,
        taskBtnDownElement, taskBtnEditElement, taskBtnCloseElement
    )
    return taskElement;
}

const createTaskBtnCheckboxElement = (task) => {
    const checkboxBtnElement = document.createElement("button");
    if (!task.done) {
        checkboxBtnElement.classList.add("task__btn-checkbox", "btn")
    } else {
        checkboxBtnElement.classList.add("task__btn-checkbox--done", "btn")
    }
    checkboxBtnElement.addEventListener("click", event => {
        task.done = !task.done;
        displayTodos();
    })
    return checkboxBtnElement;
}

const createTaskNameElement = (task) => {
    const taskNameElement = document.createElement("p");
    taskNameElement.classList.add("task__name", task.done ? "strike" : null);
    taskNameElement.textContent = task.text;
    return taskNameElement;
}

const createTaskBtnUpElement = () => {
    const upBtnElement = document.createElement("button");
    upBtnElement.classList.add("task__btn-up", "btn");
    return upBtnElement;    
}

const createTaskBtnDownElement = () => {
    const downBtnElement = document.createElement("button");
    downBtnElement.classList.add("task__btn-down", "btn");
    return downBtnElement;    
}

const createTaskBtnEditElement = () => {
    const editBtnElement = document.createElement("button");
    editBtnElement.classList.add("task__btn-edit", "btn");
    return editBtnElement;    
}

const createTaskBtnCloseElement = () => {
    const closeBtnElement = document.createElement("button");
    closeBtnElement.classList.add("task__btn-close", "btn");
    return closeBtnElement;    
}

displayTodos();