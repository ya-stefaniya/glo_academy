'use strict';
let input = document.querySelector('input');
let output = document.querySelector('p');

function debounce(callback, time) {
    return function (args) {
        let previousCall = this.lastCall;
        this.lastCall = Date.now();

        this.lastCallTimer = setTimeout(() => callback(args), time);
        console.log(this.lastCall - previousCall);
        if (previousCall && ((this.lastCall - previousCall) <= time)) {
            clearTimeout(this.lastCallTimer);
        }
    }
}
const showText = () => {
    output.textContent = '';
    setTimeout(() => {
        output.textContent = input.value;
    }, 300);
}

input.addEventListener('input', debounce(showText, 700));