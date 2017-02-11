'use strict';

var model = {
  score: 0,

  // miliseconds
  gameSpeed: 100,

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

  apple: [
    // [x,y]
  ],

  randomBoardPiece: function(){
    var randomRow = Math.floor((Math.random() * this.rows)),
        randomCol = Math.floor((Math.random() * this.columns));

    return this.board[randomRow][randomCol]
  },

  createApple: function(){
    return this.randomBoardPiece();
  },

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

  updateKeyCode: function(eventKeyCode){
      this.lastKeyCode = this.keyCode;
      this.keyCode = eventKeyCode;
  },

  checkReverse: function(nextCode){
    var lastCode = this.keyCode;

    if (((lastCode === 37) && (nextCode === 39)) ||
        ((lastCode === 39) && (nextCode === 37)) ||
        ((lastCode === 38) && (nextCode === 40)) ||
        ((lastCode === 40) && (nextCode === 38))) {
      return false;
    } else {
      return true;
    }
  },

  updateSnake: function(keyCode){
    var head = this.snake[0],
        newX = head[0],
        newY = head[1];

    switch(keyCode){
      //left
      case 37:
        newY--;
        break;

      //up
      case 38:
        newX--;
        break;

      //right
      case 39:
        newY++;
        break;

      //down
      case 40:
        newX++;
        break;
    }

    this.checkAll(newX, newY);

    this.snake.unshift([newX, newY]);
    this.snake.pop();
  },

  checkAll: function(x, y){
    if (this.checkXboundries(x) ||
        this.checkYboundries(y) ||
        this.checkSelfCollision(x,y)){
      controller.gameOver();
    }
  },

  checkXboundries: function(x){
    var losingX = this.rows;
    return !!(x < 0 || x > losingX);
  },

  checkYboundries: function(y){
    var losingY = this.columns;
    return !!(y < 0 || y > losingY);
  },

  checkSelfCollision: function(newX, newY){
    var head = [newX, newY],
        body = this.snake.slice(1, this.snake.length),
        collided;

    collided = body.some(function(segment){
      return (segment[0] === head[0]) && (segment[1] === head[1]);
    });
    return !!(collided);
  },

  cacheBoard: function(rows){
    for (var row = 0; row <= rows; row++){
      var cachedRow = $('.cell[x="' + row + '"]');
      this.board.push(cachedRow);
    }
  }
};
