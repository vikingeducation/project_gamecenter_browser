"use strict";

var view = {

  reset: function() {
    $('#score').text('0');
    $('#grid').html(null);
    return;
  },

  init: function(callbacks) {
    var startGame = callbacks.startGame;
    this.displayInstructions();
    $('#start').on('click', function() {
      $('.instructions').fadeOut(300, function() {
        $(this).remove();
        startGame();
      });
    });
  },

  transitionElements: function() {
    $('#grid').removeClass('opacity');

  },

  displayInstructions: function() {
    var $instructions = $('<div>').addClass('instructions v-middle')
      .append($('<p><u>').text('Welcome to Snack!'))
      .append($('<p>').text('Your goal is to help the snake get snacks'))
      .append($('<p>').text('Use the up, down, left and right arrow keys to lead the snake to the snack.'))
      .append($('<p>').text('BEWARE: It\'s game over if you hit the wall or if the snake chomps on itself!'))
      .append($('<a>').addClass('btn').attr('id', 'start').text('Start'))
    $('#grid').addClass('opacity').append($instructions);
  },

  initialRender: function(food, score) {
    this.renderUpdate(food, score);
    this.watchKeyPress({
      keyPress: controller.keyPress,
    });
  },

  watchKeyPress: function(callbacks) {
    $(document).on('keydown', callbacks.keyPress);
  },

  render: function(snake) {
    var $originalSnake = $('#grid .part');
    var $grid = $('#grid');
    var $part;
    for (var i = 0; i < snake.length; i++) {
      $part = $('<div>').css({
          top: snake[i][1] * 10,
          left: snake[i][0] * 10
        })
        .addClass('part')
      $('#grid').append($part);
    }
    $originalSnake.remove();
  },

  renderUpdate: function(food, score) {
    var $originalSnack = $('#grid .snack');
    var $food = $('<div>').css({
        top: food.y * 10,
        left: food.x * 10
      })
      .addClass('snack')
    $('#grid').append($food);
    $('#score').text(score);
    $originalSnack.remove();
  },

  gameOver: function(callbacks) {
    var $gameOver = $('<div>').addClass('game-over v-middle')
      .text('Game Over')
      .append($('<p>').text('Score:' + $('#score').text()))
      .append($('<a>').addClass('reset btn').text('Play again'));
    $('#grid').html($gameOver);
    $('.reset').on('click', callbacks.reset);
  }
}