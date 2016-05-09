'use strict;'

var model = {

  init: function(){
    this.score = 2;
    this.boardSize = 10;

    this.snake = [
      {x: 4, y: 4},
      {x: 3, y: 4}
    ];
    this.snakeDirection = 'right';

    this.food = {x: 9, y: 9};
  },

  getScore: function(){
    return this.score;
  },

  getBoardSize: function(){
    return this.boardSize;
  },

  moveSnake: function(){
    // Move all but the head forward one
    for (var segment = this.snake.length; segment > 0; segment--) {
      this.snake[segment].x = this.snake[segment - 1].x;
      this.snake[segment].y = this.snake[segment - 1].y;
    }

    // Move the head according to direction
    if (this.snakeDirection === 'right') {
      this.snake[0].x += 1;
    } else if (this.snakeDirection === 'left'){
      this.snake[0].x -= 1;
    } else if (this.snakeDirection === 'up'){
      this.snake[0].y -= 1;
    } else {
      this.snake[0].y += 1;
    }
  },

  setDirection: function(event){
    event.preventDefault();

    if (event.keyCode === 38 || event.keyCode === 73){
      this.snakeDirection = 'up';
    } else if (event.keyCode === 40 || event.keyCode === 77){
      this.snakeDirection = 'down';
    } else if (event.keyCode === 39 || event.keyCode === 75){
      this.snakeDirection = 'right';
    } else if (event.keyCode === 37 || event.keyCode === 74){
      this.snakeDirection = 'left';
    }

  }

};