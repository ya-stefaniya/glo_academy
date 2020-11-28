'use strict'
let isNumber = function (n){
    return !isNaN(parseInt(n)) &&  isFinite(n);
};
let money,
    start = function(){
        do {
            money = prompt('Ваш месячный доход?', '');
        } while (!isNumber(money) || money.trim() === '');
};
start();

let addData ={
    income:{},
    addIncome:[],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 60000,
    period:3,
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
        
    asking: function(){
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
        addData.addExpenses = addExpenses.toString().split(', ');
        addData.deposit = confirm('Есть ли у вас депозит в банке?');
        let expensesItem, answer;
        for (let i=0; i<2; i++){
            expensesItem = prompt('Введите обязательную статью расходов.');
            do {
                answer = prompt('Во сколько обойдется?', '');
            }
            while(!isNumber(answer) || answer.trim() === '');
            addData.expenses[expensesItem] = +answer;
        }
    },
    getExpensesMonth: function(){
        let sum = 0;
        for (let key in addData.expenses){
            sum += addData.expenses[key];
            addData.expensesMonth = +sum;
        }
        return sum;
       
    },
    getBudget: function(){
        addData.budgetMonth = addData.budget - addData.getExpensesMonth();
        addData.budgetDay = Math.floor(addData.budgetMonth/30);
    },
    getTargetMonth: function (){
        let result = Math.ceil(addData.mission/addData.budgetMonth);
        if (result < 0) {
            console.log('Цель не будет достигнута');
        } else {
            console.log(`Цель будет достигнута через ${result} месяцев`);
        }
        return result;
    },
    getStatusIncome: function(){
        if (addData.budgetDay>=1200){
            console.log('У вас высокий уровень дохода');
        } else if (addData.budgetDay>=600){
            console.log('У вас средний уровень дохода');
        } else if (addData.budgetDay>=0){
            console.log('У вас средний уровень дохода');
        } else  console.log('Что-то пошло не так');
     }
};
//console.log(addData);
addData.asking();
addData.getExpensesMonth();
console.log(`Расходы за месяц: ${addData.getExpensesMonth()}`);
addData.getBudget();
addData.getTargetMonth();
addData.getStatusIncome();

for (let item in addData){
    console.log( `Наша программа включает в себя данные: ${item}: ${addData[item]}`);
}
