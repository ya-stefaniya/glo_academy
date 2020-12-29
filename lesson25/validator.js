class Validator{
    constructor({selector, pattern = {}, method}){
        /**селектор формы(айди, класс)
        //сам йдишник нам ничего не даст
        поэтому в конструкторе срау получаем элемент
        */
        this.form = document.querySelector(selector); 
        //кастомные шаблоны,которые сможем добавлять не трогая код валидатора
        this.pattern = pattern;
        //какие поля должны валидироваться и какие методы должны приминяться
        this.method = method; 
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'BUTTON' && item.type !== 'button';
        });
        //уникальная коллекция
        this.error = new Set();
    }
    init(){
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach(elem=> elem.addEventListener('change', this.checkIt.bind(this)));
    }
    isValid(elem){
        const validadorMethod = {
            notEmpty(elem){
                if(elem.value.trim() === '') {
                    return false;
                }
                return true;
            },
            //берет элем(текст) и сранивает с паттерном
            pattern(elem, pattern){
                return pattern.test(elem.value);
            }
        };
        /*определяем методы кот передает юзер
        элементы принимает на чендж а методы
        хранятся в константе метод
        */
        
        if(this.method){
            const method = this.method[elem.id];
            return method.every(item => validadorMethod[item[0]](elem, this.pattern[item[1]])); 
        }

        return true;
    }
    checkIt(event){
        //запускает проверку на валидность, если прошел, вызов метода success, если нет - error
    const target = event.target;
        if(this.isValid(target)){
            this.showSuccess(target);
            //если не будет, ошибки не будет
            this.error.delete(target);
        } else {
            this.showError(target)
            this.error.add(target);
        }
        console.error(this.error);

    }
    showError(elem){
        elem.classList.remove('success');
        elem.classList.add('error');
        //если повторная неуспешная валидация текст только один раз
        if(elem.nextElementSibling && elem.nextElementSibling.classList.contains("validator-error")) return;
    
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }
    showSuccess(elem){
        elem.classList.remove('error');
        elem.classList.add('success');
        if(elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')){
            elem.nextElementSibling.remove();
        }
    }

    applyStyle(){
        const style = document.createElement('style');
        style.textContent = `
        input.success {
               
            border:1px solid green;
            border-radius:3px;
        }
        input.error {
            box-shadow: 0px 0px 3px 0px rgba(255,0,0,1);
            border:1px solid red;
            border-radius:3px;
        }
        .validator-error{
            font-size:14px;
            color:red;
            font-family: sans-serif;
            margin-bottom:7px;
        }
    `;
        document.head.appendChild(style);
    }
    setPattern(){
        if(!this.pattern.phone){
            //this.pattern.phone = /^(\+375|80)(29|25|44|33)(\d{7})$/;
            this.pattern.phone =  /^\+?\d{8,16}$/;
        }
        if(!this.pattern.name){
            this.pattern.name =  /^([а-я])+$/gi;
        }
        if(!this.pattern.email){
            this.pattern.email = /^\w+@\w+.\w{2,3}$/;
            
        }
        
    }
}




