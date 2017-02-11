'use strict';

var controller = {
  init: function(){
    var cols = model.rows,
        rows = model.columns,
        miliseconds = model.gameSpeed;

    view.init(cols, rows);
    model.cacheBoard(cols, rows);
    model.createSnake(5, 10, 3);
    model.createApple();

    controller.play(miliseconds);
  },

  interval: null,

  play: function(miliseconds){
    this.interval = setInterval(function(){
      controller.render();
    }, miliseconds);
  },

  render: function(){
    model.updateSnake(model.keyCode);
    view.render(model.snake);
  },

  gameOver: function(){
    clearInterval(this.interval);
    console.log('Game Over!')
  }


};

//runs the game

$(document).ready(function(){
  controller.init();
});
