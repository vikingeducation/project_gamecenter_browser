var controller = {
  init: function() {
    model.board.generateNewBoard();
    view.init();
    view.render();
  },

  getBoard: function() {
    return model.board.getBoard();
  },

  move: function(dir) {
    model.snake.setPosition(dir);
    model.board.update();
  },

  checkEndConditions: function() {
    if (model.board.outOfBounds()) {
      view.renderEnd();
    } else {
      view.render();
    }
  }
};

$(document).ready(function() {
  controller.init();
});
