"use strict";

var controller = {

  init: function() {
    isGameOver: false,
    model.init({
      grid: {
        width: 40,
        height: 40
      }
    });
    view.init({
      setUpGame: this.setUpGame,
      keyDown: this.keyDown,
      snake: model.getSnake(),
      grid: model.getGrid(),
      food: model.getFood(),
      runGame: this.runGame
    });
  },

  setUpGame: function() {
    view.setUpBoard(model.getGrid());
    controller.runGame = window.setInterval(controller.runGame, 75);
  },

  gameSpeed: function(speed) {
    controller.runGame = window.setInterval(controller.runGame, speed);
  },

  runGame: function() {
    model.moveSnake();
    if (model.isCollision()) {
      return controller.gameOver();
    }
    if (model.foodEaten()) {
      controller.updateGame();
    } else {
      view.cutSnakeTail(model.getSnake());
      model.cutSnakeTail();
    }
    model.attachNewHead();
    view.addSnakeHead(model.getSnake());

  },

  updateGame: function() {
    model.updateSettings();
    view.updateScore(model.getScore());
    model.createFood();
    view.updateFood(model.getFood());
  },

  gameOver: function() {
    this.isGameOver = true;
    window.clearInterval(controller.runGame);
    view.gameOver({
      reset: controller.reset
    });
  },

  reset: function() {
    view.clearScreen();
    controller.init();
  },

  keyDown: function(key) {
    model.setNewDirection(key.keyCode);
  },

}