const tabs = () => {
    const tabHeader = document.querySelector('.service-header'); //контейнер
    const tabs = tabHeader.querySelectorAll('.service-header-tab'); // кнопки
    const tabContent = document.querySelectorAll('.service-tab'); // контент

    const toggleTabContent = (index) => {
        for (let i = 0; i < tabContent.length; i++) {
            if(index === i){
                tabs[i].classList.add('active');
                tabContent[i].classList.remove('d-none');
            } else {
                tabs[i].classList.remove('active');
                tabContent[i].classList.add('d-none');
            }
        }
    };
    tabHeader.addEventListener('click', (event) =>{
        let target = event.target;
        target = target.closest('.service-header-tab')
        if(target){
            tabs.forEach((item,i)=>{
                if(item === target){
                    toggleTabContent(i);
                }
            });               
        } 
        
    })
}

export default tabs;