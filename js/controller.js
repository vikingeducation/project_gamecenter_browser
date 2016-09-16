var controller = {

  init: function(){
    keyPressed = false;
    view.init();
    this.setUpBoard();
    this.render();
    this.startPlay();
  },

  setUpBoard: function(){
    model.setUpBoard();
  },

  render: function(){
    view.render();
  },

  startPlay: function(){
    setInterval(this.playInterval, 3000)
  },

  moveSnake: function(event){
    model.moveSnake(event);
    
    
  },

  score: function(){
    return model.score;
  },

  playInterval: function(){
    keyPressed = false;
    if(keyPressed === false){
      controller.moveSnake();
    }
    
    controller.render();
  },

  gameOver: function(){
    return model.checkGameOver();
    
  },

  eatFood: function(){
    view.eatFood();
  },

  keyUpActions: function(event){
    keyPressed = true;
    controller.moveSnake(event);
    
    if(controller.gameOver()){
      view.gameOver();
    } 

    controller.render();
  }

  
}