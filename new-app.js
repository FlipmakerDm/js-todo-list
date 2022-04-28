const todoList = [];

function initToLocalStorage(todos) {
  let todosLocalStorage;
  try {
    todosLocalStorage = JSON.parse(localStorage.getItem('todos'));
  } catch (error) {
    console.error(error);
  }
  if (todosLocalStorage) {
    todosLocalStorage.forEach((item) => {
      todos.push(item);
    });
  }
}

function updateLocalStorage(todos) {
  const todoss = JSON.stringify(todoList);
  localStorage.setItem('todos', todoss);
}

function renderTop(todos) {
  const body = document.querySelector('body');
  const alert = document.createElement('div');
  alert.classList.add('add-alert');
  body.appendChild(alert);

  let node = document.querySelector('header');

  let todoHeader = document.createElement('div');
  todoHeader.classList.add('header-todo-list');
  todoHeader.innerHTML = 'TODO LIST';

  let containerEditTodo = document.createElement('div');
  containerEditTodo.classList.add('edit-todo');

  let todoInput = document.createElement('input');
  todoInput.classList.add('todo-input');
  todoInput.setAttribute('type', 'text');
  todoInput.setAttribute('placeholder', 'Введите описание');
  todoInput.innerHTML = '';
  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      todoInputButton.click();
    }
  });

  containerEditTodo.appendChild(todoInput);

  let todoInputButton = document.createElement('button');
  todoInputButton.classList.add('todo-input-button');
  todoInputButton.innerHTML = 'Создать задачу';
  todoInputButton.addEventListener('click', (event) => {
    if (todoInput.value.trim()) {
      const newTodos = {
        id: Math.trunc(Math.random() * (10000 - 10) + 10),
        title: todoInput.value,
        completed: false,
      };
      todos.push(newTodos);
      todoInput.value = '';
      render(todoList);
      addAlert(' Задача добавлена');
    } else {
      addAlert('Введите описание');
    }
  });

  containerEditTodo.appendChild(todoInputButton);
  node.appendChild(todoHeader);
  node.appendChild(containerEditTodo);
}

function render(todos) {
  updateLocalStorage(todos);
  let node = document.querySelector('main');
  node.innerHTML = '';
  let noTodos = document.createElement('div');
  noTodos.classList.add('message');
  node.appendChild(noTodos);

  if (todos.length === 0) {
    noTodos.innerHTML = 'No Todos!';
  } else {
    todos.forEach((item, idx) => {
      let todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');
      let containerLeft = document.createElement('div');
      containerLeft.classList.add('container_left');
      todoItem.appendChild(containerLeft);
      let containerRight = document.createElement('div');
      containerRight.classList.add('container_right');
      todoItem.appendChild(containerRight);

      let todoItemCheckbox = document.createElement('input');
      todoItemCheckbox.classList.add('todo-item-checkbox');
      todoItemCheckbox.setAttribute('type', 'checkbox');
      todoItemCheckbox.checked = item.completed;
      if (item.completed) {
        todoItem.classList.add('completed');
      }
      todoItemCheckbox.addEventListener('change', (event) => {
        const findIdx = todos.findIndex((todo) => todo.id === item.id);
        if (findIdx !== -1) {
          const todo = todos[findIdx];
          todo.completed = event.target.checked;
          todos.splice(findIdx, 1, todo);
        }
        render(todos);
      });

      //создаем ID
      let divForId = document.createElement('div');
      divForId.classList.add('div-for-id');
      let todoItemId = document.createElement('span');
      todoItemId.classList.add('todo-item-id');
      todoItemId.innerHTML = idx + 1;

      //создаем title
      let divForTitle = document.createElement('div');
      divForTitle.classList.add('div-for-title');
      let todoItemTitle = document.createElement('span');
      todoItemTitle.classList.add('todo-item-title');
      todoItemTitle.innerHTML = item.title;

      //создаем кнопку delete
      let todoItemDelete = document.createElement('button');
      todoItemDelete.classList.add('btn_delete');
      let iconDelete = document.createElement('img');
      iconDelete.classList.add('icon_delete');
      iconDelete.src = '/img/delete_icon.svg';
      iconDelete.addEventListener('click', (event) => {
        const findIdx = todos.findIndex((todo) => todo.id === item.id);
        if (findIdx !== -1) {
          todos.splice(findIdx, 1);
        }
        addAlert(' Задача удалена');
        render(todos);
      });
      //

      todoItemDelete.appendChild(iconDelete);
      containerLeft.appendChild(todoItemCheckbox);
      divForId.appendChild(todoItemId);
      containerLeft.appendChild(divForId);
      containerLeft.appendChild(divForTitle);
      divForTitle.appendChild(todoItemTitle);
      containerRight.appendChild(todoItemDelete);

      node.appendChild(todoItem);
    });
  }
}

let timer;
function addAlert(mess) {
  if (timer) {
    clearTimeout(timer);
  }

  let alert = document.querySelector('.add-alert');

  alert.innerHTML = mess;
  alert.classList.add('add-message');

  timer = setTimeout(() => {
    alert.classList.remove('add-message');
  }, 3000);
}

function init(todos = []) {
  const root = document.querySelector('#todo');
  root.classList.add('container');
  let todoHeader = document.createElement('header');
  let todoBody = document.createElement('main');
  root.appendChild(todoHeader);

  root.appendChild(todoBody);

  renderTop(todos, todoHeader);
  initToLocalStorage(todos);
  render(todos, todoBody);
}

init(todoList);
