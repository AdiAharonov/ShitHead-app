//Begin game





let deck = [ 'AC', 'AD', 'AH', 'AS',
'2C', '2D', '2H', '2S',
'3C', '3D', '3H', '3S', 
'4C', '4D', '4H', '4S',
'5C', '5D', '5H', '5S',
'6C', '6D', '6H', '6S',
'7C', '7D', '7H', '7S', 
'8C', '8D', '8H', '8S',
'9C', '9D', '9H', '9S',
'10C', '10D', '10H', '10S',
'JC', 'JD', 'JH', 'JS',
'QC', 'QD', 'QH', 'QS', 
'KC', 'KD', 'KH', 'KS'];



let hiddenP1, hiddenP2, hiddenP3, hiddenE1, hiddenE2, hiddenE3,
handCard1, handCard2, handCard3, handCard4, handCard5, handCard6,
eCard1, eCard2, eCard3, eCard4, eCard5, eCard6;


hiddenP1 = document.getElementById('hiddenP1');
hiddenP2 = document.getElementById('hiddenP2');
hiddenP3 = document.getElementById('hiddenP3');
hiddenE1 = document.getElementById('hiddenE1');
hiddenE2 = document.getElementById('hiddenE2');
hiddenE3 = document.getElementById('hiddenE3');

handCard1 = document.getElementById('handCard1');
handCard2 = document.getElementById('handCard2');
handCard3 = document.getElementById('handCard3');
handCard4 = document.getElementById('handCard4');
handCard5 = document.getElementById('handCard5');
handCard6 = document.getElementById('handCard6');

eCard1 = document.getElementById('eCard1');
eCard2 = document.getElementById('eCard2');
eCard3 = document.getElementById('eCard3');
eCard4 = document.getElementById('eCard4');
eCard5 = document.getElementById('eCard5');
eCard6 = document.getElementById('eCard6');

let currentIndex;
let currentCard;
let start = document.getElementById('start');



// Players side

function selectCard(card) {

    if(!gameStarted) {
        return;
    }
    
    if(card && !holdingCard) {

        card.classList.add('pause');
        card.setAttribute("id", "currentCard" );
        currentCard = document.getElementById('currentCard');
        
        currentIndex = playerHand.indexOf(card);
        // console.log(currentCard, currentIndex);
        holdingCard = true;
         
        
        
        
    } 

    else if (card && holdingCard && card.getAttribute('value') === currentCard.getAttribute('value') && Turn === true) {
            
        card.classList.add('pause');
        card.setAttribute("id", "currentCard" );


    }
    
    else if(card === currentCard && holdingCard) {
        card.classList.remove('pause');
        card.setAttribute("id", "priviousCard")
        holdingCard = false;
        
    } 
 
} 
// To pick initial cards over hidden cards
function pickPlace() {
    let fixedCard = currentCard;
    
    fixedCard.setAttribute("id", "fixedCard");
    
    fixedCard.classList.remove('pause');
    fixedCard.classList.add('moveCard');
    $(fixedCard).attr( "onclick", "goBack(this)");
    $(".moveCard").appendTo("#playerRevealedCards");

    
    
    

    if (playerRevealedCards.length === 2) {
        return;
    }

    
    currentIndex = null;
    currentCard = null;
    holdingCard = false;
     


}

function goBack(card) {

    card.setAttribute("id", "handCard");
    card.classList.add('hover');
    $(card).appendTo("#playersHandCards");
    card.classList.remove('moveCard');
    
    $(card).appendTo("#playerHand");
    $(card).attr( "onclick", " selectCard(this)");
    
    
}


// move revealed cards to defrent array
function ready() {

    moveCardsToArray() 
    moveCardsToArray() 

    if (playerHand.length === 3 ) {
        
        $(".ready").remove();
        startPlay();
        

    }
    
}



function moveCardsToArray() {

    for (const card of playerHand) {
        
        if (card.id === 'fixedCard') {

            card.setAttribute('onClick', null);
            card.classList.remove('hover');
            let moveCard = playerHand.splice(playerHand.indexOf(card), 1);
            playerRevealedCards.push(moveCard[0]);
            

        }
        

    }

}

