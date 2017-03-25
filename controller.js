'use strict';

var Controller = {
  init: function(){
    var cols = Model.rows,
        rows = Model.rows;

    View.init(cols, rows);
    Model.cacheBoard(cols, rows);
    this.updateUserDirection();
  },

  interval: undefined,

  updateUserDirection: function(keyCodeCallback){
    View.addArrowKeyListeners(Model.updateKeyCode, Controller.render);
  },

  play: function(){
    this.reset();
    Model.createSnake(5, 6, 3); // (size, startingX, startingY)
    Model.createApple();
    View.renderNewApple(Model.apple.element);
    this.interval = setInterval(function(){
      Controller.render();
    }, Model.gameSpeed);
  },

  render: function(){
    if (Model.gameOver === false) {
      Controller.updateApple(Model.apple);
      View.render(Model.snake);
    Model.updateSnake(Model.keyCode);
    }
  },

  consumedApple: function(apple){
    return ((apple.x === Model.snake[0][0]) &&
            (apple.y === Model.snake[0][1]))
  },

  updateApple: function(apple){
    if (this.consumedApple(apple)) {
      Model.growSnake();
      View.renderNewScore(Model.score);
      this.advanceScore();
      Model.createApple();
      View.renderNewScore(Model.score);
      View.renderNewApple(Model.apple.element);
    }
  },

  advanceScore: function(){
    Model.score += Model.points;
    Model.points += 100;
  },

  reset: function(){
    Model.snake = [];
    Model.apple = {};
    Model.score = 0;
    Model.points = 100;
    Model.gameSpeed = 100;
    Model.keyCode = 40;
    Model.gameOver = false;
    View.renderNewScore(Model.score);
  },

  gameOver: function(){
    Model.gameOver = true;
    View.renderSnakeDeath();
    clearInterval(this.interval);
    $('.play').show();
  },

  run: function(){
    Controller.init();
    $('.play').click(function(){
      Controller.play();
      $(this).fadeOut();
    });
  }
};

$(document).ready(function(){
  Controller.run();
});
