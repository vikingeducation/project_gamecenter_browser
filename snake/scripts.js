//trying the Object pattern from the reading


var snake = {
  'speed' : 150,
  "score" : 0,
  //hard-coded for now
  // 10 x 10
  "height" : 20,
  "width" : 20,


  //current direction the snake is moving
  //keypresses can change this, linked to the
  //changeDirection function below
  "direction" : "up",

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
    length = 8
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
    var x = coords[0];
    var y = coords[1];
    var rowY = '.row' + y;
    var colX = '.col' + x;
    return $(rowY).filter(colX);
  },

  createFood : function(){
    var x = Math.floor(Math.random() * this.width);
    var y = Math.floor(Math.random() * this.height);
    this.findCoords([x, y]).addClass('food');
  },

  //returns boolean
  touchingFood : function(){
    return $('.food').filter('.snake').length
  },

  //add to coordinates after food
  growSnake : function(){

    this.score += 1;

    $('.food').removeClass('food');

    this.snakeCoords.unshift(this.lastTail);

    this.createFood();
  },

  //this is what the OnKeyUp event will call,
  //after parsing the keypress
  changeDirection : function(event){

    // should we have onKeyDown/press?
    $(document).keydown(function(e) {

      switch(e.which) {

          case 37: // left
            if (snake.direction != "left") snake.direction = "left"
            break;

          case 38: // up
            if (snake.direction != "up") snake.direction = "up"
            break;

          case 39: // right
            if (snake.direction != "right") snake.direction = "right"
            break;

          case 40: // down
            if (snake.direction != "down") snake.direction = "down"
            break;

          default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action
    });

  },

  //returns true if the snake has hit
  //itself or the end of the board
  collisionDetected : function(){

    // set bounds of board from [0, 0] to [height,  width]
    // if the snake head contains the coords of the bounds
    // or itself, return true
    var headX = this.snakeHead()[0];
    var headY = this.snakeHead()[1];
    var snakeWithoutHead = this.snakeCoords.slice(0, this.snakeCoords.length - 2);
    snakeWithoutHead.push(this.lastTail);

    var selfCollision = function(){
      var collided = false;
      snakeWithoutHead.forEach(function(value, index, array){
        if (headX == value[0] && headY == value[1]){
          collided = true;
        }
      });
      return collided;
    };

    if ( headX > (this.width - 1) || headX < 0) {
      return true;
    } else if ( headY > (this.height - 1) || headY < 0) {
      return true;
    } else if ( selfCollision() ){
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
      snake.renderSnake();
      if ( snake.touchingFood() ){ snake.growSnake(); }
      snake.moveSnake();
      if ( snake.collisionDetected() ){
          clearInterval(loop);
          alert("HA! YOU LOSE. YOUR SCORE WAS " + snake.score);
        };
    }, this.speed)
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


  $(document).keydown(function(e) {

    switch(e.which) {

        case 37: // left
          if (snake.direction != "right") snake.direction = "left"
          break;

        case 38: // up
          if (snake.direction != "down") snake.direction = "up"
          break;

        case 39: // right
          if (snake.direction != "left") snake.direction = "right"
          break;

        case 40: // down
          if (snake.direction != "up") snake.direction = "down"
          break;

        default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action
  });

  // just to test it worked

  // snake.buildBoard();
  snake.startGame();


  //We need an on('keyup', function(){}) event
  // listener here
  //so you can control the snake




});