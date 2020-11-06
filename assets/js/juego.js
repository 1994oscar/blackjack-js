/**
 * 
 * Referencias de las cartas. 
 * 2C = Two of clubs. 
 * 2D = Two of diamonds. 
 * 2H = Two of hearts. 
 * 2S = Two of spades
 * 
 * */

 /**
  * 
  * Utilizamos la librería de Javascript, underscorejs, para que nos ayude con métodos,
  * que ya deben de venir incorporados en Javascript, pero no lo estan. 
  * 
  */

 /**
  * 
  * Las cartas se ordenan del número 2 hasta el 10.
  * Luego se ecuentran las cartas especiales A,J,Q,K.
  * Debemos llenar nuestro deck con nuestras cartas, para esto podemos
  * utilizar ciclos anidados. 
  * 
  */

 let deck       = [];
 let types      = ['C','D','S','H'];
 let especials  = ['A','J','Q','K'];
 let playerPoints = 0,
     computerPoints = 0;

 const btnNewGame = document.querySelector("#btnNewGame");
 const btnGetCard = document.querySelector("#btnGetCard");
 const btnFinishGame = document.querySelector("#btnFinishGame");
 const playerPointsLabel = document.querySelector('#playerPoints');
 const computerPointsLabel = document.querySelector('#computerPoints');
 const playerCards = document.querySelector('#playerCards');
 const computerCards = document.querySelector('#computerCards');

 const createDeck = () => {

    for(let i = 2; i <= 10; i++){
        for(let type of types){
            deck.push(i+type);
        }
    }

    for(let especial of especials){
        for(let type of types){
            deck.push(especial+type);
        }
    }

    /**
     * 
     * Utilizamos la función shuffle de la librería underscorejs. 
     * Esta función recibe como parámetro un arreglo, y nos devolverá el mismo
     * un arreglo desordenado. 
     * Necesitamos barajar nuestras cartas para poder repartirlas a nuestros jugadores. 
     * 
     */

    deck = _.shuffle(deck);
    return deck;
}

createDeck();

/**
 * Función que nos devuelve una carta
 */

 const getCard = () => {

    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }

    const card = deck.pop();
    return card;
 }

 const getCardValue = (card) => {
    const cardValue = card.substring(0, card.length -1);
    return (isNaN(cardValue)) ? 
            (cardValue === 'A') ? 11 : 10
            :cardValue * 1;
 }

 /** Turno de la computadora */
const computerTurn = (minimunPoints) => {

   do {
    const newCard = getCard();
    computerPoints  = computerPoints + getCardValue(newCard);
    computerPointsLabel.innerText = computerPoints;

    const printCard = document.createElement('img');
    printCard.src = `assets/cartas/${newCard}.png`;
    printCard.classList.add('cardImage');
    computerCards.append(printCard);

    if(minimunPoints > 21){
        break;
    }

   }while(computerPoints < minimunPoints && minimunPoints <= 21);

   setTimeout(()=>{
    if(computerPoints === minimunPoints){
        Swal.fire(
            '¡Nadie gana!',
            '¿Quieres jugar de nuevo?',
            'warning'
            )
    }else if(minimunPoints > 21){
        Swal.fire(
            '¡Perdiste!',
            'La computadora gana, ¿Quieres jugar de nuevo?',
            'error'
            )
    }else if(computerPoints > 21){
        Swal.fire(
            '¡Ganaste!',
            '¿Quieres jugar de nuevo?',
            'success'
            )
    }else if(computerPoints > minimunPoints && computerPoints < 21){
        Swal.fire(
            '¡Perdiste!',
            'La computadora gana, ¿Quieres jugar de nuevo?',
            'error'
            )
    }else{
        Swal.fire(
            '¡Perdiste!',
            'La computadora gana, ¿Quieres jugar de nuevo?',
            'error'
            )
    }
   }, 10);
}

/**
 *                               EVENTOS
 */

 btnGetCard.addEventListener('click', () => {

    const newCard               = getCard();
    playerPoints                = playerPoints + 
                                    getCardValue(newCard);
    playerPointsLabel.innerText = playerPoints;

    const printCard     = document.createElement('img');
    printCard.src       = `assets/cartas/${newCard}.png`;
    printCard.classList.add('cardImage');

    playerCards.append(printCard);

    if(playerPoints > 21){
        btnGetCard.disabled = true;       
        computerTurn(playerPoints);
        //btnNewGame.classList.remove('newGameButton'); Remover una clase css
    } else if (playerPoints === 21){
        btnGetCard.disabled = true;
        Swal.fire(
            '¡21, Genial!',
            '¡Espera el turno de la computadora!',
            'error'
            )       
        computerTurn(playerPoints);
    }

 });

 btnFinishGame.addEventListener('click', ()=> {
    btnGetCard.disabled     = true;
    btnFinishGame.disabled  = true;
    computerTurn(playerPoints);
 });

 btnNewGame.addEventListener('click', () => {

 });