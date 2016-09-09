// js scripts

// snake constructor
function Snake() {
  this.length = 1;
  this.head = new Section();
}

function Section(nextSection) {
  next: nextSection;
}

//


view = {

  render: function() {
    var gridSize = controller.getGridSize();
    for (var i = 0; i < gridSize; i++) {
      var $row = $('<div></div>');
      $row.addClass('row');
      $row.prependTo('#game-grid');
      for (var j = 0; j < gridSize; j++) {
        var $cell = $('<div></div>');
        // if grid is empty
        var cellContent = controller.getGridCell(j,i)
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
  moveSnake: function() {

  }

}

controller = {

  init: function() {
    gridModel.init(10);
    interval = setInterval(gridModel.moveSnake(), 200);
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
  }


}




$(document).ready(function() {
  controller.init();
})
