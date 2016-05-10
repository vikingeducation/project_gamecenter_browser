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
    window.setInterval(controller.gameInterval, model.speed);
  },

  gameInterval: function(){
      // move the snake
      model.moveSnake();
      // render the snake
      view.render();
      // check game over
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
