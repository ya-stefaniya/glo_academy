'use strict'

const calculateResult = document.getElementById('start'); 
const addincomeButton = document.getElementsByTagName('button')[0]; 
const addexpencesButton = document.getElementsByTagName('button')[1]; 
const depositCheck = document.querySelector('#deposit-check'); 
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');  //Поля для ввода возможных доходов
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0]; 
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0]; 
const expensesDayValue = document.getElementsByClassName('expenses_day-value')[0]; 
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0]; 
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0]; 
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0]; 
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0]; 
const targetMonthValue = document.getElementsByClassName('target_month-value')[0]; 
const salaryAmount = document.querySelector('.salary-amount'); 
const incomeTitle = document.querySelector('.income-title'); 
const incomeAmount = document.querySelector('.income-amount'); 
let incomeItems = document.querySelectorAll('.income-items'); 
const expensesTitle = document.querySelector('.expenses-title '); 
let expensesItems = document.querySelectorAll('.expenses-items'); 
const additionalExpensesItem = document.querySelector('.additional_expenses-item'); 
const targetAmount = document.querySelector('.target-amount'); 
const depositBank = document.querySelector('.deposit-bank'); 
const depositAmount = document.querySelector('.deposit-amount'); 
const depositPercent = document.querySelector('.deposit-percent'); 
const periodSelect = document.querySelector('.period-select'); 
const periodAmount = document.querySelector('.period-amount'); 
const inputs = document.querySelectorAll('input') ;
let money;

class AppData {
    constructor(income, incomeMonth, addIncome, expenses, addExpenses, deposit, percentDeposit, moneyDeposit, budget, budgetDay, budgetMonth, expensesMonth){
    this.income={};
    this.incomeMonth= 0;
    this.addIncome=[];
    this.expenses= {};
    this.addExpenses= [];
    this.deposit= false;
    this.percentDeposit= 0;
    this.moneyDeposit=0;
    this.mission= 0;
    this.budget= 0;
    this.budgetDay= 0;
    this.budgetMonth= 0;
    this.expensesMonth= 0;
    }
    start(){
        this.budget = +salaryAmount.value;
        // this.getExpenses();
        // this.getIncomes();
        this.getExpInc();
        this.getExpensesMonth();
        this.getBudget();
        //this.getAddExpenses();
        //this.getAddIncome();
        this.getAddIncExp(additionalExpensesItem);
        this.getAddIncExp(additionalIncomeItem);    //length - 2    
        this.showResult();
    }
    reset(){
        //обнуляю объект и другие значения
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        budgetMonthValue.value = 0;
        budgetDayValue.value = 0;
        expensesMonthValue.value = 0;
        additionalExpensesValue.value = '';
        additionalIncomeValue.value = '';
        targetMonthValue.value = 0;
        incomePeriodValue.value = 0;
        periodSelect.addEventListener('input', ()=>{
            incomePeriodValue.value = 1;
        }); 
        let inputs = document.querySelectorAll('input');
            inputs.forEach.call(inputs, (box) => {
                box.value = '';
                box.disabled = false;
                });
            
            calculateResult.textContent = 'Рассчитать';
            //удаление добавленных через + строк с импутами
            if(incomeItems.length > 1){
                for(let i=1; i < incomeItems.length; i++){
                    incomeItems[i].parentNode.removeChild(incomeItems[i]);
                }
            }
            if(expensesItems.length > 1) {
                addincomeButton.style = 'display:block';
                for(let i=1; i < expensesItems.length; i++){
                    expensesItems[i].parentNode.removeChild(expensesItems[i]);
                }
            };
            //Возращаем кнопку плюсик
            addexpencesButton.style = 'display:block';
            //Возвращаем range на дефолт
            periodSelect.value = '1';
    }
    showResult(){
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
        periodSelect.addEventListener('input', () =>{
            incomePeriodValue.value = this.calcSavedMoney();
        });     
    }
    //универсальный метод для добавления строк по нажатию на плюс
    getIncomeExpBlock(money) {
        let startStr, button //income
       // money = incomeItems / expensesItems
        money.forEach(item => {
            startStr = item.className.split('-')[0];
            button = document.querySelector(`.${startStr}_add`);
        });
        const cloneItems = money[0].cloneNode(true);
        money[0].parentNode.insertBefore(cloneItems, button);
        const elems = cloneItems.childNodes;
        elems.forEach.call(elems, (elem) => {
            elem.value = ''; 
        });
        money = document.querySelectorAll(`.${startStr}-items`);
        if(money.length === 3){
            button.style.display = 'none';
        }
        
    }
    getAddIncExp(money){
        if(money.length > 1){
            money.forEach((item) => {
                let itemValue = item.value.trim();
                if ( itemValue !== ''){
                    this.addIncome.push(itemValue);
                }
            });
        } else {
            money = money.value.split(',');
            money.forEach((item)=>{
                if(item !== ''){
                    this.addExpenses.push(item);
                }
            });
        }
    }
    //универсальный метод для "Возможный доход" и "Возможные расходы" 
    getExpInc(){
        let count = (item) =>{
            const startStr = item.className.split('-')[0]; //expenses/income
            console.log('startStr: ', startStr);
            const titleItem = item.querySelector(`.${startStr}-title`).value;
            const cashItem = item.querySelector(`.${startStr}-amount`).value;
            if(titleItem !== '' && cashItem !== ''){
                this[startStr][titleItem] = +cashItem;
            }
        }
        incomeItems.forEach(count);
        expensesItems.forEach(count);
        for(let key in this.income){
            this.incomeMonth += +this.income[key];
        }
    }

