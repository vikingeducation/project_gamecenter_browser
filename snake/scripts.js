//trying the Object pattern from the reading
$(document).ready(function() {

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
    },

    createFood : function(){

    },

    //returns boolean
    touchingFood : function(){

    },

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

    //single turn
    //move the snake and check collisions
    takeTurn : function(){

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
      for (x = 0; x < this.width; x++) {
        for (y = 0; y < this.height; y++) {
          $('#board').append("<div class='cell' ></div>");

          //take the newly created div and give it data coordinates
          $('.cell').last().attr('data-x', x);
          $('.cell').last().attr('data-y', y); 
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


  // just to test it worked
  snake.buildBoard();

  //proving that my data storage worked (IT DID)
  console.log($('.cell').last().data('x'));
  console.log($('.cell').last().data('y'));





  //We need an OnKeyUp event listener here
  //so you can control the snake




});