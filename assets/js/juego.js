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
    console.log(deck);
}