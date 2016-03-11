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
    if ( this.checkEndConditions() ) {
      view.renderEnd();
    } else {
      model.board.checkEat();
      model.board.update();
      view.render();
    }
  },

  checkEndConditions: function() {
    model.snake.checkEatSelf();

    if (model.board.outOfBounds() || model.gameEnd) {
      return true;
    } else {
      return false;
    }
  }
};

$(document).ready(function() {
  controller.init();
});
