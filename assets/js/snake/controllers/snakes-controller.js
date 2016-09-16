var SnakesController = {
  update: function(id, data) {
    var snake = Snake.find(id);
    snake.update(data);
  }
};

ApplicationController.register(SnakesController);

