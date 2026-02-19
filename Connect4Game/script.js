var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;
var gameOver = false;
var board;

var rows = 6;
var columns = 7;

window.onload = function() {
    setGame();
    document.getElementById("restart").addEventListener("click", restartGame);
}

function setGame() {
    board = [];
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = ""; // clear board

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push('');
            let tile = document.createElement("div");
            tile.id = r + "." + c;
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            boardDiv.append(tile);
        }
        board.push(row);
    }

    document.getElementById("winner").innerText = "";
    currPlayer = playerRed;
    gameOver = false;
}

function setPiece() {
    if (gameOver) return;

    let coord = this.id.split(".");
    let c = parseInt(coord[1]);

    // find the lowest empty row
    for (let r = rows - 1; r >= 0; r--) {
        if (board[r][c] === '') {
            board[r][c] = currPlayer;
            let tile = document.getElementById(r + "." + c);
            tile.classList.add(currPlayer === playerRed ? "red-piece" : "yellow-piece");

            if (checkWinner(r, c)) {
                document.getElementById("winner").innerText = `${currPlayer === playerRed ? "Red" : "Yellow"} Wins!`;
                gameOver = true;
            } else if (isDraw()) {
                document.getElementById("winner").innerText = "It's a Draw!";
                gameOver = true;
            } else {
                currPlayer = (currPlayer === playerRed) ? playerYellow : playerRed;
            }
            break;
        }
    }
}

function checkWinner(r, c) {
    const directions = [
        { dr: 0, dc: 1 },  // horizontal
        { dr: 1, dc: 0 },  // vertical
        { dr: 1, dc: 1 },  // diagonal \
        { dr: 1, dc: -1 }  // diagonal /
    ];

    for (let {dr, dc} of directions) {
        let count = 1;

        // check forward
        for (let i = 1; i < 4; i++) {
            let nr = r + dr*i;
            let nc = c + dc*i;
            if (nr < 0 || nr >= rows || nc < 0 || nc >= columns) break;
            if (board[nr][nc] === currPlayer) count++;
            else break;
        }

        // check backward
        for (let i = 1; i < 4; i++) {
            let nr = r - dr*i;
            let nc = c - dc*i;
            if (nr < 0 || nr >= rows || nc < 0 || nc >= columns) break;
            if (board[nr][nc] === currPlayer) count++;
            else break;
        }

        if (count >= 4) return true;
    }

    return false;
}

function isDraw() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === '') return false;
        }
    }
    return true;
}

function restartGame() {
    setGame();
}
