var controller = {

  init: function(){
    keyPressed = false;
    view.init();
    this.setUpBoard();
    this.displayBoard();
    this.startPlay();
  },

  setUpBoard: function(){
    model.setUpBoard();
  },

  displayBoard: function(){
    view.displayBoard();
  },

  startPlay: function(){
    setInterval(this.playInterval, 3000)
  },

  moveSnake: function(event){
    model.moveSnake(event);
    
    
  },

  playInterval: function(){
    keyPressed = false;
    if(keyPressed === false){
      controller.moveSnake();
    }
    
    controller.displayBoard();
  },

  gameOver: function(){
    view.gameOver();
    $(document).off();
  },

  eatFood: function(){
    view.eatFood();
  },

  keyUpActions: function(){
    keyPressed = true;
    controller.moveSnake(event);
    controller.displayBoard();
  }

  
}