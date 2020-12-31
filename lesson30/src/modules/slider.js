const slider = () => {

    const slider = document.querySelector('.portfolio-content');
    const slide = document.querySelectorAll('.portfolio-item');
    //const btn = document.querySelectorAll('.portfolio-btn');
    let dot;
    let interval;
    let currentSlide = 0; 
    const createDots = () => {
        for (let i = 0; i < slide.length; i++) {
            dot = document.createElement('li');
            dot.classList.add('dot');
            document.querySelector('.portfolio-dots').append(dot);
        } 
    };
    createDots();
    dot = document.querySelectorAll('.dot');
    dot[0].classList.add('dot-active');
//номер слайда

    const prevSlide = (elem, index, strClass) => { //действие для слайда который будет меняться
        elem[index].classList.remove(strClass);
    };
//действие для следующего нового слайда 
    const nextSlide = (elem, index, strClass) =>{
        //без этого костыля не листает вперед после последнего слайда
        if(elem.length == currentSlide){
            index = 0;
            currentSlide = 0
        }
        elem[index].classList.add(strClass);

    };

    const autoPlaySlide = () =>{
        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');
        //console.log('currentSlide: ', currentSlide);
        currentSlide++;
        //дошли до конца => на первый слайд
        if(currentSlide >= slide.length || currentSlide >= dot.length){
            currentSlide=0;
        }
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');

    }
    const startSlide = (time = 3000) =>{
        interval = setInterval(autoPlaySlide, time);
    };

    slider.addEventListener('click' , (e) =>{
        e.preventDefault();

        let target = e.target;
        if(!target.matches('.portfolio-btn, .dot')) return;

        prevSlide(slide, currentSlide, 'portfolio-item-active');
        prevSlide(dot, currentSlide, 'dot-active');


        if(target.matches("#arrow-right")){
            currentSlide++
        } else if (target.matches("#arrow-left")){
            currentSlide--
        } else if (target.matches('.dot')){
            dot.forEach((elem, index) =>{
                if(elem === target){
                    currentSlide = index;
                }
            });
        }
        if(currentSlide>=slide.length){
            currentSlide === 0;
        } else if (currentSlide<0){
            currentSlide = slide.length-1;
        }
        nextSlide(slide, currentSlide, 'portfolio-item-active');
        nextSlide(dot, currentSlide, 'dot-active');
    });
    startSlide(10000);

    const stopSlide = () =>{
        clearInterval(interval);
    };

    slider.addEventListener('mouseover', (e) =>{
        if(e.target.matches('.portfolio-btn, .dot')){
            stopSlide();
        }
    })
    slider.addEventListener('mouseout', (e) =>{
        if(e.target.matches('.portfolio-btn, .dot')){
            startSlide();
        }
    })

};

export default slider;