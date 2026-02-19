const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
const statusDisplay = document.getElementById("status");

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

// Handle player move
function handleClick(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        updateBoard();
        if (checkWinner()) return;
        currentPlayer = "O"; // Switch to AI
        setTimeout(aiMove, 500); // Delay AI move for better UX
    }
}

// AI Move using Minimax
function aiMove() {
    let bestMove = minimax(board, "O").index;
    board[bestMove] = "O";
    updateBoard();
    checkWinner();
    currentPlayer = "X";
}

// Minimax Algorithm
function minimax(newBoard, player) {
    let availableMoves = newBoard.reduce((acc, val, idx) => val === "" ? acc.concat(idx) : acc, []);
    
    if (checkWin(newBoard, "X")) return { score: -10 };
    if (checkWin(newBoard, "O")) return { score: 10 };
    if (availableMoves.length === 0) return { score: 0 };

    let moves = [];

    for (let i of availableMoves) {
        let move = {};
        move.index = i;
        newBoard[i] = player;
        if (player === "O") {
            move.score = minimax(newBoard, "X").score;
        } else {
            move.score = minimax(newBoard, "O").score;
        }
        newBoard[i] = "";
        moves.push(move);
    }

    return player === "O" ? 
        moves.reduce((best, move) => move.score > best.score ? move : best, { score: -Infinity }) : 
        moves.reduce((best, move) => move.score < best.score ? move : best, { score: Infinity });
}

// Check for winner
function checkWinner() {
    for (let combo of winningCombinations) {
        let [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            if(board[a]=='X')
                statusDisplay.innerText = `You Won the Game!`;
            else
                statusDisplay.innerText = `You Lost the Game!`;
            highlightWinner(combo);
            return true;
        }
    }
    if (!board.includes("")) {
        gameActive = false;
        statusDisplay.innerText = "It's a Draw!";
        return true;
    }
    return false;
}

// Check win helper function (for Minimax)
function checkWin(board, player) {
    return winningCombinations.some(combo => combo.every(index => board[index] === player));
}

// Update the board UI
function updateBoard() {
    document.querySelectorAll(".cell").forEach((cell, index) => {
        cell.innerText = board[index];
    });
}

// Highlight winning cells
function highlightWinner(combo) {
    combo.forEach(index => document.querySelectorAll(".cell")[index].classList.add("win"));
}

// Reset game
function resetGame() {
    board.fill("");
    currentPlayer = "X";
    gameActive = true;
    statusDisplay.innerText = "";
    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("win");
    });
}
