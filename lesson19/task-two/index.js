// Вызов функции 
// даст нам результат =>>> [6,1,1,1,0,1,0] 
// (т.е. справа от числа 15 в массиве есть шесть (6) чисел, которые меньше 15; справа от числа 1 в массиве есть одно (1) число, меньше 1, и т.д.)
let answerArr = [];
let funcNum = function(arr){
    //let answerArr = [];
    let smallerNum = [];
    //массив их элементов, которые меньше первого
    smallerNum = arr.filter(num => num<arr[0]);
    //длинна массива [n] добавляется в финальный массив
    answerArr.push(smallerNum.length);
    //убираем первый элемент в оригинальном массиве
    arr = arr.slice(1, arr.length+1);
    return (arr.length < 1) ? answerArr : funcNum(arr);
}

console.log( funcNum([15,1,2,3,0,12,4]));
