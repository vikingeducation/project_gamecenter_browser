var model = {

  max: 30,
  board: [],
  snake: new Snake(),
  food: new Food(),

  generateNewBoard: function() {
    this.board = new Array(this.max);
    for (var i = 0; i < this.max; i++) {
      this.board[i] = new Array(this.max);
    }
  },

  getBoard: function() {
    return this.board;
  }


};

function Snake() {

  this.position = [[1,1]];
  this.direction = 'right';

  this.getPosition = function() {
    return this.position;
  };

  this.setPosition = function(position) {
    this.position.pop();
    this.position.shift(position);
  };

  this.getDirection = function() {
    return this.direction;
  };

  this.setDirection = function(direction) {
    this.direction = direction;
  };

}

function Food() {

  var x = Math.floor(Math.random() * 10 + 10);
  var y = Math.floor(Math.random() * 10 + 10);

  this.position = [x, y];

}
