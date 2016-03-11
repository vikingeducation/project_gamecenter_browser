var model = {
  board: new Board(30),
  snake: new Snake(),
  food: new Food(),
  gameEnd: false,

  reset: function() {
    this.board = new Board(30);
    this.snake = new Snake();
    this.food = new Food();
    this.gameEnd = false;
  }
};

function Board(max) {
  this.max = max;
  this.grid = [];

  this.generateNewBoard = function() {
    this.grid = new Array(this.max);
    for (var i = 0; i < this.max; i++) {
      this.grid[i] = new Array(this.max);
    }
    this.update();
  };

  this.getBoard = function() {
    return this.grid;
  };

  this.outOfBounds = function() {
    var head = model.snake.getPosition()[0];
    if (head[0] < 0 || head[0] >= this.max) return true;
    if (head[1] < 0 || head[1] >= this.max) return true;
    return false;
  };

  this.update = function() {
    this.clear();
    var snake = model.snake.getPosition(); // 2D Array
    var food = model.food.getPosition(); // an [x, y] location

    for(var s in snake) {
      this.grid[snake[s][0]][snake[s][1]] = "s";
    }
    this.grid[food[0]][food[1]] = "o";
  };

  this.clear = function() {
    for (var i = 0; i < this.max; i++) {
      for (var j = 0; j < this.max; j++) {
        this.grid[i][j] = undefined;
      }
    }
  };

  this.checkEat = function() {
    var head = model.snake.getPosition()[0];
    var food = model.food.getPosition();

    if (head.toString() == food.toString()) {
      model.snake.grow();
      model.food.regenerateFood();
    }
  };

}

function Snake() {
  this.position = [[1,1]];
  this.direction = 'right';
  this.phantomTail = undefined;

  this.getPosition = function() {
    return this.position;
  };

  this.setPosition = function(dir) {
    // this.position.unshift(position);

    var currPos = this.position[0];
    var newPos;

    if(dir == 'up' && this.direction !== "down") {
      newPos = [currPos[0] - 1, currPos[1]];
      this.position.unshift(newPos);
      this.direction = dir;
    } else if(dir == 'down' && this.direction !== "up") {
      newPos = [currPos[0] + 1, currPos[1]];
      this.position.unshift(newPos);
      this.direction = dir;
    } else if(dir == 'left' && this.direction !== "right") {
      newPos = [currPos[0], currPos[1] - 1];
      this.position.unshift(newPos);
      this.direction = dir;
    } else if(dir == 'right' && this.direction !== "left") {
      newPos = [currPos[0], currPos[1] + 1];
      this.position.unshift(newPos);
      this.direction = dir;
    } else {
      var currDir = this.getDirectionArr();
      console.log("currDir", currDir);
      console.log([currPos[0] + currDir[0], currPos[1] + currDir[1]]);

      newPos = [currPos[0] + currDir[0], currPos[1] + currDir[1]];
      this.position.unshift(newPos);
    }

    this.phantomTail = this.position.pop();

  };

  this.getDirectionArr = function() {
    if (this.direction == 'up'){
      return [-1, 0];
    } else if (this.direction == 'down') {
      return [1, 0];
    } else if (this.direction == 'left') {
      return [0, -1];
    } else if (this.direction == 'right') {
      return [0, 1];
    }
  };

  this.getDirection = function() {
    return this.direction;
  };

  this.setDirection = function(direction) {
    this.direction = direction;
  };

  this.grow = function(){
    this.position.push(this.phantomTail);
  };

  this.checkEatSelf = function() {
    var body = this.position.slice(1);
    var head = this.position[0];
    for (var b in body) {
      if (body[b][0] == head[0] && body[b][1] == head[1]) {
        model.gameEnd = true;
        return true;
      }
    }
    return false;
  };

}

function Food() {
  var x = Math.floor(Math.random() * 30);
  var y = Math.floor(Math.random() * 30);

  this.regenerateFood = function() {

    var newPos = [x, y].toString();
    var snake = model.snake.getPosition().map(function(obj){
      return obj.toString();
    } );

    while (snake.includes(newPos)) {
      x = Math.floor(Math.random() * 30);
      y = Math.floor(Math.random() * 30);
      newPos = [x, y].toString;
    }
    this.position = [x, y];
  };

  this.position = [x, y];

  this.getPosition = function() {
    return this.position;
  };
}
