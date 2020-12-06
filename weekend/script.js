
let btnSignUp = document.querySelector('.signup');
let btnSignIn = document.querySelector('.signin');
let ul = document.querySelector('.users_list');
let greet = document.querySelector('.greet');
let userData = [];
let login;
let password;

const render = function (){
    ul.textContent = '';
    userData.forEach((item)=>{
        const li = document.createElement('li');
        let i = userData.indexOf(item);
        li.innerHTML = `<span>Имя: ${userData[i].user_name}, Фамилия: ${userData[i].user_surname}, регистрация состоялась ${userData[i].date}</span>;      
        <button class="remove">Х</button>`; 
        ul.append(li);

        btnRemove = li.querySelector('.remove');
        btnRemove.addEventListener('click', () =>{
            //находим индекс элемента
        let i = userData.indexOf(item);
        if(i>=0){
            //удаляем один элемент начиная от i
            userData.splice(i,1);
        }
            //обновляем локалку
        localStorage.setItem('user', JSON.stringify(userData));
        render(); 
        });
    });
}

const setDate = function(){
    let regDate = new Date();
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return regDate.toLocaleString("ru", options);
};

btnSignUp.addEventListener('click', (e)=>{
    e.preventDefault();
    while (true) {
        let nameSur = prompt('Введите имя и фамилию через пробел!');
        if(!nameSur) break;
        if (nameSur.match(/^([a-za-яё]+)\s([a-za-яё]+)$/iu)){
            nameSur = nameSur.split(' '); 
            login = prompt('Придумайте логин');
            password = prompt('Придумайте пароль');
            let newUser = { 
                user_name: nameSur[0],
                user_surname: nameSur[1], 
                date: setDate(),
                login: login,
                password: password
            };
            userData.push(newUser);
            localStorage.setItem('user', JSON.stringify(userData));
            render();
            break;
        } else alert('Неверный ввод!');
    }
    
});

const authorisation = function(){
    let loginCheck = prompt('Введите логин');
    let passCheck = prompt('Введите пароль');
    let name = '';
    userData.find((item)=>{
        if(loginCheck === item.login && passCheck === item.password) 
        name = item.user_name;
        return;        
    });
    name ?  greet.textContent = `Привет, ${name}` : alert('Пользователь не найден!');
};

btnSignIn.addEventListener('click', (e)=>{
    e.preventDefault();
    authorisation();
    
});

if(localStorage.getItem('user')){
    userData = JSON.parse(localStorage.getItem('user'));
    render();
};
render();