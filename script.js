// js scripts

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


view = {
  init: function() {
    //
  }
}

gridModel = {

  grid: [],

  init: function(size) {
    for (var i = 0; i < size; i++) {
      this.grid.push([]);
      for (var j = 0; j < size; j++) {
        this.grid[i].push(null);
      }
    }
    gridModel.placeSnake();
  },

  placeFood: function() {
    do {
    var x = Math.random(this.grid.length);
    var y =Math.random(this.grid.length);
    } while {
      // x or y is occupied by snake.
    }
  },

  placeSnake: function() {
    var x = this.snake.headX;
    var y = this.snake.headY;
    this.grid[x][y] = this.snake.head;
  },

  initSnake: function() {
    this.snake = new Snake();
    return this.snake;
  },

  moveSnake: function() {
    var x = this.snake.headX;
    var y = this.snake.headY;
    switch(controller.currentDirection) {
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

      default: return;
    };
    this.snake.headX = x;
    this.snake.headY = y;
    placeSnake();
  }

}

controller = {

  currentDirection: "none", 

  init: function() {
    this.setEventListeners();
    interval = setInterval(gridModel.moveSnake(), 200);
    view.init();
  },

  gameOver: function() {
    clearInterval(interval);
  },

  setEventListeners: function() {
    $(document).keydown(function(e) {
      switch(e.which) {
        case 37: // left
        this.currentDirection = "left";
        break;

        case 38: // up
        this.currentDirection = "up";
        break;

        case 39: // right
        this.currentDirection = "right";
        break;

        case 40: // down
        this.currentDirection = "down";
        break;

        default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
    });
  }

}




$(document).ready(function() {


})
