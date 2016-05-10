'use strict;'

var model = {

  init: function(){
    this.score = 2;
    this.boardSize = 10;
    this.speed = 800;

    this.snakeDirection = 'right';
    this.snake = [
      {
        x: 4,
        y: 4
      },
      {
        x: 3,
        y: 4
      }
    ];
    this.previousTail = {
      x: 2,
      y: 4
    }

    this.food = {
      x: null,
      y: null
    };
  },

  getScore: function(){
    return this.score;
  },

  getBoardSize: function(){
    return this.boardSize;
  },

  moveSnake: function(){
    // Chop off the tail
    model.previousTail = model.snake.pop();

    // Add the head according to direction
    if (model.snakeDirection === 'right') {
      model.snake.unshift({
        x: model.snake[0].x + 1,
        y: model.snake[0].y
      });
    } else if (model.snakeDirection === 'left'){
      model.snake.unshift({
        x: model.snake[0].x - 1,
        y: model.snake[0].y
      });
    } else if (model.snakeDirection === 'up'){
      model.snake.unshift({
        x: model.snake[0].x,
        y: model.snake[0].y - 1
      });
    } else {
      model.snake.unshift({
        x: model.snake[0].x,
        y: model.snake[0].y + 1
      });
    }
  },

  setDirection: function(event){
    event.preventDefault();

    if (event.keyCode === 38 || event.keyCode === 73){
      model.snakeDirection = 'up';
    } else if (event.keyCode === 40 || event.keyCode === 77){
      model.snakeDirection = 'down';
    } else if (event.keyCode === 39 || event.keyCode === 75){
      model.snakeDirection = 'right';
    } else if (event.keyCode === 37 || event.keyCode === 74){
      model.snakeDirection = 'left';
    }

  },

  checkGameOver: function(){
    var gameOver = false;

    // Check if hit wall
    if (
      model.snake[0].x >= model.boardSize ||
      model.snake[0].x < 0 ||
      model.snake[0].y >= model.boardSize ||
      model.snake[0].y < 0){

      gameOver = true;
    } else {
      // Check if hit self
      for (var segment = 1; segment < model.snake.length; segment++){
        if (
          model.snake[0].x === model.snake[segment].x &&
          model.snake[0].y === model.snake[segment].y){

          gameOver = true;
        }
      } // for
    } // if

    return gameOver;
  },

  addFood: function(){
    var $empties = $('.empty');
    var foodDiv = model.shuffleArray($empties)[0];
    model.food.x = $(foodDiv).data('x');
    model.food.y = $(foodDiv).data('y');
  },

  addSegment: function(){
    model.snake.push(model.snake[-1]);
  },

  increaseScore: function(){
    model.score += 1;
  },

  /**
  * Randomize array element order in-place.
  * Using Durstenfeld shuffle algorithm.
  */
  shuffleArray: function(array){
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
  }

};