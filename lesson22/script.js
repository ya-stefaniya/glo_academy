'use strict';
class Todo {
    constructor(form, input, todoList, todoCompleted){
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
        this.li = '';
       //console.log('this constr: ', this);
    }
    //получить данные из инпута и добавить в объект
    addTodo(e){
        e.preventDefault();
        if(this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key:this.generateKey(),
            };
            //добавить в коллекцию новое дело
            // для этого должны создать ключ
            this.todoData.set(newTodo.key, newTodo);
            this.render();
            this.input.value = '';
        }
    }
    addToStorage(){
        localStorage.setItem('todoList', JSON.stringify([...this.todoData]))
    }
    render(){
        this.todoList.textContent ='';
        this.todoCompleted.textContent ='';

        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
//здесь this.createItem - callback функция, она не имеет своего this
    }
    createItem(item){
        let li = document.createElement('li');
        li.key = item.key;
        li.classList.add('todo-item');
        li.innerHTML = `<span class="text-todo">${item.value}</span>
        <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
        </div>`;
        if(item.completed){
            this.todoCompleted.append(li);
            
        } else {
            this.todoList.append(li);
        }
        let list = document.querySelectorAll('li');
        this.li = list;
    }
    generateKey(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    }
    deleteItem(e){
    //найти по ключу элемент и удалить из мэп и сделать рендер
    let liTarget = e.target.closest('li');
    let opacity = 1, intervalID;
    const fadeOut = () => {
        intervalID = requestAnimationFrame(fadeOut);
        if (opacity > 0) {
            opacity -= 0.1;
            liTarget.style.opacity = opacity;
        } else {
            cancelAnimationFrame(intervalID);
        }
    };
    fadeOut();
    this.todoData.forEach((elem)=>{
    if(elem.key === liTarget.key){
        this.todoData.delete(elem.key);
        }             
    });
        this.addToStorage();
        setTimeout(()=>{
            this.render();
        }, 400);
       
    }

    completeItem(e){
        //передбрать фор ичу туду дата и найти элемент на который мы нажали и поменять знаечние
        let liTarget = e.target.closest('li');
        this.todoData.forEach((elem)=>{
            if(elem.key === liTarget.key){
                elem.completed = true;
                this.addToStorage();
            }             
        });
        this.render();
    }
    
    handler(){
        //делегирование обработчик событий
        document.querySelector('.todo-container').addEventListener('click', (e)=>{
            let target = e.target;
            if(target.matches('.todo-complete')){
                this.completeItem(e);
            } else if(target.matches('.todo-remove')) {
            this.deleteItem(e);
            }
        })
        
    }
    init(){
    //есть ивент=> свой  this
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();    
    }
}
const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();
todo.handler();
