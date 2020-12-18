(() => {
    /** Use strict le dice a JavaScript que sea estricto, en la forma de que el código debe ser
     * escrito, esto nos ayuda a no cometer errores. 
     */
    'use strict'
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

 let deck             = [];
 const types          = ['C','D','S','H'],
       especials      = ['A','J','Q','K'];
 /*let playerPoints   = 0,
     computerPoints = 0;*/
 let playersPoints = [];

 const btnNewGame      = document.querySelector("#btnNewGame"),
  btnGetCard           = document.querySelector("#btnGetCard"),
  btnFinishGame        = document.querySelector("#btnFinishGame"),
  playerPointsLabel    = document.querySelector('#playerPoints'),
  computerPointsLabel  = document.querySelector('#computerPoints'),
  playerCards          = document.querySelector('#playerCards'),
  computerCards        = document.querySelector('#computerCards');


  const initDeck = (numPlayers = 1) => {
    deck = createDeck();
    for(let i = 0; i< numPlayers; i++){
        playersPoints = 0;
    }
  };

 const createDeck = () => {
     deck = [];

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
    return _.shuffle(deck);
}


/**
 * Función que nos devuelve una carta
 */

 const getCard = () => {

    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }

    return deck.pop();
 }

 const getCardValue = (card) => {
    const cardValue = card.substring(0, card.length -1);
    return (isNaN(cardValue)) ? 
            (cardValue === 'A') ? 11 : 10
            :cardValue * 1;
 }

 /** 0 = First player, The last item = The machine */
 const sumPoints = (turn) => {

 }
 /** Turno de la computadora */
const computerTurn = (minimunPoints) => {

   do {
    const newCard = getCard();
    /*computerPoints  = computerPoints + getCardValue(newCard);
    computerPointsLabel.innerText = computerPoints;*/

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
            '',
            'warning'
            )
    }else if(minimunPoints > 21){
        Swal.fire(
            '¡Perdiste!',
            'La computadora gana',
            'error',       
            )
    }else if(computerPoints > 21){
        Swal.fire(
            '¡Ganaste!',
            '',
            'success'
            )
    }else if(computerPoints > minimunPoints && computerPoints < 21){
        Swal.fire(
            '¡Perdiste!',
            'La computadora gana',
            'error'
            )
    }else{
        Swal.fire(
            '¡Perdiste!',
            'La computadora gana',
            'error'
            )
    }
    resetButtons();
   }, 10);
}

/** Reset Buttons */

const resetButtons = () => {
    btnGetCard.disabled     = true;
    btnFinishGame.disabled  = true;
    btnNewGame.disabled     = false;

    btnGetCard.classList.remove('getCardButton');
    btnGetCard.classList.add('pauseButton');

    btnFinishGame.classList.remove('finishGameButton');
    btnFinishGame.classList.add('pauseButton');

    btnNewGame.classList.remove('pauseButton');
    btnNewGame.classList.add('newGameButton');
}

/**   Nuevo juego */

const newGame = () => {
    initDeck();
    //deck = createDeck();
    playerPoints    = 0;
    computerPoints  = 0;

    playerPointsLabel.innerText     = playerPoints;
    computerPointsLabel.innerText   = computerPoints;

    playerCards.innerHTML   = '';
    computerCards.innerHTML = '';

    btnGetCard.disabled     = false;
    btnFinishGame.disabled  = false;
    btnNewGame.disabled     = true;

    btnGetCard.classList.remove('pauseButton');
    btnGetCard.classList.add('getCardButton');

    btnFinishGame.classList.remove('pauseButton');
    btnFinishGame.classList.add('finishGameButton');

    btnNewGame.classList.remove('newGameButton');
    btnNewGame.classList.add('pauseButton');
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

 btnFinishGame.addEventListener('click', () => {
    btnGetCard.disabled     = true;
    btnFinishGame.disabled  = true;
    computerTurn(playerPoints);
 });

 btnNewGame.addEventListener('click', () => {
    newGame();
 });

/**                     END APP                          */
})()