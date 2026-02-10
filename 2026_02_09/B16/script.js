const $ = (e) => document.querySelector(e);
const $$ = (e) => [...document.querySelectorAll(e)];
const $fetch = (path) => fetch(path).then((res) => res.json());

const todoList = $("#todoList");
const buttons = $$(".filter-btn");
const totalCount = $("#totalCount");
const completedCount = $("#completedCount");
const pendingCount = $("#pendingCount");

let data = [];
let filter = "전체";
async function init() {
  await getData();
  bindEvents();
  renderList();
  renderStats();
}

async function getData() {
  let json = await $fetch("./todos.json");
  data = json.todos;
  json.todos.forEach((e, i) => {
    data[i].priorityNum =
      e.priority == "high" ? 1 : e.priority == "medium" ? 2 : 3;
  });
}

function renderList() {
  todoList.innerHTML = "";
  data.forEach((todo) => {
    const priority =
      todo.priority == "high"
        ? "높음"
        : todo.priority == "medium"
          ? "보통"
          : "낮음";
    const datasetPriority =
      todo.priority == "high" ? 1 : todo.priority == "medium" ? 2 : 3;
    todoList.innerHTML += `
      <div class="todo-item ${todo.completed ? "completed" : ""}" data-priority="${datasetPriority}">
          <div class="todo-header">
              <h3 class="todo-title">${todo.title}</h3>
              <div class="todo-badges">
                  <span class="badge priority-${todo.priority}">${priority}</span>
                  <span class="badge status-badge">${todo.completed ? "완료" : "진행중"}</span>
              </div>
          </div>
          <p class="todo-description">${todo.description}</p>
          <div class="todo-footer">
              <div class="date-info">
                  <span>📅 마감: ${todo.dueDate}</span>
                  <span>📝 생성: ${todo.createdAt}</span>
              </div>
          </div>
      </div>
    `;
  });

  if (filter == "진행중") {
    todoList.innerHTML = "";
    data
      .filter((e) => !e.completed)
      .forEach((todo) => {
        const priority =
          todo.priority == "high"
            ? "높음"
            : todo.priority == "medium"
              ? "보통"
              : "낮음";
        const datasetPriority =
          todo.priority == "high" ? 1 : todo.priority == "medium" ? 2 : 3;
        todoList.innerHTML += `
        <div class="todo-item ${todo.completed ? "completed" : ""}" data-priority="${datasetPriority}">
            <div class="todo-header">
                <h3 class="todo-title">${todo.title}</h3>
                <div class="todo-badges">
                    <span class="badge priority-${todo.priority}">${priority}</span>
                    <span class="badge status-badge">${todo.completed ? "완료" : "진행중"}</span>
                </div>
            </div>
            <p class="todo-description">${todo.description}</p>
            <div class="todo-footer">
                <div class="date-info">
                    <span>📅 마감: ${todo.dueDate}</span>
                    <span>📝 생성: ${todo.createdAt}</span>
                </div>
            </div>
        </div>
      `;
      });
  }

  if (filter == "완료") {
    todoList.innerHTML = "";
    data
      .filter((e) => e.completed)
      .forEach((todo) => {
        const priority =
          todo.priority == "high"
            ? "높음"
            : todo.priority == "medium"
              ? "보통"
              : "낮음";
        const datasetPriority =
          todo.priority == "high" ? 1 : todo.priority == "medium" ? 2 : 3;
        todoList.innerHTML += `
        <div class="todo-item ${todo.completed ? "completed" : ""}" data-priority="${datasetPriority}">
            <div class="todo-header">
                <h3 class="todo-title">${todo.title}</h3>
                <div class="todo-badges">
                    <span class="badge priority-${todo.priority}">${priority}</span>
                    <span class="badge status-badge">${todo.completed ? "완료" : "진행중"}</span>
                </div>
            </div>
            <p class="todo-description">${todo.description}</p>
            <div class="todo-footer">
                <div class="date-info">
                    <span>📅 마감: ${todo.dueDate}</span>
                    <span>📝 생성: ${todo.createdAt}</span>
                </div>
            </div>
        </div>
      `;
      });
  }

  if (filter == "높은 우선순위") {
    todoList.innerHTML = "";
    data
      .sort((a, b) => a.priorityNum - b.priorityNum)
      .forEach((todo) => {
        const priority =
          todo.priority == "high"
            ? "높음"
            : todo.priority == "medium"
              ? "보통"
              : "낮음";
        const datasetPriority =
          todo.priority == "high" ? 1 : todo.priority == "medium" ? 2 : 3;
        todoList.innerHTML += `
        <div class="todo-item ${todo.completed ? "completed" : ""}" data-priority="${datasetPriority}">
            <div class="todo-header">
                <h3 class="todo-title">${todo.title}</h3>
                <div class="todo-badges">
                    <span class="badge priority-${todo.priority}">${priority}</span>
                    <span class="badge status-badge">${todo.completed ? "완료" : "진행중"}</span>
                </div>
            </div>
            <p class="todo-description">${todo.description}</p>
            <div class="todo-footer">
                <div class="date-info">
                    <span>📅 마감: ${todo.dueDate}</span>
                    <span>📝 생성: ${todo.createdAt}</span>
                </div>
            </div>
        </div>
      `;
      });
  }
}

function bindEvents() {
  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      removeBtnClass();
      e.target.classList.add("active");
      filter = e.target.textContent;
      renderList();
    });
  });
}

function renderStats() {
  totalCount.textContent = data.length
  completedCount.textContent = data.filter(e=> e.completed == true).length
  pendingCount.textContent = data.filter(e=>e.completed == false).length
}

function removeBtnClass() {
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });
}

init();
