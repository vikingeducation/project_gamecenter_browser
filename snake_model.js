var snakeModel = {
  canvasWidth: 400,
  canvasHeight: 400,
  canvasWidthError: null,
  canvasHeightError: null,
  new: function() {
    this.direction = null;
    this.score = 0;
    this.distance = 0;
    this.timeElapsed = 0;
    this.snakeLoc = [];
    this.foodLoc = null;
    this.snakeLoc.push({x: snakeModel.generateRandX(), y: snakeModel.generateRandY()});
    snakeModel.generateFood();
  },
  validCanvasSize: function(dimension, value) {
    var errorMsg;
    if (isNaN(value)) {
      errorMsg = dimension + " must be an integer."
    } else if (value > 600 && value % 10 === 0) {
      errorMsg = dimension + " must be <= 600."
    } else if (value < 200 && value % 10 === 0) {
      errorMsg = dimension + " must be >= 100."
    } else if (value % 10 !== 0) {
      errorMsg = dimension + " must be a multiple of 10."
    } else {
      dimension === 'Width' ? this.canvasWidth = value : this.canvasHeight = value;
      this.canvasWidthError = null;
      this.canvasHeightError = null;
      return true;
    };
    dimension === 'Width' ? this.canvasWidthError = errorMsg : this.canvasHeightError = errorMsg;
    return false;
  },
  setDirection: function(direction) {
    var currDirection = this.direction; 
    var reverseDirection = snakeModel.getReverseDirection(currDirection);
    if (currDirection !== direction && reverseDirection !== direction) {
      this.direction = direction;
    };    
  },
  getReverseDirection: function(direction) {
    switch(direction) {
      case 'right':
        return 'left';
      case 'left':
        return 'right';
      case 'up':
        return 'down';
      case 'down':
        return 'up';
    };
  },
  snakeIsAlive: function() {
    if (snakeModel.checkSnakeCollision() || snakeModel.checkSnakeOutOfBounds()) {
      return false;
    }
    return true;
  },
  checkSnakeCollision: function() {
    var head = this.snakeLoc[0];
    for (i = 1; i < this.snakeLoc.length; i++) {
      if (head.x === this.snakeLoc[i].x && head.y === this.snakeLoc[i].y) {
        return true;
      };
    }
    return false;
  },
  checkSnakeOutOfBounds: function() {
    var head = this.snakeLoc[0];
    if (head.x < 0 || head.x > (this.canvasWidth/10 - 1) || head.y < 0 || head.y > (this.canvasHeight/10 - 1)) {
      return true;
    }
    return false;
  },
  updateSnakeLoc: function() {
    var currHead = this.snakeLoc[0],
        newHead;
    switch(this.direction) {
      case 'right':
        newHead = {x: currHead.x + 1, y: currHead.y};
        break;
      case 'left':
        newHead = {x: currHead.x - 1, y: currHead.y}
        break;
      case 'up': 
        newHead = {x: currHead.x, y: currHead.y - 1}
        break;
      case 'down':
        newHead = {x: currHead.x, y: currHead.y + 1}
        break;
    };
    if (newHead.x === this.foodLoc.x && newHead.y === this.foodLoc.y) {
      snakeModel.generateFood();
    } else {
      this.snakeLoc.pop();
    };
    this.snakeLoc.unshift(newHead);
    this.distance += 1;
    this.timeElapsed += snakeController.speed/1000;
    this.score = ((100*this.snakeLoc.length - this.distance/10) * (this.distance/this.timeElapsed/10)).toFixed(0);
  },
  generateFood: function() {
    var overlap = false;
    var foodLoc;
    do {
      foodLoc = {x: snakeModel.generateRandX(), y: snakeModel.generateRandY()};
      for (i = 0; i < this.snakeLoc.length; i++) {
        if (foodLoc.x === this.snakeLoc[i].x && foodLoc.y === this.snakeLoc[i].y ) {
          overlap = true;
          break;
        };
      };
    } while (overlap === true); 
    this.foodLoc = foodLoc; 
  },
  generateRandX: function() {
    return Math.floor(Math.random() * (this.canvasWidth/10));
  },
  generateRandY: function() {
    return Math.floor(Math.random() * (this.canvasHeight/10));
  }
}