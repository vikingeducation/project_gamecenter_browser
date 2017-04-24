var snakeModel = {
  canvasWidth: 400,
  canvasHeight: 400,
  canvasWidthError: null,
  canvasHeightError: null, 
  snakeLoc: [],
  validCanvasSize: function(dimension, value) {
    var errorMsg;
    if (isNaN(value)) {
      errorMsg = dimension + " must be an integer."
    } else if (value > 600 && value % 10 === 0) {
      errorMsg = dimension + " must be <= 600."
    } else if (value < 100 && value % 10 === 0) {
      errorMsg = dimension + " must be >= 100."
    } else if (value % 10 !== 0) {
      errorMsg = dimension + " must be a multiple of 10."
    } else {
      dimension === 'Width' ? this.canvasWidth = value : this.canvasHeight = value;
      return true;
    };
    dimension === 'Width' ? this.canvasWidthError = errorMsg : this.canvasHeightError = errorMsg;
    return false;
  },
  generateRandStartLoc: function() {
    var x = snakeModel.generateRandX();
    var y = snakeModel.generateRandY();
    this.snakeLoc.push([x, y]);
    return [10 * x, 10 * y];
  },
  generateFood: function() {
    var overlap = false;
    var foodLoc;
    do {
      foodLoc = [snakeModel.generateRandX(), snakeModel.generateRandY()]
      for (i = 0; i < this.snakeLoc.length; i++) {
        if (foodLoc[0] === this.snakeLoc[i][0] && foodLoc[1] === this.snakeLoc[i][1] ) {
          overlap = true;
          break;
        };
      };
    } while (overlap === true); 
    return [10 * foodLoc[0], 10 * foodLoc[1]];
  },
  generateRandX: function() {
    return Math.floor(Math.random() * (this.canvasWidth/10));
  },
  generateRandY: function() {
    return Math.floor(Math.random() * (this.canvasHeight/10));
  }
}