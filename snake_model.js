var model = {

init: function(){

  var board_size = 10;
  var snake_location = random_location();
  var moves_array = [[-1,0], [1,0], [0,-1], [0,1]];
  var snake_direction = moves_array[Math.floor(Math.random()* moves_array.length)];

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

function Food(startingLocation){
  this.location = startingLocation;
}

function Snake(startingLocation, starting_direction){
  this.segments = [ new Segment( startingLocation ) ];
  this.direction = startingDirection;
  this.growth = 0;

  this.move = function( direction ) {
    var location = this.segments[0].location;
    this.segments.pop();
    this.segments.unshift( new Segment( this.findNextLocation( location, direction ) ) );
  }

  this.findNextLocation = function(currentLocation, direction) {
    switch( direction ) {
    case "up":
      currentLocation.y -= 1; break;
    case "down":
      currentLocation.y += 1; break;
    case "left":
      currentLocation.x -= 1; break;
    case "right":
      currentLocation.x += 1; break;
    }
  }
}

function Segment(location) {
  this.location = location;
}

function Board( boardSize ) {
  this.grid = []
  for ( var row = 0; row < boardSize; row++ ) {
    this.grid[row] = [];
    for ( var col = 0; col < boardSize; col++ ) {
      this.grid[row][col] = new Cell();
    }
  }
}

function Cell() {
  this.type = "none";
}
