'use strict';

fetch('dbHeroes.json').then(res => res.json()).then(json => {

    const containerCard = document.querySelector('.container_card');
    let arrHeroes = [];
    const generateCards= () => {
        while (arrHeroes.length < 50) {
          let randomCard = Math.floor(Math.random() * Math.floor(json.length));
            if (!arrHeroes.includes(randomCard)) {
                arrHeroes.push(randomCard);
            }
        }
    }
    generateCards();
    
    const cardListAdd = () => {
        arrHeroes.forEach(item=>{
                const {name, actors, photo, movies, status, citizenship} = json[item];
                let moviesList;
                if(movies !== undefined){
                    moviesList = movies.map((film)=>{
                        return `<li><a href="https://rezka.ag/index.php?do=search&subaction=search&q=${film}" target="_blank" >${film}</a></li>`;
                    }).join('');
                } else {
                    moviesList = `<li class='no-film'> No Films yet</li>`;
                }

                containerCard.insertAdjacentHTML('beforeend', `
                <div class="card"><img class="card-picture" src="./${photo}" alt="hero-image" width="230px" height="330px"><div class="info-container"><p class="card-name">Name: <span>${name}</span></p><p class="card-actors">Actors: <span>${actors}</span></p> <p class="card-species">Species: <span>Human</span></p><p class="card-citizenship">Citizenship: <span>${citizenship}</span></p><p class="card-status">Status: <span>${status === 'alive' ? 'Alive' : 'Dead'}</span></p>
                <p class="card-movies">Movies:</p><ol class="rounded">${moviesList}</ol></div></div>
            `);
        });
    }
    cardListAdd();
});
