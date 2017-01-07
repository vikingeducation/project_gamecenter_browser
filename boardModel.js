snakeGame.boardModel = {
  init: function(boardSize, snake) {
    boardSize = boardSize || 5;
    this.grid = this.setupBoard(boardSize, snake);
  },
  setupBoard: function(size, snake) {
    var board = this.newBoard(size);
    return board;
  },
  newBoard: function(size) {
    grid = {};

    for(var r = 0; r < size; r++) {
      for(var c = 0; c < size; c++) {
        grid[r + "_" + c] = new snakeGame.Coord(r,c));
      }
    }

    return grid;
  }
}
