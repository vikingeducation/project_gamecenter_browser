'use strict';

var model = {
  // gamspeed in mili-seconds
  gameSpeed: 600,

  //game-board size
  rows: 25,
  columns: 25,

  //cached game-board data
  board: [
    // [], []...
  ],

  snake: [
    // [x,y], [x,y]...
  ],

  createSnake: function(size, startingX, startingY){
    for (var i = 0; i <= size; i++) {
      var newSegment = [startingX, startingY];
      this.snake.push(newSegment);
      startingX++;
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
    var head = model.snake[0];
    var x = head[0];
    var y = head[1];
    this.snake.unshift([(x + 1), y]);

    this.snake.pop();
  },





  direction: 'right',

  cacheBoard: function(rows){
    for (var row = 0; row <= rows; row++){
      var cachedRow = $('.cell[x="' + row + '"]');
      this.board.push(cachedRow);
    }
  },
};
