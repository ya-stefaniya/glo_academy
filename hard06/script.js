let isNumber = function (n){
    return !isNaN(parseInt(n)) && isFinite(n);
};
function guessNumber(){
    let n = Math.floor(Math.random() * 100);
    let counter = 10;
    console.log('n: ', n);
    function checkNumber(n){
        console.log('counter: ', counter);
        let answer, check, сounter;
        answer = prompt( `Угадай число от 1 до 100, у вас ${counter} попыток`, '');
        //нажимает отмену сразу
        if (answer === null){
            alert('Игра окончена!')
        //вводим букву или пробел
        } else if (!isNumber(answer) || answer.trim()===''){
            check = confirm('Введи число!');
            //нажимает ок -> продолжаем
            if (check){
                checkNumber(n);
            //нажимаем отмена
            } else {
                alert('Игра окончена!'); 
            }
        } else {
            if (+answer !== n) {
                counter--;
                +answer < n ? alert(`Загаданное число больше, у вас ${counter} попыток.`): alert(`Загаданное число меньше, у вас ${counter} попыток.`);
                if (counter === 0) {
                    if (confirm('Game over! Хотели бы сыграть еще?')){
                        guessNumber()
                    } else return ; 
                    
                } else {
                    checkNumber(n);
                
                }
            } else {
                confirm('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?');
                if (confirm ) guessNumber();
            }
        }
    }
    checkNumber(n);
}
let number = guessNumber();



