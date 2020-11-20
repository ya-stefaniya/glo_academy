const num = 266219;

calcNum = num => {
 const multipliedNum = num.toString().split('').reduce((sum,i)=>sum*i)**3;
 return +multipliedNum.toString().substr(0,2);
};

console.log(calcNum(num));
