var controller = {
  init: function() {
    // initialize view with callbacks
    view.init({
      changeDirection: this.changeDirection
    });

    // start interval loop
    this.loop = setInterval( function(){ controller.frame(); }, 50 );
  },

  frame: function() {
    if ( controller.checkLosses() ) { 
      view.endGame();
      clearInterval( this.loop ); 
    }

    var snake = model.incrementSnake();
    var food = model.getFood();
    var score = model.getScore();
    view.render(snake, food, score);
  },

  changeDirection: function(newDirection) {
    model.changeDirection(newDirection);
  },

  checkLosses: function() {
    return model.checkLoss() || false;
  }
}


$( document ).ready( function() { controller.init(); } );