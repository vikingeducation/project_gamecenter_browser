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

  //x,y coordinates
  snake: [
    // [x,y], [x,y]...
  ],
  
  //queried objects
  snakeQuery: [
    
  ],

  createSnake: function(size, startingX, startingY){
    // for (var i = 0; i <= size; i++) {
    //   var newSegment = [startingX, startingY];
    //   this.snake.push(newSegment);
    //   startingX++;
    // }
    
    this.snake = [ [3,3], [2,3], [1,3] ]; 
    
  },

  //
  // right: function(){
  //   model.snake.y++;
  // },
  // up: function(){
  //   model.snake.y++;
  // },
  // left: function(){
  //   model.snake.y++;
  // },
  down: function(){
    var head = this.snake[0],
        newX = head[0] + 1,
        newY = head[1];
    
    this.snake.unshift([newX, newY]);
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
