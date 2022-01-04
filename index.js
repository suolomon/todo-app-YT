//Todo array
//Capture text in input
//Render text
//Mark list items as complete
//delete
//Store in local storage

let todoItems = [];

let addButton = document.querySelector("#add");

//capture text and push it to todoitems array

const addTodo = (text) => {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };
  todoItems.push(todo);
  renderTodo(todo);
};

//create toggle function for checkbox
const toggleDown = (key) => {
  const index = todoItems.findIndex((item) => item.id === Number(key));

  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
};

//delete function

const deleteTodo = (key) => {
  const index = todoItems.findIndex((item) => item.id === Number(key));

  const todo = {
    deleted: true,
    ...todoItems[index],
  };

  //use filter method to delete item
  todoItems = todoItems.filter((item) => item.id !== Number(key));
  renderTodo(todo);
};

const renderTodo = (todo) => {
  localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));
  // select element with class of js-todo-list
  const list = document.querySelector(".js-todo-list");

  const item = document.querySelector(`[data-key= '${todo.id}']`);

  //remove item if condition
  if (todo.deleted) {
    //remove item
    item.remove();
    return;
  }

  // check if item is checked or not
  const isChecked = todo.checked ? "done" : "";
  // create a node and assign it a list element
  const node = document.createElement("li");
  // set class attribute
  node.setAttribute("class", `todo-item ${isChecked}`);
  // set data-key attribute to id of todo
  node.setAttribute("data-key", todo.id);
  // set contents in the node
  node.innerHTML = `
  <input id ="${todo.id}" type="checkbox" />
  <label for="${todo.id}" class="tick js-tick"></label>
  <span>${todo.text}</span>
  <button class="delete-todo js-delete-todo">
  <svg><use href="#delete-icon"></use></svg>
  </button>
 `;

  //Replace item if already exsits

  if (item) {
    //replace it
    list.replaceChild(node, item);
  } else {
    // Append element as last child referenced by the list variable
    list.append(node);
  }
};

const form = document.querySelector(".js-form");

//add event listener to button
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.querySelector(".js-todo-input");
  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  } else {
    alert("Please type something");
  }
});

//add click event on checkbox input

const list = document.querySelector(".js-todo-list");

list.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDown(itemKey);
  }

  //delete items
  if (event.target.classList.contains("js-delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

//fetch data from localstorage 

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todoItemsRef'); 
  if(ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach(t => {
      renderTodo(t)
    })
  }
})