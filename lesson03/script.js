'use strict'


let money = 900; 
const income = '200'; 
let addExpenses = 'аренда, интернет, пиво, кошачий корм'; 
let deposit = true; 
const mission = 2000000; 
const period = 12;
let budgetDay;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель - заработать ${mission}$`);


let amount1, amount2;
//делаю проверку на число, т.к. Максим в видео к уроку говорил о такой проверке
//я не придумала, как можно объеденить все проверку в одну, буду рада подсказке
do {
    money = prompt('Ваш месячный доход?', '');
    if (money === '' || isNaN(money)) {
    alert('Было введено не число, попробуйте еще раз');
    }
} while (isNaN(money));


addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
console.log(addExpenses.toLowerCase().split(', '));
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов.');
do {
        amount1 = prompt('Во сколько это обойдется?', '');
        if (amount1 === '' || isNaN(amount1)) {
        alert('Было введено не число, попробуйте еще раз');
        }
} while (isNaN(amount1));

    
let expenses2 = prompt('Введите еще одну обязательную статью расходов.');
do {
    amount2 = prompt('А это во сколько обойдется?', '');
    if (amount2 === '' || isNaN(amount2)) {
    alert('Было введено не число, попробуйте еще раз');
    }
} while (isNaN(amount2));

let budgetMonth = +money - (parseFloat(amount1) + parseFloat(amount2));
console.log('Ваш бюджет на месяц: ', budgetMonth);

console.log(`Цель будет достигнута через ${Math.ceil(mission/budgetMonth)} месяцев`);

budgetDay = Math.floor(budgetMonth/30);
console.log('Бюджет на день: ', budgetDay);

if (budgetDay>=1200){
    console.log('У вас высокий уровень дохода');
} else if (budgetDay>=600){
    console.log('У вас средний уровень дохода');
} else if (budgetDay>=0){
    console.log('У вас средний уровень дохода');
} else  console.log('Что-то пошло не так');
