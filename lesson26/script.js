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

            timerHour.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);
            if (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0) {
                document.querySelector('.timer-numbers').innerHTML = `<span>Акция закончилась!</span></span>`
                } 
            return;
        }
        //Add zero
        function addZero(n) {
            return (parseInt(n, 10) < 10  ? '0' : '') + n;
        }
        updateClock();
        setInterval(updateClock, 1000);
    }
    showTime('25 december 2020 19:00');
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
        } else if (target.matches('menu ul a')) {
            menu.classList.remove('active-menu');
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
            //sendForm();
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

//слайдер
const slider = () => {

    const slider = document.querySelector('.portfolio-content');
    const slide = document.querySelectorAll('.portfolio-item');
    //const btn = document.querySelectorAll('.portfolio-btn');
    let dot;
    let interval;
    let currentSlide = 0; 
    const createDots = () => {
        for (let i = 0; i < slide.length; i++) {
            dot = document.createElement('li');
            dot.classList.add('dot');
            document.querySelector('.portfolio-dots').append(dot);
        } 
    };
    createDots();
    dot = document.querySelectorAll('.dot');
    dot[0].classList.add('dot-active');
//номер слайда

    const prevSlide = (elem, index, strClass) => { //действие для слайда который будет меняться
        elem[index].classList.remove(strClass);
    };
//действие для следующего нового слайда 
    const nextSlide = (elem, index, strClass) =>{
        //без этого костыля не листает вперед после последнего слайда
        if(elem.length == currentSlide){
            index = 0;
            currentSlide = 0
        }
        elem[index].classList.add(strClass);

    };

    const autoPlaySlide = () =>{
        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');
        //console.log('currentSlide: ', currentSlide);
        currentSlide++;
        //дошли до конца => на первый слайд
        if(currentSlide >= slide.length || currentSlide >= dot.length){
            currentSlide=0;
        }
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');

    }
    const startSlide = (time = 3000) =>{
        interval = setInterval(autoPlaySlide, time);
    };

    slider.addEventListener('click' , (e) =>{
        e.preventDefault();

        let target = e.target;
        if(!target.matches('.portfolio-btn, .dot')) return;

        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');


        if(target.matches("#arrow-right")){
            currentSlide++
        } else if (target.matches("#arrow-left")){
            currentSlide--
        } else if (target.matches('.dot')){
            dot.forEach((elem, index) =>{
                if(elem === target){
                    currentSlide = index;
                }
            });
        }
        if(currentSlide>=slide.length){
            currentSlide === 0;
        } else if (currentSlide<0){
            currentSlide = slide.length-1;
        }
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    });
    startSlide(10000);

    const stopSlide = () =>{
        clearInterval(interval);
    };

    slider.addEventListener('mouseover', (e) =>{
        if(e.target.matches('.portfolio-btn, .dot')){
            stopSlide();
        }
    })
    slider.addEventListener('mouseout', (e) =>{
        if(e.target.matches('.portfolio-btn, .dot')){
            startSlide();
        }
    })

};
slider();

const imgToogle = ()=>{
    const commandPhotos = document.querySelectorAll('.command__photo');
    let arrSrc=[];
    for(let i=0;i<commandPhotos.length;i++){
        arrSrc[i]=commandPhotos[i].getAttribute('src');
    }
    commandPhotos.forEach((item,i)=>{
        item.addEventListener('mouseenter',(e)=>{
                e.target.src =e.target.dataset.img;
        });
        item.addEventListener('mouseleave',(e)=>{
                e.target.src=arrSrc[i];
        });
    });
};
imgToogle();


//разрешить ввод только цифр:
const calculatorHandler = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block');
    const calcType = document.querySelector('.calc-type'); //тип объекта
    const calcSquare = document.querySelector('.calc-square');// Общая площадь
    const calcCount = document.querySelector('.calc-count'); //Количество помещений
    const calcDay = document.querySelector('.calc-day');
    const calcTotal = document.getElementById('total');

    const calcInputs = calcBlock.querySelectorAll('input');
        calcInputs.forEach((block)=>{
            block.addEventListener('input', ()=> {
            block.value = block.value.replace (/[^+\d]/g, '');
        })
    });

    const countSum = () => {
        let total = 0;
        let dayValue = 1;
        let countValue = 1;

        const typeValue = calcType.options[calcType.selectedIndex].value; //что выбираем в select - тип помещения, у каждого свой прайт
        const squareValue = +calcSquare.value; // кол-во кв метров(по умолчанию 1)

        if(calcCount.value > 1){
            countValue += (calcCount.value - 1) / 10;
        }

        if(calcDay.value && calcDay.value  < 5){
            dayValue *=2;
        } else if(calcDay.value && calcDay.value < 10){
            dayValue *=1.5;
        }
        if(typeValue && squareValue){
            total = price * typeValue * squareValue * countValue * dayValue;
        } else {
            total === 0;
        }
        const animateTotal = (end, duration) => {
            let startTime = null;
            const step = (time) => {
            if (!startTime) startTime = time;
                const progress = Math.min((time - startTime) / duration, 1);
                calcTotal.textContent = Math.floor(progress * (end - 0) + 0);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
        animateTotal(total, 1500);
    };

    calcBlock.addEventListener('change', (e) => {
        let target = e.target;
        if(target.matches('select') || target.matches('input')){
            countSum();
        }
    })
};
calculatorHandler(100);

// send ajax form

const sendForm = () => {
    const errorMessage = 'Что-то пошло не так';
    const loadMessage = ' Загрузка';
    const successMessage = 'Спасибо! Мы с вами скоро свяжемся!';
    const form = document.querySelectorAll('form');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size:2rem';
    statusMessage.style.color = 'white';

  //валидация
    const nameForm = document.querySelectorAll('.form-name');
        [...nameForm].forEach((form)=>{
            form.addEventListener('input', ()=> {
            form.value = form.value.replace(/[^а-я ]/gi, '');
            });
        });
    const textForm = document.getElementById('form2-message');
        textForm.addEventListener('input', ()=> {
        textForm.value = textForm.value.replace(/[^а-я\d._^%$#!~@,-]/gi, '');
    });

    [...form].forEach((item)=>{
        item.addEventListener('submit', (event) => {
            event.preventDefault();
            item.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(item);
            let body = {};
            formData.forEach((val,key) => {
                body[key] = val;
            })
            postData(body, 
                ()=>{
                statusMessage.textContent = successMessage;
                },
                (error) => {
                console.error(error);
                statusMessage.textContent = errorMessage;
            });
            item.reset();
        });
        
    });

    const postData = (body, callback, errorData)=>{
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', ()=>{
            if(request.readyState !== 4){
                return;
            }
            if(request.status === 200){
                callback();
            } else {
                errorData(request.status)
            }
        });
        request.open('POST', './server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        
        request.send(JSON.stringify(body));
    }
}
sendForm();
