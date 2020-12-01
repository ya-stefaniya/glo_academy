'use strict'

let calculateResult = document.getElementById('#start'),
    addIncomeButton = document.getElementsByTagName('button')[0],
    addExpenceButton = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'), //Поля для ввода возможных доходов
    budgetDayValue = document.getElementsByClassName('budget_day-value'),
    expensesMonthValue = document.getElementsByClassName('expenses_month-value'),
    additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
    incomePeriodValue = document.getElementsByClassName('income_period-value'),
    targetMonthValue = document.getElementsByClassName('target_month-value'),

    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title '),
    expensesAmount = document.querySelector('.expenses-amount'),
    additionalExpensesTitle = document.querySelector('.additional_expenses-title'),
    targetAmount = document.querySelector('.target-amount'),
    
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

    periodSelect = document.querySelector('.period-select'),


let isNumber = function (n){
    return !isNaN(parseInt(n)) && isFinite(n);
};
let money,
    start = function(){
        do {
            money = prompt('Ваш месячный доход?', '10000');
        } while (!isNumber(money) || money.trim() === '');
};
start();

let appData ={
    income:{},
    addIncome:[],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit:0,
    mission: 60000,
    period:3,
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
        
    asking: function(){
        let itemIncome, cashIncome, expensesItem, answer, addExpenses;
        if (confirm('У Вас есть дополнительный источник заработка?')) {
            itemIncome = prompt('Какой у Вас дополнительный заработок?','пишу статьи');
            do{
                cashIncome = prompt('Сколько вы на этом зарабатываете в месяц?', '500');
            } while (!isNumber(cashIncome) || cashIncome.trim() === '');
            appData.income[itemIncome] = cashIncome;
        };

        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую.');
        appData.addExpenses = addExpenses.toString().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i=0; i<2; i++){
            do{
                expensesItem = prompt('Введите обязательную статью расходов.');
            }
            while(!expensesItem.match(/^[a-zа-яё\s]+$/iu) || expensesItem.trim() === '');
            do {
                answer = prompt('Во сколько обойдется?', '500');
            } while(!isNumber(answer) || answer.trim() === '');
            appData.expenses[expensesItem] = +answer;
        }
    },
    getExpensesMonth: function(){
        let sum = 0;
        for (let key in appData.expenses){
            sum += appData.expenses[key];
            appData.expensesMonth = +sum;
        }
        return sum;
    },
    getBudget: function(){
        appData.budgetMonth = appData.budget - appData.getExpensesMonth();
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
    },
    getTargetMonth: function (){
        let result = Math.ceil(appData.mission/appData.budgetMonth);
        if (result < 0) {
            console.log('Цель не будет достигнута');
        } else {
            console.log(`Цель будет достигнута через ${result} месяцев`);
        }
        return result;
    },
    getStatusIncome: function(){
        if (appData.budgetDay>=1200){
            console.log('У вас высокий уровень дохода');
        } else if (appData.budgetDay>=600){
            console.log('У вас средний уровень дохода');
        } else if (appData.budgetDay>=0){
            console.log('У вас средний уровень дохода');
        } else  console.log('Что-то пошло не так');
    },
    getInfoDeposit: function(){
        if(appData.deposit){
            do{
                appData.percentDeposit = prompt('Какой годовой процент в банке?', '10');
            } while (appData.percentDeposit.trim() === '' || !isNumber(+appData.percentDeposit));
            do{
            appData.moneyDeposit = prompt('Какая сумма депозита?', '1000');
            } while (appData.moneyDeposit.trim() === '' || !isNumber(+appData.moneyDeposit));
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};
//console.log(appData);
appData.asking();
appData.getExpensesMonth();
console.log(`Расходы за месяц: ${appData.getExpensesMonth()}`);
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();


let newArr = appData.addExpenses.map(item => item.charAt(0).toUpperCase() + item.substr(1));
console.log(newArr.join(', '));

for (let item in appData){
    console.log( `Наша программа включает в себя данные: ${item}: ${appData[item]}`);
}
appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());