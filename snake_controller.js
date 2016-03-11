var controller = {

  init: function(){

    model.init();

    view.init();
    view.buildGrid( model.boardSize );

    setInterval(function() {
      controller.gameLoop();
    }, 250);
  },

  gameLoop: function() {
    model.update();
    view.render( model.snake, model.food );
  },

  changeDirection: function(newDirection) {
    model.changeDirection( newDirection );
  },

}

$(document).ready(function() {
    controller.init();
});
