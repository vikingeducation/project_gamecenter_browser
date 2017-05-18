"use strict";

var view = {

  padding: 20,

  init: function(callbacks) {
    this.displayInstructions();
    this.createGrid(callbacks.grid);
    this.displaySnake(callbacks.snake);
    this.displayFood(callbacks.food);
    this.runGame = callbacks.runGame;
    $('#start').on('click', callbacks.setUpGame);
    $(document).on('keydown', callbacks.keyDown);
  },

  displayFood: function(food) {
    var $block = this.getBlock(food);
    $block.addClass('snack');
  },

  displaySnake: function(snake) {
    for (var i = 0; i < snake.length; i++) {
      var $block = $('div[data-x=' + snake[i].x + '][data-y=' + snake[i].y + ']');
      if (i === 0) {
        $block.addClass('head');
      }
      $block.addClass('snake');
    }
  },

  setUpBoard: function(grid) {
    $('.instructions').fadeOut(300, function() {
      $(this).remove();
      $('.head').removeClass('head');
      view.runGame();
    });

  },

  updateScore: function(score) {
    $('#score').text(score);
  },

  updateFood: function(food) {
    $('.snack').removeClass('snack');
    this.getBlock(food).addClass('snack');
  },

  cutSnakeTail: function(snake) {
    var tail = snake[snake.length - 1];
    this.getBlock(tail).removeClass('snake');
  },

  addSnakeHead: function(snake) {
    var head = snake[0];
    this.getBlock(head).addClass('snake');
  },

  getBlock: function(coord) {
    return $('div[data-x=' + coord.x + '][data-y=' + coord.y + ']');
  },

  createGrid: function(grid) {
    var $grid = $('#grid');
    $grid.width(grid.width * 10).height(grid.height * 10);
    for (var i = 0; i < grid.height; i++) {
      for (var j = 0; j < grid.width; j++) {
        var $block = $('<div>').addClass('block')
          .attr({
            'data-x': j,
            'data-y': i
          })
        $('#grid').append($block);
      }
    }
  },

  displayInstructions: function() {
    var $instructions = $('<div>').addClass('instructions aligner')
      .append($('<p><u>').text('Welcome to Snack!'))
      .append($('<p>').text('Your goal is to help the snake snack up.'))
      .append($('<p>').text('Use the up, down, left and right arrow keys to lead the snake to the snack.'))
      .append($('<p>').text('BEWARE: It\'s game over if you hit the wall or if the snake tries to snack on itself!'))
      .append($('<a>').addClass('btn').attr('id', 'start').text('Start'))
    $('#grid').addClass('screen').append($instructions);
  },

  gameOver: function(callbacks) {
    this.displayGameOver();
    $('.reset').on('click', function(e) {
      $(e.target).parents('.game-over').remove();
      callbacks.reset();
    });
  },

  displayGameOver: function() {
    var $grid = $('#grid');
    var $gameOver = $('<div>').addClass('game-over aligner')
      .css({
        width: $grid.width() - 2 * this.padding,
        height: $grid.height() - 2 * this.padding
      })
      .append($('<h3>').text('Game Over'))
      .append($('<p>').text('Score:' + $('#score').text()).addClass('score'))
      .append($('<a>').addClass('reset btn').text('Play again'));
    $('#grid').prepend($gameOver);
  },
  clearScreen: function() {
    $('#grid').html(null);
  },

}