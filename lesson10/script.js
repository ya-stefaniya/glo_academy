let adv  = document.querySelector('.adv');
let booksContainer = document.querySelector('.books');
let books =  document.querySelectorAll('.book');


//Восстановить порядок книг.
booksContainer.prepend(books[1]);
booksContainer.append(books[2]);
books[4].after(books[3]);

//Заменить картинку заднего фона на другую из папки image
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

//Исправить заголовок в книге 3
books[4].querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';

//Удалить рекламу со страницы
adv.remove();

//Восстановить порядок глав во второй и пятой книге
let listFromBook2 = books[0].querySelectorAll('ul>li');
listFromBook2[3].after(listFromBook2[6]);
listFromBook2[6].after(listFromBook2[8]);

let listFromBook5 = books[5].querySelectorAll('ul>li');
listFromBook5[1].after(listFromBook5[9]);
listFromBook5[9].after(listFromBook5[3], listFromBook5[4]);
listFromBook5[7].after(listFromBook5[5]);


//В шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
let listFromBook6 = books[2].querySelectorAll('ul>li');
const newLine = document.createElement('li');
newLine.textContent = 'Глава 8: За пределами ES6';
listFromBook6[8].after(newLine);
