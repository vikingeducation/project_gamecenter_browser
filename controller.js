var controller = {

  getBoard: function() {
    return model.board.getBoard();
  },

  move: function(dir) {
    model.snake.setPosition(dir);
  }
};
