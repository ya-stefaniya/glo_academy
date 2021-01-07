const toggleMenu = () => {
    const menu = document.querySelector('menu');
    const handleMenu = () => {
        menu.classList.toggle('active-menu');
    };

    document.body.addEventListener('click', (event)=>{
    let target = event.target;
    target = target.closest('.menu'); //иконка меню
    if(target) {//показываем актив-меню у род таргета есть .menu
        handleMenu();
    } else {
        target = event.target;
        if(target.closest('.close-btn')){
            handleMenu();
        } else if (target.matches('menu ul a')) {
            menu.classList.remove('active-menu');
        } else {
            target = event.target;
            target = target.closest('.active-menu');
            if(!target) {
                menu.classList.remove('active-menu');
            } else return;
        }
    }
});
}
export default toggleMenu;