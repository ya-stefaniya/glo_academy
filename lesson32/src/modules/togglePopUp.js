const togglePopUp = () => {
    const popup = document.querySelector('.popup');
    const popupBtn = document.querySelectorAll('.popup-btn');
    const popupClose = document.querySelector('.popup-close');
    let opacity = 0, intervalID;
    const fadeIn = () => {
        intervalID = requestAnimationFrame(fadeIn);
        if (opacity < 1) {
            opacity += 0.1;
            popup.style.opacity = opacity;
        } else {
            cancelAnimationFrame(intervalID);
        }
    };
    popupBtn.forEach(elem => {
            //sendForm();
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                //анимация только для экранов > 768
                if (document.documentElement.clientWidth > 768){
                opacity = 0;
                fadeIn();
                }
            });
        
    });
    popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
        opacity = 0;
    });
};
export default togglePopUp;