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


  createSnake : function(){
    //pick spot for snake to appear
    //push those coords onto snakeCoords
    this.snakeCoords.push([0,0]);
    this.snakeCoords.push([0,1]);
  },

  //this looks at the direction, then pushes on 
  //the next block in that direction,
  //then shifts off the last block
  moveSnake : function(){
    var snakeHead = this.snakeCoords[this.snakeCoords.length - 1];
    var headX = snakeHead[0];
    var headY = snakeHead[1];

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

    this.snakeCoords.shift();
  },

  reRenderSnake : function() {
    //check coordinates of snakeCoords vs classes on board
    //remove any classes that don't match
    //
    
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
    //add in true conditions
    return false;
  },

  //single turn, one frame
  //move the snake and check collisions
  takeTurn : function(){
    moveSnake();
    reRenderSnake;
  },

  gameLoop : function(){
    while(true){
      takeTurn();
      if ( collisionDetected() ) break;
      if ( touchingFood() ){ growSnake(); };
    };
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
    buildBoard();
    createSnake();
    createFood();

    gameLoop();
  }

}; //end of snake game object




$(document).ready(function() {



  // just to test it worked

  snake.buildBoard();





  //We need an on('keyup', function(){}) event 
  // listener here
  //so you can control the snake




});