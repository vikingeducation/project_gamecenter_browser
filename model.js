function Food(x,y){
  this.x = x;
  this.y = y;
}

function Snake(x,y) {
  // holds the coordinates of each part of the snake.
  this.body = [];
  this.direction = 40;
  this.body.push([x,y]);
}

var model = {

  init: function(gridSize) {
    this.gridSize = gridSize;
    this.scale = Math.floor(this.gridSize / 40);
    this.score = 0;
    this.createSnake();
    this.createFood();
  },

  OPPOSITES: { 37: 39,
               40: 38,
               39: 37,
               38: 40},

  // update Snake's position by x, y coordinates
  updateSnake: function(direction) {
    //updates body and length of snake
    // if the snake is longer than 1, do not allow user to go in opposite direction of the snake (left when going right, up when going down)
    var head = this.snake.body[0];
    var scale = Math.floor(this.gridSize / 40);
    var newPart = [];

    if (direction === undefined) {
      direction = this.snake.direction;
    } 

    if( this.snake.body.length > 1 && direction === this.OPPOSITES[this.snake.direction]){
      direction = this.snake.direction;
    }
    switch(direction) {
      //left
      case 37:
          newPart = [(head[0] - scale), head[1]];
          this.snake.direction = direction;
          break;
      //up
      case 40:
          newPart = [head[0], (head[1] + scale)];
          this.snake.direction = direction;
          break;
      //right
      case 39:
          newPart = [(head[0] + scale), head[1]];
          this.snake.direction = direction;
          break;
      //down
      case 38:
          newPart = [head[0], (head[1] - scale)];
          this.snake.direction = direction;
          break;

      default:
          break;
    }
    
    this.snake.body.unshift(newPart);
    this.snake.body.pop();

  },

  // snake height and width will be 1/40 x gridSize
  // create the snake as an instance of the constructor Snake
  createSnake: function() {
    var x = Math.floor(this.gridSize / 2);
    var y = Math.floor(this.gridSize / 2);
    this.snake = new Snake(x,y);
  },

  // checks if snake hit wall, hits itself, dead or alive?
  gameOver: function() {
    return this.snakeHitWall() || this.snakeHitItself();
  },

  snakeHitWall: function(){
    var head = this.snake.body[0];
    return head[0] <= 0 || head[1] <= 0 || head[0] + this.scale >= this.gridSize || head[1]+this.scale >= this.gridSize;
  },

  snakeHitItself: function(){
    var head = this.snake.body[0];
    for(var i = 1; i < this.snake.body.length; i++){
      if(JSON.stringify(this.snake.body[i])===JSON.stringify(head)){
        return true;
      }
    }
  },

  checkEatFood: function(){
    //does snake head overlap food?
    var head = this.snake.body[0];
    return (this.withinX(head, this.food.x) &&  this.withinY(head, this.food.y));
  },

  withinX: function(head, target){
    return (target <= head[0] + this.scale && target >= head[0] - this.scale)
  },

  withinY: function(head, target){
    return (target <= head[1] + this.scale && target >= head[1] - this.scale)
  },

  growSnake: function(){
    //need to create in opposite direction of the tail which may not be the same as the direction of the head
    var tail = this.snake.body[this.snake.body.length - 1];
    var scale = Math.floor(this.gridSize / 40);
    var newPart;
    //add to the snake depending on which direction it's going
    switch(this.snake.direction) {
      //left
      case 37:
          newPart = [(tail[0] + scale), tail[1]];
          break;
      //up
      case 40:
          newPart = [tail[0], (tail[1] - scale)];
          break;
      //right
      case 39:
          newPart = [(tail[0] - scale), tail[1]];
          break;
      //down
      case 38:
          newPart = [tail[0], (tail[1] + scale)];
          break;

      default:
          break;
    }
    this.snake.body.push(newPart);

  },

  updateScore: function() {
   this.score ++;
  },

  // handles food
  // food height and width will be 1/40 x gridSize
  // cannot be the same position as the snake
  createFood: function() {
    var x = Math.floor(Math.random()*(39/40)*this.gridSize)
    var y = Math.floor(Math.random()*(39/40)*this.gridSize)
    while (this.withinX(this.snake.body[0],x)&&this.withinY(this.snake.body[1], y)){
       x = Math.floor(Math.random()*(39/40)*this.gridSize)
       y = Math.floor(Math.random()*(39/40)*this.gridSize)
     }
    this.food = new Food(x,y)
  }

}