function Food(x,y){
  this.x = x;
  this.y = y;
}

function Snake(x,y) {
  this.length = 1;
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
    // is snake dead?
    console.log(this.checkSnake());
    this.snake.dead = this.checkSnake();


    

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

          //updates body and length of snake
          if(this.checkEatFood()) {
            this.snake.length++;
            this.snake.body.unshift([this.food.x - 1, this.food.y]);
            this.destroyFood();
            this.createFood();
          }
          break;
      //up
      case 40:
          newPart = [head[0], (head[1] + scale)];
          this.snake.direction = direction;

          //updates body and length of snake
          if(this.checkEatFood()) {
            this.snake.length++;
            this.snake.body.unshift([this.food.x, this.food.y + 1]);
            this.destroyFood();
            this.createFood();
          }
          break;
      //right
      case 39:
          newPart = [(head[0] + scale), head[1]];
          this.snake.direction = direction;
          if(this.checkEatFood()) {
            this.snake.length++;
            this.snake.body.unshift([this.food.x + 1, this.food.y]);
            this.destroyFood();
            this.createFood();
          }
          break;
      //down
      case 38:
          newPart = [head[0], (head[1] - scale)];
          this.snake.direction = direction;
          if(this.checkEatFood()) {
            this.snake.length++;
            this.snake.body.unshift([this.food.x, this.food.y - 1]);
            this.destroyFood();
            this.createFood();
          }
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

    // if the snake overlaps itself
    var repeat_x = this.snake.body.map( function (el) {
      return el[0];
    });
    var repeat_y = this.snake.body.map( function (el) {
      return el[1];
    });    

    for (var j = 1; j < repeat_x.length; j++) {
      if (repeat_x[0] === repeat_x[j] && repeat_y[0] === repeat_y[j]) {
        return true;
      }
    
    }

    //left wall, right wall, upper wall, lower wall

    if (this.snake.body[0][0] < (this.gridSize * 1/40) || this.snake.body[0][0] > ( this.gridSize *38/40)) {
      return true;
    }
    if (this.snake.body[0][1] < (this.gridSize *1/40 ) || this.snake.body[0][1] > ( this.gridSize *38/40)) {
      return true;
    }
    return false;
  },

  checkEatFood: function(){
    //does snake head overlap food?
    var head = this.snake.body[0];
    console.log("head coord: " + head);
    console.log("x " + this.withinX(head));
    console.log("y " + this.withinY(head));
    return (this.withinX(head) && this.withinY(head));
    //this.food.x === head[0] && this.food.y === head[1]);
  },

  withinX: function(head){
    return (this.food.x <= head[0] + 10 && this.food.x >= head[0] - 10)
  },

  withinY: function(head){
    //might need to switch this?
    return (this.food.y <= head[1] + 10 && this.food.y >= head[1] - 10)
  },

  keepScore: function() {

  },

  // handles food
  // food height and width will be 1/40 x gridSize
  // cannot be the same position as the snake
  createFood: function() {
    var x = Math.floor(Math.random()*(39/40)*this.gridSize);
    var y = Math.floor(Math.random()*(39/40)*this.gridSize);
    this.food = new Food(x,y);
  },

  destroyFood: function (){
    this.food = null;
  },



}