function Food(arg) = {
  this.x = arg.x;
  this.y = arg.y;
}

function Snake(arg) = {
  this.length = 1
  // holds the coordinates of each part of the snake.
  this.body = [];
  this.direction;
  this.dead = false;

  // // eats food, grows in length and body
  // this.eatFood = function(){

  // }
}

var model = {

  init: function() {
    this.score = 0;

    //array of Food 


  }

  // update Snake's position by x, y coordinates
  updateSnake: function() {
    //updates body and length of snake
  }

  // create the snake as an instance of the constructor Snake
  createSnake: function() {

  }

  // checks if snake hit wall, hits itself, dead or alive?
  checkSnake: function() {

  }

  keepScore: function() {

  }

  // handles food

  createFood: function() {

  }

  destroyFood: function (){

  }


}