//all the needed arrays
let playerHand = [handCard1, handCard2, handCard3, handCard4, handCard5, handCard6];
let playerHiddenCards = [hiddenP1, hiddenP2, hiddenP3];
let enemyHand = [eCard1, eCard2, eCard3, eCard4, eCard5, eCard6];
let enemyHiddenCards = [hiddenE1, hiddenE2, hiddenE3];
let cardsPlace = document.getElementById('cardsPlace');
cardsPlace = [];
let playerRevealedCards = document.getElementById('playerRevealedCards');
playerRevealedCards = [];
let enemyRevealedCards = document.getElementById('enemyRevealedCards');
enemyRevealedCards = [];
let holdingCard = false;
let gameStarted;

function startGame() {
    let EnemyName = document.getElementById('EnemyName');
    let PlayerName = document.getElementById('PlayerName');
    PlayerName.innerText = prompt("Please insert your name: ");
    
    
    
    

    setHandCards(playerHiddenCards, playerHand);
    setEnemyCards(enemyHiddenCards, enemyHand);
    $(start).attr("onClick", "replay()"); 
    start.innerHTML = "Replay";
         
    // Ready button

    let ready = document.createElement("button");
    ready.innerHTML = "Ready";
    ready.classList.add('ready');
    document.body.appendChild(ready);
    ready.setAttribute("onClick", "ready()");

    
    enemyHandStart()

    gameStarted = true;

       
}

 function replay() {
    
    location.reload();

 }


function setHandCards(hiddenarray, array) {
    
    
    for (let card of array) {
        const rndCard = randomCard();
        card.setAttribute("name", rndCard);
        card.classList.remove('card');
        card.classList.add('hover');
        card.innerHTML="<img class='cardflipped' src='css/cards/" + rndCard + ".jpg'/>";
         convertNameToValue(card)
    } 
    
   for (let card of hiddenarray) {
    const rndCard = randomCard();
    card.setAttribute("name", rndCard);
    convertNameToValue(card)
   }


}

function setEnemyCards(hiddenarray, array) {


    for (let card of array) {
        const rndCard = randomCard();
        card.setAttribute("name", rndCard);
        convertNameToValue(card)
        
         
         
    } 
    
   for (let card of hiddenarray) {
    const rndCard = randomCard();
    card.setAttribute("name", rndCard);
    convertNameToValue(card)
   }

}


function randomCard() {
    let rndCrd = Math.floor(Math.random() * deck.length);
    let newCard = deck.splice(rndCrd, 1);
    return newCard[0];
    
}
 



//enemy side

function enemyHandStart() {
    
    for (const card of enemyHand) {
        convertNameToValue(card)
       
    }


    checkForValue('10')
    checkForValue('3')
    checkForValue('2')
    checkForValue('1')
    checkForValue('13')
    checkForValue('12')
    checkForValue('11')
    checkForValue('9')
    checkForValue('8')
    checkForValue('7')
    checkForValue('6')
    checkForValue('5')
     
}

function setInitialEnemyCards(card) {
    currentIndex = enemyHand.indexOf(card);
    
    card.classList.add("moveECard");
    card.setAttribute("id", "fixedECard");

    currentCard = document.getElementById('fixedECard');
    

    $('.moveECard').appendTo("#enemyRevealedCards");
    card.innerHTML="<img class='cardflipped' src='css/cards/" + card.getAttribute("name") + ".jpg'/>";
    card.classList.remove("card");


    currentCard = enemyHand.splice(currentIndex, 1);
    enemyRevealedCards.push(currentCard[0]);

    currentCard = null;
    currentIndex = null;
    
//    console.log(card.getAttribute('name'), enemyRevealedCards);
}


