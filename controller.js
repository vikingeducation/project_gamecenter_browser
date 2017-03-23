'use strict';

var controller = {
  init: function(){
    var cols = model.rows,
        miliseconds = model.gameSpeed,
                rows = model.columns,
        cols = model.rows,

        appleEl = model.apple.element;

    view.init(cols, rows);
    model.cacheBoard(cols, rows);
  },

  interval: undefined,

  play: function(){
    var miliseconds = model.gameSpeed,
        rows = model.columns,
        cols = model.rows,
        appleEl = model.apple.element;
    model.snake = [];
    model.apple = {};
    model.score = 0;
    model.gameSpeed = 100;
    model.keyCode = 40;

    model.createSnake(5, 10, 3);
    model.createApple();
    view.renderNewApple(model.apple.element);
    this.interval = setInterval(function(){
      controller.render();
    }, miliseconds);
  },

  render: function(){
    model.updateSnake(model.keyCode);
    this.updateApple(model.apple);
    view.renderNewScore(model.score);
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
  $(".play").click(function(){
    controller.play();
  });
});
