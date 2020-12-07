
document.querySelector('button').addEventListener('click',  () =>{
  
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    document.body.style.background = `#${randomColor}`;
    console.log('randomColor: ', randomColor);
    document.querySelector('h1').textContent = `#${randomColor}`;

});
   