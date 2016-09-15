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
    keyPressed = false;
    //set keyPressed to false after move snake is called to allow listener to set to true
  },

  playInterval: function(){

    if(keyPressed === false){
      controller.moveSnake();
    }
    
    controller.displayBoard();
  }

  
}