var model = {
  board: new Board(30),
  snake: new Snake(),
  food: new Food()
};

function Board(max) {
  this.max = max;
  this.grid = [];

  this.generateNewBoard = function() {
    this.grid = new Array(this.max);
    for (var i = 0; i < this.max; i++) {
      this.grid[i] = new Array(this.max);
    }
  };

  this.getBoard = function() {
    return this.grid;
  };
}

function Snake() {
  this.position = [[1,1]];
  this.direction = 'right';

  this.getPosition = function() {
    return this.position;
  };

  this.setPosition = function(position) {
    this.position.pop();
    this.position.unshift(position);
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
