function DomElement(selector, height, width, fontSize, bg, x){
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


let square = new DomElement('.block', '100px', '100px','0px','green');
    square.newElement();
    

document.addEventListener('DOMContentLoaded', () => {
    let moveLeft = 10;
    let moveBottom = 10;

    let block = document.querySelectorAll('div')[0];

    block.style.display = 'block'
    block.style.position = 'absolute';
    document.addEventListener('keydown', (e)=>{

    if(e.key === 'ArrowDown'){
        moveBottom += 10;
        block.style.top = moveBottom + 'px';
    }
    if(e.key === 'ArrowUp'){
        moveBottom -= 10;
        block.style.top = moveBottom + 'px';
    }
    if(e.key === 'ArrowLeft'){
        moveLeft -= 10;
        block.style.left = moveLeft + 'px';
    };
    if(e.key === 'ArrowRight'){
        moveLeft += 10;
        block.style.left = moveLeft + 'px';
    }
    
    });
});
