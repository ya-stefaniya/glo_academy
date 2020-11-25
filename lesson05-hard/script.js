'use strict'

//task1
let arr1 = ['555','56', '453', '234', '23', '87', '432'];
const newArray = arr1.filter(el => el.charAt(0).match(/[2,4]+/g));

console.log(newArray);

//task2

function isPrime(num) {
    for ( var i = 2; i < num; i++ ) {
        if ( num % i === 0 ) {
            return false;
        }
    }
    return true;
}

function display(n) {
    var arr = [2];
    let prime;
    for ( var i = 3; i < n; i+=2 ) {
        prime = i;
        if ( isPrime(i) ) {
            arr.push(i);
        }
    }
    let newArr = arr.join(' делится на 1"\r\n"');
    //let newArr2 = newArr.join('\r\n');
    console.log(newArr); 
}

display(100);