let isNumber = function (n){
    return !isNaN(parseInt(n)) && isFinite(n);
};
function guessNumber(){
    
    let n = Math.floor(Math.random() * 100);
    console.log('n: ', n);
    function checkNumber(n){
        let answer, check;
        answer = prompt('Угадай число от 1 до 100', '');
        //нажимает отмена сразу
        if (answer === null){
            alert('Игра окончена!')
        //вводим буква или пробел
        } else if (!isNumber(answer) || answer.trim()===''){
            check = confirm('Введи число!');
            //нажимает ок -> продлолжаем
            if (check){
                checkNumber(n);
            //нажимаем отмена
            } else {
                alert('Игра окончена!'); 
            }
        } else {
            if (+answer !== n) {
                +answer < n ? alert('Загаданное число больше'): alert('Загаданное число меньше');
                checkNumber(n);
            } else {
                alert('Поздравляю, Вы угадали!!!');
            }
        }
    }
    checkNumber(n);
}
let number = guessNumber();



