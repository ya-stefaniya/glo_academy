document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output'),
        file = './cars.json';

    const getData = (url) => {
        return new Promise((resolve, reject)=>{
            const request = new XMLHttpRequest();
            request.open('GET', url);
            request.addEventListener('readystatechange', () =>{
                if(request.readyState !== 4){
                    return
                }
                if (request.status === 200) {
                    const response = JSON.parse(request.responseText);
                    resolve(response);
                } else  {
                    reject(request.statusText)
                }
            });
            request.send();
        });
    }
    select.addEventListener('change', ()=>{
    getData(file)
        .then((data)=>{
            data.cars.forEach(item => {
                if (item.brand === select.value) {
                    const {brand, model, price} = item;
                    output.innerHTML = `Тачка ${brand} ${model} <br>
                    Цена: ${price}$`;
                }
            });
        })
            .catch(()=>{
                output.innerHTML = 'Произошла ошибка';
            })

    });
});
    
