'use strict;'

var model = {

  init: function(){
    this.score = 2;
    this.boardSize = 10;

    this.snake = [
      {x: 5, y: 5},
      {x: 4, y: 5}
    ];
    this.snakeDirection = 'right';

    this.food = {x: 9, y: 9};
  },

  getScore: function(){
    return this.score;
  },

  getBoardSize: function(){
    return this.boardSize;
  }

};