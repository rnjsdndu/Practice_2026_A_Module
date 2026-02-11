let oldData = [];
let data = [];
let page = 1;
const $ = (e) => document.querySelector(e);
const $$ = (e) => [...document.querySelectorAll(e)];

const list = $("#tableBody");
const button = $$("button");
const pagination = $("#pagination");
async function getData() {
  oldData = await fetch("./sample-data.csv").then((res) => res.text());

  let num = 0;
  oldData = oldData
    .split("\n")
    .map((e) => e.split(","))
    .splice(1, 50);

  for (let i = 0; i <= oldData.length - 10; i += 10) {
    data.push(oldData.slice(num, (num += 10)));
  }
}

async function init() {
  await getData();
  renderList();
  bindEvents();
  renderPagination();
}

function renderList() {
  list.innerHTML = "";
  let listPage = page - 1
  data[listPage].forEach((el) => {
    list.innerHTML += `
      <tr><td>${el[0]}</td><td>${el[1]}</td><td>${el[2]}</td><td>${el[3]}</td><td>${el[4]}</td></tr>
    `;
  });
}

function renderPagination() {
  button.forEach(btn => {
    btn.classList.remove("active");
    btn.disabled = false;
    btn.classList.remove('page-info');
  });
  
  button[2].textContent = '2';
  button[4].textContent = '4';
  
  button[page].classList.add("active");
  
  if(page == 1){
    button[0].disabled = true;
    button[4].classList.add('page-info');
    button[4].textContent = '...';
  }
  
  if(page == button.length - 2) {
    button[button.length - 1].disabled = true;
    button[2].classList.add('page-info');
    button[2].textContent = '...';
  }
  
}

function bindEvents() {
  pagination.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const btnValue = btn.textContent;

    if (/^\d+$/.test(btnValue)) {
      page = parseInt(btnValue);
    }

    if(btnValue == '이전') page -= 1;

    if(btnValue == '다음') page += 1;

    renderPagination();
    renderList();
  });
}

init();
