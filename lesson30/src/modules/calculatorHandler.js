const calculatorHandler = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block');
    const calcType = document.querySelector('.calc-type'); //тип объекта
    const calcSquare = document.querySelector('.calc-square');// Общая площадь
    const calcCount = document.querySelector('.calc-count'); //Количество помещений
    const calcDay = document.querySelector('.calc-day');
    const calcTotal = document.getElementById('total');

    const calcInputs = calcBlock.querySelectorAll('input');
        calcInputs.forEach((block)=>{
            block.addEventListener('input', ()=> {
            block.value = block.value.replace (/[^+\d]/g, '');
        })
    });

    const countSum = () => {
        let total = 0;
        let dayValue = 1;
        let countValue = 1;

        const typeValue = calcType.options[calcType.selectedIndex].value; //что выбираем в select - тип помещения, у каждого свой прайт
        const squareValue = +calcSquare.value; // кол-во кв метров(по умолчанию 1)

        if(calcCount.value > 1){
            countValue += (calcCount.value - 1) / 10;
        }

        if(calcDay.value && calcDay.value  < 5){
            dayValue *=2;
        } else if(calcDay.value && calcDay.value < 10){
            dayValue *=1.5;
        }
        if(typeValue && squareValue){
            total = price * typeValue * squareValue * countValue * dayValue;
        } else {
            total === 0;
        }
        const animateTotal = (end, duration) => {
            let startTime = null;
            const step = (time) => {
            if (!startTime) startTime = time;
                const progress = Math.min((time - startTime) / duration, 1);
                calcTotal.textContent = Math.floor(progress * (end - 0) + 0);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
        animateTotal(total, 1500);
    };

    calcBlock.addEventListener('change', (e) => {
        let target = e.target;
        if(target.matches('select') || target.matches('input')){
            countSum();
        }
    })
};
export default calculatorHandler;