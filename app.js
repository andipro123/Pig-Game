/*Rules of The game...
1. There are 2 players. Each player plays in turn.
2. In a turn a player can roll a dice as many times as they want to, and accummulate a Roundscore.
3. If the dice rolls 1, the player's turn is over and his round score becomes 0.
4. If a player chooses to hold, their round score gets added to their global score.
5. The first player to make 100 in their global score Wins the game.
*/

var scores, roundScore, activePlayer;

//Maintain global score of each player
scores = [0,0];
//Maintain roundScore of a player
roundScore = 0;
//Maintain active player
activePlayer = 0;

//hide the dice at first
document.querySelector('.src-img').style.display = 'none';

//Add event upon clicking the roll button
document.querySelector('.roll-btn').addEventListener('click', function() {
    var dice;
    dice = Math.floor(Math.random() * 6) + 1;

    var diceDom = document.querySelector('.src-img');
    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';

    winCheck();

    if (dice === 1) {
        //Check for wins
        winCheck();
        //set RoundScore to 0
        roundScore = 0;
        //change player
        changePlayer();
        
    } else {
        //Add to current of active player
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = 'Current: ' + roundScore;
    }
});

document.querySelector('.hold-btn').addEventListener('click', function() {
    //check if the player has won the game
    winCheck();
    //change player
    changePlayer();
});

function changePlayer() {
    //Check for wins

    winCheck();
    //Next Player's turn
    scores[activePlayer] += roundScore;
    document.getElementById('score-' + activePlayer).textContent = "Score:" + scores[activePlayer];

    roundScore = 0;

    document.getElementById('current-' + activePlayer).textContent = "Current: " + roundScore;
    
    document.querySelector('.player' + activePlayer).classList.remove('active');

    activePlayer = activePlayer === 0 ? 1 : 0;

    document.querySelector('.player' + activePlayer).classList.add('active');

    document.querySelector('.src-img').style.display = 'none';
}

function winCheck() {
    if (scores[activePlayer] >= 50) {
        document.querySelector('.dice').style.display = 'none';
        document.getElementById('p' + (activePlayer + 1)).textContent = 'Player' + (activePlayer + 1) + ' has won the game!!';
    }
}