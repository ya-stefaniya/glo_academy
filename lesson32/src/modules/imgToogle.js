const imgToogle = ()=>{
    const commandPhotos = document.querySelectorAll('.command__photo');
    let arrSrc=[];
    for(let i=0;i<commandPhotos.length;i++){
        arrSrc[i]=commandPhotos[i].getAttribute('src');
    }
    commandPhotos.forEach((item,i)=>{
        item.addEventListener('mouseenter',(e)=>{
                e.target.src =e.target.dataset.img;
        });
        item.addEventListener('mouseleave',(e)=>{
                e.target.src=arrSrc[i];
        });
    });
};
export default imgToogle;