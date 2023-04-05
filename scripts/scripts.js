// Get DOM elements
const playerDiceElement = document.getElementById('player-dice');
const playerScoreElement = document.getElementById('player-score');
const playerTotalElement = document.getElementById('player-total');
const computerDiceElement = document.getElementById('computer-dice');
const computerScoreElement = document.getElementById('computer-score');
const computerTotalElement = document.getElementById('computer-total');
const rollButton = document.getElementById('roll-button');
const resetButton = document.getElementById('reset-button');
const winnerMessageElement = document.getElementById('winner-message');
const howToPlayList = document.getElementById('howToPlayList');
const rulesList = document.getElementById('rulesList');
const toggleBtn = document.getElementById('toggleBtn');
const imgPath = "../images/"


// Initialize game variables
let playerTotal = 0;
let computerTotal = 0;
let playerDice = [];
let computerDice = [];
let roundScore = 0;
let rollsLeft = 3;

// Function to roll dice
function rollDice() 
{
    return Math.floor(Math.random() * 6) + 1;
}

// Function to update dice display
function updateDiceDisplay(dice, diceElement) 
{
    diceElement.textContent = dice.join(' | ');
}



// Function to calculate score
function calculateScore(dice) 
{
    let score = 0;

    if (dice[0] === 1 || dice[1] === 1) 
    {
        score = 0;
    } else if (dice[0] === dice[1]) 
    {
        score = (dice[0] + dice[1]) * 2;
    } else 
    {
        score = dice[0] + dice[1];
    }
    
    return score;
}

// Function to update score display
function updateScoreDisplay(score, scoreElement) 
{
    scoreElement.textContent = score;
}

// Function to update winner message
function updateWinnerMessage(winner) 
{
    winnerMessageElement.textContent = `Winner: ${winner}`;
}

// Event listener for roll button
rollButton.addEventListener('click', function () 
{
    if (rollsLeft > 0) 
    {
        // Roll dice for player and computer
        playerDice = [rollDice(), rollDice()];
        computerDice = [rollDice(), rollDice()];
        updateDiceDisplay(playerDice, playerDiceElement);
        updateDiceDisplay(computerDice, computerDiceElement);

        // Calculate player score and update display
        roundScore = calculateScore(playerDice);
        updateScoreDisplay(roundScore, playerScoreElement);
        playerTotal += roundScore;
        updateScoreDisplay(playerTotal, playerTotalElement);

        // Calculate computer score and update display
        roundScore = calculateScore(computerDice);
        updateScoreDisplay(roundScore, computerScoreElement);
        computerTotal += roundScore;
        updateScoreDisplay(computerTotal, computerTotalElement);

        rollsLeft--;

        if (rollsLeft === 0) 
        {
            // Determine winner and update winner message
            let winner = 'No one';
            if (playerTotal > computerTotal) {
                winner = 'Player';
            } else if (playerTotal < computerTotal) {
                winner = 'Computer';
            }
            updateWinnerMessage(winner);
            rollButton.disabled = true; // Disable roll button after 3 rolls
        }
    }
});


resetButton.addEventListener('click', function () 
{
    // Reset game variables
    playerTotal = 0;
    computerTotal = 0;
    playerDice = [];
    computerDice = [];
    roundScore = 0;
    rollsLeft = 3;

    // Reset display
    updateDiceDisplay(playerDice, playerDiceElement);
    updateDiceDisplay(computerDice, computerDiceElement);
    updateScoreDisplay(roundScore, playerScoreElement);
    updateScoreDisplay(roundScore, computerScoreElement);
    updateScoreDisplay(playerTotal, playerTotalElement);
    updateScoreDisplay(computerTotal, computerTotalElement);

    // Reset winner message
    winnerMessageElement.textContent = "";

    // Enable roll button
    rollButton.disabled = false;
});

toggleBtn.addEventListener('click', () => {
  howToPlayList.style.maxHeight = howToPlayList.style.maxHeight ? null : '500px';
  rulesList.style.maxHeight = rulesList.style.maxHeight ? null : '500px';
});
