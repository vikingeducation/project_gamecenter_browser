'use strict';

var controller = {
  init: function(){
    var cols = model.rows,
        rows = model.columns,
        miliseconds = model.gameSpeed;

    view.init(cols, rows);
    model.cacheBoard(cols, rows);
    model.createSnake(5, 10, 3);

    controller.play(miliseconds);
  },
  
  interval: null,

  play: function(miliseconds){
    this.interval = setInterval(function(){
      controller.render();
    }, miliseconds);
  },

  render: function(){
    view.render(model.snake);
    model.updateSnake(model.keyCode);
  },
  
  gameOver: function(){
    clearInterval(this.interval);
    console.log('Game Over!')
  }
};

$(document).ready(function(){
  controller.init();
});
