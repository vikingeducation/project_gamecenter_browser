'use strict;'

var model = {

  init: function(){
    this.score = 2;
    this.boardSize = 10;
    this.speed = 1000;

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
      x: 9,
      y: 9
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
    return true;
  }

};