'use strict';

var Model = {
  score: 0,
  points: 100,
  gameOver: false,

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
    // [6,3], [5,3], [4,3], [3,3], [2,3], [1,3]
  ],

  apple: {
          // x: 0,
          // y: 0,
          // element: null
        },

  //starting direction = down
  keyCode: 40,
  lastKeyCode: undefined,

  randomBoardCoords: function(){
    var randomRow = Math.floor((Math.random() * this.rows)),
        randomCol = Math.floor((Math.random() * this.columns));

    return [randomRow, randomCol];
  },

  createApple: function(){
    var coords = this.randomBoardCoords(),
        x = coords[0],
        y = coords[1];

      this.apple.x = x;
      this.apple.y = y;
      this.apple.element = this.board[x][y];
  },

  createSnake: function(size, startingX, startingY){
    for (var i = 0; i <= size; i++) {
      var newSegment = [startingX, startingY];
      this.snake.push(newSegment);
      startingX--;
    }
    // this.snake = [ [6,3], [5,3], [4,3], [3,3], [2,3], [1,3] ];
  },

  growSnake: function(){
    this.snake.push(this.tailAddon);
  },


  updateKeyCode: function(eventKeyCode){
    if (Model.validNewDirection(eventKeyCode)) {
      Model.lastKeyCode = Model.keyCode;
      Model.keyCode = eventKeyCode;

    }
  },

  validNewDirection: function(nextCode){
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

  tailAddon: undefined,

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

    if (this.checkAll(newX, newY)) {
      Controller.gameOver();
    } else {
      this.snake.unshift([newX, newY]);
      this.tailAddon = this.snake.pop();
    }

  },


  checkSelfCollision: function(newX, newY){
    var head = [newX, newY],
        body = this.snake.slice(1, this.snake.length);

    return body.some(function(segment){
      return (segment[0] === head[0]) && (segment[1] === head[1]);
    });
  },

  checkXboundries: function(x){
    var losingX = this.rows;
    return (x < 0) || (x > losingX);
  },

  checkYboundries: function(y){
    var losingY = this.columns;
    return (y < 0) || (y > losingY);
  },

  checkAll: function(x, y){
    return (this.checkSelfCollision(x,y) ||
        this.checkXboundries(x) ||
        this.checkYboundries(y))
  },

  cacheBoard: function(rows){
    for (var row = 0; row <= rows; row++){
      var cachedRow = $('.cell[x="' + row + '"]');
      this.board.push(cachedRow);
    }
  }
};
