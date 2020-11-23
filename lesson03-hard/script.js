'use strict'


//1) через if
let daysRu = ['Понедельник', 'Вторник' ,'Среда', 'Четверг' ,'Пятница','Суббота' ,'Воскресенье'];
let daysEn = ['Monday', 'Tuesday', 'Wednesday' ,'Thursday', 'Friday', 'Saturday', 'Sunday'];

let lang1 = prompt('1)Введите ru или en', '');

if(lang1 == 'ru'){
    console.log(`1 метод:${daysRu.toString()}`);
} else if (lang1 == 'en') {
    console.log(`1 метод:${daysEn.toString()}`);
} else {
    console.log('no language code detected');
}

 //2) через switch-case 
let lang2 = prompt('2)Введите ru или en', '');
switch (lang2){
    case 'ru':
        console.log(`2 метод:${daysRu.toString()}`);
    break;
    case 'en':
        console.log(`2 метод:${daysEn.toString()}`);
    break;
    default:
    console.log('no language code detected');
    break;
}

//3 через многомерный массив без ифов и switch
let lang3 = prompt('3)Введите ru или en', '');
let days = [['Понедельник', 'Вторник' ,'Среда', 'Четверг' ,'Пятница','Суббота' ,'Воскресенье'], ['Monday', 'Tuesday', 'Wednesday' ,'Thursday', 'Friday', 'Saturday', 'Sunday']];
lang3 == 'ru' ?  console.log(`3 способ: ${days[0]}`) : console.log(`3 способ:  ${days[1]}`);

//Задача №2

let position, status;
const nameInput = prompt('Назовите имя.', '');

position = (nameInput == 'Артем') ? 'преподаватель' : 'директор'; 
status = (nameInput == 'Maксим' || 'Артем') ?  console.log(`${position}`) : console.log(' студент');





