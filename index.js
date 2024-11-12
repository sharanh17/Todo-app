const todo = document.querySelector(".todos");
const todoList = document.querySelector("#todoList");
const itemsLeft = document.querySelector(".items-information p.mb-0");
const filterButtons = document.querySelectorAll(".filter-button");
const clearCompletedButton = document.querySelector(".btn-danger");
const filterSection = document.querySelector("#filter-section");
const completeAllButton = document.getElementById("complete-all");
const button = document.querySelector(".toggle-submit");

let todosArray = JSON.parse(localStorage.getItem("todos")) || [];

function todosrender() {
  todoList.innerHTML = "";
  todosArray.forEach((todoItem, index) => {
    const outerDiv = document.createElement("div");
    outerDiv.className = "input-group mb-3 todo-item";
    outerDiv.setAttribute("data-status", todoItem.status);

    const innerDiv = document.createElement("div");
    innerDiv.className = "input-group-text";
    outerDiv.appendChild(innerDiv);

    const newInput = document.createElement("input");
    newInput.className = "form-check-input mt-0";
    newInput.type = "checkbox";
    newInput.checked = todoItem.completed;
    newInput.addEventListener("change", () => toggleTodoStatus(index));
    innerDiv.appendChild(newInput);

    const textSpan = document.createElement("span");
    textSpan.className = "form-control todo-text";
    textSpan.textContent = todoItem.text;
    textSpan.contentEditable = "false";
    if (todoItem.completed) {
      textSpan.classList.add("text-decoration-line-through");
    } else {
      textSpan.classList.remove("text-decoration-line-through");
    }
    textSpan.addEventListener("dblclick", () => editTodoText(index, textSpan));
    outerDiv.appendChild(textSpan);

    const cancelButton = document.createElement("button");
    cancelButton.className = "btn-close";
    cancelButton.addEventListener("click", () => removeTodoItem(index));
    outerDiv.appendChild(cancelButton);
    todoList.appendChild(outerDiv);
  });
  updateItemsLeft();
}

function addTodo() {
  const todoText = todo.value.trim();
  if (todoText !== "") {
    todosArray.push({ text: todoText, status: "active", completed: false });
    todo.value = "";
    localStorage.setItem("todos", JSON.stringify(todosArray));
    todosrender();
  } else {
    alert("Please enter a value");
  }
}

function toggleTodoStatus(index) {
  todosArray[index].completed = !todosArray[index].completed;
  todosArray[index].status = todosArray[index].completed
    ? "completed"
    : "active";
  localStorage.setItem("todos", JSON.stringify(todosArray));
  todosrender();
}

function editTodoText(index, textSpan) {
  textSpan.contentEditable = "true";
  textSpan.focus();
  textSpan.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      textSpan.contentEditable = "false";
      todosArray[index].text = textSpan.textContent.trim();
      localStorage.setItem("todos", JSON.stringify(todosArray));
      todosrender();
    }
  });
}

function removeTodoItem(index) {
  todosArray.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todosArray));
  todosrender();
}

function updateItemsLeft() {
  const activeTodos = todosArray.filter(
    (todoItem) => todoItem.status === "active"
  );
  itemsLeft.textContent = `${activeTodos.length} items left!`;
  toggleFilterSection();
  toggleSubmitButton();
}

function filterTodos(filterType) {
  todosArray.forEach((todoItem, index) => {
    const todoElement = todoList.children[index];
    if (filterType === "all" || filterType === todoItem.status) {
      todoElement.style.display = "flex";
    } else {
      todoElement.style.display = "none";
    }
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => filterTodos(button.id));
});

function clearCompletedTodos() {
  todosArray = todosArray.filter((todoItem) => todoItem.status === "active");
  localStorage.setItem("todos", JSON.stringify(todosArray));
  todosrender();
  updateItemsLeft();
}

clearCompletedButton.addEventListener("click", clearCompletedTodos);

function toggleFilterSection() {
  filterSection.style.display = todosArray.length ? "block" : "none";
}

function toggleSubmitButton() {
  completeAllButton.style.display = todosArray.length ? "block" : "none";
}

function completeAllTodos() {
  todosArray.forEach((todoItem) => {
    todoItem.completed = true;
    todoItem.status = "completed";
  });
  todosrender();
}

completeAllButton.addEventListener("click", completeAllTodos);

todo.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

todosrender();

// todoList.addEventListener("click", (event) => {
//   const clickedElement = event.target;

//   if (clickedElement.classList.contains("form-check-input")) {
//     const todoItem = clickedElement.closest(".todo-item");
//     const textSpan = todoItem.querySelector(".todo-text");

//     if (clickedElement.checked) {
//       todoItem.setAttribute("data-status", "completed");
//       textSpan.classList.add("text-decoration-line-through");
//     } else {
//       todoItem.setAttribute("data-status", "active");
//       textSpan.classList.remove("text-decoration-line-through");
//     }
//     updateItemsLeft();
//   } else if (clickedElement.classList.contains("btn-close")) {
//     clickedElement.closest(".todo-item").remove();
//     updateItemsLeft();
//   }
// });

// todoList.addEventListener("dblclick", (event) => {
//   console.log(event.target);
//   if (event.target.classList.contains("todo-text")) {
//     const textSpan = event.target;
//     textSpan.contentEditable = "true";
//     textSpan.focus();

//     textSpan.addEventListener("keydown", (event) => {
//       if (event.key === "Enter") {
//         textSpan.contentEditable = "false";
//       }
//     });
//   }
// });

// function updateItemsLeft() {
//   const activeTodos = document.querySelectorAll(
//     '.todo-item[data-status="active"]'
//   );
//   itemsLeft.textContent = `${activeTodos.length} items left!`;
//   toggleFilterSection();
//   toggleSubmitButton();
// }

// filterButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     const filterType = button.id;

//     document.querySelectorAll(".todo-item").forEach((item) => {
//       const status = item.getAttribute("data-status");

//       if (filterType === "all") {
//         item.style.display = "flex";
//       } else if (filterType === "active" && status === "active") {
//         item.style.display = "flex";
//       } else if (filterType === "completed" && status === "completed") {
//         item.style.display = "flex";
//       } else {
//         item.style.display = "none";
//       }
//     });
//   });
// });

// clearCompletedButton.addEventListener("click", () => {
//   document
//     .querySelectorAll('.todo-item[data-status="completed"]')
//     .forEach((item) => {
//       item.remove();
//     });
//   updateItemsLeft();
// });

// function toggleFilterSection() {
//   const hasItems = todoList.querySelectorAll(".todo-item").length > 0;
//   filterSection.style.display = hasItems ? "block" : "none";
// }

// function toggleSubmitButton() {
//   const items = todoList.querySelectorAll(".todo-item").length > 0;
//   completeAllButton.style.display = items ? "block" : "none";
// }
