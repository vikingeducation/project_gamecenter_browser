'use strict';

var controller = {
  init: function(){
    var cols = model.rows,
        rows = model.columns;

    view.init(cols, rows);
    model.cacheBoard(cols, rows);
    model.createSnake(5, 3, 8);

    controller.play();
  },

  play: function(){
    var miliseconds = model.gameSpeed;

    setInterval(function(){
      controller.render();
    }, miliseconds);
  },

  render: function(){
    view.render(model.snake);
    this.updateSnake();
    // this.updateDirection();
  },

  updateSnake: function(){

  },

  updateDirection: function(){
    model.snake.y++;
  },





};

$(document).ready(function(){
  controller.init();
});
