let button = document.querySelector('.button');
let reset = document.querySelector('.reset');

let img = document.querySelector('.image');
let count=0;
let interval;
let moveElement = function(){
  interval = requestAnimationFrame(moveElement)
  count++
  
  if(count<300){
    img.style.left = count*2 + "px"
  } else {
  cancelAnimationFrame(interval);
  }
  console.log('count: ', count);
}
let animate = false;
button.addEventListener('click',()=>{
if(!animate){
    interval = requestAnimationFrame(moveElement);
    animate = true;
} else {
    animate = false;
    cancelAnimationFrame(interval);
}
})
reset.addEventListener('click',()=>{
    cancelAnimationFrame(interval);
    count=0;
    img.style.left = 10 + "px"
});
