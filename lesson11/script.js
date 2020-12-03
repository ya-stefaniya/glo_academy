'use strict'


let calculateResult = document.getElementById('start'),

    addIncomeButton = document.getElementsByTagName('button')[0],
    addExpenceButton = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'), //Поля для ввода возможных доходов
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesDayValue = document.getElementsByClassName('expenses_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],

    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    incomeItems = document.querySelectorAll('.income-items'),

    expensesTitle = document.querySelector('.expenses-title '),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),

    targetAmount = document.querySelector('.target-amount'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');



let isNumber = function (n){
    return !isNaN(parseInt(n)) && isFinite(n);
};
let money;
let appData ={
    income:{},
    incomeMonth: 0,
    addIncome:[],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit:0,
    mission: 60000,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start:function(){
        //если нет данных в поле Месячный доход
        
        
            appData.budget = +salaryAmount.value;
            appData.getExpenses();
            appData.getIncomes();
    
            appData.getExpensesMonth();
            appData.getBudget();
            appData.getAddExpenses();
            appData.getAddIncome();
            appData.showResult();
      
    },
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.ceil(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        console.log('targetMonthValue.value: ', targetMonthValue.value);
        incomePeriodValue.value = appData.calcSavedMoney();
        periodSelect.addEventListener('input', ()=>{
            incomePeriodValue.value = appData.calcSavedMoney();
        });     
     
    },
    addExpensesBlock: function(){
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, addExpenceButton);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            addExpenceButton.style.display = 'none';
        }
    },
    getExpenses: function(){
        expensesItems.forEach(function(item){
           let itemExpenses = item.querySelector('.expenses-title').value;
           let cashExpenses = item.querySelector('.expenses-amount').value;
           if(itemExpenses !== '' && cashExpenses !== ''){
               appData.expenses[itemExpenses] = +cashExpenses;
           }
        });
    },
    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
    addIncomesBlock: function(){
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, addIncomeButton);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            addIncomeButton.style.display = 'none';
        }
    },
    getIncomes: function(){
        incomeItems.forEach(function(item){
           let itemIncomes = item.querySelector('.income-title').value;
           let cashIncomes = item.querySelector('.income-amount').value;
           if(itemIncomes !== '' && cashIncomes !== ''){
               appData.income[itemIncomes] = +cashIncomes;
           }
        });
        for(let key in appData.income){
         appData.incomeMonth += +appData.income[key];
         
        }
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if ( itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
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
        appData.budgetMonth = appData.budget + +appData.incomeMonth - +appData.getExpensesMonth();
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
    },
    getTargetMonth: function (){
       return targetAmount.value/appData.budgetMonth;             
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
        return appData.budgetMonth * periodSelect.value;
    },
    showPeriod: function(){
        periodSelect.addEventListener('input', ()=>{
            periodAmount.textContent = periodSelect.value;
        });

    }
};
appData.showPeriod();

calculateResult.addEventListener('click', ()=>{
    if(salaryAmount.value === ''){
        calculateResult.disabled ? calculateResult.disabled : !calculateResult.disabled;
    } else {
        calculateResult.disabled ? !calculateResult.disabled: calculateResult.disabled;
        appData.start();

    }
});
//console.log(calculateResult.disabled);
//calculateResult.addEventListener('click', appData.start);
addExpenceButton.addEventListener('click', appData.addExpensesBlock);
addIncomeButton.addEventListener('click', appData.addIncomesBlock);



let newArr = appData.addExpenses.map(item => item.charAt(0).toUpperCase() + item.substr(1));

appData.getInfoDeposit();
