class Sudoku {
  constructor(width, height) {
    this.GameBoard = new Board(width, height);
    this.render();
  }

  solve() {
    this.GameBoard.solve();
  }

  randomize() {
    this.GameBoard.init();
    this.GameBoard.randomlyFill();
  }

  render() {
    this.GameBoard.board.forEach((col, colindex) => {
      let colDiv = document.createElement("div");
      colDiv.className = "colWrap";
      col.forEach((row, rowindex) => {
        let div = document.createElement("div");
        div.id = `${colindex}-${rowindex}`;
        div.className = "box btn btn-primary";
        div.innerText = row;
        if (row > 0) {
          div.style.backgroundColor = "green";
        }

        colDiv.appendChild(div);
      });
      wrapper.appendChild(colDiv);
    });
  }
}

let wrapper = document.getElementById("cover");
let solveBtn = document.querySelector(".solve");
let randomBtn = document.querySelector(".random");
let width = 9;
let height = 9;

let sudoku_game = new Sudoku(width, height);

solveBtn.addEventListener("click", () => {
  sudoku_game.solve();
});

randomBtn.addEventListener("click", () => {
  sudoku_game.randomize();
  wrapper.innerHTML = null;
  sudoku_game.render();
});