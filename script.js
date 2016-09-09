$(document).ready(function() {
  var grid = $('.grid');
  for (var i = 0; i < 64; i++) {
    console.log(grid)
    grid.append('<div class="gridpiece"></div>');
  }
});

var View = {

  render: function(array) {
    var grid = $('.grid');
    grid.children.removeClass('highlight');
    for (var i = 0; i < array.length; i++) {
      $( ".grid div:nth-child(" + array[i] + ")" ).addClass('highlight');
    }
  }

};

var Controller = {

  init: function() {

  },

  renderPage: function() {
    View.render(Model.snakeArray);
  }

};


var Model = {

  DIRECTION_VALUES: {
    "e": 1,
    "w": -1,
    "s": 8,
    "n": -8
  },

  init: function() {
    this.startSnake();
  },

  snakeArray: [1,2,3],

  food: 0,

  direction: "e",

  startSnake: function() {
    setInterval(function() {
      this.snakeArray.pop();
      var head = updateSnake(this.snakeArray[0]);
      this.snakeArray.unshift(head);
      Controller.renderPage();
    }, 1000)
  },

  updateSnake: function(head) {
    return head + this.DIRECTION_VALUES[this.direction];
  }

};