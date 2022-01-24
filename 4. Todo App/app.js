const form = document.querySelector("form");
const todoUL = document.querySelector("ul");
const input = document.getElementById("input");

const todos = JSON.parse(localStorage.getItem("todos"));
// console.log(todos);

if (todos) {
  todos.forEach((todo) => {
    addTodos(todo);
    // console.log(todo);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodos();
});

function addTodos(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoList = document.createElement("li");

    if (todo && todo.completed) {
      todoList.classList.add("completed");
    }
    todoList.innerText = todoText;

    //   For Deleting the todo
    todoList.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      todoList.remove();
      updateLS();
    });

    //   For completing the todo
    todoList.addEventListener("click", (e) => {
      todoList.classList.toggle("completed");
      updateLS();
    });

    todoUL.appendChild(todoList);
    input.value = "";
    updateLS();
  }
}

function updateLS() {
  const todoLists = document.querySelectorAll("li");

  const todos = [];

  todoLists.forEach((todoList) => {
    todos.push({
      text: todoList.innerText,
      completed: todoList.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
