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
        var cellContent = controller.getGridCell(j, i)
        if (cellContent === "food") {
          $cell.addClass("food");
        } else if (cellContent === "snake") {
          $cell.addClass("snake");
        }
        $cell.addClass('cell');
        $cell.attr('id', String(j) + "-" + String(i));
        $cell.appendTo($row);
      }
    }
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
    this.snake = new Snake();
    gridModel.placeSnake();
  },

  placeFood: function() {
    do {
      var x = Math.random(this.grid.length)
      var y = Math.random(this.grid.length)
    }
    while (false) {
      // x or y is occupied by snake.
    }
    grid[x][y] = "food";
  },

  placeSnake: function() {
    var x = this.snake.headX;
    var y = this.snake.headY;
    this.grid[x][y] = this.snake.head;
  },


  moveSnake: function() {
    var x = this.snake.headX;
    var y = this.snake.headY;
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
        return;
    };
    this.snake.headX = x;
    this.snake.headY = y;
    placeSnake();
  }

}

controller = {

  init: function() {
    gridModel.init(20);
    this.setEventListeners();
    interval = setInterval(this.playGame, 200);
    view.render();
  },

  playGame: function() {
    gridModel.moveSnake()
    view.render();
  },

  gameOver: function() {
    clearInterval(interval);
  },

  getGridSize: function() {
    return gridModel.grid.length;
  },

  getGridCell: function(x, y) {
    var cell = gridModel.grid[x][y];
    if (cell === "food") {
      return "food";
    } else if (cell) {
      return "snake";
    } else {
      return null;
    }
  },

  setEventListeners: function() {
    $(document).keydown(function(e) {
      switch (e.which) {
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

        default:
          return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
    });
  }
}




$(document).ready(function() {
  controller.init();
})
