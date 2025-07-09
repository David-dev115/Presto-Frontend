

let opener = document.querySelector(`.opener`);

let circle = document.querySelector(`.circle`);


let teachers = [
    {name: `Topolino`, description: `noto come Mickey Mouse`, url:`./media/topolino.svg.png`},
    {name: `Paperino`, description: `personaggio dei cartoni animati e dei fumetti della Disney`, url:`./media/11-paperino.png`},
    {name: `Pippo`, description: `È un cane antropomorfo, alto e dinoccolato`, url:`./media/pippo.png`},
    {name: `Pluto`, description: `è il cane domestico di Topolino`, url:`./media/Pluto-2.png`},
    
];

teachers.forEach( (docente)=> {
    
    let div = document.createElement(`div`);
    div.classList.add(`moved`);
    div.style.backgroundImage = `url(${docente.url})`;
    circle.appendChild(div);
    
    
}  );


let movedDivs = document.querySelectorAll(`.moved`);


let check = false;

let flipCard = document.querySelector(`.flip-card`);



opener.addEventListener(`click`, ()=> {
    
    if(check == false) {
        
        opener.style.transform = `rotate(45deg)`;
        
        movedDivs.forEach( (moved, i)=> {
            
            let angle = (360 * i) / movedDivs.length;
            
            moved.style.transform = ` rotate(${angle}deg)  translate(150px) rotate(-${angle}deg)`;            
        }  );
        
        check = true;
        
    } else {
        
        check = false;
        opener.style.transform = `rotate(0deg)`;
        movedDivs.forEach( (moved, i)=> {
            
            moved.style.transform = ` rotate(0deg)  translate(0px)`;            
        }  );

        flipCard.classList.add(`d-none`);
        
    }
    
    
    
}  );


let innerFace = document.querySelector(`.inner-face`);
let cardName = document.querySelector(`#cardName`);
let cardDescription = document.querySelector(`#cardDescription`);


movedDivs.forEach( (moved, i)=> {
    moved.addEventListener(`click`, ()=> {
        
        flipCard.classList.remove(`d-none`)
        let docente = teachers[i];
        innerFace.style.backgroundImage = `url(${docente.url})`;
        cardName.innerHTML = docente.name;
        cardDescription.innerHTML =docente.description;
        
        
    });
    
    
    
});





// min 01:53:00