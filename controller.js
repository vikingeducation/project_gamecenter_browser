'use strict';

var controller = {
  init: function(){
    var cols = model.rows,
        rows = model.rows;

    view.init(cols, rows);
    model.cacheBoard(cols, rows);
  },

  interval: undefined,

  play: function(){
    this.reset();
    model.createSnake(5, 6, 3); // (size, startingX, startingY)
    model.createApple();
    view.renderNewApple(model.apple.element);
    this.interval = setInterval(function(){
      controller.render();
    }, model.gameSpeed);
  },

  render: function(){
    model.updateSnake(model.keyCode);
    if (model.gameOver === false) {
      this.updateApple(model.apple);
      view.render(model.snake);
    }
  },

  consumedApple: function(apple){
    return ((apple.x === model.snake[0][0]) &&
            (apple.y === model.snake[0][1]))
  },

  updateApple: function(apple){
    if (this.consumedApple(apple)) {
      view.renderNewScore(model.score);
      this.advanceScore();
      model.createApple();
      view.renderNewScore(model.score);
      view.renderNewApple(model.apple.element);
    }
  },

  advanceScore: function(){
    model.score += model.points;
    model.points += 100;
  },

  reset: function(){
    model.snake = [];
    model.apple = {};
    model.score = 0;
    model.points = 100;
    model.gameSpeed = 100;
    model.keyCode = 40;
    model.gameOver = false;
    view.renderNewScore(model.score);
  },

  gameOver: function(){
    model.gameOver = true;
    view.renderSnakeDeath();
    clearInterval(this.interval);
    $('.play').show();
  },

  run: function(){
    controller.init();
    $('.play').click(function(){
      controller.play();
      $(this).slideUp('swing');
    });
  }
};

$(document).ready(function(){
  controller.run();
});
