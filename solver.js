class Board {
  constructor(width = 9, height = 9) {
    this.width = width;
    this.height = height;
    this.board = [];
    this.init();
  }
  init() {
    this.board = new Array(this.width)
      .fill(0)
      .map(() => new Array(this.height).fill(0));
  }

  get(x, y) {
    return this.board[x][y];
  }
  set(x, y, value) {
    this.board[x][y] = value;
  }

  isWithinBounds(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  isValid(x, y) {
    return this.isWithinBounds(x, y) && this.get(x, y) === 0;
  }

  returnValidIndices() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.isValid(x, y)) {
          return [x, y];
        }
      }
    }
  }

  isSafetoPut(x, y, value) {
    for (let i = 0; i < this.width; i++) {
      if (this.get(i, y) === value) {
        return false;
      }
    }
    for (let i = 0; i < this.height; i++) {
      if (this.get(x, i) === value) {
        return false;
      }
    }
    let x1 = x - (x % 3);
    let y1 = y - (y % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.get(x1 + i, y1 + j) === value) {
          return false;
        }
      }
    }
    return true;
  }

  isSolved() {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        if (this.get(i, j) === 0) {
          return false;
        }
      }
    }
    return true;
  }

  solve() {
    if (this.isSolved()) {
      return true;
    }

    let [row, col] = this.returnValidIndices();

    // Else for each-row backtrack
    for (let num = 1; num <= this.width; num++) {
      if (this.isSafetoPut(row, col, num)) {
        this.set(row, col, num);
        this.print();
        if (this.solve()) {
          return true;
        } else {
          this.set(row, col, 0);
        }
      }
    }
    return false;
  }

  print() {
    for (let i = 0; i < this.width; i++) {
      let row = "";
      for (let j = 0; j < this.height; j++) {
        row += this.board[i][j] + " ";
      }
      console.log(row);
    }

    console.log("\n");
  }
}

class Sudoku {
  constructor(width, height) {
    this.board = new Board(width, height);
    this.board.init();
    this.board.solve();
    // this.board.print();
  }
}

new Sudoku(9, 9);
