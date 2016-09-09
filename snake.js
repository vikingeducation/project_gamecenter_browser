var snakeView = {

  init: function(){
  },

  renderGrid: function(board) {
    console.log('rendering');
    $('div').remove();
    for (var i = 0; i < board.length; i++) {
      var cell = board[i];
      $('body').append($('<div/>'));
      var row = cell.row;
      var col = cell.col;
      var curDiv = $('div').last();
      curDiv.attr('row', row).attr('col', col);
      if(cell.hasSnake) {
        curDiv.addClass('has-snake');
      }
    }
  }
};


function Cell(row, col) {
  this.col = col;
  this.row = row;
  this.hasSnake = false;
}

function Snake(length) {
  this.length = length;
  this.headCoords = [10, 10];
  this.bodyCoords = [this.headCoords];
  this.direction = 'north';
}

function GameBoard(size) {
  this.board = [];
  for(var i = 0; i < size; i++) {
    var row = Math.floor(i / 20);
    var col = Math.floor(i % 20);
    var cell = new Cell(row, col);
    this.board.push(cell);
  }
}


var snakeModel = {

  init: function(){
    this.board = new GameBoard(400).board;
    this.snake = new Snake(1);
  },

  assignSnakeCells: function() {
    for(var i = 0; i < this.board.length; i++) {
      cell = snakeModel.board[i];
      var row = cell.row;
      var col = cell.col;
      if(snakeModel.snakeAtCell(row, col)) {
        cell.hasSnake = true;
      }
    }
  },

  snakeAtCell: function(row, col) {
    for(var i = 0; i < this.snake.bodyCoords.length; i++) {
      if (this.snake.bodyCoords[i][0] == row && this.snake.bodyCoords[i][1] == col) {
        return true;
      }
    }
    return false;
  }
};



var snakeController = {
  init: function() {
    this.model = snakeModel;
    this.view = snakeView;
    this.model.init();
    this.view.init();
    this.runLoop();
  },

  runLoop: function() {
    console.log('running loop');
    this.gameInterval = setInterval(function() {
      snakeController.model.assignSnakeCells();
      snakeController.renderGrid();
    }, 2000);
  },

  stopLoop: function() {
    clearInterval(this.gameInterval);
  },

  renderGrid: function() {
    console.log('controller rendering grid');
    var board = this.model.board;
    this.view.renderGrid(board);
  }

};




$(document).ready(function() {
  snakeController.init();
});
