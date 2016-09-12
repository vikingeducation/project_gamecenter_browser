// js scripts

"use strict";

// snake constructor
function Snake() {
  this.length = 1;
  this.head = new Section();
  this.headX = 3;
  this.headY = 3;
}

function Section(nextSection) {
  next: nextSection;
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
  },

  placeFood: function() {
    do {
      var x = Math.random(this.grid.length);
      var y = Math.random(this.grid.length);
    }
    while (false) {
      // x or y is occupied by snake.
    }
    grid[x][y] = "food";
  },

  placeSnake: function() {
    var x = this.snake.headX;
    var y = this.snake.headY;
    var currentContents = this.grid[x][y];
    var newContents;
    // control for cell with border or food so placeSnake updates, not destroys
    if (currentContents) {
      newContents = currentContents + "snake";
    } else {
      newContents = "snake";
    }
    this.grid[x][y] = newContents;  
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
    var x = this.snake.headX;
    var y = this.snake.headY;
    this.moveTail(x, y);
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
    gridModel.placeSnake();
  },

  moveTail: function(x, y) {
    this.grid[x][y] = null;
  }

}

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
    gridModel.moveSnake()
    if (controller.testSnakeInBounds()) {
      view.render();
    } else {
      controller.gameOver();
      alert("You lose.");
    }
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

  testSnakeInBounds: function() {
    // if snake head is not in array space with "border" as content, return true
    // else false
    var x = gridModel.snake.headX;
    var y = gridModel.snake.headY;
    if (gridModel.grid[x][y] === "bordersnake") {
      return false 
    } else {
      return true
    }
  }
}




$(document).ready(function() {
  controller.init();
})
