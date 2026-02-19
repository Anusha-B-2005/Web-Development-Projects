<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tic Tac Toe</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Welcome to Tic Tac Toe!</h1>
    
    <div id="game-container">
        <div class="board">
            <div class="cell" onclick="handleClick(0)"></div>
            <div class="cell" onclick="handleClick(1)"></div>
            <div class="cell" onclick="handleClick(2)"></div>
            <div class="cell" onclick="handleClick(3)"></div>
            <div class="cell" onclick="handleClick(4)"></div>
            <div class="cell" onclick="handleClick(5)"></div>
            <div class="cell" onclick="handleClick(6)"></div>
            <div class="cell" onclick="handleClick(7)"></div>
            <div class="cell" onclick="handleClick(8)"></div>
        </div>
        <h2 id="status"></h2>
        <button onclick="resetGame()">Restart Game</button>
    </div>

    <script>
        let board = ["", "", "", "", "", "", "", "", ""];
        let currentPlayer = "X";
        let gameActive = true;
        const statusDisplay = document.getElementById("status");

        function handleClick(index) {
            if (board[index] === "" && gameActive) {
                board[index] = currentPlayer;
                updateBoard();
                if (checkWinner()) return;
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }

        function checkWinner() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            for (let combo of winningCombinations) {
                let [a, b, c] = combo;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    gameActive = false;
                    statusDisplay.innerText = `${board[a]} Wins!`;
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

        function updateBoard() {
            document.querySelectorAll(".cell").forEach((cell, index) => {
                cell.innerText = board[index];
            });
        }

        function resetGame() {
            board = ["", "", "", "", "", "", "", "", ""];
            gameActive = true;
            currentPlayer = "X";
            updateBoard();
            statusDisplay.innerText = "";
        }
    </script>
</body>
</html>
