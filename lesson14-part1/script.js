

function DomElement(selector, height, width, fontSize, bg){
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.newElement = function(){
        let div = document.createElement('div');
        if (this.selector.startsWith('.')){
            div.classList.add(`${this.selector.substring(1)}`);
            div.innerHTML = "Всем привет! У меня есть класс:)";
            document.body.append(div);
        } else if (this.selector.startsWith('#')){
            div.id = `${this.selector.substring(1)}`;
            div.innerHTML = "<strong>Всем ку) У мну айди</strong>";
            document.body.append(div);
        };
        div.style.height = this.height;
        div.style.width = this.width;
        div.style.background = this.bg;
        div.style.fontSize = this.fontSize;
    }
};

let blabla = new DomElement('.block', '30px', '300px','20px','#FF6F61');
let lala = new DomElement('#block', '50px', '500px','40px','#6B5B95');


blabla.newElement();
lala.newElement();




