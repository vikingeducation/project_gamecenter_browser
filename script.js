// js scripts

"use strict";

// snake constructor
function Snake() {
  this.length = 1;
  this.body = [[3, 3]];
}

//


var view = {

  render: function() {
    $('#game-grid').empty();
    var gridSize = controller.getGridSize();
    for (var i = 0; i < gridSize; i++) {
      var $row = $('<div></div>');
      $row.addClass('row');
      $row.prependTo('#game-grid');
      for (var j = 0; j < gridSize; j++) {
        var $cell = $('<div></div>');
        // if grid is empty
        var cellContent = controller.getGridCell(j, i);
        if (cellContent === "food") {
          $cell.addClass("food");
        } else if (cellContent === "snake") {
          $cell.addClass("snake");
        } else if (cellContent === "border") {
          $cell.addClass("border");
        }
        $cell.addClass('cell');
        $cell.attr('id', String(j) + "-" + String(i));
        $cell.appendTo($row);
      }
    }
  }

};








var gridModel = {

  grid: [],
  food: [],

  init: function(size) {
    for (var i = 0; i < size; i++) {
      this.grid.push([]);
      for (var j = 0; j < size; j++) {
        this.grid[i].push(null);
      }
    }
    this.placeBorder();
    this.snake = new Snake();
    gridModel.placeSnake();
    gridModel.placeFood();
  },

  placeFood: function() {
    do {
      var x = Math.floor(Math.random() * this.grid.length);
      var y = Math.floor(Math.random() * this.grid.length);
    } while (this.grid[x][y] === "snake" || this.grid[x][y] === "border")
    this.grid[x][y] = "food";
  },

  placeSnake: function() {
    var snakeBody = this.snake.body;
    for(var i = 0; i < snakeBody.length; i++) {
      // var currentContents = this.grid[snakeBody[i][0]][snakeBody[i][1]];
      // var newContents;
      // if (currentContents) {
      //   newContents = currentContents + "snake";
      // } else {
      //   newContents = "snake";
      // }
      this.grid[snakeBody[i][0]][snakeBody[i][1]] = "snake";  
    }
  },

  placeBorder: function() {
    for(var i = 0; i < this.grid[0].length; i++) {
      this.grid[0][i] = "border";
    }
    // right border
    for(var i = 0; i < this.grid[this.grid.length-1].length; i++) {
      this.grid[this.grid.length-1][i] = "border";
    }
    // bottom border
    for(var i = 0; i < this.grid.length; i++) {
      this.grid[i][0] = "border";
    }
    // top border
    for(var i = 0; i < this.grid.length; i++) {
      this.grid[i][this.grid.length - 1] = "border";
    }
  },

  moveSnake: function() {
    var snakeBody = this.snake.body;
    // move tail to place of head
    var x = snakeBody[snakeBody.length-1][0];
    var y = snakeBody[snakeBody.length-1][1];
    switch (controller.currentDirection) {
      case "left":
        x -= 1;
        break;

      case "right":
        x += 1;
        break;

      case "up":
        y += 1;
        break;

      case "down":
        y -= 1;
        break;

      default:
        return
    };
    this.snake.headX = x;
    this.snake.headY = y;
    if(!controller.testSnakeInBounds(x, y)) {
      controller.gameOver();
      var alertMessages = [
        "Rome wasn't built in day", 
        "You win some, you lose some",
        "Maybe try drinking some more coffee?", 
        "Show some spirit, kid!", 
        "See the snake... Be the snake...",
        "Hey, you can't win them all", 
        "Did you try asking politely?", 
        "This snake's on a diet",
        "Here, snakey snakey snakey..."
      ]
      alert(alertMessages[Math.floor(Math.random() * alertMessages.length)]);
      return;
    }
    this.snake.body.push([x,y]);
    if(controller.snakeEatsFood(x, y)) {
      gridModel.snake.length += 1;
      gridModel.placeFood();
    } else {
      var oldSnake = gridModel.snake.body.shift();
      gridModel.grid[oldSnake[0]][oldSnake[1]] = null;
    }

    gridModel.placeSnake();

  },
};

















var controller = {

  currentDirection: null,

  invalidDirections: {
    "left" : "right",
    "right": "left" , 
    "up"   : "down" , 
    "down" : "up"   
  },

  init: function() {
    gridModel.init(20);
    this.setEventListeners();
    this.interval = setInterval(this.playGame, 100);
    view.render();
  },

  playGame: function() {
    gridModel.moveSnake();
    view.render();
  },

  gameOver: function() {
    clearInterval(this.interval);
  },

  getGridSize: function() {
    return gridModel.grid.length;
  },

  getGridCell: function(x, y) {
    var cell = gridModel.grid[x][y];
    if (cell === "food") {
      return "food";
    } else if (cell === "border") {
      return "border";
    } else if (cell === "snake") {
      return "snake";
    } else {
      return null;
    }
  },

  setEventListeners: function() {
    $(document).keydown(function(e) {
      var newDir = "";
      var current = controller.currentDirection;
      switch (e.which) {
        case 37: // left
          newDir = "left";
          if (controller.testForValidDirection(current, newDir)) {
            controller.currentDirection = newDir;
          }
          break;

        case 38: // up
          newDir = "up";
          if (controller.testForValidDirection(current, newDir)) {
            controller.currentDirection = newDir;
          }
          break;

        case 39: // right
          newDir = "right";
          if (controller.testForValidDirection(current, newDir)) {
            controller.currentDirection = newDir;
          }
          break;

        case 40: // down
          newDir = "down";
          if (controller.testForValidDirection(current, newDir)) {
            controller.currentDirection = newDir;
          }
          break;

        default:
          return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
    });
  },

  testForValidDirection: function(currentDir, newDir) {
    if (this.invalidDirections[currentDir] === newDir) {
      return false;
    } else {
      return true;
    }
  },

  testSnakeInBounds: function(x, y) {
    if ( gridModel.grid[x][y] === "border" || gridModel.grid[x][y] === "snake") {
      return false;
    } else {
      return true;
    }
  },

  snakeEatsFood: function(x, y) {
    if (gridModel.grid[x][y] === "food") {
      return true 
    } else {
      return false
    }
  }
}




$(document).ready(function() {
  var windowWidth = $(window).width();
  $("#game-grid").css("padding", String(windowWidth / 10) + "px");
  controller.init();
})
