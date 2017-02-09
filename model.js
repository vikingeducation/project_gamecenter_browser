'use strict';

var model = {
  // gamspeed in mili-seconds
  gameSpeed: 100,

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

  createSnake: function(size, startingX, startingY){
    for (var i = 0; i <= size; i++) {
      var newSegment = [startingX, startingY];
      this.snake.push(newSegment);
      startingX--;
    }
    // this.snake = [ [6,3], [5,3], [4,3], [3,3], [2,3], [1,3] ]; 
  },
  
  //direction to go
  keyCode: 40,

  updateSnake: function(keyCode){
    var head = this.snake[0],
        newX = head[0],
        newY = head[1];
        
    //left, up, right, down    
    switch(keyCode){
      case 37:
        newY--;
        break;
      case 38:
        newX--;
        break;        
      case 39:
        newY++;
        break;
      case 40:
        newX++;
        break;        
    }
    
    this.checkAll(newX, newY);

    this.snake.unshift([newX, newY]);
    this.snake.pop();    
  },
  
  checkAll: function(x, y){
    if (this.checkXboundries(x) || this.checkYboundries(y)) {
      controller.gameOver();
    }
  },
  
  checkXboundries: function(x){
    var losingX = this.rows + 2;
    return !!(x < 0 || x > losingX);
  },
  
  checkYboundries: function(y){
    var losingY = this.columns + 2;
    return !!(y < 0 || y > losingY);
  },


  cacheBoard: function(rows){
    for (var row = 0; row <= rows; row++){
      var cachedRow = $('.cell[x="' + row + '"]');
      this.board.push(cachedRow);
    }
  }
};
