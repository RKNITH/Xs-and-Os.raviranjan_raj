const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const resetBtn = document.querySelector('.resetBtn');
const alertBox = document.querySelector('.alertBox');
const winSound = document.getElementById('winSound');

let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

player1.textContent = `player 1: ${currentPlayer}`;
player2.textContent = `player 2: ${nextPlayer}`;


const startGame = () => {
    gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick);

    })
}

const handleClick = (e) => {
    if (e.target.textContent === '') {
        e.target.textContent = playerTurn;
        const winningCombination = checkWin();
        if (winningCombination) {
            showAlert(`${playerTurn} is winner`)

            disableCell();

        }
        else if (checkTie()) {
            showAlert(`It's Tie!`)
            disableCell();
        }
        else {
            showAlert(`Turn for Player ${playerTurn}`)
            changePlayerTurn();
        }

    }
}




const changePlayerTurn = () => {
    if (playerTurn === currentPlayer) {
        playerTurn = nextPlayer;
    }
    else {
        playerTurn = currentPlayer;
    }

}

const checkWin = () => {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];


    for (let i = 0; i < winningConditions.length; i++) {
        const [pos1, pos2, pos3] = winningConditions[i];
        if (gameCells[pos1].textContent !== '' && gameCells[pos1].textContent === gameCells[pos2].textContent && gameCells[pos2].textContent === gameCells[pos3].textContent) {
            playWinSound();
            return true;
        }
    }
    return false;

}

const playWinSound = () => {
    winSound.play();
}

const checkTie = () => {
    let emptyCellsCount = 0;

    gameCells.forEach(cell => {
        if (cell.textContent === '') {
            emptyCellsCount++;
        }
    })
    return emptyCellsCount === 0 && !checkWin();
}

const disableCell = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
    })
}

const restartGame = () => {
    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
    })
    startGame();
}

const showAlert = (msg) => {
    alertBox.style.display = 'block';
    alertBox.textContent = msg;

    setTimeout(() => {
        alertBox.style.display = 'none';

    }, 1000)

}

resetBtn.addEventListener('click', restartGame);

startGame();

