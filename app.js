/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his 
    GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//state variable tells us the condition of something 
var scores, roundScore, activePlayer, gamePlaying;

newGame();
//gives us a random number between 1 and 6

//querySelector lets us select stuff exactly how we would in css...it can also be used to read and store variables
//but it only allows us to select the first item. 
//becuase of type coercion, it will change the activeplayer to the ID element
//the '<em>' adds italics to the word
//innerHTML will change it to HTML where as innerText and textContent will display the <em> on the screen as well 
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '<em>';

// //this is going to select the dice and remove it 
// document.querySelector('.dice').style.display = 'none';

// //getElementByID: faster than the querySeclector
// document.getElementById('score-0').textContent = 0; 
// document.getElementById('score-1').textContent = 0; 
// document.getElementById('current-0').textContent = 0; 
// document.getElementById('current-1').textContent = 0; 

//Events: are like notifications that are sent to notify our code that something happended on the webpage
//examples of events are clicking a button, resizing a window, scrolling down, pressing a key
// Events Listeners: a fucntio that performs an action based on a certain event. It waits for a specific event to happen

//Event here is rolling the dice...when adding event listener, first arg is type of event, second part is function that will be called 
//as soon as the event happens

document.querySelector('.btn-roll').addEventListener('click', function () {
    if(gamePlaying){
        //we need random number
        var dice = Math.floor(Math.random()* 6) + 1;

        //display result
        var diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block'; //the block displays the item in css

        diceDOM.src = 'dice-' + dice + '.png';
        console.log(dice)
        //update the round score if the rolled number is not a 1
        if (dice !== 1) {
            //add score... the below is the same as roundScore = roundScore + dice
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }    
    
});

document.querySelector('.btn-hold'). addEventListener('click', function(){
    if(gamePlaying){
        /*add current score to players global score*/
            //below is the same as scores[acivePlayer] = scores[activePlaer] + roundScore
            scores[activePlayer] += roundScore;
            //update the UI on page with the score
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
            //check if the player won the game
            if (scores[activePlayer] >= 100){
                document.querySelector('#name-' + activePlayer).textContent = 'winner!';
                document.querySelector('.dice').style.display = "none";
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); 
                gamePlaying = false; 
            } else {
                //next player plays turn
                nextPlayer();
                
            }
    }
    
});

function nextPlayer () {
    //next player plays... below is cleaner than writing an if statement
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0; 
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //toggle adds the class if its not there and if its there, remove it
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

//removing and adding class of active player
    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

//hide dice again after the next player's turn
document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', newGame);

function newGame(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true; 
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = 0; 
    document.getElementById('score-1').textContent = 0; 
    document.getElementById('current-0').textContent = 0; 
    document.getElementById('current-1').textContent = 0; 
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}