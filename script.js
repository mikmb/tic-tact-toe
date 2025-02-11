const whoseTurn = document.querySelector(".current-player");
const resetGameButton = document.querySelector(".reset-game-button");
const playAgainButton = document.querySelector(".play-again-button");
const gameBoardCells = document.querySelectorAll(".game-board-cell");
const playerXscore = document.querySelector("#player-x-score");
const playerOscore = document.querySelector("#player-o-score");
const tie = document.querySelector("#tie");

const game = (function () {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameOver = false;
  let winningPositions = [];
  let playerX = 0;
  let playerO = 0;
  let tieGame = 0;
  const resetBoard = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    for (let i = 0; i < gameBoardCells.length; i++) {
      gameBoardCells[i].textContent = "";
      gameBoardCells[i].style.backgroundColor = "#d6ccc2";
    }
  };

  resetGameButton.addEventListener("click", () => {
    game.resetGame();
  });
  playAgainButton.addEventListener("click", () => {
    game.resetBoard();
  });

  function setScoreBoard() {
    playerXscore.textContent = playerX;
    playerOscore.textContent = playerO;
    tie.textContent = tieGame;
  }
  setScoreBoard();

  const addClickEventListenerToGameBoardCells = function () {
    for (let i = 0; i < gameBoardCells.length; i++) {
      gameBoardCells[i].addEventListener("click", () => {
        makeMove(i);
      });
    }
  };
  addClickEventListenerToGameBoardCells();

  const showPlayerTurn = () => {
    whoseTurn.textContent = currentPlayer;
  };
  const displaygameBoard = () => {
    let gameBoardString = "";
    for (let i = 0; i < 9; i++) {
      gameBoardString += gameBoard[i] || "-";
      if ((i + 1) % 3 === 0) {
        gameBoardString += "\n";
      }
    }
    console.log(gameBoardString);
  };

  const makeMove = (position) => {
    if (gameOver) return;
    if (gameBoard[position] === "") {
      gameBoard[position] = currentPlayer;
      document.querySelector(`#game-board-cell-${position}`).textContent =
        currentPlayer;
      displaygameBoard();
      if (checkWin()) {
        console.log(`${currentPlayer} wins!`);
        if (currentPlayer === "X") {
          playerX++;
          playerXscore.textContent = playerX;
        } else {
          playerO++;
          playerOscore.textContent = playerO;
        }
        gameOver = true;
      } else if (checkTie()) {
        console.log("It's a tie!");
        tieGame++;
        tie.textContent = tieGame;
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        showPlayerTurn();
      }
    } else {
      console.log("Position already taken.");
    }
  };

  const checkWin = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winningCombos.some((combo) => {
      const weHaveAWinner = combo.every(
        (position) => gameBoard[position] === currentPlayer
      );
      if (weHaveAWinner) {
        winningPositions = combo;
        console.log("winningPositions:" + winningPositions);
        for (const position of winningPositions) {
          console.log("position:" + position);
          console.log(gameBoardCells[position].textContent);
          gameBoardCells[position].style.backgroundColor = "#d5bdaf";
        }
      }
      return weHaveAWinner;
    });
  };

  const checkTie = () => {
    return gameBoard.every((cell) => cell !== "");
  };

  const resetGame = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    playerX = 0;
    playerO = 0;
    tieGame = 0;
    setScoreBoard();
    tie.textContent = tieGame;
    displaygameBoard();
    resetBoard();
  };

  displaygameBoard();

  return {
    makeMove,
    resetGame,
    resetBoard,
  };
})();
