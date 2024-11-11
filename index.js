const todo = document.querySelector(".todos");
const todoList = document.querySelector("#todoList");
const itemsLeft = document.querySelector(".items-information p.mb-0");
const filterButtons = document.querySelectorAll(".filter-button");
const clearCompletedButton = document.querySelector(".btn-danger");
const filterSection = document.querySelector("#filter-section");
const completeAllButton = document.getElementById("complete-all");
todo.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

completeAllButton.addEventListener("click", (event) => {
  if (event.target.id === "complete-all") {
    document.querySelectorAll(".todo-item").forEach((item) => {

      if (item.firstChild.firstChild.checked == false) {
        item.firstChild.firstChild.checked = true;
        item.firstChild.nextSibling.classList.add(
          "text-decoration-line-through"
        );
        item.setAttribute("data-status", "completed");
      }
    });
    updateItemsLeft();
  }
});

function addTodo() {
  const todoText = todo.value.trim();
  if (todoText !== "") {
    const outerDiv = document.createElement("div");
    outerDiv.className = "input-group mb-3 todo-item";
    outerDiv.setAttribute("data-status", "active");

    const innerDiv = document.createElement("div");
    innerDiv.className = "input-group-text";
    outerDiv.appendChild(innerDiv);

    const newInput = document.createElement("input");
    newInput.className = "form-check-input mt-0";
    newInput.type = "checkbox";
    innerDiv.appendChild(newInput);

    const textSpan = document.createElement("span");
    textSpan.className = "form-control todo-text";
    textSpan.textContent = todoText;
    textSpan.contentEditable = "false";
    outerDiv.appendChild(textSpan);

    const cancelButton = document.createElement("button");
    cancelButton.className = "btn-close";
    outerDiv.appendChild(cancelButton);

    todoList.appendChild(outerDiv);
    todo.value = "";
    updateItemsLeft();
  } else {
    alert("Please enter a value");
  }
}

todoList.addEventListener("click", (event) => {
  const clickedElement = event.target;

  if (clickedElement.classList.contains("form-check-input")) {
    const todoItem = clickedElement.closest(".todo-item");
    const textSpan = todoItem.querySelector(".todo-text");

    if (clickedElement.checked) {
      todoItem.setAttribute("data-status", "completed");
      textSpan.classList.add("text-decoration-line-through");
    } else {
      todoItem.setAttribute("data-status", "active");
      textSpan.classList.remove("text-decoration-line-through");
    }
    updateItemsLeft();
  } else if (clickedElement.classList.contains("btn-close")) {
    clickedElement.closest(".todo-item").remove();
    updateItemsLeft();
  }
});

todoList.addEventListener("dblclick", (event) => {
  console.log(event.target);
  if (event.target.classList.contains("todo-text")) {
    const textSpan = event.target;
    textSpan.contentEditable = "true";
    textSpan.focus();

    textSpan.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        textSpan.contentEditable = "false";
      }
    });
  }
});

function updateItemsLeft() {
  const activeTodos = document.querySelectorAll(
    '.todo-item[data-status="active"]'
  );
  itemsLeft.textContent = `${activeTodos.length} items left!`;
  toggleFilterSection();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filterType = button.id;

    document.querySelectorAll(".todo-item").forEach((item) => {
      const status = item.getAttribute("data-status");

      if (filterType === "all") {
        item.style.display = "flex";
      } else if (filterType === "active" && status === "active") {
        item.style.display = "flex";
      } else if (filterType === "completed" && status === "completed") {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  });
});

clearCompletedButton.addEventListener("click", () => {
  document
    .querySelectorAll('.todo-item[data-status="completed"]')
    .forEach((item) => {
      item.remove();
    });
  updateItemsLeft();
});

function toggleFilterSection() {
  const hasItems = todoList.querySelectorAll(".todo-item").length > 0;
  filterSection.style.display = hasItems ? "block" : "none";
}
