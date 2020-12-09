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
    periodAmount = document.querySelector('.period-amount'),
    inputs = document.querySelectorAll('input') ;
let isNumber = function (n){
    return !isNaN(parseInt(n)) && isFinite(n);
};
let money;

const AppData = function(){
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
};

AppData.prototype.start = function(){
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncomes();
    this.getExpensesMonth();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();
    this.showResult();
};
AppData.prototype.reset = function(){
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
        inputs.forEach.call(inputs, function(box){
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
            addIncomeButton.style = 'display:block';
            for(let i=1; i < expensesItems.length; i++){
                expensesItems[i].parentNode.removeChild(expensesItems[i]);
            }
        };
        //Возращаем кнопку плюсик
        addExpenceButton.style = 'display:block';
        //Возвращаем range на дефолт
        periodSelect.value = '1';
};
AppData.prototype.showResult = function(){
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('input', ()=>{
        incomePeriodValue.value = _this.calcSavedMoney();
    });     
};
AppData.prototype.addExpensesBlock = function(){
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    let elems = cloneExpensesItems.childNodes;
    elems.forEach.call(elems, function(elem) {
        elem.value = ''; 
    });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, addExpenceButton);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
        addExpenceButton.style.display = 'none';
    }
    
};
AppData.prototype.getExpenses = function(){
    const _this = this;
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            _this.expenses[itemExpenses] = +cashExpenses;
        }
    
    });
},
AppData.prototype.getAddExpenses = function(){
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim();
        if(item !== ''){
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.addIncomesBlock = function(){
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, addIncomeButton);
    let elems = cloneIncomeItems.childNodes;
    elems.forEach.call(elems, function(elem) {
        elem.value = ''; 
    });
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
        addIncomeButton.style.display = 'none';
    }
};
AppData.prototype.getIncomes = function(){
    const _this = this;
    incomeItems.forEach(function(item){
        let itemIncomes = item.querySelector('.income-title').value;
        let cashIncomes = item.querySelector('.income-amount').value;
        if(itemIncomes !== '' && cashIncomes !== ''){
            _this.income[itemIncomes] = +cashIncomes;
        }
    });
    for(let key in this.income){
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getAddIncome = function(){
    const _this = this;
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if ( itemValue !== ''){
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExpensesMonth = function(){
    let sum = 0;
    if(arguments.length == 1) sum = 0; 
    for (let key in this.expenses){
        sum += this.expenses[key];
        this.expensesMonth = +sum;
    }
    return sum;
};
AppData.prototype.getBudget =  function(){
    if(arguments.length == 1) return;
    this.budgetMonth = this.budget + +this.incomeMonth - +this.getExpensesMonth();
    this.budgetDay = Math.floor(this.budgetMonth/30);
};
AppData.prototype.getTargetMonth =  function (){
if(arguments.length == 1) return;
return targetAmount.value/this.budgetMonth;             
};
AppData.prototype.getStatusIncome =  function(){
    if (this.budgetDay>=1200){
        console.log('У вас высокий уровень дохода');
    } else if (this.budgetDay>=600){
        console.log('У вас средний уровень дохода');
    } else if (this.budgetDay>=0){
        console.log('У вас средний уровень дохода');
    } else  console.log('Что-то пошло не так');
};
AppData.prototype.getInfoDeposit = function(){
    if(this.deposit){
        do{
            this.percentDeposit = prompt('Какой годовой процент в банке?', '10');
        } while (this.percentDeposit.trim() === '' || !isNumber(+this.percentDeposit));
        do{
            this.moneyDeposit = prompt('Какая сумма депозита?', '1000');
        } while (this.moneyDeposit.trim() === '' || !isNumber(+this.moneyDeposit));
    }
};
AppData.prototype.calcSavedMoney = function(){
    if(arguments.length == 1) return;
    return this.budgetMonth * periodSelect.value;
};


AppData.prototype.eventListeners = function(){
    periodSelect.addEventListener('input', ()=>{
        periodAmount.textContent = periodSelect.value;
    });
    addExpenceButton.addEventListener('click', this.addExpensesBlock);
    addIncomeButton.addEventListener('click', this.addIncomesBlock);
    const _this = this;
    calculateResult.addEventListener('click', function(){
        if(salaryAmount.value === ''){
            //если нет обязательной величины блок кнопки старт
            calculateResult.disabled ? calculateResult.disabled : !calculateResult.disabled;
        } else {
            calculateResult.disabled ? !calculateResult.disabled: calculateResult.disabled;
            _this.start();
    
            //по нажатию на старт блокируем левую часть
            let allInputs = document.querySelectorAll('input');
            allInputs.forEach.call(allInputs, function(input){
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
                _this.reset();
                btnStart.style = 'display:block';
                btnReset.style = 'display:none';
            });
            
        }
    });
    document.addEventListener('input', function(){
        let nameInput = document.querySelectorAll('[placeholder="Наименование"]');
        let sumInput = document.querySelectorAll('[placeholder="Сумма"]');
        for(let i = 0; i<nameInput.length; i++){
            nameInput[i].value =  nameInput[i].value.replace(/[^А-Яа-яЁё ._?!@,-]/g, '');
        };
        for(let i = 0; i<sumInput.length; i++){
            sumInput[i].value =  sumInput[i].value.replace(/[^+\d]/g, '');
        }
    });

};
const appData = new AppData();
appData.eventListeners()

console.log('appData: ', appData);





/*
appData.showPeriod();



appData.getInfoDeposit();
*/
