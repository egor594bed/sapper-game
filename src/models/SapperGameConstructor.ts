import { type ICustomSettings } from "@/types/customSettings";
import { SapperCellConstructor } from "./SapperCellConstructor";

export class SapperGameConstructor {
  status: string = "game";
  timer: number = 0;
  mines: number = 0;
  rows: number = 8;
  columns: number = 8;
  minesCounter: number = 0;
  minesWithFlag: number = 0;
  closedCells: number = 0;
  firstTurn: boolean = true;
  cells: SapperCellConstructor[][] = [];

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
        break;
      }
      case "hard": {
        this.timer = 60 * 100;
        this.mines = 99;
        this.minesCounter = 99;
        this.rows = 32;
        this.columns = 16;
        break;
      }
      case "custom": {
        this.timer = 60 * customSettings.mines;
        this.mines = customSettings.mines;
        this.minesCounter = customSettings.mines;
        this.rows = customSettings.rows;
        this.columns = customSettings.columns;
        break;
      }
      default: {
        this.timer = 60 * 10;
        this.mines = 10;
        this.minesCounter = 10;
        break;
      }
    }
    this.closedCells = this.rows * this.columns;
    this.createCells();
  }

  updateCell(x: number, y: number, action: "open" | "flag") {
    if (this.cells[y][x].isMine && this.firstTurn && action === "open") {
      this.firstTurnLosePreventer(x, y);
    }

    if (action === "open") {
      this.cells[y][x].open();
      this.firstTurn = false;
    } else this.cells[y][x].setFlag();

    this.checkMines(x, y);
    if (this.status === "gameover") return;
    this.openCells(x, y);

    this.checkWin();
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

  gameOver() {
    this.status = "gameover";
    for (let i = 0; i < this.cells[0].length; i++) {
      for (let j = 0; j < this.cells.length; j++) {
        if (this.cells[j][i].isMine) {
          this.cells[j][i].open();
        }
      }
    }
  }

  private firstTurnLosePreventer(x: number, y: number) {
    let newX = Math.floor(Math.random() * this.rows);
    let newY = Math.floor(Math.random() * this.columns);

    while (this.cells[newY][newX].isMine || (newX === x && newY === y)) {
      newX = Math.floor(Math.random() * this.rows);
      newY = Math.floor(Math.random() * this.columns);
    }

    this.cells[newY][newX].isMine = true;

    for (let i = newX - 1; i <= newX + 1; i++) {
      for (let j = newY - 1; j <= newY + 1; j++) {
        if (this.validateCell(j, i)) {
          this.cells[j][i].aroundMines++;
        }
      }
    }

    this.cells[y][x].aroundMines = 0;

    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (x === i && y === j) continue;
        if (!this.validateCell(j, i)) continue;
        this.cells[j][i].aroundMines--;
        if (this.cells[j][i].isMine) {
          this.cells[y][x].aroundMines++;
        }
      }
    }

    this.cells[y][x].isMine = false;
  }

  private validateCell(x: number, y: number) {
    if (x < 0 || x >= this.cells.length) return false;
    if (y < 0 || y >= this.cells[0].length) return false;
    return true;
  }

  private openCells(x: number, y: number) {
    if (this.cells[y][x].isOpen) this.closedCells--;
    if (!this.cells[y][x].isOpen || this.cells[y][x].aroundMines > 0) return;

    const arr = new Set([`${x}:${y}`]);
    const opened = new Set();

    const searchAndOpen = (x: number, y: number) => {
      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          if (!this.validateCell(j, i)) continue;

          const cell = this.cells[j][i];
          if (cell.isOpen || cell.flag !== "") continue;

          cell.open();
          this.closedCells--;

          if (cell.aroundMines === 0) {
            arr.add(`${cell.x}:${cell.y}`);
          }
        }
      }
      opened.add(`${x}:${y}`);
      arr.delete(`${x}:${y}`);
    };

    while (arr.size > 0) {
      const [coords] = arr.values();
      searchAndOpen(Number(coords.split(":")[0]), Number(coords.split(":")[1]));
    }
  }

  private checkMines(x: number, y: number) {
    if (this.cells[y][x].isMine && this.cells[y][x].isOpen) {
      this.gameOver();
      return;
    }

    let flags = 0;
    this.minesWithFlag = 0;

    for (let i = 0; i < this.cells[0].length; i++) {
      for (let j = 0; j < this.cells.length; j++) {
        if (this.cells[j][i].flag === "flag") {
          this.minesCounter--;
          flags++;
          if (this.cells[j][i].isMine) {
            this.minesWithFlag++;
          }
        }
      }
    }

    this.minesCounter = this.mines - flags;
  }

  private checkWin() {
    if (
      (this.minesWithFlag === this.mines && this.minesCounter === 0) ||
      this.closedCells - this.mines + (this.mines - this.minesWithFlag) ===
        this.mines - this.minesWithFlag
    ) {
      this.status = "win";
    }
  }

  private createCells() {
    const newField: SapperCellConstructor[][] = [];

    for (let i = 0; i < this.columns; i++) {
      newField.push([]);
      for (let j = 0; j < this.rows; j++) {
        const cell = new SapperCellConstructor(j, i, false, 0);
        newField[i].push(cell);
      }
    }

    if (this.rows * this.columns < this.mines) {
      this.mines = this.rows * this.columns;
      this.minesCounter = this.rows * this.columns;
    }

    for (let i = 0; i < this.mines; i++) {
      const x = Math.floor(Math.random() * this.columns);
      const y = Math.floor(Math.random() * this.rows);
      if (newField[x][y]?.isMine) {
        i--;
        continue;
      }

      newField[x][y].isMine = true;

      for (let j = x - 1; j <= x + 1; j++) {
        for (let k = y - 1; k <= y + 1; k++) {
          if (
            j >= 0 &&
            j < this.columns &&
            k >= 0 &&
            k < this.rows &&
            !newField[j][k]?.isMine
          )
            newField[j][k].aroundMines++;
        }
      }
    }

    this.cells = newField;
  }
}
