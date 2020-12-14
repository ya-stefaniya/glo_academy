/* eslint-disable no-undef */
let days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота ", "Воскресенье"];
const fulldate = document.querySelector('.fulldate');
const weekDayText = document.querySelector('.week_day');
const greetText = document.querySelector('.greet');
const timeText = document.querySelector('.time');
const newYearText = document.querySelector('.new_year');

showTime = () => {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds(),
        weekday = days[today.getDay() - 1],
        greet,
        dateStop = new Date('31 december 2020').getTime();
        

    // Set AM or PM
    const amPm = hour >= 12 ? 'PM' : 'AM';
    console.log('dateStop: ', dateStop);
    
    if (hour < 12) {
    greet = 'Доброе утро!'
    } else if (hour < 18) {
    greet = 'Добрый день!'
    } else  greet = 'Добрый вечер!'

     // 12hr Format
    hour = hour % 12 || 12;
    // Days left to deadline 
    let timeRemaining = (dateStop - today) / 1000;
    let daysToDeadline = Math.floor(timeRemaining / 60 / 60 / 24)

    //Add zero
    addZero = n => (parseInt(n, 10) < 10  ? '0' : '') + n
    greetText.textContent =  `${greet}`
    weekDayText.textContent = `Сегодня: ${weekday}`
    timeText.textContent = `Текущее время: ${addZero(hour)}:${addZero(min)}:${addZero(sec)}  ${amPm}`
    newYearText.textContent = `До нового года осталось ${daysToDeadline} дней!`;

    setTimeout(showTime, 1000);
 
};

//Run
showTime();

