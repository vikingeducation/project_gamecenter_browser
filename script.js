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
  },
  placeFood: function() {
    do {
    var x = Math.random(this.grid.length)
    var y =Math.random(this.grid.length)
    }
    while {
      // x or y is occupied by snake.
    }
  },
  moveSnake: function() {

  }

}

controller = {

  init: function() {
    interval = setInterval(gridModel.moveSnake(), 200);
    view.init();
  },

  gameOver: function() {
    clearInterval(interval);
  }

}




$(document).ready(function() {


})
