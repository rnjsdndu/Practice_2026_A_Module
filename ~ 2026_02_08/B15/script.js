const $ = e => document.querySelector(e)
const $$ = e => [...document.querySelectorAll(e)]

let oldData = [];
let data = [];

let maxPage = 0
let page = 1;

const list = $('#tableBody')
const buttons = $$('button')

async function init() {
  await getData();
  renderList();
  bindEvents();
  renderPagination();
}

async function getData() {
  oldData = (await fetch('./sample-data.csv').then(res => res.text())).split('\n').map(e=> e.split(',')).slice(1,51)

  let num = 0;
  maxPage = Math.ceil((oldData.length) / 10)

  for(let i = 0; i < maxPage; i++) {
    data.push(oldData.slice(num, num+=10))
  }
}

function renderList() {
  list.innerHTML = ''
  data[page - 1].forEach(e=>{
    list.innerHTML += `
      <tr><td>${e[0]}</td><td>${e[1]}</td><td>${e[2]}</td><td>${e[3]}</td><td>${e[4]}</td></tr>
    `
  })
}

function renderPagination() {
  buttons.forEach(e=>{
    e.classList.remove('active');
    e.disabled = false
    buttons[2].textContent = '2'
    buttons[maxPage - 1].textContent = maxPage-1


  })
  buttons[page].classList.add('active')
  if(page == 1){
    buttons[0].disabled = true
    buttons[maxPage - 1].textContent = '...'
  }
  
  if(page == maxPage){
    buttons[maxPage + 1].disabled = true
    buttons[2].textContent = '...'
  }

}

function bindEvents() {
  buttons.forEach(btn=>{
    btn.addEventListener("click", (e) => {
      if(/^\d+$/.test(e.target.textContent)) {
        page = parseInt(e.target.textContent);
      }else if(e.target.textContent == '이전') {
        page -= 1;
      }else if(e.target.textContent == '다음') {
        page += 1;
      }

      renderList();
      renderPagination();
    })
  })
}


init();