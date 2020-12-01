let time = document.getElementById('time'),

    fulldate = document.getElementById('full-date'),
    shortdate = document.getElementById('short-date'),

    weekday = document.getElementById('weekday'),
    month = document.getElementById('month'),
    day = document.getElementById('day'),
    year = document.getElementById('year'),

    days = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота ","Воскресенье"],
    monthNames = ['Января' , 'Февраля' , 'Марта' , 'Апреля' , 'Мая' , 'Июня' , 'Июля' , 'Августа' , 'Сентября' , 'Октября' , 'Ноября' , 'Декабря'];
    //Show time

showTime = () => {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds(),
        weekday = days[today.getDay()-1],
        month = monthNames[today.getMonth()],
        monthNumber = today.getMonth()+1;
        day = today.getDate(),
        year = today.getFullYear();

        

        //проверяем наличие второй цифры и ее забираем
        hourDigit =  (hour.toString()[1]) ? (hour.toString()[1]) : hour.toString();
        minuteDigit = (min.toString()[1]) ? (min.toString()[1]) : min.toString();
        secondDigit = (sec.toString()[1]) ? (sec.toString()[1]) : sec.toString();


        // в зависимости от цифры назчначаем слово
        if (hourDigit === '1'){
            hourWord = 'час';
        } else if (hourDigit >=2 && hourDigit < 5){
            hourWord = 'часа'
        } else  hourWord = 'часов'

        if (minuteDigit === '1'){
            minWord = 'минут';
        } else if (minuteDigit >=2 && minuteDigit < 5){
            minWord = 'минуты'
        } else  minWord = 'минут'

        if (secondDigit === '1'){
            secWord = 'секунда';
        } else if (secondDigit >=2 && secondDigit < 5){
            secWord = 'секунды'
        } else  secWord = 'секунд'

    fulldate.innerHTML = `Сегодня ${weekday}, ${day} ${month} ${year} года, ${hour} ${hourWord} ${min} ${minWord} ${sec} ${secWord}`
    setTimeout(showTime, 1000);

    //'04.02.2020 - 21:05:33' 
    shortdate.innerHTML = `${addZero(monthNumber)}.${addZero(day)}.${year} - ${hour}:${addZero(min)}:${addZero(sec)}`
}

//Add zero
addZero = n =>{
    return (parseInt(n, 10) < 10  ? '0' : '') + n;
}
//Run
showTime();