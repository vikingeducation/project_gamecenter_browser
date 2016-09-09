function Food(x,y){
  this.x = x;
  this.y = y;
}

function Snake(x,y) {
  this.length = 1
  // holds the coordinates of each part of the snake.
  this.body = [];
  this.direction;
  this.dead = false;
  this.body << [x,y]
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
  updateSnake: function() {
    //updates body and length of snake
  },
  // snake height and width will be 1/40 x gridSize
  // create the snake as an instance of the constructor Snake
  createSnake: function() {
    var x = Math.floor(Math.random()*(39/40)*this.gridSize);
    var y = Math.floor(Math.random()*(39/40)*this.gridSize);
    this.snake = new Snake(x,y);
  },

  // checks if snake hit wall, hits itself, dead or alive?
  checkSnake: function() {
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