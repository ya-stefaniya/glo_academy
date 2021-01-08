'use strict';

//all elements
const addCar = document.querySelector('.car'),
    addModel = document.querySelector('.model'),
    addYear = document.querySelector('.year'),
    addKm = document.querySelector('.km'),
    addInfo = document.querySelector('.add'),
    table = document.querySelector('table'),
    tb = table.querySelector('tbody'),
    form  = document.querySelector('form'),
    inputContainer = document.querySelector('.info'),
    allInputs = inputContainer.querySelectorAll('input'),
    filterContainer = document.querySelector('.filter'),
    filterInputs = filterContainer.querySelectorAll('input'),
    rows = document.querySelector('table tbody').rows;

    let carData = [];    
//блокировка не вадилдных данных
const validator = () =>{
    allInputs.forEach((block)=>{
        block.addEventListener('input', ()=> {
            if(block.id === 'word'){
                block.value = block.value.replace(/[\d.,!@#$%^&*()~`"':;]/g, '')
            } else if(block.id === 'number'){
                block.value = block.value.replace(/[^+\d]/g, '');
            }
        })
    })
}
validator();
//формируем строку по данным в секции1
const render = () => {
    tb.textContent = '';
    carData.forEach((item)=>{
        let tr = document.createElement('tr')
        tr.innerHTML = `
            <th scope="row"><b>${table.rows.length}</b></th>
            <td id="marka">${item.car}</td>
            <td id="model">${item.model}</td>
            <td id="year">${item.year}</td>
            <td id="km">${item.km}</td>
        `
        tb.append(tr);
        localStorage.setItem('car', JSON.stringify(carData));
    });
    
}
//добавляем строку в таблицу

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    let newItem = {
        car: addCar.value,
        model: addModel.value,
        year: addYear.value,
        km: addKm.value,
    };
    for (let key in newItem){
        if(!newItem[key]){
            return;
        };
    }
    carData.push(newItem);
    render();
        [...allInputs].forEach(element => {
            if(element.type !== 'submit')  
            element.value = '';
        });
})
//сортировка
table.querySelectorAll('th') // get all the table header elements
    .forEach((element, columnNo)=>{ // add a click handler for each 
        element.addEventListener('click', event => {
         sortTable(table, columnNo); //call a function which sorts the table by a given column number
        })
});
const sortTable = (table, sortColumn) => {
    // get the data from the table cells
    const tableBody = table.querySelector('tbody')
    const tableData = table2data(tableBody);
    if(sortColumn === 1) {
        tableData.sort();
    } else if(sortColumn === 2){
        tableData.sort((a, b)=>{
            if(a[sortColumn-1].length > b[sortColumn-1].length){
                return 1;
            } else return -1;
        });
    } else{
        tableData.sort((a, b)=>{
            
            return a[sortColumn-1]-b[sortColumn-1];          
        })
    }
    

    // кладем отсортированные данные обратно в таблицу
    data2table(tableBody, tableData);
    }
//эта функция получает данные из строк и ячеек в элементе html tbody
const table2data = (tableBody) => {
const tableData = []; // массив с данными из row
const rows = tableBody.querySelectorAll('tr');
const newRows = [...rows].filter(element =>  !element.classList.contains('d-none'));
newRows.forEach(row=>{  //перебираем ряд
    const rowData = [];  //делаем массив с этими данными
        row.querySelectorAll('td')  // для каждой клетки ряда
            .forEach(cell=>{
            rowData.push(cell.innerText);  // добавляем в rowdata
        })
    //d-none не попадает в rowData
    tableData.push(rowData); //все ряды добавляем весь row в таблицу 
    });
    
return tableData;
}
  // отправляем данные обратно в таблицу
const data2table = (tableBody, tableData) => {
    const rows = tableBody.querySelectorAll('tr');
    const newRows = [...rows].filter(element =>  !element.classList.contains('d-none'));
        newRows.forEach((row, i)=>{  
            const rowData = tableData[i]; // новый массив из данных ряда
                row.querySelectorAll('td')  // для каждой клеточки
                .forEach((cell, j)=>{
                cell.innerText = rowData[j]; // вставляем нужный элемент в клетку
            })
        tableData.push(rowData);
    });
}
//фильтрация
const filterTable = (e) => {
    const target = e.target;
    const filter = target.value.trim().toLowerCase();
    for (let i = 0; i < rows.length; i++) {
        let row = rows[i], show = false;
        if (filter.length > 0) {
            for (let j = 0; j < row.children.length; j++) {
                let col = row.children[j], text = col.textContent.toLowerCase();
                if(col.id === target.id){
                    let reg = new RegExp(`^${filter}`, 'gi');
                    let matchText = text.match(reg);
                    if(matchText){
                        show = true;
                        break;
                    }
                }
            }
        } else {
        show = true; //фильтер.лэнгс 0 
        }
        toggleClass(row, 'd-none', !show);        
        //меняем индексы рядом при фильтрации
        const allRows = table.querySelectorAll('tbody tr');
        const visibleRows = [...allRows].filter(element =>  !element.classList.contains('d-none'));
        visibleRows.forEach((row,index) => row.childNodes[1].textContent = index+1);
    }
}
const blockInputs = (target) =>{
    [...filterInputs].forEach(box=>{
        (box !== target) ? box.disabled = true : box.disabled = false && box.focus();
        if(box !== target && box.disabled) {
            box.value = '';
        }
    })
}

const toggleClass = (el, className, state)=> {
    if (el.classList) {
        el.classList.toggle(className, state);
    } else {
        const classes = el.className.split(' ');
        const existingIndex = classes.indexOf(className);
        if (state === undefined) {
        if (existingIndex > -1) classes.splice(existingIndex, 1)
        else classes.push(existingIndex);
    } else {
        if (!state) classes.splice(existingIndex, 1)
        else classes.push(existingIndex);
    }
    el.className = classes.join(' ');
    }
}

//пл клику на контейнер находим нужный инпут и слушаем инпут
filterContainer.addEventListener('click', (e)=>{
    let target = e.target;
    target = target.closest('input');
    if (target){
        blockInputs(target);
        target.addEventListener('input', filterTable);    
    } else blockInputs(target);
    
    
});


//render сразу как страница загрузилась
if(localStorage.getItem('car')){
    carData = JSON.parse(localStorage.getItem('car'));
    render();
};
