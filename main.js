const ruleCancel = document.getElementById('cancel-rules');
const rules = document.getElementById('modal-rules');
const rulesBtn = document.getElementById('rulesBtn');
const choices = document.querySelector('main');
const result = document.getElementById('modal-choices');
const restartModal = document.getElementById('restart-modal');
const copyRight = document.querySelector('.attribution');

let score = document.getElementById('score');

let playerScore = 0;
score.textContent = playerScore;


//Start Game And Call Other Functions
function playGame(event) {
    let playerChoice, computerChoice, winner, btnStart;

    playerChoice = event.target.parentNode.className;

    if (playerChoice === 'rock' || playerChoice === 'paper' || playerChoice === 'scissors') {
        computerChoice = getComputerChoice();
        winner = getWinner(playerChoice, computerChoice);
        btnStart = btnColor(winner);
        showPlayerAndHouseChoice(playerChoice, computerChoice, btnStart);
        checkScore(winner);
    }
}


//Record and display Score If Player Wins
function checkScore(w) {
    if (w === 'win') {
        playerScore ++;
        score.textContent = playerScore;
    }
}


//Display The Color Of The Play Button Depending On Win Or Loss 
function btnColor(w) {
    //Return The Required String Containing The HTML
    if (w === 'lose') {
        return `
        <div id="result">
            <h1 id="text">YOU LOSE</h1>
            <button id="playAgain">Play Again</button>
        </div>`;
    } else if (w === 'win') {
        return `
        <div id="result">
            <h1 id="text">YOU WIN</h1>
            <button id="playAgain" style='color: green'>Play Again</button>
        </div>`;
    } else {
        return `
        <div id="result">
            <h1 id="text">It's A Draw</h1>
            <button id="playAgain" style='color: hsl(229, 25%, 31%)'>Play Again</button>
        </div>`;
    }
}


function showPlayerAndHouseChoice(p, c, b) {
    
    choices.style.display = 'none';
    result.innerHTML = `
    <div>
        <h5>You Picked</h5>
        <i id="${p}">
            <img src="images/icon-${p}.svg" alt="">
        </i>
    </div>
    ${b}
    <div>
        <h5>The House Picked</h5>
        <i id="${c}">
            <img src="images/icon-${c}.svg" alt="">
        </i>
    </div>
    `;
    restartModal.innerHTML = `<button id="restart">Restart Game</button>`;

    const playAgain = document.getElementById('playAgain');
    playAgain.addEventListener('click', playRoundAgain);

    const restart = document.getElementById('restart');
    restart.addEventListener('click', restartGame);
}


function getWinner(p, c) {

    if (p === c) {
        return 'draw';
    } else if (p === 'rock') {
        if (c === 'scissors') {
            return 'win';
        } else {
            return 'lose';
        }
    } else if (p == 'paper') {
        if (c === 'scissors') {
            return 'lose';
        } else {
            return 'win';
        }
    } else if (p === 'scissors') {
        if (c === 'rock') {
            return 'lose';
        }
        else {
            return 'win';
        }
    }
}


function getComputerChoice() {
    let num = Math.floor(( (Math.random() * 6) + 1 ));
    
    //Random choice selection by computer
    if (num <= 2) {
        return 'rock';
    } else if (num <= 4) {
        return 'paper';
    } else if (num <= 6) {
        return 'scissors';
    }
}

function playRoundAgain() {
    choices.style.display = 'block';
    result.innerHTML = '';
}

function restartGame() {
    choices.style.display = 'block';
    result.innerHTML = '';
    playerScore = 0;
    score.textContent = playerScore;
}

function closeRules() {
    rules.style.display = 'none';
    rulesBtn.style.display = 'block';
    copyRight.style.display = 'block';
}

function showRules() {
    rules.style.display = 'block';
    rulesBtn.style.display = 'none';
    copyRight.style.display = 'none';
}

// Event Handlers
choices.addEventListener('click', playGame);
ruleCancel.addEventListener('click', closeRules);
rulesBtn.addEventListener('click', showRules);