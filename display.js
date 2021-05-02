import {
  TILE_STATUSES,
  createBoard,
  markTile,
  revealTile,
  checkWin,
  checkLose,
} from "./logic.js";

let BOARD_SIZE = 9;
let MINES_NUMBER = 10;

const boardElement = document.querySelector(".board");
const minesLeftText = document.querySelector("[data-mine-count]");
const messageText = document.querySelector(".subtext");
const easyBtn = document.querySelector(".easy");
const hardBtn = document.querySelector(".hard");
const reloadBtn = document.querySelector(".reload");

reloadBtn.addEventListener("click", () => {
  document.location.reload();
});

let board = createBoard(BOARD_SIZE, MINES_NUMBER);
generateTiles(board);

easyBtn.addEventListener("click", () => {
  BOARD_SIZE = 9;
  MINES_NUMBER = 10;
  board = createBoard(BOARD_SIZE, MINES_NUMBER);
  boardElement.innerHTML = "";
  generateTiles(board);
});

hardBtn.addEventListener("click", () => {
  BOARD_SIZE = 16;
  MINES_NUMBER = 40;
  board = createBoard(BOARD_SIZE, MINES_NUMBER);
  boardElement.innerHTML = "";
  generateTiles(board);
});

function generateTiles(board) {
  board.forEach((row) => {
    row.forEach((tile) => {
      boardElement.append(tile.element);

      tile.element.addEventListener("click", () => {
        revealTile(board, tile);
        checkGameEnd();
      });

      tile.element.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        markTile(tile);
        listMinesLeft();
      });
    });
  });

  boardElement.style.setProperty("--size", BOARD_SIZE);
  minesLeftText.textContent = MINES_NUMBER;
}

function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
    );
  }, 0);

  minesLeftText.textContent = MINES_NUMBER - markedTilesCount;
}

function checkGameEnd() {
  const win = checkWin(board);
  const lose = checkLose(board);

  if (win || lose) {
    boardElement.addEventListener("click", stopProp, { capture: true });
    boardElement.addEventListener("contextmenu", stopProp, { capture: true });
  }

  if (win) {
    messageText.textContent = "You WON the game! :)";
    messageText.classList.add("gameWon");
  }

  if (lose) {
    messageText.textContent = "You LOST the game! :(";
    messageText.classList.add("gameLost");
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_STATUSES.MARKED) markTile(tile);
        if (tile.mine) revealTile(board, tile);
      });
    });
  }
}

function stopProp(e) {
  e.stopImmediatePropagation();
}
