'use strict'

//task1
let arr1 = ['555','56', '453', '234', '23', '87', '432'];
const newArray = arr1.filter(el => el.charAt(0).match(/[2,4]+/g));

console.log(newArray);

//task2


for (let i = 0; i <= 100; i++) {
    let isPrime = true;
    for (var j = 2; j <= i; j++) {
        if (i%j===0 && j!==i) {
            isPrime = false;
        }
    }
    if (isPrime === true) {
        console.log(`${i} делится на 1 и ${i}`);
    }
}


