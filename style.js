let board = ['','','','','','','','','']; 
let currentPlayer = 'X'; 
let gameActive = true; 
const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-btn');
const message = document.getElementById('message');

// Create the game board grid
function createBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.dataset.index = i;  
        cell.addEventListener('click', () => handleCellClick(i));
        gameBoard.appendChild(cell);
    }
}

// Handle a player's move
function handleCellClick(index) {
    if (board[index] !== '' || !gameActive) return; 
    board[index] = currentPlayer;
    renderBoard();
    
    if (checkWinner()) {
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        message.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; 
    }
}

// Render the board with current player moves
function renderBoard() {
    const cells = gameBoard.children;
    for (let i = 0; i < 9; i++) {
        cells[i].textContent = board[i];
    }
}

// Check if the current player has won
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];
    
    for (const [a, b, c] of winningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
}

// Reset the game
function resetGame() {
    board = ['','','','','','','','',''];
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = '';
    renderBoard();
}

// Event listener for reset button
resetButton.addEventListener('click', resetGame);

// Initialize the game
createBoard();