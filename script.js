$(document).ready(function() {
  Controller.init();
});

var View = {

  init: function() {
    this.buildGrid();
    this.checkForTurn();
  },

  checkForTurn: function() {
    $('body').keydown(function(e) {
      Controller.changeDirection(e.keyCode);

    });
  },

  buildGrid: function() {
    var grid = $('.grid');
    for (var i = 0; i < 64; i++) {
      grid.append('<div class="gridpiece"></div>');
    }
  },

  render: function(array, food) {
    var grid = $('.grid');
    grid.children().removeClass('highlight').removeClass('food');
    for (var i = 0; i < array.length; i++) {
      $( ".grid div:nth-child(" + array[i] + ")" ).addClass('highlight');
    }
    $( ".grid div:nth-child(" + food + ")" ).addClass('food');
  }

};

var Controller = {

  KEYCODES: {
    '38': 'n',
    '37': 'w',
    '40': 's',
    '39': 'e'
  },

  init: function() {
    View.init();
    setInterval(function() {
      Model.init();
      View.render(Model.snakeArray, Model.food);
      Model.checkFood();
      View.render(Model.snakeArray, Model.food);
    }, 500);
  },

  changeDirection: function(code) {
    Model.direction = this.KEYCODES[String(code)];
  },

};


var Model = {

  DIRECTION_VALUES: {
    "e": 1,
    "w": -1,
    "s": 8,
    "n": -8
  },

  init: function() {
    this.tick();
  },

  snakeArray: [3,2,1],

  food: 50,

  randomNum: function() {
    do
      var num = Math.floor(Math.random() * 64) + 1;
    while (this.snakeArray.includes(num))
    return num;
  },

  direction: "e",

  tick: function() {
    this.snakeArray.pop();
    var head = this.updateSnake(this.snakeArray[0]);
    this.snakeArray.unshift(head);
  },

  getDiff: function() {
    var array = this.snakeArray;
    console.log(array[array.length - 2], array[array.length - 1]);
    var diff = array[array.length - 2] - array[array.length - 1];
    return array[array.length - 1] - diff;
  },

  checkFood: function() {
    if (this.snakeArray[0] === this.food) {
      this.food = this.randomNum();
      var tail = this.getDiff();
      console.log(tail);
      this.snakeArray.push(tail);
    }
  },

  updateSnake: function(head) {
    return head + this.DIRECTION_VALUES[this.direction];
  }

};
