var controller = {

  init: function(){

    model.init();

    view.init();
    view.buildGrid( model.boardSize );

    setInterval(function() {
      controller.gameLoop();
    }, 1000);
  },

  gameLoop: function() {
    model.update();
    view.render(  model.snake.add,
                  model.snake.remove,
                  model.food.add,
                  model.food.remove );
  },

  changeDirection: function(newDirection) {
    model.changeDirection( newDirection );
  },

}

$(document).ready(function() {
    controller.init();
});
