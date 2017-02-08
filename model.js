'use strict';

var model = {
  // gamspeed in mili-seconds
  gameSpeed: 600,

  //game-board size
  rows: 25,
  columns: 25,

  //cached game-board data
  board: [
    // 2d array of [x, y]
  ],

  snake: [
    //{SnakeSegment}, {SnakeSegment}, {SnakeSegment}
  ],

  SnakeSegment: function(x, y){
    this.x = x;
    this.y = y;
  },

  addSnakeSegment: function(x, y){
    var newSegment = new this.SnakeSegment(x, y);
    this.snake.push(newSegment);
  },

  createSnake: function(size, startingX, startingY){
    var totalSize = size || 1,
        i = 0,
        nextX = startingX + 1;
    //create head
    this.addSnakeSegment(startingX, startingY);

    //add body segments to head
    for (i; i <= size; i++) {
      this.addSnakeSegment(nextX, startingY);
      nextX++;
    }
  },

  //
  right: function(){
    model.snake.y++;
  },
  up: function(){
    model.snake.y++;
  },
  left: function(){
    model.snake.y++;
  },
  down: function(){
    model.snake.y++;
  },





  direction: 'right',

  cacheBoard: function(rows){
    for (var row = 0; row <= rows; row++){
      var cachedRow = $('.cell[x="' + row + '"]');
      this.board.push(cachedRow);
    }
  },
};
