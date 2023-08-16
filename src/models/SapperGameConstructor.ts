import { type ICustomSettings } from "@/types/customSettings";
import { SapperCellConstructor } from "./SapperCellConstructor";

export class SapperGameConstructor {
  timer: number = 0;
  mines: number = 0;
  rows: number = 8;
  columns: number = 8;
  minesCounter = 0;
  status: string = "game";
  cells: SapperCellConstructor[][] = [];
  colors: string[] = [
    "blue",
    "green",
    "red",
    "dark-blue",
    "brown",
    "turquoise",
    "black",
    "white",
  ];

  constructor(
    gameMode: string,
    customSettings: ICustomSettings = { rows: 8, columns: 8, mines: 10 }
  ) {
    switch (gameMode) {
      case "medium": {
        this.timer = 60 * 40;
        this.mines = 40;
        this.minesCounter = 40;
        this.rows = 16;
        this.columns = 16;
        this.createCells();
        break;
      }
      case "hard": {
        this.timer = 60 * 100;
        this.mines = 99;
        this.minesCounter = 99;
        this.rows = 32;
        this.columns = 16;
        this.createCells();
        break;
      }
      case "custom": {
        this.timer = 60 * customSettings.mines;
        this.mines = customSettings.mines;
        this.minesCounter = customSettings.mines;
        this.rows = customSettings.rows;
        this.columns = customSettings.columns;
        this.createCells();
        break;
      }
      case "copy": {
      }
      default: {
        this.timer = 60 * 10;
        this.mines = 10;
        this.minesCounter = 10;
        this.createCells();
        break;
      }
    }
  }

  getGameCopy() {
    const newCopy = new SapperGameConstructor("copy");
    newCopy.cells = this.cells;
    newCopy.mines = this.mines;
    newCopy.minesCounter = this.minesCounter;
    newCopy.timer = this.timer;
    newCopy.status = this.status;
    newCopy.rows = this.rows;
    newCopy.columns = this.columns;

    return newCopy;
  }

  cellHasBeenUpdated(x: number, y: number) {
    this.checkMines(x, y);
    this.openCells(x, y);
  }

  getGameStatus() {
    switch (this.status) {
      case "game": {
        return "Игра началась";
      }
      case "win": {
        return "Вы выиграли";
      }
      case "gameover": {
        return "Вы проиграли";
      }
      default:
        break;
    }
  }

  private validateCell(x: number, y: number) {
    if (x < 0 || x >= this.cells.length) return false;
    if (y < 0 || y >= this.cells[0].length) return false;
    return true;
  }

  private openCells(x: number, y: number) {
    if (!this.cells[x][y].isOpen || this.cells[x][y].aroundMines > 0) return;

    const arr = new Set([`${x}:${y}`]);
    const opened = new Set();
    let notOpened = 0;

    const searchAndOpen = (x: number, y: number) => {
      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          console.log(i, j);
          if (!this.validateCell(i, j)) continue;

          const cell = this.cells[i][j];
          if (cell.isOpen || cell.flag !== "") continue;

          cell.open();

          if (cell.aroundMines === 0) {
            arr.add(`${i}:${j}`);
          }
        }
      }
      opened.add(`${x}:${y}`);
      arr.delete(`${x}:${y}`);
    };
    while (arr.size > 0) {
      console.log(arr);
      const [coords] = arr.values();
      searchAndOpen(Number(coords.split(":")[0]), Number(coords.split(":")[1]));
    }
  }

  private checkMines(x: number, y: number) {
    if (this.cells[x][y].isMine && this.cells[x][y].isOpen) {
      this.gameOver();
    }

    let minesCounterCheck = 0;
    let flags = 0;

    for (let i = 0; i < this.cells[0].length; i++) {
      for (let j = 0; j < this.cells.length; j++) {
        // if (!this.validateCell(i, j)) continue;
        if (this.cells[j][i].flag === "flag") {
          this.minesCounter--;
          flags++;
          if (this.cells[j][i].isMine) {
            minesCounterCheck++;
          }
        }
      }
    }

    this.minesCounter = this.mines - flags;

    if (minesCounterCheck === this.mines && this.minesCounter === 0) {
      this.status = "win";
    }
  }

  private gameOver() {
    this.status = "gameover";
    for (let i = 0; i < this.cells[0].length; i++) {
      for (let j = 0; j < this.cells.length; j++) {
        if (this.cells[j][i].isMine) {
          this.cells[j][i].open();
        }
      }
    }
  }

  private createCells() {
    const newField: SapperCellConstructor[][] = [];

    for (let i = 0; i < this.rows; i++) {
      newField.push([]);
      for (let j = 0; j < this.columns; j++) {
        const cell = new SapperCellConstructor(j, i, false, 0);
        newField[i].push(cell);
      }
    }

    if (this.rows * this.columns < this.mines) {
      this.mines = this.rows * this.columns;
      this.minesCounter = this.rows * this.columns;
    }

    for (let i = 0; i < this.mines; i++) {
      const x = Math.floor(Math.random() * this.rows);
      const y = Math.floor(Math.random() * this.columns);
      if (newField[x][y]?.isMine) {
        i--;
        continue;
      }

      newField[x][y].isMine = true;

      for (let j = x - 1; j <= x + 1; j++) {
        for (let k = y - 1; k <= y + 1; k++) {
          if (
            j >= 0 &&
            j < this.rows &&
            k >= 0 &&
            k < this.columns &&
            !newField[j][k]?.isMine
          ) {
            newField[j][k].aroundMines++;
            newField[j][k].color = this.colors[newField[j][k].aroundMines - 1];
          }
        }
      }
    }

    this.cells = [...newField];
  }
}
