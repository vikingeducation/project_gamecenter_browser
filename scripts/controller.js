'use strict;'

var controller = {
  init: function(){
    view.init();
  },

  beginGame: function(){
    event.preventDefault();
    model.init();
    $('#play').hide();
    $('#score-box').show();
    view.initializeBoard();
    view.render();
    model.addFood();
    view.renderFood();
    controller.gameLoop = window.setInterval(controller.gameInterval, model.speed);
  },

  gameInterval: function(){
    model.moveSnake();
    view.render();

    // Clear interval if game over
    if (model.checkGameOver() === true) {
      window.clearInterval(controller.gameLoop);
    }

    // Check if ate food
    if (model.snake[0].x === model.food.x && model.snake[0].y === model.food.y) {
      model.addSegment();
      view.removeFood();
      model.addFood();
      view.renderFood();
    }
  },

  getScore: function(){
    return model.getScore();
  },

  getBoardSize: function(){
    return model.getBoardSize();
  }

};

$(document).ready(function(){
    controller.init();
});
