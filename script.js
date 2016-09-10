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
    for (var i = 1; i <= 100; i++) {
      if (i < 11 || i > 90 || i % 10 === 0 || (i - 1) % 10 === 0) {
        grid.append('<div class="hidden"></div>');
      } else {
        grid.append('<div class="gridpiece"></div>');
      }
    }
  },

  render: function(array, food) {
    var grid = $('.grid');
    grid.children().removeClass('highlight').removeClass('food');
    for (var i = 0; i < array.length; i++) {
      $( ".grid div:nth-child(" + array[i] + ")" ).addClass('highlight');
    }
    $( ".grid div:nth-child(" + food + ")" ).addClass('food');
  },

  gameOver: function() {
    alert("You lose!");
    $('body').html("");
  }

};

var Controller = {

  KEYCODES: {
    '38': 'n',
    '37': 'w',
    '40': 's',
    '39': 'e'
  },

  OPPOSITE: {
    '38': 's',
    '37': 'e',
    '40': 'n',
    '39': 'w'
  },

  init: function() {
    View.init();
    setInterval(function() {
      Model.init();
      //View.render(Model.snakeArray, Model.food);
      Model.checkFood();
      View.render(Model.snakeArray, Model.food);
      if (Model.gameOver()) {
        View.gameOver();
      }
    }, 200);
  },

  changeDirection: function(code) {
    if (Model.direction !== this.OPPOSITE[String(code)]) {
      Model.direction = this.KEYCODES[String(code)];
    }
  },

};


var Model = {

  DIRECTION_VALUES: {
    "e": 1,
    "w": -1,
    "s": 10,
    "n": -10
  },

  init: function() {
    this.tick();
  },

  snakeArray: [14,13,12],

  food: 55,

  randomNum: function() {
    do
      var num = Math.floor(Math.random() * 100) + 1;
    while (this.snakeArray.includes(num) || (num < 11 || num > 90 || num % 10 === 0 || (num - 1) % 10 === 0))
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
  },

  gameOver: function() {
    var dupl = this.hasDuplicates(this.snakeArray);
    var side = (this.snakeArray[0] < 11 || this.snakeArray[0] > 90 || this.snakeArray[0] % 10 === 0 || (this.snakeArray[0] - 1) % 10 === 0)
    return dupl || side;
  },

  hasDuplicates: function (array) {
    return (new Set(array)).size !== array.length;
  }

};
