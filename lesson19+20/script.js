window.addEventListener('DOMContentLoaded', () => {

    function showTime(deadline) {
        const timerHour = document.getElementById('timer-hours');
        const timerMinutes = document.getElementById('timer-minutes');
        const timerSeconds = document.getElementById('timer-seconds');
        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime();
            const dateNow = new Date().getTime(); //сейчас
            const timeRemaining = (dateStop - dateNow) / 1000;
            const seconds = Math.floor(timeRemaining % 60); //ceкунды
            const minutes = Math.floor((timeRemaining / 60) % 60);
            const hours = Math.floor((timeRemaining / 60) / 60);
            return {
                hours,
                minutes,
                seconds
            };
        }
        function updateClock() {
            const timer = getTimeRemaining();
            if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) {
            timerHour.textContent = '00';
            timerMinutes.textContent = '00';
            timerSeconds.textContent = '00';
            }
            timerHour.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);

        }
        //Add zero
        function addZero(n) {
            return (parseInt(n, 10) < 10  ? '0' : '') + n;
        }
        updateClock();
        setInterval(updateClock, 1000);
    }
    showTime('18 december 2020');
});
//меню
const toggleMenu = () => {
    const menu = document.querySelector('menu');
    const handleMenu = () => {
        menu.classList.toggle('active-menu');
    };

    document.body.addEventListener('click', (event)=>{
    let target = event.target;
    target = target.closest('.menu'); //иконка меню
    if(target) {//показываем актив-меню у род таргета есть .menu
        handleMenu();
    } else {
        target = event.target;
        if(target.closest('.close-btn')){
            handleMenu();
        } else if (target.closest('li')) {
            handleMenu();
        } else {
            target = event.target;
            target = target.closest('.active-menu');
            if(!target) {
                menu.classList.remove('active-menu');
            } else return;
        }
    }
});
}
toggleMenu();


//поп-ап меню
const togglePopUp = () => {
    const popup = document.querySelector('.popup');
    const popupBtn = document.querySelectorAll('.popup-btn');
    const popupClose = document.querySelector('.popup-close');
    let opacity = 0, intervalID;
    const fadeIn = () => {
        intervalID = requestAnimationFrame(fadeIn);
        if (opacity < 1) {
            opacity += 0.1;
            popup.style.opacity = opacity;
        } else {
            cancelAnimationFrame(intervalID);
        }
    };
    popupBtn.forEach(elem => {
        
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                //анимация только для экранов > 768
                if (document.documentElement.clientWidth > 768){
                opacity = 0;
                fadeIn();
                }
            });
        
    });
    popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
        opacity = 0;
    });
};
togglePopUp();

//плавный скролл
const scrollBtn = document.querySelector('main>a');
const menu = document.querySelector('menu');
const links = menu.querySelectorAll("ul>li>a");

scrollBtn.addEventListener("click", clickHandler);
for (const link of links) {
    link.addEventListener("click", clickHandler);
}

function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;
    scroll({
        top: offsetTop,
        behavior: "smooth"
    });
}
//табы
const tabs = () => {
    const tabHeader = document.querySelector('.service-header'); //контейнер
    const tabs = tabHeader.querySelectorAll('.service-header-tab'); // кнопки
    const tabContent = document.querySelectorAll('.service-tab'); // контент

    const toggleTabContent = (index) => {
        for (let i = 0; i < tabContent.length; i++) {
            if(index === i){
                tabs[i].classList.add('active');
                tabContent[i].classList.remove('d-none');
            } else {
                tabs[i].classList.remove('active');
                tabContent[i].classList.add('d-none');
            }
        }
    };
    tabHeader.addEventListener('click', (event) =>{
        let target = event.target;
        target = target.closest('.service-header-tab')
        if(target){
            tabs.forEach((item,i)=>{
                if(item === target){
                    toggleTabContent(i);
                }
            });               
        } 
        
    })
}
tabs();

