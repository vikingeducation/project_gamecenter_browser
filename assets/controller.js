"use strict";

var controller = {

  gameOver: false,

  init: function() {
    view.init({
      startGame: this.startGame,
    });
    model.init();
    controller.render();
    view.initialRender(model.getFood(), model.getScore());
  },

  startGame: function() {
    view.transitionElements();
    controller.gameOn = setInterval(function() {
      model.moveSnake({
        updateGame: controller.updateGame,
        endGame: controller.endGame,
      });
      controller.render(model.getSnake());
    }, 75);
  },

  endGame: function() {
    controller.gameOver = true;
    clearInterval(controller.gameOn);
    view.gameOver({
      reset: controller.reset
    });
  },

  reset: function() {
    model.reset();
    view.reset();
    controller.gameOver = false;
    controller.init();
  },

  keyPress: function(e) {
    model.setNewDirection(e.keyCode);
  },

  render: function() {
    if (!this.gameOver) {
      view.render(model.getSnake());
    }
  },

  updateGame: function() {
    view.renderUpdate(model.getFood(), model.getScore());
  }
}