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

  this.setPosition = function(dir) {
    // this.position.unshift(position);

    var currPos = this.position[0];
    var newPos;

    if(dir == 'up') {
      newPos = [currPos[0] - 1, currPos[1]];
      this.position.unshift(newPos);
      
    } else if(dir == 'down') {
      newPos = [currPos[0] + 1, currPos[1]];
      this.position.unshift(newPos);

    } else if(dir == 'left') {
      newPos = [currPos[0], currPos[1] - 1];
      this.position.unshift(newPos);

    } else if(dir == 'right') {
      newPos = [currPos[0], currPos[1] + 1];
      this.position.unshift(newPos);
    }

    this.position.pop();
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
