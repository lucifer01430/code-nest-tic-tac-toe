
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;
    let scores = { X: 0, O: 0 };
    let playerNames = { X: "Player X", O: "Player O" };

    const cells = document.getElementsByClassName("cell");
    const statusDisplay = document.getElementById("status");
    const player1Display = document.getElementById("player1");
    const player2Display = document.getElementById("player2");

    // Show name input modal on load
    window.onload = () => {
      const modal = new bootstrap.Modal(document.getElementById('nameModal'));
      modal.show();
    };

    function startGame() {
      const nameX = document.getElementById("playerXName").value.trim() || "Player X";
      const nameO = document.getElementById("playerOName").value.trim() || "Player O";
      playerNames.X = nameX;
      playerNames.O = nameO;
      updateScores();
      document.getElementById("game-screen").style.display = "block";
      const modal = bootstrap.Modal.getInstance(document.getElementById('nameModal'));
      modal.hide();
      resetGame();
    }

setTimeout(() => {
  console.log(
    "%c✨ Designed and Developed by Harsh Pandey",
    "color: #007bff; font-weight: bold; font-size: 16px;"
  );
  console.log(
    "%c🔗 https://lucifer01430.github.io/Portfolio/",
    "color: #28a745; font-size: 14px;"
  );
}, 2000);


    function makeMove(index) {
      if (!gameActive || board[index] !== "") return;

      board[index] = currentPlayer;
      cells[index].textContent = currentPlayer;
      cells[index].classList.add("taken");

      if (checkWinner()) {
        statusDisplay.textContent = `🎉 ${playerNames[currentPlayer]} Wins!`;
        highlightWinnerCells();
        scores[currentPlayer]++;
        updateScores();
        gameActive = false;
        return;
      }

      if (board.every(cell => cell !== "")) {
        statusDisplay.textContent = "🤝 It's a Draw!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusDisplay.textContent = `Turn: ${playerNames[currentPlayer]}`;
    }

    function checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];

      return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          winningCombo = pattern;
          return true;
        }
        return false;
      });
    }

    function highlightWinnerCells() {
      winningCombo.forEach(index => {
        cells[index].classList.add("winner");
      });
    }

    function resetGame() {
      board = ["", "", "", "", "", "", "", "", ""];
      gameActive = true;
      currentPlayer = "X";
      statusDisplay.textContent = `Turn: ${playerNames[currentPlayer]}`;
      Array.from(cells).forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken", "winner");
      });
    }

    function newGame() {
      scores = { X: 0, O: 0 };
      updateScores();
      resetGame();
    }

    function updateScores() {
      player1Display.textContent = `${playerNames.X}: ${scores.X}`;
      player2Display.textContent = `${playerNames.O}: ${scores.O}`;
    }

    let winningCombo = [];
