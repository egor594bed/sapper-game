export class SapperCell {
  x: number;
  y: number;
  color: string = "black";
  isMine: boolean;
  aroundMines: number;

  constructor(x: number, y: number, isMine: boolean, aroundMines: number) {
    this.x = x;
    this.y = y;
    this.isMine = isMine;
    this.aroundMines = aroundMines;
  }
}
