'use strict';

var controller = {
  init: function(){
    var cols = model.rows,
        rows = model.columns,
        miliseconds = model.gameSpeed,
        appleEl = model.apple.element;

    view.init(cols, rows);
    model.cacheBoard(cols, rows);
    model.createSnake(5, 10, 3);
    model.createApple();
    view.renderNewApple(model.apple.element);

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
    this.updateApple(model.apple);
    view.render(model.snake);

  },

  updateApple: function(apple){
    if ((apple.x === model.snake[0][0]) &&
    (apple.y === model.snake[0][1])){
      model.score++;
      model.createApple();
      view.renderNewScore(model.score);
      view.renderNewApple(model.apple.element);
    }
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
