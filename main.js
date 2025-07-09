

let navbar = document.querySelector(`#navbar`);
let links = document.querySelectorAll(`.nav-link`);
let logoNavbar = document.querySelector(`#logoNavbar`);
let spider = document.querySelector(`#spider`);

// numeri invrementali
let firstNumber = document.querySelector(`#firstNumber`);
let secondNumber = document.querySelector(`#secondNumber`);
let thirdNumber = document.querySelector(`#thirdNumber`);

let check = false;

window.addEventListener( `scroll`, ()=>  {
    
    let scrolled = window.scrollY;
    
    if(scrolled > 0) {
        navbar.classList.remove(`bg-azzurro`);
        navbar.classList.add(`bg-blue`);
        navbar.style.height = `80px`;
        links.forEach( (link)=> {
            link.style.color = `var(--orange)`;
        } )
        logoNavbar.src = `./media/logo-azzurro.png`;
    } else {
        navbar.classList.add(`bg-azzurro`);
        navbar.classList.remove(`bg-blue`);
        navbar.style.height = `120px`;
        links.forEach( (link)=> {
            link.style.color = `var(--blue)`;
        } )
        logoNavbar.src = `./media/logo-black.png`;
        
        
    }
    
    
} )


spider.addEventListener( `click`, ()=> {
    
    if (check == false) {
        
        spider.src = `./media/ragno-orange.png`
        links.forEach( (link)=> {
            link.style.color = `var(--orange)`;
        } )
        navbar.style.height = `80px`;
        check = true;
        
    } else {
        
        spider.src = `./media/ragno-black.png`
        links.forEach( (link)=> {
            link.style.color = `var(--blue)`;
        } )
        navbar.style.height = `80px`;
        check = false;
        
    }
    
    
    
} )


// chiamate Asincrone
// setInterval(): crea un loop infinito in cui possiamo gestire la durata delle singole iterazioni
// il setInterva() è una funzione che vuole due parametri. Il primo parametro è la callback, il secondo l'intervallo di tempo che deve passare tra un'iterazione e l'altra

// clearInterva(): pulire un intervallo

// setTimeout(): fa partire un blocco di istruzioni dopo un tot di secondi

let confirm = true;

function createInterval(n, element, time){
    
    let counter = 0;
    
    let interval = setInterval( ()=> {
        
        if(counter < n) {
            counter++;
            element.innerHTML = counter;
        } else {
            clearInterval(interval);
        }
        
        
    } , time );
    
    
    setTimeout( ()=>{
        
        confirm = true;
    } , 8000 );
    
}



// IntersectionObserver: è una Classe del browser che si occupa di far scattare una funzione nel momento in cui sul browser sono vibili gli elemnti html che noi gli indichiamo

// new: è la keyword che mi permette di GENERARE UN OGGETTO partendo da una Classe


let observer = new IntersectionObserver( (entries)=>{
    
    entries.forEach( (entry)=>{
        
        if(entry.isIntersecting && confirm) {
            createInterval(100, firstNumber, 100);
            createInterval(1000, secondNumber, 10);
            createInterval(1000, thirdNumber, 1 );
            confirm = false;
            
            
        }
    } )
    
}  );

observer.observe(firstNumber);


let reviews = [
    {user: `David`, description: `Ottimo sito`, rank: 5},
    {user: `Luigi`, description: `Pessima esperienza`, rank: 1},
    {user: `Francesco`, description: `Buon sito ma tempi di ricezione lunghi`, rank: 3},
    {user: `Mario`, description: `Eccellente rapporto qualità/prezzo`, rank: 5},
    
]


let swiperWrapper = document.querySelector(`.swiper-wrapper`);

reviews.forEach( (recensione)=> {
    
    let div = document.createElement(`div`);
    div.classList.add(`swiper-slide`);
    div.innerHTML = `
    
                            <div class="card-review">
                                <p class="lead text-center">${recensione.description}</p>
                                <p class="h4 text-center">${recensione.user}</p>
                                <div class="d-flex justify-content-center star">
    
                                </div>
                            </div>
    
    
    `;
    
    swiperWrapper.appendChild(div);
    
}  );

let stars = document.querySelectorAll(`.star`);

// <i class="fa-solid fa-star"></i>

stars.forEach( (star, index)=>  {
    
    for ( let i = 1; i <= reviews[index].rank; i++ ) {
        
        let icon = document.createElement(`i`);
        icon.classList.add(`fa-solid`, `fa-star`);
        star.appendChild(icon);
    }
    
    let difference = 5 - reviews[index].rank;
    
    for ( let i = 1; i <= difference; i++ ) {
        
        let icon = document.createElement(`i`);
        icon.classList.add(`fa-regular`, `fa-star`);
        star.appendChild(icon);
    }
    
} )



// swiper

const swiper = new Swiper('.swiper', {
    // Optional parameters
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    loop: true,
    
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    
    
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    
});

