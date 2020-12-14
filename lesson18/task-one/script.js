window.addEventListener('DOMContentLoaded', () => {

    function showTime(deadline) {
        const timerHour = document.getElementById('timer-hours');
        const timerMinutes = document.getElementById('timer-minutes');
        const timerSeconds = document.getElementById('timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(); //новый год
            const dateNow = new Date().getTime(); //сейчас
            const timeRemaining = (dateStop - dateNow) / 1000;
            const seconds = Math.floor(timeRemaining % 60); //ceкунды
            const minutes = Math.floor((timeRemaining / 60) % 60);
            const hours = Math.floor((timeRemaining / 60) / 60);
            //const days = Math.floor(timeRemaining / 60 / 60 / 24);
            return {
                // days,
                hours,
                minutes,
                seconds
            };
        }
        function updateClock() {
            const timer = getTimeRemaining();
            timerHour.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);
        }
        //Add zero
        function addZero(n) {
            return (parseInt(n, 10) < 10  ? '0' : '') + n;
        }

        updateClock();
        setInterval(updateClock, 1000);
    }
    showTime('16 december 2020');
});
