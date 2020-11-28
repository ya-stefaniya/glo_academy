'use strict'
let container = document.querySelector('.week');
let today = new Date().getDay();
let week = ["понедельник","вторник","среда","четверг","пятница","суббота","воскресенье"];
for (let i = 0; i < week.length; i++) {
    let day = document.createElement('p');
    day.innerHTML = week[i];

    if ( (week[i] == week[today-1]) && (week[i].match(/субб|воск/))){
        day.innerHTML =  `<b><i>${week[i]}</i></b>` 
    } else if (week[i].match(/субб|воск/)){
        day.innerHTML =  `<i>${week[i]}</i>` 
    } else if (week[i] == week[today-1]){
        day.innerHTML =  `<b>${week[i]}</b>` 
    };
    container.appendChild(day);
};

