//trying the Object pattern from the reading


var snake = {

  //hard-coded for now
  // 10 x 10
  "height" : 10,
  "width" : 10,


  //current direction the snake is moving
  //keypresses can change this, linked to the
  //changeDirection function below
  "direction" : 'up',

  //the coordinates of the snake segments,
  //a queue we can push onto and shift off of
  "snakeCoords": [],

  snakeHead : function () {
    return this.snakeCoords[this.snakeCoords.length - 1];
  },

  // this is for the snake array with coordinates
  createSnake : function(){
    //pick spot for snake to appear
    //push those coords onto snakeCoords
    length = 3
    for ( i = 0; i < length; i++) {
      this.snakeCoords.push([0, i]);
      this.findCoords(this.snakeHead()).addClass("snake");
    }

      this.lastTail = []
  },

  //this looks at the direction, then pushes on
  //the next block in that direction,
  //then shifts off the last block
  moveSnake : function(){
    var headX = this.snakeHead()[0];
    var headY = this.snakeHead()[1];

    console.log(this.direction);
    switch(this.direction) {
      case "up":
        this.snakeCoords.push([headX, headY + 1]);
        break;
      case "down":
        this.snakeCoords.push([headX, headY - 1]);
        break;
      case "left":
        this.snakeCoords.push([headX - 1, headY]);
        break;
      case "right":
        this.snakeCoords.push([headX + 1, headY]);
        break;
    }
    // object variable for tail being removed
    this.lastTail = this.snakeCoords.shift();
  },
  // for translating the coordinates in the snake array
  // to actual segments on the board
  renderSnake : function() {
    //check coordinates of snakeCoords vs classes on board
    //remove any classes that don't match
    //
    var head = this.snakeHead()
    var tail = this.lastTail
    // we want to construct row(headX) and col(headY)
    // remove tail at row(tail[0]) and col(tail[1])

    this.findCoords(head).addClass("snake")
    if (tail.length) this.findCoords(tail).removeClass("snake")
  },
  // this takes coords and converts them to jquery objects
  findCoords : function(coords) {
    var x = coords[0]
    var y = coords[1]
    var rowY = '.row' + y
    var colX = '.col' + x
    return $(rowY).filter(colX)
  },

  createFood : function(){

  },

  //returns boolean
  touchingFood : function(){

  },
  //add to coordinates after food
  growSnake : function(){

  },

  //this is what the OnKeyUp event will call,
  //after parsing the keypress
  changeDirection : function(direction){

  },

  //returns true if the snake has hit
  //itself or the end of the board
  collisionDetected : function(){
    // set bounds of board from [0, 0] to [height,  width]
    // if the snake head contains the coords of the bounds
    // or itself, return true
    var headX = this.snakeHead()[0];
    var headY = this.snakeHead()[1];

    if ( headX >= (this.width - 1) || headX < 0) {
      return true;
    } else if ( headY >= (this.height - 1) || headY < 0) {
      return true;
    } else {
      return false;
    }

  },

  //single turn, one frame
  //move the snake and check collisions
  // takeTurn : function(){
  // },

  gameLoop : function(){
    var loop = setInterval (function() {
      snake.moveSnake();
      snake.renderSnake();
      if ( snake.collisionDetected() ) clearInterval(loop);
      if ( snake.touchingFood() ){ snake.growSnake(); }
    }, 1000)
  },

  buildBoard : function(){

    //iterate through 2D coordinate space
    for (y = this.height - 1; y >= 0; y--) {
      for (x = 0; x < this.width; x++) {
        $('#board').append("<div class='cell row" + y + " col"+x+"' ></div>");
      };
    };

    //set those cells' height dynamically
    $('.cell').css({
      width : Math.floor(600 / this.width - 2) + "px",
      height : Math.floor(600 / this.height - 2) + "px"
    });
  },

  //sets up board
  //calls createSnake
  startGame : function(){
    this.buildBoard();
    this.createSnake();
    this.createFood();

    this.gameLoop();
  }

}; //end of snake game object



$(document).ready(function() {



  // just to test it worked

  // snake.buildBoard();
  snake.startGame();


  //We need an on('keyup', function(){}) event
  // listener here
  //so you can control the snake




});