

// .json: JavaScript Object Notification

// API: sono delle chiavi che ci permettono di raggiungere un .json online 

// fetch(); chiamata asincrona che ci permette di collegarci ad un json e da esso estrarne il dato sottoforma di "Promise".

// .then(): Questo metodo permette di convertire la Promise nel dato Strutturale e di poterlo utilizzare come tale su JS


// primo passaggio: 
// 1. fetch(): mi collego al .json e ne ottengo una Promise

// secondo passaggio:
// 2. .then(): convero la Promise in un dato strutturale JS

// terzo passaggio: 
// 3. (un altro) .then(): utilizzare il dato ottenuto

// .json(): è un metodo delle Promise che mi permette di convertirla in Oggetto JS 





fetch(`./annunci.json`).then( (response)=>  response.json()   ).then(  (data)=> {

    // applico il sort() per ordinare gli articolo in modo per prezzo crescente
    data.sort((a, b) => a.price - b.price );
 

    let radioWrapper = document.querySelector(`#radioWrapper`);
    let cardWrapper = document.querySelector(`#cardWrapper`);

    


    function radioCreate(){

        let categories = data.map((annuncio)=> annuncio.category);

        

        // let uniqueCategories = [];

        // categories.forEach( (category)=> {

        //     if( !uniqueCategories.includes(category) ) {
        //         uniqueCategories.push(category);
        //     }

        // });

        // Set(): Classe che mi restituisce, partendo da un array, un nuovo oggetto di tipo Set il quale contiene solo valori univoci
        // Array.from(): mi permette di convertire un array-like in un array

        let uniqueCategories = Array.from(new Set(categories));

        

        uniqueCategories.forEach( (category)=> {

            let div = document.createElement(`div`);
            div.classList.add(`form-check`);
            div.innerHTML = `
                <input class="form-check-input" type="radio" name="categories" id=${category}>
                <label class="form-check-label" for=${category}>
                    ${category}
                </label>
            `;
            radioWrapper.appendChild(div)


        }  )
        
        

    }

    radioCreate();


    // funzione che ridimensiona il nome dell'annuncio qual'ora questo abbiamo una lunghezza superiore a un tot di caratteri
    function truncateWord(string){

        if(string.length > 15){
            return string.split(` `)[0] + `...`
        }else {
            return string;
        }

    }


    function showCards (array){
        cardWrapper.innerHTML = '';
        array.forEach( (annuncio, i)=> {

            let div = document.createElement(`div`);
            div.classList.add(`card-custom`);
            div.innerHTML = `
                    <img src="https://picsum.photos/${300 + i}" alt="immagine casuale" class="img-fluid img-card">
                    <p class="h2" title='${annuncio.name}'>${truncateWord(annuncio.name)}</p>
                    <p class="h4">${annuncio.category}</p>
                    <p class="lead">${annuncio.price} €</p>
                `;
            cardWrapper.appendChild(div);

        }  )
    }

    showCards(data);



    let radioButtons = document.querySelectorAll(`.form-check-input`);
    function filterByCategory(array){

        // in questa funzione ho bisogno di ottenere un nuovo Array partendo da data e gli elementi del nuovo array dovranno soddisfare la condizione per la quale la loro category sia uguale alla categoria che stiamo passando alla funzione

        // La categoria voglio trovarla partendo dalla lista di tutti bottoni e usare il metodo .find() degli array su questa lista. La condizione da utilizzare è il bottone che possiede l'attributo "checked"
        let arrayFromNodelist = Array.from(radioButtons);
        let button = arrayFromNodelist.find( (bottone)=> bottone.checked  );
        let categoria = button.id;

        // si può scrivere anche così:
        // let categoria = Array.from(radioButtons).find( (bottone)=> bottone.checked  ).id;

        if(categoria != `All`){

        let filtered = array.filter( (annuncio)=>  annuncio.category == categoria  );
            
        // showCards(filtered);
        return filtered;

        }else {

            // showCards(data);
            return array;
        }

    }

    

 

    radioButtons.forEach( (button)=> {

        button.addEventListener( `click`, ()=> {
            // console.log(button.id);
            // filterByCategory(button.id);
            // filterByCategory();
            setPriceinput(filterByCategory(data));
            globalFilter();
        }  )
    } );

    let priceInput = document.querySelector(`#priceInput`);
    
    let priceValue = document.querySelector(`#priceValue`);

    function setPriceinput(array) {

        // dopo aver catturato l'imput voglio settare come proprietà max dello stesso il valore più alto tra i price di ogni prodotto. Per farlo avrò bisogno di un array che contenga solo i prezzi, a quel punto lo ordine in maniera crescende/decrescente e prendermi l'elemento con il vslore più alto.
        
        let prices = array.map( (annuncio)=> +annuncio.price);
        prices.sort( (a, b)=> a-b );
        let maxPrice =  Math.ceil(  prices.pop()  );
        
        priceInput.max = maxPrice;
        priceInput.value = maxPrice;
        priceValue.innerHTML = maxPrice + ` €`;        
    } 

    setPriceinput(filterByCategory(data));

    function filterByPrice (array) {

        let filtered = array.filter( (annuncio)=> +annuncio.price <= priceInput.value );
        // showCards(filtered);
        // console.log(filtered);
        return filtered;
    }


    priceInput.addEventListener( `input`, ()=>{

       priceValue.innerHTML = priceInput.value;
        // filterByPrice();
       globalFilter();

  
    }

    );

    let wordInput = document.querySelector(`#wordInput`);

    function filterByWord (array) {

        let filtered = array.filter( (annuncio)=> annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase()) );

        // showCards(filtered);

        return filtered;
        

    }

    wordInput.addEventListener(`input`, ()=> {
        // filterbyWord (); 
        globalFilter();

    })


    // quello di cui abbiamo bisogno è che ad ogni evento scattino tutte e tre le funzioni di filtro ma non siano applicate tutte e tre sull'array data, bensì siano concatenate ed ognuna filtri il risultato della funzione di filtro precedente.


    // FILTRI CONCATENATI
    // sequenza che mi permette di utilizzare tutti i filtri contemporaneamente
    function globalFilter(){
        let filteredByCategory = filterByCategory(data); //array filtrato per categoria
        let filteredByPrice = filterByPrice(filteredByCategory); // array filtrato sia per categoria che per prezzo
        let filteredByWord = filterByWord(filteredByPrice); // array filtato per categoria prezzo e parola

        showCards(filteredByWord);
    }

    

}  );

//min 44:00
