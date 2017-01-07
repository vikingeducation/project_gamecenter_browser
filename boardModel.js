snakeGame.boardModel = {
  init: function(boardSize, snake) {
    boardSize = boardSize || 5;
    this.grid = this.setupBoard(boardSize, snake);
  },
  setupBoard: function(size, snake) {
    console.log("setup");
    var board = this.newBoard(size);
    return this.addSnake(board, snake);
  },
  addSnake: function(board, snake){
    console.log("snake")
    console.log(snake)
    var c;
    for(i = 0; i < snake.length; i ++){
      c = snake[i].x + "_" + snake[i].y;
      console.log(c)
      board[c] = snake[i];
    }
    return board;
  },
  newBoard: function(size) {
    grid = {};

    for(var r = 0; r < size; r++) {
      for(var c = 0; c < size; c++) {
        grid[r + "_" + c] = new snakeGame.Coord(r,c);
      }
    }

    return grid;
  }
}