    getExpensesMonth(){
        let sum = 0;
        if(arguments.length == 1) sum = 0; 
        for (let key in this.expenses){
            sum += this.expenses[key];
            this.expensesMonth = +sum;
        }
        return sum;
    }
    getBudget(){
        if(arguments.length == 1) return;
        this.budgetMonth = this.budget + +this.incomeMonth - +this.getExpensesMonth();
        this.budgetDay = Math.floor(this.budgetMonth/30);
    }
    getTargetMonth(){
    if(arguments.length == 1) return;
    return targetAmount.value/this.budgetMonth;             
    }
    getStatusIncome(){
        if (this.budgetDay>=1200){
            console.log('У вас высокий уровень дохода');
        } else if (this.budgetDay>=600){
            console.log('У вас средний уровень дохода');
        } else if (this.budgetDay>=0){
            console.log('У вас средний уровень дохода');
        } else  console.log('Что-то пошло не так');
    }
    getInfoDeposit(){
        if(this.deposit){
            do{
                this.percentDeposit = prompt('Какой годовой процент в банке?', '10');
            } while (this.percentDeposit.trim() === '' || !isNumber(+this.percentDeposit));
            do{
                this.moneyDeposit = prompt('Какая сумма депозита?', '1000');
            } while (this.moneyDeposit.trim() === '' || !isNumber(+this.moneyDeposit));
        }
    }
    calcSavedMoney(){
        if(arguments.length == 1) return;
        return this.budgetMonth * periodSelect.value;
    }  
    eventListeners(){
        periodSelect.addEventListener('input', ()=>{
            periodAmount.textContent = periodSelect.value;
        });
        addexpencesButton.addEventListener('click', ()=>{
            this.getIncomeExpBlock(expensesItems);
        });
        addincomeButton.addEventListener('click',  ()=>{
            this.getIncomeExpBlock(incomeItems)
        });
        calculateResult.addEventListener('click', () => {
            if(salaryAmount.value === ''){
                //если нет обязательной величины блок кнопки старт
                calculateResult.disabled ? calculateResult.disabled : !calculateResult.disabled;
            } else {
                calculateResult.disabled ? !calculateResult.disabled: calculateResult.disabled;
                this.start();
        
                //по нажатию на старт блокируем левую часть
                let allInputs = document.querySelectorAll('input');
                allInputs.forEach.call(allInputs, (input) => {
                    input.disabled = true;
                });
                //период должен работать после блокировки левой части?
                periodSelect.disabled = false;
                let btnStart = document.getElementById('start');
                let btnReset = document.getElementById('cancel');
                btnStart.style = 'display:none';
                btnReset.style = 'display:block';
                // // и меняем содержимое кнопки
                // calculateResult.textContent = 'Cбросить';
                //и вызываем reset(обнуление правой части)
                btnReset.addEventListener('click', ()=>{
                    this.reset();
                    btnStart.style = 'display:block';
                    btnReset.style = 'display:none';
                });
                
            }
        });
        document.addEventListener('input', () => {
            const nameInput = document.querySelectorAll('[placeholder="Наименование"]');
            const sumInput = document.querySelectorAll('[placeholder="Сумма"]');
            for(let i = 0; i<nameInput.length; i++){
                nameInput[i].value =  nameInput[i].value.replace(/[^А-Яа-яЁё ._?!@,-]/g, '');
            };
            for(let i = 0; i<sumInput.length; i++){
                sumInput[i].value =  sumInput[i].value.replace(/[^+\d]/g, '');
            }
        });
    };
};

const appData = new AppData();
appData.eventListeners()

//console.log('appData: ', appData);




/*
appData.showPeriod();



appData.getInfoDeposit();
*/
