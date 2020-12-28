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
        const method = this.method[elem.id];
        if(method){
            return method.every(item => validadorMethod[item[0]](elem, this.pattern[item[1]])

            ); 
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
        console.log('this.error: ', this.error);

    }
    init(){
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach(elem=> elem.addEventListener('change', this.checkIt.bind(this)));
    }
    showError(elem){
        elem.classList.remove('success');
        elem.classList.add('error');
        //если повторная неуспешная валидация текст только один раз
        console.log('elem.nextElementSibling: ', elem.nextElementSibling);
        console.log('elem', elem);

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
        input.success{
            border: 1px solid green;
        }
        input.error{
            border: 1px solid red;
        }
        .validator-error{
            font-size: 12px;
            font-family: sans-serif;
            color: red;
        }
        `;
        document.head.appendChild(style);
    }
    setPattern(){
        if(!this.pattern.phone){
            this.pattern.phone = /^(\+375|80)(29|25|44|33)(\d{7})$/;
        }
        if(!this.pattern.email){
            this.pattern.email = /^\w+@\w+.\w{2,3}$/;
            
        }
        
    }
}




