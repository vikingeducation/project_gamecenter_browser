'use strict';

var controller = {
  init: function(){
    var cols = model.rows,
        rows = model.columns,
        miliseconds = model.gameSpeed;

    view.init(cols, rows);
    model.cacheBoard(cols, rows);
    model.createSnake(5, 10, 3);

    controller.play(miliseconds);
  },
  
  interval: null,

  play: function(miliseconds){
    this.interval = setInterval(function(){
      controller.render();
    }, miliseconds);
  },

  render: function(){
    var last = model.lastKeyCode,
        next = model.keyCode,
        snake = model.snake;
        
    view.render(snake);
    model.updateSnake(next);
  },
  
  preventReverse: function(lastCode, nextCode){
    
    //for up/down
    if ((lastCode === 37 && nextCode === 39) || 
        (lastCode === 39 && nextCode === 37)) {
      return lastCode;
    }

    //for left/right
    if ((lastCode === 38 && nextCode === 40) || 
    (lastCode === 40 && nextCode === 38)) {
      return lastCode;
    }
    
    return nextCode;
  },
  
  gameOver: function(){
    clearInterval(this.interval);
    console.log('Game Over!')
  }
  

};

//runs the game

$(document).ready(function(){
  controller.init();
});
