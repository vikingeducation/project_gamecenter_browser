var snakeView = {

  init: function(controller){
    this.controller = controller;
    this.movementListener();
  },

  renderGrid: function(board) {
    $('div').remove();
    $('body').append('<div class="board"></div>');
    for (var i = 0; i < board.length; i++) {
      $('.board').append('<div class="row-container"></div>')
      var $rowDiv = $('.row-container').last();
      for (var j = 0; j < board[i].length; j ++) {
        $rowDiv.append($('<div class="cell"></div>'));
        var curDiv = $('div').last();
        if (board[i][j] === "snake") {
          curDiv.addClass('snake');
        } else if (board[i][j] === "fruit") {
          curDiv.addClass('fruit');
        }
      }
    }
  },

  movementListener: function(){
    $('body').keydown(function(event){
      snakeView.controller.changeDirection(event.keyCode);
    });
  },

  endDisplay: function(score){
    $('<div class="score"></div>').insertBefore($('.row-container').first());
    $('.score').html("Score: " + score);
    $('<div class="btn-container"></div>').insertAfter($('.board'));
    var btn = $("<input type='button' value='Play Again'>")
               .attr('id', 'play-again');
    $('.btn-container').append(btn);
    this.playAgainListener();
  },

  playAgainListener: function(){
    $('#play-again').click(function(){
      snakeView.controller.init();
    });
  }



};



var snakeModel = {

  init: function(controller){
    this.board = this.gameBoard();
    this.snake = [[5,5],[5,6],[5,7]]
    this.addFruit();
    this.assignCells();
    this.snakeDirection = "west";
    this.controller = controller;
    this.score = 0;
  },



  gameBoard: function(){
    var board = new Array(10);
    for (var i = 0; i < board.length; i++) {
      board[i] = new Array(10);
    }
    return board;
  },

  clearBoard: function(){
    var board = snakeModel.board;
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < 10; j++) {
        board[i][j] = undefined;
      }
    }
  },

  fruit: [],


  addFruit: function(){
    var col;
    var row;
    var fruitSpot;
    do {
      col = Math.floor((Math.random() * 9))
      row = Math.floor((Math.random() * 9))
      fruitSpot = snakeModel.board[row][col]
    } while (fruitSpot === "snake");
    snakeModel.fruit = [row, col];
  },

  assignCells: function() {
    var snakeArray = this.snake
    snakeModel.clearBoard();
    var board = snakeModel.board;
    for(var i = 0; i < snakeArray.length; i++ ) {
      var row = snakeArray[i][0];
      var col = snakeArray[i][1];
      board[row][col] = "snake";
    }
    var fruit = snakeModel.fruit;
    board[fruit[0]][fruit[1]] = "fruit";
  },

  checkForLoss: function(){
    var snakeArray = snakeModel.snake;
    if (snakeArray[0][0] > 9 || snakeArray[0][0] < 0 || snakeArray[0][1] > 9 || snakeArray[0][1] < 0) {
      return true;
    }
    for (var i = 0; i < snakeArray.length; i++) {
      for (var j = 0; j < snakeArray.length; j++) {
        if (j === i) {
          continue;
        } else if (snakeArray[i][0] === snakeArray[j][0] && snakeArray[i][1] === snakeArray[j][1]) {
            return true;
        }
      }
    }
    return false;
  },

  eatFruit: function(){
    var direction = this.snakeDirection;
    var snakeArray = snakeModel.snake;
    if (direction === "north") {
      var newRow = snakeArray[0][0] + 1
      var newCol = snakeArray[0][1]
      snakeArray.push([[newRow], [newCol]]);
    } else if(direction === "south") {
      var newRow = snakeArray[0][0] - 1
      var newCol = snakeArray[0][1]
      snakeArray.push([[newRow], [newCol]]);
    } else if(direction === "east") {
      var newRow = snakeArray[0][0] 
      var newCol = snakeArray[0][1] - 1
      snakeArray.push([[newRow], [newCol]]);
    } else {
      var newRow = snakeArray[0][0] 
      var newCol = snakeArray[0][1] + 1
      snakeArray.push([[newRow], [newCol]]);
    }
    this.score += 1;
    snakeModel.addFruit();
  },

  fruitAndGrowSnake: function(newRow, newCol) {
    var snakeArray = this.snake;
    if (newRow > -1 && newRow < 10) {
      if (snakeModel.board[newRow][newCol] === "fruit") {
        snakeModel.eatFruit();
      }
    }
    snakeArray.unshift([newRow, newCol])
    snakeArray.pop();
  },



  moveSnake: function(){
    var direction = this.snakeDirection;
    var snakeArray = this.snake;
    if (direction === "north") {
      var newRow = snakeArray[0][0] - 1
      var newCol = snakeArray[0][1];
      snakeModel.fruitAndGrowSnake(newRow, newCol);
    } else if(direction === "south") {
      var newRow = snakeArray[0][0] + 1
      var newCol = snakeArray[0][1]
      snakeModel.fruitAndGrowSnake(newRow, newCol);
    } else if(direction === "east") {
      var newRow = snakeArray[0][0]
      var newCol = snakeArray[0][1] + 1
      snakeModel.fruitAndGrowSnake(newRow, newCol);
    } else {
      var newRow = snakeArray[0][0]
      var newCol = snakeArray[0][1] - 1
      snakeModel.fruitAndGrowSnake(newRow, newCol);
    }
    if (!this.checkForLoss()){
      this.assignCells();
    }
  },

  changeDirection: function(keycode){
    if (keycode == 37 && snakeModel.snakeDirection !== "east" ) {
      snakeModel.snakeDirection = "west";
    }
    if (keycode == 38 && snakeModel.snakeDirection !== "south") {
      snakeModel.snakeDirection = "north";
    }
    if (keycode == 39 && snakeModel.snakeDirection !== "west") {
      snakeModel.snakeDirection = "east";
    }
    if (keycode == 40 && snakeModel.snakeDirection !== "north") {
      snakeModel.snakeDirection = "south";
    }
  }




};



var snakeController = {
  init: function() {
    this.model = snakeModel;
    this.view = snakeView;
    this.model.init(this);
    this.view.init(this);
    this.runLoop();
  },

  runLoop: function() {
    this.gameInterval = setInterval(function() {
      snakeController.model.moveSnake();
      if (snakeController.model.checkForLoss()) {
        snakeController.stopLoop();
        alert("You lose!");
        var score = snakeController.model.score;
        snakeController.view.endDisplay(score);
      } else {  
        snakeController.renderGrid();
      }
    }, 400);
  },

  stopLoop: function() {
    clearInterval(this.gameInterval);
  },

  renderGrid: function() {
    var board = this.model.board;
    this.view.renderGrid(board);
  },

  changeDirection: function(keycode){
    this.model.changeDirection(keycode);
  }





};




$(document).ready(function() {
  snakeController.init();
});
