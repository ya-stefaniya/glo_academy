'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const render = function(){
    todoList.textContent = '';
    todoCompleted.textContent = ''; 

    todoData.forEach(function(item){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `<span class="text-todo">${item.value}</span>
        <div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
        </div>`;
        if(item.comleted){
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }
    const btnComleted = li.querySelector('.todo-complete');
        btnComleted.addEventListener('click', () =>{
        item.comleted = !item.comleted;
        localStorage.setItem('todo', JSON.stringify(todoData));
        render();
    });
    const btnRemove = li.querySelector('.todo-remove');
        btnRemove.addEventListener('click', () =>{
            let i = todoData.indexOf(item);
            if(i>=0){
                todoData.splice(i,1);
            }
            localStorage.setItem('todo', JSON.stringify(todoData));
            render(); 
        });
    });

};
todoControl.addEventListener('submit', (e)=>{
    e.preventDefault();
        //console.log('headerInput.value : ', headerInput.value );
        if(!headerInput.value) return;
        const newToDo = { 
            value: headerInput.value,
            comleted: false, 
        };
        todoData.push(newToDo);
        localStorage.setItem('todo', JSON.stringify(todoData));
        render();
        headerInput.value = '';
})

//render сразу как страница загрузилась
if(localStorage.getItem('todo')){
    todoData = JSON.parse(localStorage.getItem('todo'));
    render();
};
render();