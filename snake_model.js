var model = {

  init: function(){
    this.boardSize = 10;
    this.score = 0;
    this.snake = new Snake( this.randomLocation(),
                            this.randomDirection() );
    this.food = new Food( this.randomLocation() );
  },

  randomLocation: function(){
    return {
      x: Math.floor( Math.random() * this.boardSize ),
      y: Math.floor( Math.random() * this.boardSize )
    }
  },

  randomDirection: function() {
    var directions = ["up", "down", "left", "right"];
    return directions[ Math.floor( Math.random() * 4 ) ];
  },

  update: function() {
    var snakeAte = this.snake.eat( this.food.location );

    if ( snakeAte ) {
      this.food.remove = this.food;
      this.food = new Food( this.randomLocation() );
      this.food.add = null;
      this.score++;
    }

    this.snake.move();
  },

  changeDirection: function( newDirection ) {
    this.snake.direction = newDirection;
  },

}

function Food(startingLocation){
  this.location = startingLocation;
  this.remove = null;
  this.add = this;
}

function Snake(startingLocation, startingDirection){
  this.segments = [ new Segment( startingLocation ) ];
  this.direction = startingDirection;
  this.growth = 0;
  this.add = null;
  this.remove = null;

  this.eat = function( foodLocation ) {
    var location = this.segments[0].location;

    if (  location.x === foodLocation.x &&
          location.y === foodLocation.y ) {
      this.growth++;
      return true;
    }
    return false;
  }

  this.move = function() {
    var location = this.segments[0].location;
    var direction = this.direction;

    if ( this.growth > 0 ) {
      this.growth--;
      this.remove = null;
    } else {
      this.remove = this.segments.pop();
    }
    this.add = new Segment( this.findNextLocation( location, direction ) );
    this.segments.unshift( this.add );
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

    return currentLocation;
  }
}

function Segment( location ) {
  this.location = location;
}

// function Board( boardSize ) {
//   this.grid = []
//   for ( var row = 0; row < boardSize; row++ ) {
//     this.grid[row] = [];
//     for ( var col = 0; col < boardSize; col++ ) {
//       this.grid[row][col] = new Cell();
//     }
//   }
// }
//
// function Cell() {
//   this.type = "none";
// }
