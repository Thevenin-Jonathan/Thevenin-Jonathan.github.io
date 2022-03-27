const todos = [
    {
        title: "Todo 1",
        edit: false,
        named: false,
        tasks: [
            {
                done: false,
                text: "Task 1",
                edit: false,
            },
            {
                done: false,
                text: "Task 2",
                edit: false,
            },
            {
                done: false,
                text: "Task 3",
                edit: false,
            }
        ],
    },
]

const createTodo = () => {
    todos.push({
        title: `Todo ${todos.length + 1}`,
        edit: false,
        named: false,
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
    const todoHeaderTitleElement =
        todo.edit ? createHeaderInputElement(todo) : createHeaderTitleElement(todo);
    const headerEditBtnElement = createHeaderEditBtnElement(todo);
    const headerCloseBtnElement = createHeaderCloseBtnElement(index);
    todoHeaderElement.append(todoHeaderTitleElement, headerEditBtnElement, headerCloseBtnElement);
    todoContentElement.append(createTaskListElement(todo, index));
    todoElement.append(todoHeaderElement, todoContentElement);
    return todoElement;
}

const createHeaderInputElement = (todo) => {
    const inputElement = document.createElement("input");
    inputElement.classList.add("todo__header-title--edit");
    inputElement.placeholder = "Enter name here";
    setTimeout(() => {
        inputElement.focus();
    }, 0);
    inputElement.addEventListener("focusout", () => {
        closeHeaderEditMode(todo, inputElement);
    })
    document.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            closeHeaderEditMode(todo, inputElement);
        }
    }) 
    return inputElement;
}

const closeHeaderEditMode = (todo, inputElement) => {
    todo.edit = false;
    if (inputElement.value) {
        todo.title = inputElement.value;
        todo.named = true;
    }
    displayTodos();
}

const createHeaderTitleElement = (todo) => {
    const titleElement = document.createElement("h2");
    titleElement.classList.add("todo__header-title");
    titleElement.innerText = todo.title;
    return titleElement;
}

const createHeaderEditBtnElement = (todo) => {
    const editBtnElement = document.createElement("button");
    editBtnElement.classList.add("todo__header-btn-edit", "btn");
    editBtnElement.addEventListener("click", () => {
        todo.edit = true;
        displayTodos();
    })
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

const createTaskListElement = (todo, todoIndex) => {
    const listElement = document.createElement("ul");
    listElement.classList.add("tasks-list");
    const taskElements = todo.tasks.map((task, taskIndex) => {
        return createTaskElement(task, todoIndex, taskIndex);
    });    
    const addBtnElement = createAddTaskButton(todo, todoIndex);
    listElement.append(...taskElements, addBtnElement);
    return listElement;
}

const createAddTaskButton = (todo, todoIndex) => {
    const liElement = document.createElement("li");
    liElement.classList.add("task-add");
    const addBtnElement = document.createElement("button");
    addBtnElement.classList.add("task-add__btn")
    addBtnElement.textContent = "Add task";
    addBtnElement.addEventListener("click", () => {
        const name = todo.tasks.length + 1;
        const task = {
            done: false,
            text: `Task ${name}`,
            edit: true,
        };
        todo.tasks.push(task);
        displayTodos();
    })
    liElement.appendChild(addBtnElement);
    return liElement;
}

const deleteTodo = (index) => {
    todos.splice(index, 1);
    todos.forEach( (todo, index) => {
        if (todo.named === false) {
            todo.title = `todo ${index + 1}`
        }
    });
    displayTodos();
}

const createTaskElement = (task, todoIndex, taskIndex) => {
    const taskElement = document.createElement("li");
    taskElement.classList.add("task");
    const taskBtnCheckboxElement = createTaskBtnCheckboxElement(task);
    const taskNameElement = createTaskNameElement(task);
    const taskBtnUpElement = createTaskBtnUpElement(todoIndex, taskIndex);
    const taskBtnDownElement = createTaskBtnDownElement(todoIndex, taskIndex);
    const taskBtnEditElement = createTaskBtnEditElement();
    const taskBtnCloseElement = createTaskBtnCloseElement(todoIndex, taskIndex);
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
    taskNameElement.classList.add("task__name");
    if (task.done) taskNameElement.classList.add("strike");
    taskNameElement.textContent = task.text;
    return taskNameElement;
}

const createTaskBtnUpElement = (todoIndex, taskIndex) => {
    const upBtnElement = document.createElement("button");
    upBtnElement.classList.add("task__btn-up", "btn");
    upBtnElement.addEventListener("click", () => {
        if (taskIndex > 0) {
            const tasks = todos[todoIndex].tasks;
            [tasks[taskIndex], tasks[taskIndex - 1]] = [tasks[taskIndex - 1], tasks[taskIndex]]
            displayTodos();
        }
    })
    return upBtnElement;    
}

const createTaskBtnDownElement = (todoIndex, taskIndex) => {
    const downBtnElement = document.createElement("button");
    downBtnElement.classList.add("task__btn-down", "btn");
    downBtnElement.addEventListener("click", () => {
        const max = todos[todoIndex].tasks.length - 1;
        if (taskIndex < max) {
            const tasks = todos[todoIndex].tasks;
            [tasks[taskIndex + 1], tasks[taskIndex]] = [tasks[taskIndex], tasks[taskIndex + 1]]
            displayTodos();
        }
    })
    return downBtnElement;    
}

const createTaskBtnEditElement = () => {
    const editBtnElement = document.createElement("button");
    editBtnElement.classList.add("task__btn-edit", "btn");
    return editBtnElement;    
}

const createTaskBtnCloseElement = (todoIndex, taskIndex) => {
    const closeBtnElement = document.createElement("button");
    closeBtnElement.classList.add("task__btn-close", "btn");
    closeBtnElement.addEventListener("click", () => {
        todos[todoIndex].tasks.splice(taskIndex, 1);
        displayTodos();
    })
    return closeBtnElement;    
}

displayTodos();