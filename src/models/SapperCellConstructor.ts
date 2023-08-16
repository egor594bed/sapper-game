export class SapperCellConstructor {
  x: number;
  y: number;
  color: string = "transparent";
  aroundMines: number;
  isMine: boolean;
  isOpen: boolean = false;
  flag: "flag" | "maybe" | "" = "";

  constructor(x: number, y: number, isMine: boolean, aroundMines: number) {
    this.x = x;
    this.y = y;
    this.isMine = isMine;
    this.aroundMines = aroundMines;
  }

  open() {
    this.isOpen = true;
    this.flag = "";
  }

  setFlag() {
    if (this.isOpen) return;

    switch (this.flag) {
      case "flag": {
        this.flag = "maybe";
        break;
      }
      case "maybe": {
        this.flag = "";
        break;
      }
      default: {
        this.flag = "flag";
      }
    }
  }
}