function convertNameToValue(card) {
    
    if (card.getAttribute('name') === 'AC' || card.getAttribute('name') === 'AD' || card.getAttribute('name') === 'AH' || card.getAttribute('name') === 'AS' ) {

        card.setAttribute('value', '1');

    }
    if (card.getAttribute('name') === '2C' || card.getAttribute('name') === '2D' || card.getAttribute('name') === '2H' || card.getAttribute('name') === '2S' ) {

        card.setAttribute('value', '2');

    }
    if (card.getAttribute('name') === '3C' || card.getAttribute('name') === '3D' || card.getAttribute('name') === '3H' || card.getAttribute('name') === '3S' ) {

        card.setAttribute('value', '3');;

    }
    if (card.getAttribute('name') === '4C' || card.getAttribute('name') === '4D' || card.getAttribute('name') === '4H' || card.getAttribute('name') === '4S' ) {

        card.setAttribute('value', '4');

    }
    if (card.getAttribute('name') === '5C' || card.getAttribute('name') === '5D' || card.getAttribute('name') === '5H' || card.getAttribute('name') === '5S' ) {

        card.setAttribute('value', '5');

    }
    if (card.getAttribute('name') === '6C' || card.getAttribute('name') === '6D' || card.getAttribute('name') === '6H' || card.getAttribute('name') === '6S' ) {

        card.setAttribute('value', '6');

    }
    if (card.getAttribute('name') === '7C' || card.getAttribute('name') === '7D' || card.getAttribute('name') === '7H' || card.getAttribute('name') === '7S' ) {

        card.setAttribute('value', '7');

    }
    if (card.getAttribute('name') === '8C' || card.getAttribute('name') === '8D' || card.getAttribute('name') === '8H' || card.getAttribute('name') === '8S' ) {

        card.setAttribute('value', '8');

    }
    if (card.getAttribute('name') === '9C' || card.getAttribute('name') === '9D' || card.getAttribute('name') === '9H' || card.getAttribute('name') === '9S' ) {

        card.setAttribute('value', '9');

    }
    if (card.getAttribute('name') === '10C' || card.getAttribute('name') === '10D' || card.getAttribute('name') === '10H' || card.getAttribute('name') === '10S' ) {

        card.setAttribute('value', '10');

    }
    if (card.getAttribute('name') === 'JC' || card.getAttribute('name') === 'JD' || card.getAttribute('name') === 'JH' || card.getAttribute('name') === 'JS' ) {

        card.setAttribute('value', '11');

    }
    if (card.getAttribute('name') === 'QC' || card.getAttribute('name') === 'QD' || card.getAttribute('name') === 'QH' || card.getAttribute('name') === 'QS' ) {

        card.setAttribute('value', '12');

    }
    if (card.getAttribute('name') === 'KC' || card.getAttribute('name') === 'KD' || card.getAttribute('name') === 'KH' || card.getAttribute('name') === 'KS' ) {

        card.setAttribute('value', '13');


    }
    // console.log(card.getAttribute('value'), card.getAttribute('name'));
    
}

function checkForValue(value) {

for (const card of enemyHand) {

    if (enemyRevealedCards.length === 3) {
                
        return;
      
    }

    if(card.getAttribute('value') === value) {
        setInitialEnemyCards(card)
    }

    

}

    
    
}



// Start Game

let Turn = false;


function startPlay() {

    

    $(".cardsPlace").attr("onclick", "cardToPile(playerHand)");
    

    // Who starts

    pickFirst();

    getCardFromDeck(playerHand);


    
   
    

}

function selectFirstTurn(cardValue, array) {

    

    if (Turn === true) {
        return;
    }

    for (const card of array) {

        if ( card.getAttribute("value") === cardValue) {


            if (array === playerHand) {
                PlayerName.classList.add("Turn");
                Turn = true;

            } 
            else {
                EnemyName.classList.add("Turn");
                Turn = true;
            }
    
    
        }

    }

}    
    


    


//drag card to pile & update current value

let currentValue;

function cardToPile(array) {

    for (const card of array)  {

        if (card.id === 'currentCard') {

            $(card).appendTo('#cardsPlace');
            $(card).attr('class', 'Pile');
            $(card).attr('id', 'Pile');
            $(card).attr("onClick", null);

            let piledCard = array.splice(array.indexOf(card), 1);
            cardsPlace.push(piledCard[0]);

             currentValue = card.getAttribute('value'); 




            

        }
    }
        
        

    

   

    

}

let newHandCard;


// The function picks the one who starts
function pickFirst() {

    for (i = 4; i <= 13; i++) {
        selectFirstTurn(i.toString(), playerHand);
        selectFirstTurn(i.toString(), enemyHand);
        
    }
}

//TODO: find a way to fill players cards from the deck.

function  getCardFromDeck(array) {

    if (array.length < 3 ) {

        newHandCard = randomCard();
        newHandCard = document.createElement('div');
        newHandCard.setAttribute('class', 'card');
        $(newHandCard).appendTo('#playersHandCards');
        array.push(newHandCard);
        console.log(newHandCard);

    }


}