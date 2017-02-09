'use strict';

var controller = {
  init: function(){
    var cols = model.rows,
        rows = model.columns,
        miliseconds = model.gameSpeed;

    view.init(cols, rows);
    model.cacheBoard(cols, rows);
    model.createSnake(5, 3, 8);

    controller.play(miliseconds);
  },

  play: function(miliseconds){
    setInterval(function(){
      controller.render();
    }, miliseconds);
  },

  render: function(){
    view.render(model.snake);
    model.down();
  },




};

$(document).ready(function(){
  controller.init();
});
