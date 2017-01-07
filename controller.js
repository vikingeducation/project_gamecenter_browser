snakeGame.controller = {
  init: function() {
    this.board = snakeGame.boardModel;
    this.snake = snakeGame.snakeModel;
    this.view = snakeGame.view;
    this.snake.init()
    this.board.init(5, this.snake.snakeBody);
    this.view.init();
    this.view.render(this.board);

    snakeGame.controller.run();
  },
  run: function() {

  }
}
