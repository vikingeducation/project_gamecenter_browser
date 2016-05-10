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
    controller.gameLoop = window.setInterval(controller.gameInterval, model.speed);
  },

  gameInterval: function(){
      model.moveSnake();
      view.render();

      // Clear interval if game over
      if (model.checkGameOver() === true) {
        window.clearInterval(controller.gameLoop);
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
