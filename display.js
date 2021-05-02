import { createBoard } from "./logic.js";

const BOARD_SIZE = 2;
const MINES_NUMBER = 2;

const board = createBoard(BOARD_SIZE, MINES_NUMBER);
const boardElement = document.querySelector('.board');
boardElement.style.setProperty("--size", BOARD_SIZE);

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element);
    });
});