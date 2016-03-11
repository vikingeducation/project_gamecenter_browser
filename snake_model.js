var model = {

init: function(){

  var board_size = 10;
  var snake_location = random_location();
  var moves_array = [[-1,0], [1,0], [0,-1], [0,1]];
  var snake_direction = moves_array[Math.floor(Math.random()* moves_array.length)];

  do{
    var food_location = random_location();
  }
  while(food_location === snake_location);

  this.score = 0;
  this.board = new Board();
  this.snake = new Snake(snake_location, snake_direction);
  this.food = new Food(food_location);
},

random_location: function(){
  return {
    x: Math.floor(Math.random()*board_size), 
    y: Math.floor(Math.random()*board_size)
  }
},
//create snake
//modify snake

//create food
//set food location


//game logic
  //snake eat food?
  //snake eat self?
  //snake eat wall?


  moveFood: function(){

  },

  growSnake: function(){
    this.snake.grow();
  }

}

function Food(starting_location){
  this.location = starting_location;
}

function Snake(starting_location, starting_direction){
  this.location = starting_location;
  this.direction = starting_direction;
  this.next = null;

  grow: function(){
    if(this.next){
      this.next.grow();
    }
    else{
      this.next = new Snake();
    }
  }

}

function Board(){

}