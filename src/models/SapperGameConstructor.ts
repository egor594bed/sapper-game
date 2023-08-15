import { type ICustomSettings } from "@/types/customSettings";
import { SapperCell } from "./SapperCell";

export class SapperGameConstructor {
  timer: number = 0;
  mines: number = 0;
  status: string = "game";
  cells: SapperCell[][] = [];
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

  constructor(gameMode: string, customSettings: ICustomSettings) {
    switch (gameMode) {
      case "medium": {
        this.timer = 60 * 40;
        this.mines = 40;
        this.createCells(16, 16, 40);
        break;
      }
      case "hard": {
        this.timer = 60 * 100;
        this.mines = 99;
        this.createCells(32, 32, 99);
        break;
      }
      case "custom": {
        this.timer = 60 * customSettings.mines;
        this.mines = customSettings.mines;
        this.createCells(
          customSettings.rows,
          customSettings.columns,
          customSettings.mines
        );
        break;
      }
      default: {
        this.timer = 60 * 10;
        this.mines = 10;
        this.createCells(8, 8, 10);
        break;
      }
    }
  }

  createCells(rows: number, columns: number, mines: number) {
    const newField: SapperCell[][] = [];

    for (let i = 0; i < rows; i++) {
      newField.push([]);
      for (let j = 0; j < columns; j++) {
        const cell = new SapperCell(i, j, false, 0);
        newField[i].push(cell);
      }
    }

    //проверить чтобы мин не было больше ячеек
    for (let i = 0; i < mines; i++) {
      const x = Math.floor(Math.random() * rows);
      const y = Math.floor(Math.random() * columns);
      if (newField[x][y]?.isMine) i--;
      newField[x][y].isMine = true;

      for (let j = x - 1; j <= x + 1; j++) {
        for (let k = y - 1; k <= y + 1; k++) {
          if (
            j >= 0 &&
            j < rows &&
            k >= 0 &&
            k < columns &&
            !newField[j][k]?.isMine
          ) {
            newField[j][k].aroundMines++;
          }
        }
      }
    }

    this.cells = [...newField];
  }
}
