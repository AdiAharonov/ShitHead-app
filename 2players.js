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
let cardCounter = document.getElementById('cardCounter');
let cardCounterValue = 34;
let start = document.getElementById('nameButton');



// Players side

function selectCard(card) {

    if(!gameStarted) {
        return;
    }
    
    if(card && !holdingCard) {

        card.classList.add('pause');
        card.classList.remove('hover');
        card.setAttribute("id", "currentCard" );
        currentCard = document.getElementById('currentCard');
        
        currentIndex = playerHand.indexOf(card);
        holdingCard = true;
         
        
    } 

    else if (card !== currentCard && holdingCard && card.getAttribute('value') === currentCard.getAttribute('value') && startTurn === true) {
            
        card.classList.add('pause');
        card.setAttribute("id", "currentCard" );
        card.classList.remove('hover');
        currentCard = card;

    }

    else if(card === currentCard && holdingCard) {
        card.classList.remove('pause');
        card.setAttribute("id", "priviousCard");
        card.classList.add('hover');
        holdingCard = false;
        currentCard = null;
        
    } 
 
} 
// To pick initial cards over hidden cards
function pickPlace() {

    if (currentCard) {

    
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
     
} else { return}

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
let EnemyName = document.getElementById('EnemyName');
let PlayerName = document.getElementById('PlayerName');

function startGame() {
    
    PlayerName.innerText = document.getElementById("nameInput").value;
    if (PlayerName.innerText === "") {
        return;
    }

    $("#enterName").remove();
    // Replay button

    var replayBtn = document.createElement("button");
    replayBtn.innerHTML = "Replay";
    document.body.appendChild(replayBtn);
    replayBtn.classList.add("replayBtn");
    setHandCards(playerHiddenCards, playerHand);
    setEnemyCards(enemyHiddenCards, enemyHand);
    $(replayBtn).attr("onClick", "replay()"); 
    
         
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
         convertNameToValue(card);
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

        card.setAttribute('value', '14');

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

let startTurn = false;
let isPlayersTurn = false;

function startPlay() {
    
    $(".cardsPlace").attr("onclick", "cardToPile(playerHand)");
    

    // Who starts

    pickFirst();

    // enemy start (player is manual start)
    if (isPlayersTurn === false) {
        setTimeout(enemyPlayAlgoritem, 2000);
            for (var i = 0; i < enemyHand.length; i++) {
                cardToPile(enemyHand[i]);
            }
    }

}


function fillPlayerHand() {
    var playerNewCards = getCardFromDeck(playerHand);
            for ( var i = 0; i < playerNewCards.length; i++) {
             $(playerNewCards[i]).appendTo('#playersHandCards');
             playerNewCards[i].innerHTML="<img class='cardflipped' src='css/cards/" + playerNewCards[i].getAttribute("name") + ".jpg'/>";
             playerNewCards[i].classList.remove('card');
             playerNewCards[i].classList.add('hover');
             $(playerNewCards[i]).attr( "onclick", " selectCard(this)");
            }
            if (playerHand.length < 4) {

            for (const card of playerHand) {
                card.classList.remove('manyCards');
            }
        }
            currentTurn(EnemyName); 
}

function selectFirstTurn(cardValue, array) {

    if (startTurn === true) {
        return;
    }
    for (const card of array) {

        if ( card.getAttribute("value") === cardValue) {


            if (array === playerHand) {
                currentTurn(PlayerName);
                startTurn = true;
            } 
            else {
                currentTurn(EnemyName);
                startTurn = true;
            
            }

        }

    }

}    
    
function currentTurn(isTurn) {

    if (isTurn === PlayerName) {
    $(".cardsPlace").attr("onclick", "cardToPile(playerHand)");
    PlayerName.classList.add("currTurn");
    PlayerName.setAttribute("id", "currTurn");
    isPlayersTurn = true;

    EnemyName.classList.remove("currTurn");
    EnemyName.setAttribute("id", "enemyName");
    }
    else {
    $(".cardsPlace").attr("onclick", null);    
    PlayerName.classList.remove("currTurn");
    PlayerName.setAttribute("id", "playerName");
    isPlayersTurn = false;
    for (const card of playerHand) {
        card.classList.remove('hover');
        card.setAttribute('onClick', null);
    } 

    EnemyName.classList.add("currTurn");
    EnemyName.setAttribute("id", "currTurn");
    }
}

    


//drag card to pile & update current value

let currentValue = 0;

function cardToPile(array) {

    if (array === playerHand && !currentCard) {
        pickUpPile(playerHand);
        endEnemyTurn = false;
        currentTurn(EnemyName);
        setTimeout(enemyPlayAlgoritem, 2000);
    }

    
    if (array === playerHand && currentCard) {

        if (+(currentCard.getAttribute('value')) < currentValue) {
            return;
        }
        
        for (const card of array.slice())  {

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

        currentCard = null;
        holdingCard = false;
        
        setTimeout(fillPlayerHand, 1000);
        // retun turn to enemy
        endEnemyTurn = false;
        setTimeout(enemyPlayAlgoritem, 2000);
            
     }
     

     if (array === enemyHand) {
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
  
}


// The function picks the one who starts
function pickFirst() {

    for (var i = 4; i <= 13; i++) {
        selectFirstTurn(i.toString(), playerHand);
        selectFirstTurn(i.toString(), enemyHand);
        
    }
}



function  getCardFromDeck(array) {
    var newCards = [];

    while (array.length < 3 ) {
        var newHandCard = randomCard();
        cardCounterValue--;
        cardCounter.innerText = cardCounterValue;
        var newHandCardName = newHandCard;
        newHandCard = document.createElement('div');
        newHandCard.setAttribute("name", newHandCardName);
        convertNameToValue(newHandCard);
        newHandCard.setAttribute('class', 'card');
        newHandCard.setAttribute("id", "newCard");
        array.push(newHandCard);
        newCards.push(newHandCard);
        
    }

    return newCards;

}



function enemyPlayAlgoritem() {

    if (enemyHand.length === 3) {
        for (const card of enemyHand) {
            card.classList.remove('manyCards');
          }
    }
    
   if (enemyThrowCradCnt === 0) {checkForCardValue("4")};
   if (enemyThrowCradCnt === 0) {checkForCardValue("5")} ;
   if (enemyThrowCradCnt === 0) {checkForCardValue("6")};
   if (enemyThrowCradCnt === 0) {checkForCardValue("7")};
   if (enemyThrowCradCnt === 0) {checkForCardValue("8")};
   if (enemyThrowCradCnt === 0) {checkForCardValue("9")};
   if (enemyThrowCradCnt === 0) {checkForCardValue("11")};
   if (enemyThrowCradCnt === 0) {checkForCardValue("12")};
   if (enemyThrowCradCnt === 0) {checkForCardValue("13")};
   if (enemyThrowCradCnt === 0) {checkForCardValue("14")};
   if (enemyThrowCradCnt === 0) {checkForCardValue("2")};
   if (enemyThrowCradCnt === 0) {checkForCardValue("3")};
   if (enemyThrowCradCnt === 0) {checkForCardValue("10")};

     cardToPile(enemyHand);
     cardToPile(enemyHand);
     cardToPile(enemyHand);

     if(enemyThrowCradCnt === 0) {pickUpPile(enemyHand)};
  
    
   enemyThrowCradCnt = 0;
   var enemyNewCards = getCardFromDeck(enemyHand);
   
   for ( var i = 0; i < enemyNewCards.length; i++) {
    $(enemyNewCards[i]).appendTo('#enemyHandCards');
   }

   for (const card of playerHand) {
    card.classList.add('hover');
    card.setAttribute('onClick', 'selectCard(this)');
   } 
   currentTurn(PlayerName);


}

  // We want to check if the enemy has more than 1 card of 
//the same value
var enemyThrowCradCnt = 0;

function checkForCardValue(value) {
  
    for ( var i = 0; i < enemyHand.length; i++) {
        var cardValue = +(enemyHand[i].getAttribute("value"));
            
        if (cardValue === +value && !currentValue) {
            enemyHand[i].setAttribute("id", "currentCard");
            enemyHand[i].innerHTML="<img class='cardflipped' src='css/cards/" + enemyHand[i].getAttribute("name") + ".jpg'/>";
            enemyThrowCradCnt++;
        }
        else if (cardValue === +value && cardValue >= currentValue) {
            enemyHand[i].setAttribute("id", "currentCard");
            enemyHand[i].innerHTML="<img class='cardflipped' src='css/cards/" + enemyHand[i].getAttribute("name") + ".jpg'/>";
            enemyThrowCradCnt++;
        }
        
    }

}


     //TODO: need to complite
function doCardAbility(card) {

    if ( card.getAttribute('value') === '2') {
        currentValue = 0;
    }
    if (card.getAttribute('value') === '3') {
        currentValue = cardsPlace[cardsPlace.length - 1];
    }
    if (card.getAttribute('value') === '7') {

    }
    if (card.getAttribute('value') === '8') {
        currentValue(PlayerName);
    }
    if (card.getAttribute('value') === '10') {

            cardsPlace = [];
    }
}

function pickUpPile(array) {


    if (array === playerHand) {
        var cardsPlaceLength = cardsPlace.length;

        for (var i = 0; i < cardsPlaceLength; i++) {
           
        var card = cardsPlace.splice(0, 1);
       
        array.push(card[0]);
        
        
        $(card).appendTo('#playersHandCards');
        $(card).attr('id', 'playerHand');
        $(card).attr( "onclick", " selectCard(this)");
        $(card).attr('class', 'hover');
       }

       for (const card of array) {
        card.classList.add('manyCards');
        
      }
    
       currentValue = 0;
    }

    if (array === enemyHand) {
        var cardsPlaceLength = cardsPlace.length;

        for (var i = 0; i < cardsPlaceLength; i++) {
           
        var card = cardsPlace.splice(0, 1);
       
        array.push(card[0]);
        
        
        $(card).appendTo('#enemyHandCards');
        $(card).attr('class', 'card');
        $(card).attr('id', 'enemyHand');
        $(card).empty();
       }

       for (const card of array) {
        card.classList.add('manyCards');
      }

      currentValue = 0;
    
  }
}


//TODO:

// fix between turns pickuppile
// make function for four of the same card in a row
// make the play for the final cards
// make the css better

