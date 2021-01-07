'use strict';

import showTime from './modules/showTime'
import toggleMenu from './modules/toggleMenu'
import togglePopUp from './modules/togglePopUp'
import tabs from './modules/tabs'
import slider from './modules/slider'
import imgToogle from './modules/imgToogle'
import calculatorHandler from './modules/calculatorHandler'
import sendForm from './modules/sendForm'
import smoothScroll from './modules/smoothScroll'

    
showTime('3 january 2021 19:00');
//меню
toggleMenu();
//поп-ап меню
togglePopUp();
//табы
tabs();
//слайдер
slider();
//смена картинок
imgToogle();
//разрешить ввод только цифр:
calculatorHandler(100);
// send ajax form
sendForm();
//плавный скролл при клике на ссылки меню
smoothScroll();

//промисы и XMLHttpRequest
/**
 * new Promise((resolve, reject)=>{
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', ()=>{
                if(request.readyState !== 4){
                    return;
                }
                if(request.status === 200){
                    resolve();
                } else {
                    reject(request.status)
                }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            
            request.send(JSON.stringify(body));
        });
 */