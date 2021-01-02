const sendForm = () => {
    const errorMessage = 'Что-то пошло не так';
    const successMessage = 'Спасибо! Мы с вами скоро свяжемся!';
    const form = document.querySelectorAll('form');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size:2rem';
    statusMessage.style.color = 'white';

  //валидация
    const nameForm = document.querySelectorAll('.form-name');
        [...nameForm].forEach((form)=>{
            form.addEventListener('input', ()=> {
            form.value = form.value.replace(/[^а-я ]/gi, '');
            });
        });
    const textForm = document.getElementById('form2-message');
        textForm.addEventListener('input', ()=> {
        textForm.value = textForm.value.replace(/[^а-я\d._^%$#!~@,-]/gi, '');
    });
    //проверяем наличие required в email
    const emailForm = document.querySelectorAll('.form-email');
    [...emailForm].forEach((item)=>{
        !item.required ? item.required = true : item.required;
    });
    [...form].forEach((item)=>{
        item.addEventListener('submit', (event) => {
            
            event.preventDefault();
            item.append(statusMessage);
            statusMessage.textContent = ''
            
            //добавляем спиннер на стр
            const loader = document.createElement('div');
            loader.classList.add('sk-three-bounce');
            const dot = document.createElement('div');
            dot.classList.add('sk-bounce-dot');
            loader.appendChild(dot);
            let dot2 = dot.cloneNode(true);
            let dot3 = dot.cloneNode(true);
            item.appendChild(loader);
            loader.appendChild(dot2);
            loader.appendChild(dot3);
            const formData = new FormData(item);
            let body = {};
            formData.forEach((val,key) => {
                body[key] = val;
            })
            postData(body)
                .then((response)=>{
                    if(response.status !== 200){
                        throw new Error('status network not 200')
                    }
                loader.remove();
                statusMessage.textContent = successMessage;
                })                
                .catch((error) => {
                console.error(error);
                setTimeout(()=>{
                    loader.remove();
                    statusMessage.textContent = errorMessage;
                }, 1500);       
            });
            item.reset();
            setTimeout(()=>{
                statusMessage.textContent = '';
            }, 5000);
        });
        
    });

    const postData = (body)=>{
        return fetch('./server.php',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }
}

export default sendForm;