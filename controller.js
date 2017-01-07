snakeGame.controller = {
  init: function(num) {
    var size = num || 5;
    this.board = snakeGame.boardModel;
    this.snake = snakeGame.snakeModel;
    this.view = snakeGame.view;
    this.snake.init()
    this.board.init(size, this.snake.snakeBody);
    this.view.init();
    this.view.render(this.board);

    snakeGame.controller.run();
  },
  run: function() {

  }
}
