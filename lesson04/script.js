'use strict'


let money = 900; 
const income = '200'; 
let addExpenses = 'аренда, интернет, пиво, кошачий корм'; 
let deposit = true; 
const mission = 2000000; 
const period = 12;
let budgetDay;
let amount1, amount2;

let showTypeoOf = function(data){
    console.log(data, typeof(data));
};
showTypeoOf(money);
showTypeoOf(income);
showTypeoOf(deposit);

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


function getExpensesMonth(){
    return +amount1 + +amount2;
};
console.log('Вомзножные расходы за месяц:', getExpensesMonth());

function getAccumulatedMonth(inc, getExpenses){
    return inc - getExpenses;
};
const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));


function getTargetMonth(mission, monthInc){
    return Math.ceil(mission/monthInc);
}

console.log(`Цель будет достигнута через ${getTargetMonth(mission, accumulatedMonth)} месяцев`);

budgetDay = Math.floor(accumulatedMonth/30);
console.log('Бюджет на день: ', budgetDay);

let getStatusIncome = function(){
    if (budgetDay>=1200){
        console.log('У вас высокий уровень дохода');
    } else if (budgetDay>=600){
        console.log('У вас средний уровень дохода');
    } else if (budgetDay>=0){
        console.log('У вас средний уровень дохода');
    } else  console.log('Что-то пошло не так');
 }

 getStatusIncome();