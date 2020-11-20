const money = 900; 
const income = '200'; 
const addExpenses = 'аренда, интернет, пиво, кошачий корм'; 
const deposit = true; 
const mission = 20000; 
const period = 12;
const budgetDay = money/30;


console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать - ${mission}$`);
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);




