
const  smoothScroll = () => {

    const scrollBtn = document.querySelector('main>a');
    const menu = document.querySelector('menu');
    const links = menu.querySelectorAll("ul>li>a");

    const clickHandler = (e) =>{
        e.preventDefault();
        let target = e.target;
        target = target.closest('a')
        target = target.getAttribute("href");
        console.log('target: ', target);
        const offsetTop = document.querySelector(target).offsetTop;
        scroll({
            top: offsetTop,
            behavior: "smooth"
        });
    }
    scrollBtn.addEventListener("click", clickHandler);
    for (const link of links) {
        link.addEventListener("click", clickHandler);
    }

}
export default smoothScroll;