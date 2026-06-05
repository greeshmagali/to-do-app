let userInput = document.getElementById("inputTask");
let addTodoButton = document.getElementById("addTodoButton");
let todoItemsContainer = document.getElementById("todoItemsContainer");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}
let todoList = getTodoListFromLocalStorage();

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}


function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoObjectIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteElementIndex, 1);
}


function createAndAppendTodo(todo) {
    let checkboxId = "checkbox " + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputEl = document.createElement("input");
    inputEl.type = "checkbox";
    inputEl.id = checkboxId;
    inputEl.checked = todo.isChecked;
    inputEl.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };
    todoElement.appendChild(inputEl);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelEl = document.createElement("label");
    labelEl.setAttribute("for", checkboxId);
    labelEl.textContent = todo.text;
    labelEl.id = labelId;
    if (todo.isChecked === true) {
        labelEl.classList.add("checked");
    }
    labelEl.classList.add("checkbox-label");
    labelContainer.appendChild(labelEl);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-container");
    labelContainer.appendChild(deleteContainer);

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteContainer.appendChild(deleteBtn);

}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

let todosCount = todoList.length;

function onAddTodo() {
    let userInputValue = userInput.value;
    if (userInputValue === "") {
        alert("Enter a valid text");
        return;
    }
    todosCount = todosCount + 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInput.value = "";
}

addTodoButton.onclick = function() {
    onAddTodo();
};