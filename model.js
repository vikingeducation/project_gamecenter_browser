function Food(x,y){
  this.x = x;
  this.y = y;
}

function Snake(x,y) {
  this.length = 1
  // holds the coordinates of each part of the snake.
  this.body = [];
  this.direction = 40;
  this.dead = false;
  this.body.push([x,y]);
  // // eats food, grows in length and body
  // this.eatFood = function(){

  // }
}

var model = {

  init: function(gridSize) {
    this.gridSize = gridSize;
    this.score = 0;
    this.createSnake();
    this.createFood();
    //array of Food 


  },

  // update Snake's position by x, y coordinates
  updateSnake: function(direction) {
    //updates body and length of snake

    var head = this.snake.body[0];
    var scale = Math.floor(this.gridSize / 40);
    var newPart = [];

    if (direction === undefined) {
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
  checkSnake: function() {
  },

  checkEatFood: function(){
    //does snake head overlap food?
    var head = this.snake.body[0];
    return (withinX(head) && withinY(head));
    //this.food.x === head[0] && this.food.y === head[1]);
  },

  withinX: function(head){
    return (this.food.x <= head[0] + 2 && this.food.x >= head[0] - 2)
  },

  withinY: function(head){
    //might need to switch this?
    return (this.food.y <= head[1] + 2 && this.food.y >= head[1] -2)
  },

  keepScore: function() {

  },

  // handles food
  // food height and width will be 1/40 x gridSize
  // cannot be the same position as the snake
  createFood: function() {
    var x = Math.floor(Math.random()*(39/40)*this.gridSize)
    var y = Math.floor(Math.random()*(39/40)*this.gridSize)
    this.food = new Food(x,y)
  },

  destroyFood: function (){

  },



}