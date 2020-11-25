'use strict'
let isNumber = function (n){
    return !isNaN(parseInt(n)) &&  isFinite(n);
};

let money = 900; 
const income = '200'; 
let addExpenses = 'аренда, интернет, пиво, кошачий корм'; 
let deposit = true; 
const mission = 2000000; 
const period = 12;
let budgetDay;
let amount1, amount2, expenses;

let showTypeoOf = function(data){
    console.log(data, typeof(data));
};
showTypeoOf(money);
showTypeoOf(income);
showTypeoOf(deposit);

let start = function(){
    do {
        money = prompt('Ваш месячный доход?', '');
    } while (!isNumber(money) || money.trim() === '');
};
start();


addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
console.log(addExpenses.toString().split(', '));
deposit = confirm('Есть ли у вас депозит в банке?');

let getExpensesMonth = function(){
    let sum = 0, answer;

    for (let i=0; i<2; i++){
        expenses = prompt('Введите обязательную статью расходов.');
        do {
            answer = prompt('Во сколько обойдется?', '');
            sum ? sum = sum + +answer : sum = +answer;
        }
        while(!isNumber(sum) || answer.trim() === '');
    }
    return sum;
};


let expensesAmount =  getExpensesMonth();

console.log('Возможные расходы за месяц:', expensesAmount);

function getAccumulatedMonth(inc, getExpenses){
    return inc - getExpenses;
};

const accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

let getTargetMonth = function (mission, monthInc){
    let result = Math.ceil(mission/monthInc);;
    if (result < 0) {
        console.log('Цель не будет достигнута');
    } else {
        console.log(`Цель будет достигнута через ${result} месяцев`);
    }
    return result;
}
getTargetMonth(mission, accumulatedMonth);
 

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
