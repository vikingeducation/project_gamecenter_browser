'use strict';

var controller = {
  init: function(){
    view.init({});
    this.cacheBoard(10);
    this.play();

  },

  cacheBoard: function(rows){
    for (var row = 0; row <= rows; row++){
      var cachedRow = $('.cell[x="' + row + '"]');
      model.board.push(cachedRow);
    }
  },

  play: function(){
    var miliseconds = model.gameSpeed,
        x = model.snake.x,
        y = model.snake.y;

    // setInterval(function(){
    //   console.log("yay");
    //   moveSnake(x, y);
    // }, miliseconds);



  },

  moveSnake: function(){
    // setTimeout(function(){
    //   console.log("Finally!")
    // },10000);
    $()




  },



};

$(document).ready(function(){
  controller.init();
});
